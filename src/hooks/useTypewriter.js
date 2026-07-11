import { useState, useEffect } from 'react'

const PHRASES = [
  'AI Engineer',
  'Full Stack Developer',
  'Cybersecurity Researcher',
  'React Developer',
  'Python Developer',
]

export function useTypewriter() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timer

    if (!deleting && charIdx < phrase.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), 75)
    } else if (!deleting && charIdx === phrase.length) {
      timer = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), 38)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % PHRASES.length)
    }

    setText(phrase.substring(0, charIdx))
    return () => clearTimeout(timer)
  }, [charIdx, deleting, phraseIdx])

  return text
}
