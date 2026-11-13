/**
 * Renders text as individually masked characters so GSAP can animate them.
 * Words wrapped in asterisks (e.g. "Selected *work*") render in the accent serif.
 * Screen readers get the plain sentence via aria-label.
 */
export function parseAccentWords(text) {
  let inAccent = false
  return text.split(' ').map(raw => {
    let word = raw
    const opens = word.startsWith('*')
    if (opens) {
      inAccent = true
      word = word.slice(1)
    }
    const accent = inAccent
    if (word.endsWith('*')) {
      inAccent = false
      word = word.slice(0, -1)
    }
    return { word, accent }
  })
}

export default function SplitText({ text, as: Tag = 'span', className, ...rest }) {
  const words = parseAccentWords(text)
  const label = words.map(w => w.word).join(' ')

  return (
    <Tag className={className} aria-label={label} {...rest}>
      {words.map(({ word, accent }, wi) => (
        <span key={wi}>
          <span className={`split-word${accent ? ' accent-serif' : ''}`} aria-hidden="true">
            {[...word].map((ch, ci) => (
              <span className="split-char" key={ci}>
                <span className="split-char-inner">{ch}</span>
              </span>
            ))}
          </span>
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
