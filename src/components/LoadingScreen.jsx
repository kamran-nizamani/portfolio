import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const BG = '#0f172a'
const NAME = 'KAMRAN KHAN'
const RING_R = 54
const RING_C = 2 * Math.PI * RING_R

// Short, honest loader: a fixed ~2.4s intro (it never fakes work), then a split-curtain reveal.
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [canSkip, setCanSkip] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const rafRef = useRef(0)
  const doneRef = useRef(false)

  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const duration = reduced ? 500 : 2400

  const leave = () => {
    if (doneRef.current) return
    doneRef.current = true
    cancelAnimationFrame(rafRef.current)
    setProgress(100)
    setLeaving(true)
    setTimeout(() => onComplete?.(), reduced ? 150 : 850)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    let start = null
    const tick = (now) => {
      if (start === null) start = now
      const frac = Math.min(1, (now - start) / duration)
      setProgress(Math.round((1 - Math.pow(1 - frac, 3)) * 100))
      if (frac < 1) rafRef.current = requestAnimationFrame(tick)
      else if (document.readyState === 'complete') leave()
      else window.addEventListener('load', leave, { once: true })
    }
    rafRef.current = requestAnimationFrame(tick)
    const skipTimer = setTimeout(() => setCanSkip(true), 700)
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(skipTimer)
      window.removeEventListener('load', leave)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  const ease = [0.76, 0, 0.24, 1]
  const curtain = { duration: 0.75, ease }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Split curtain: two halves that slide away on exit */}
      <motion.div
        className="absolute left-0 top-0 w-full h-1/2"
        style={{ background: BG }}
        animate={{ y: leaving && !reduced ? '-100%' : 0 }}
        transition={curtain}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-0 bottom-0 w-full h-1/2"
        style={{ background: BG }}
        animate={{ y: leaving && !reduced ? '100%' : 0 }}
        transition={curtain}
        aria-hidden="true"
      />
      {reduced && (
        <motion.div
          className="absolute inset-0"
          style={{ background: BG }}
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          aria-hidden="true"
        />
      )}

      {/* Soft theme glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(6,182,212,0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(129,140,248,0.10) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -12 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Monogram with progress ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8">
          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
            <defs>
              <linearGradient id="ld-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r={RING_R} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="2" />
            <circle
              cx="60" cy="60" r={RING_R} fill="none" stroke="url(#ld-grad)" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - progress / 100)}
              style={{ filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.6))' }}
            />
          </svg>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-3 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(0,229,255,0.12)' }}
          >
            <span className="font-display font-bold text-gradient text-3xl sm:text-4xl select-none">KK</span>
          </motion.div>
        </div>

        {/* Name, revealed letter by letter */}
        <h1
          className="font-display font-semibold text-white tracking-[0.18em] text-xl sm:text-2xl flex"
          aria-label="Kamran Khan"
        >
          {NAME.split('').map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={ch === ' ' ? 'w-3 sm:w-4' : ''}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-slate-400 text-center"
        >
          AI &amp; Full-Stack Developer
        </motion.p>

        {/* Counter */}
        <div className="mt-10 font-mono text-xs text-slate-500 tabular-nums tracking-widest" aria-hidden="true">
          {String(progress).padStart(3, '0')}
          <span className="text-brand">%</span>
        </div>
      </motion.div>

      {/* Skip */}
      {canSkip && !leaving && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={leave}
          className="absolute z-20 bottom-6 right-6 sm:bottom-8 sm:right-8 font-mono text-[11px] tracking-widest uppercase text-slate-500 hover:text-brand focus-visible:text-brand transition-colors px-4 py-2.5 rounded-full"
          style={{ border: '1px solid rgba(148,163,184,0.15)' }}
          aria-label="Skip loading animation"
        >
          Skip →
        </motion.button>
      )}
    </motion.div>
  )
}
