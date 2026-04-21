export default function Footer() {
  return (
    <footer
      style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(0,229,160,0.08)',
        fontFamily: "'Space Mono'",
        fontSize: '11px',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
      }}
    >
      DESIGNED & BUILT BY G O ASHWIN PRAVEEN · {new Date().getFullYear()}
    </footer>
  )
}
