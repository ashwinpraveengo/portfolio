import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { readThemeColor } from '@/lib/themes'
import { orbFragment, orbVertex, particleFragment, particleVertex } from './shaders'

function makeParticles(count, place, uniforms) {
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const seeds = new Float32Array(count)
  const v = new THREE.Vector3()
  for (let i = 0; i < count; i++) {
    place(v)
    v.toArray(positions, i * 3)
    scales[i] = 0.35 + Math.random() * 1.15
    seeds[i] = Math.random()
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  const material = new THREE.ShaderMaterial({
    vertexShader: particleVertex,
    fragmentShader: particleFragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  return new THREE.Points(geometry, material)
}

/**
 * The hero's WebGL scene: a noise-morphing iridescent orb inside a wireframe
 * cage, two orbit rings with satellites, a particle belt and a starfield.
 * Follows the pointer, reacts to hero scroll progress, pauses off-screen.
 */
export default function HeroScene({ isDark, ready, progressRef }) {
  const mountRef = useRef(null)
  const api = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // No WebGL: the CSS glow behind the canvas still carries the hero
    }

    const reduce = prefersReducedMotion()
    const small = window.innerWidth < 768
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 7)

    const root = new THREE.Group()
    scene.add(root)

    const palette = {
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uColorC: { value: new THREE.Color() },
    }

    // ── Orb ────────────────────────────────────────────────────────────────
    const orbUniforms = {
      ...palette,
      uBase: { value: new THREE.Color() },
      uLight: { value: 0 },
      uTime: { value: 0 },
      uAmp: { value: 0.3 },
      uFreq: { value: 1.15 },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uPointerStrength: { value: 0 },
    }
    let orbGeometry = new THREE.IcosahedronGeometry(1.3, small ? 40 : 80)
    orbGeometry.deleteAttribute('normal')
    orbGeometry.deleteAttribute('uv')
    orbGeometry = mergeVertices(orbGeometry)
    const orb = new THREE.Mesh(
      orbGeometry,
      new THREE.ShaderMaterial({ vertexShader: orbVertex, fragmentShader: orbFragment, uniforms: orbUniforms }),
    )
    root.add(orb)

    // ── Wireframe cage with glowing nodes ──────────────────────────────────
    const cage = new THREE.Group()
    const cageShape = new THREE.IcosahedronGeometry(2.05, 1)
    const cageLines = new THREE.LineSegments(
      new THREE.WireframeGeometry(cageShape),
      new THREE.LineBasicMaterial({ transparent: true, opacity: 0.14, depthWrite: false }),
    )
    cage.add(cageLines)

    const nodeSet = new Map()
    const cagePos = cageShape.getAttribute('position')
    for (let i = 0; i < cagePos.count; i++) {
      const key = `${cagePos.getX(i).toFixed(3)},${cagePos.getY(i).toFixed(3)},${cagePos.getZ(i).toFixed(3)}`
      if (!nodeSet.has(key)) nodeSet.set(key, new THREE.Vector3().fromBufferAttribute(cagePos, i))
    }
    const nodes = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.02, 10, 10),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9 }),
      nodeSet.size,
    )
    const m = new THREE.Matrix4()
    ;[...nodeSet.values()].forEach((p, i) => nodes.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)))
    cage.add(nodes)
    root.add(cage)

    // ── Orbit rings + satellites ───────────────────────────────────────────
    const rings = [
      { radius: 2.6, tilt: [1.25, 0.35, 0], speed: 0.5 },
      { radius: 3.05, tilt: [-1.0, -0.55, 0.3], speed: -0.32 },
    ].map(({ radius, tilt, speed }) => {
      const group = new THREE.Group()
      group.rotation.set(...tilt)
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.0045, 6, 320),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.4, depthWrite: false }),
      )
      const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial())
      group.add(ring, satellite)
      root.add(group)
      return { group, ring, satellite, radius, speed }
    })

    // ── Particles ──────────────────────────────────────────────────────────
    const particleUniforms = () => ({
      ...palette,
      uTime: { value: 0 },
      uSize: { value: small ? 34 : 42 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uOpacity: { value: 0 },
      uSwirl: { value: 1 },
    })
    const belt = makeParticles(
      small ? 600 : 1400,
      v => {
        const a = Math.random() * Math.PI * 2
        const r = 2.3 + Math.pow(Math.random(), 1.5) * 1.9
        v.set(Math.cos(a) * r, (Math.random() - 0.5) * 0.18 * r * 0.3, Math.sin(a) * r)
      },
      particleUniforms(),
    )
    belt.rotation.set(0.42, 0, -0.18)
    root.add(belt)

    const field = makeParticles(
      small ? 700 : 1800,
      v => v.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 13, -9 + Math.random() * 12),
      particleUniforms(),
    )
    scene.add(field)

    // ── Theme ──────────────────────────────────────────────────────────────
    const setTheme = () => {
      const light = document.documentElement.dataset.theme === 'light'
      palette.uColorA.value.set(readThemeColor('--accent'))
      palette.uColorB.value.set(readThemeColor('--accent2'))
      palette.uColorC.value.set(readThemeColor('--accent3'))
      orbUniforms.uBase.value.set(readThemeColor('--orb-base'))
      orbUniforms.uLight.value = light ? 1 : 0
      cageLines.material.color.set(readThemeColor('--text'))
      cageLines.material.opacity = light ? 0.22 : 0.14
      nodes.material.color.set(readThemeColor('--accent2'))
      rings[0].ring.material.color.set(readThemeColor('--accent'))
      rings[1].ring.material.color.set(readThemeColor('--accent3'))
      rings[0].satellite.material.color.set(readThemeColor('--accent'))
      rings[1].satellite.material.color.set(readThemeColor('--accent3'))
      for (const p of [belt, field]) {
        p.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending
        p.material.needsUpdate = true
      }
    }
    setTheme()

    // ── Layout ─────────────────────────────────────────────────────────────
    const layout = { x: 0, y: 0, scale: 1 }
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      const halfW = halfH * camera.aspect
      if (camera.aspect >= 1) {
        layout.x = halfW * 0.46
        layout.y = -0.05
        layout.scale = Math.min(1, halfW / 3.6)
      } else {
        // Center the orb ~22% down the first screen (the canvas can be taller)
        layout.x = 0
        layout.y = halfH * (1 - (2 * 0.22 * window.innerHeight) / h)
        layout.scale = halfW * 0.42
      }
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    // ── Interaction state ──────────────────────────────────────────────────
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, energy: 0, lastX: 0, lastY: 0 }
    const onPointer = e => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.ty = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const intro = { v: reduce ? 1 : 0 }
    const pointerTarget = new THREE.Vector3()

    // ── Render loop (paused when off-screen or tab hidden) ─────────────────
    let visible = true
    let frame = 0
    let elapsed = 0
    let last = performance.now()
    const timeScale = reduce ? 0.15 : 1

    const render = now => {
      frame = requestAnimationFrame(render)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible) return
      elapsed += dt * timeScale
      const t = elapsed
      const progress = progressRef?.current ?? 0

      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06
      const speed = Math.hypot(pointer.tx - pointer.lastX, pointer.ty - pointer.lastY)
      pointer.lastX = pointer.tx
      pointer.lastY = pointer.ty
      pointer.energy += (Math.min(speed * 14, 1) - pointer.energy) * 0.04

      orbUniforms.uTime.value = t
      orbUniforms.uAmp.value = 0.26 + pointer.energy * 0.16 + progress * 0.3 + (1 - intro.v) * 0.7
      belt.material.uniforms.uTime.value = t
      field.material.uniforms.uTime.value = t
      belt.material.uniforms.uOpacity.value = intro.v * (1 - progress * 0.6)
      field.material.uniforms.uOpacity.value = intro.v * 0.85
      belt.material.uniforms.uSwirl.value = 1 + progress * 4

      // Bulge the orb toward wherever the pointer is
      root.updateMatrixWorld()
      pointerTarget.set(pointer.x * 4.5, pointer.y * 2.6, 2.2)
      orb.worldToLocal(pointerTarget).normalize()
      orbUniforms.uPointer.value.copy(pointerTarget)
      orbUniforms.uPointerStrength.value = 0.12 + pointer.energy * 0.35

      root.position.set(layout.x, layout.y + progress * 1.4, 0)
      root.scale.setScalar(layout.scale * (0.35 + 0.65 * intro.v) * (1 + progress * 0.25))
      root.rotation.y = t * 0.06 + pointer.x * 0.35
      root.rotation.x = -pointer.y * 0.22 + progress * 0.7
      orb.rotation.y = t * 0.1
      cage.rotation.set(t * 0.05, -t * 0.09, 0)
      rings.forEach(({ ring, satellite, radius, speed }, i) => {
        const a = t * speed + i * Math.PI
        satellite.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0)
        ring.rotation.z = t * speed * 0.2
      })
      belt.rotation.y = t * 0.04

      camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.05
      camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.05
      camera.position.z = 7 + progress * 2.2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(render)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(mount)
    const onVisibility = () => {
      last = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibility)

    api.current = {
      setTheme,
      intro: () => {
        if (reduce) return
        gsap.to(intro, { v: 1, duration: 2.6, ease: 'expo.out' })
      },
    }

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      gsap.killTweensOf(intro)
      scene.traverse(obj => {
        obj.geometry?.dispose()
        obj.material?.dispose()
      })
      cageShape.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
      api.current = null
    }
  }, [progressRef])

  useEffect(() => {
    api.current?.setTheme()
  }, [isDark])

  useEffect(() => {
    if (ready) api.current?.intro()
  }, [ready])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
}
