import { useRef } from 'react'
import { useMagnetic } from '@/lib/hooks'

export function ArrowIcon({ size = 14, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Pill button that leans toward the cursor, fills from below on hover and
 * rolls its label. `children` must be a plain string (it's duplicated for the roll).
 */
export default function MagneticButton({ href, children, variant = 'primary', arrow = true, className = '', ...rest }) {
  const ref = useRef(null)
  useMagnetic(ref, 0.3)
  const external = href?.startsWith('http')

  return (
    <a
      ref={ref}
      href={href}
      className={`btn btn-${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-text">
        <span data-text={children}>{children}</span>
      </span>
      {arrow && <ArrowIcon className="btn-arrow" />}
    </a>
  )
}
