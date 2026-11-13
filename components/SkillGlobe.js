import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { readThemeColor } from '@/lib/themes'

const fibonacciSphere = (n, i) => {
  const y = 1 - (i / Math.max(n - 1, 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = Math.PI * (3 - Math.sqrt(5)) * i
  return [Math.cos(theta) * r, y, Math.sin(theta) * r]
}

const rgba = (hex, a) => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const n = parseInt(full, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

/**
 * A draggable dot-matrix globe with skill labels riding its surface.
 * Drawn on a 2D canvas so labels stay crisp and depth-sorted.
 */
export default function SkillGlobe({ skills }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()

    const DOTS = 560
    const dots = Array.from({ length: DOTS }, (_, i) => fibonacciSphere(DOTS, i))
    const labels = skills.map((text, i) => ({ text, p: fibonacciSphere(skills.length, i) }))

    const rings = []
    for (let k = 0; k < 6; k++) {
      const phi = (k / 6) * Math.PI
      rings.push(
        Array.from({ length: 73 }, (_, j) => {
          const a = (j / 72) * Math.PI * 2
          return [Math.cos(a) * Math.cos(phi), Math.sin(a), Math.cos(a) * Math.sin(phi)]
        }),
      )
    }
    for (const lat of [-0.55, 0, 0.55]) {
      const r = Math.sqrt(1 - lat * lat)
      rings.push(
        Array.from({ length: 73 }, (_, j) => {
          const a = (j / 72) * Math.PI * 2
          return [Math.cos(a) * r, lat, Math.sin(a) * r]
        }),
      )
    }

    let colors = {}
    const readColors = () => {
      colors = {
        text: readThemeColor('--text'),
        muted: readThemeColor('--muted'),
        accent: readThemeColor('--accent'),
        accent2: readThemeColor('--accent2'),
        surface: readThemeColor('--bg-elev'),
        onAccent: readThemeColor('--on-accent'),
      }
    }
    readColors()
    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let size = 0
    let R = 0
    const resize = () => {
      const w = canvas.parentElement.clientWidth
      size = w
      R = w * 0.34
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = w * dpr
      canvas.height = w * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${w}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    resize()

    // ── Rotation state ─────────────────────────────────────────────────────
    let rotX = 0.35
    let rotY = 0
    let velX = 0
    let velY = 0.004
    let dragging = false
    let lastX = 0
    let lastY = 0
    const pointer = { x: -1, y: -1, inside: false }

    const rotate = ([x, y, z]) => {
      const cY = Math.cos(rotY)
      const sY = Math.sin(rotY)
      const x1 = x * cY + z * sY
      const z1 = -x * sY + z * cY
      const cX = Math.cos(rotX)
      const sX = Math.sin(rotX)
      return [x1, y * cX - z1 * sX, y * sX + z1 * cX]
    }
    const project = ([x, y, z]) => {
      const persp = 3 / (3 - z)
      return [size / 2 + x * R * persp, size / 2 - y * R * persp, (z + 1) / 2]
    }

    const draw = () => {
      ctx.clearRect(0, 0, size, size)
      const c = size / 2

      const glow = ctx.createRadialGradient(c, c, 0, c, c, R * 1.4)
      glow.addColorStop(0, rgba(colors.accent, 0.12))
      glow.addColorStop(1, rgba(colors.accent, 0))
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, size, size)

      ctx.lineWidth = 1
      for (const ring of rings) {
        let prev = project(rotate(ring[0]))
        for (let j = 1; j < ring.length; j++) {
          const next = project(rotate(ring[j]))
          const depth = (prev[2] + next[2]) / 2
          ctx.strokeStyle = rgba(colors.text, 0.03 + depth * depth * 0.16)
          ctx.beginPath()
          ctx.moveTo(prev[0], prev[1])
          ctx.lineTo(next[0], next[1])
          ctx.stroke()
          prev = next
        }
      }

      for (const d of dots) {
        const [x, y, depth] = project(rotate(d))
        ctx.fillStyle = rgba(depth > 0.5 ? colors.accent : colors.accent2, 0.06 + depth * depth * 0.7)
        ctx.beginPath()
        ctx.arc(x, y, 0.5 + depth * 1.3, 0, Math.PI * 2)
        ctx.fill()
      }

      const placed = labels
        .map(l => ({ ...l, s: project(rotate(l.p)) }))
        .sort((a, b) => a.s[2] - b.s[2])

      let hovering = false
      for (const { text, s } of placed) {
        const [x, y, depth] = s
        const fontSize = 11 + depth * 8
        ctx.font = `500 ${fontSize}px 'JetBrains Mono', monospace`
        const w = ctx.measureText(text).width + fontSize * 1.4
        const h = fontSize * 2
        const left = x - w / 2
        const top = y - h / 2
        const hot =
          pointer.inside && depth > 0.55 && pointer.x > left && pointer.x < left + w && pointer.y > top && pointer.y < top + h
        if (hot) hovering = true

        if (depth > 0.45) {
          ctx.fillStyle = hot ? colors.accent : rgba(colors.surface, 0.55 + depth * 0.4)
          ctx.strokeStyle = rgba(colors.accent, hot ? 1 : (depth - 0.45) * 1.2)
          ctx.beginPath()
          ctx.roundRect(left, top, w, h, h / 2)
          ctx.fill()
          ctx.stroke()
        }
        ctx.fillStyle = hot ? colors.onAccent : rgba(depth > 0.45 ? colors.text : colors.muted, 0.15 + Math.pow(depth, 1.4) * 0.85)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, x, y + 1)
      }
      canvas.style.cursor = dragging ? 'grabbing' : hovering ? 'pointer' : 'grab'
      return hovering
    }

    // ── Loop ───────────────────────────────────────────────────────────────
    let frame = 0
    let visible = true
    const loop = () => {
      frame = requestAnimationFrame(loop)
      if (!visible) return
      if (!dragging) {
        const baseY = reduce ? 0 : 0.0035
        velY += (baseY - velY) * 0.02
        velX += (0 - velX) * 0.05
        rotX += (0.35 - rotX) * 0.01
      }
      rotY += velY
      rotX = Math.max(-1.2, Math.min(1.2, rotX + velX))
      const hovering = draw()
      if (hovering && !dragging) velY *= 0.9
    }
    frame = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    // ── Pointer ────────────────────────────────────────────────────────────
    const local = e => {
      const r = canvas.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    const onDown = e => {
      dragging = true
      ;[lastX, lastY] = local(e)
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = e => {
      const [x, y] = local(e)
      pointer.x = x
      pointer.y = y
      pointer.inside = true
      if (!dragging) return
      velY = (x - lastX) * 0.006
      velX = (y - lastY) * 0.006
      lastX = x
      lastY = y
    }
    const onUp = () => {
      dragging = false
    }
    const onLeave = () => {
      pointer.inside = false
    }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [skills])

  return (
    <canvas
      ref={canvasRef}
      style={{ touchAction: 'pan-y' }}
      role="img"
      aria-label={`Interactive globe of skills: ${skills.join(', ')}`}
      data-cursor
    />
  )
}
