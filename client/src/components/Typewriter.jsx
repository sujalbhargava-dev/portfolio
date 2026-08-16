import { useState, useEffect } from 'react'

export default function Typewriter({ phrases, typingSpeed = 75, deletingSpeed = 38, pauseTime = 2200 }) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextChar = charIndex + 1
        setText(currentPhrase.slice(0, nextChar))
        setCharIndex(nextChar)
        if (nextChar === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
          return
        }
      } else {
        const nextChar = charIndex - 1
        setText(currentPhrase.slice(0, nextChar))
        setCharIndex(nextChar)
        if (nextChar === 0) {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime])

  return <span>{text}</span>
}
