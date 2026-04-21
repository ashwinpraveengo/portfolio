export function SectionLabel({ children, centered }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: centered ? 'center' : 'flex-start',
      }}
    >
      <div
        style={{
          height: '1px',
          background: 'var(--accent)',
          width: '30px',
          opacity: 0.5,
        }}
      />
      <span
        style={{
          fontFamily: "'Space Mono'",
          fontSize: '11px',
          color: 'var(--accent)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
      {centered && (
        <div
          style={{
            height: '1px',
            background: 'var(--accent)',
            width: '30px',
            opacity: 0.5,
          }}
        />
      )}
    </div>
  )
}
