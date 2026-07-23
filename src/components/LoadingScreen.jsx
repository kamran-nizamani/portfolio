import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MESSAGES = [
  { at: 0,  text: 'initializing kamran.dev' },
  { at: 8,  text: 'connecting to GitHub API' },
  { at: 16, text: 'compiling components' },
  { at: 24, text: 'loading AI engine modules' },
  { at: 32, text: 'fetching live contribution stats' },
  { at: 40, text: 'rendering 3D environment' },
  { at: 48, text: 'syncing project repositories' },
  { at: 56, text: 'optimizing assets & animations' },
  { at: 64, text: 'calibrating world clock timezones' },
  { at: 72, text: 'establishing secure connection' },
  { at: 80, text: 'warming up animations' },
  { at: 88, text: 'finalizing render pipeline' },
  { at: 95, text: 'polishing pixels' },
  { at: 100, text: 'ready — welcome' },
]

function currentMessage(progress) {
  let m = MESSAGES[0]
  for (const msg of MESSAGES) {
    if (progress >= msg.at) m = msg
  }
  return m.text
}

function useParticles(count = 34) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 6 + 5,
        delay: Math.random() * 5,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [canSkip, setCanSkip] = useState(false)
  const [finishing, setFinishing] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const doneRef = useRef(false)
  const particles = useParticles()

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const duration = reducedMotion ? 1200 : 15000

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      cancelAnimationFrame(rafRef.current)
      setProgress(100)
      setFinishing(true)
      setTimeout(() => onComplete?.(), 550)
    }

    const tick = (now) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const frac = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - frac, 3)
      setProgress(Math.round(eased * 100))
      if (frac >= 1) {
        finish()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const skipTimer = setTimeout(() => setCanSkip(true), 2000)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(skipTimer)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  const handleSkip = () => {
    if (doneRef.current) return
    doneRef.current = true
    cancelAnimationFrame(rafRef.current)
    setProgress(100)
    setFinishing(true)
    setTimeout(() => onComplete?.(), 400)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#0f172a' }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Background gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(129,140,248,0.08) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Particle field */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                bottom: '-10px',
                width: p.size,
                height: p.size,
                background: '#06B6D4',
                boxShadow: '0 0 6px rgba(6,182,212,0.8)',
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: '-100vh', x: p.drift, opacity: [0, 0.7, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      )}

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
        aria-hidden="true"
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-24 h-24 mb-8"
        >
          <div className="profile-ring" style={{ animationDuration: '3s' }} aria-hidden="true" />
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: '4px',
              background: 'rgba(15,23,42,0.7)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(0,229,255,0.15)',
            }}
          >
            <span
              className="font-display font-bold text-gradient text-3xl select-none"
              style={{ textShadow: '0 0 30px rgba(0,229,255,0.5)' }}
            >
              KK
            </span>
          </div>
        </motion.div>

        {/* Percentage */}
        <div className="font-display text-5xl sm:text-6xl font-semibold text-white tabular-nums mb-2" aria-hidden="true">
          {progress}
          <span className="text-brand text-3xl align-top">%</span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1 rounded-full overflow-hidden mb-5"
          style={{ background: 'rgba(148,163,184,0.1)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #06B6D4, #818cf8)',
              boxShadow: '0 0 12px rgba(6,182,212,0.6)',
            }}
          />
        </div>

        {/* Terminal status line */}
        <div className="font-mono text-xs sm:text-[13px] text-slate-400 h-5 flex items-center gap-1.5">
          <span className="text-brand">$</span>
          <span className="typing-cursor">{currentMessage(progress)}</span>
        </div>
      </div>

      {/* Skip button */}
      {canSkip && !finishing && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSkip}
          className="absolute bottom-8 right-8 font-mono text-[11px] tracking-widest uppercase text-slate-500 hover:text-brand transition-colors px-4 py-2 rounded-full"
          style={{ border: '1px solid rgba(148,163,184,0.15)' }}
          aria-label="Skip loading animation"
        >
          Skip →
        </motion.button>
      )}
    </motion.div>
  )
}
