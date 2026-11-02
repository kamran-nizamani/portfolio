import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const BG = '#0f172a'
const NAME = 'KAMRAN KHAN'
const DURATION = 15000 // ms of intro before the reveal (Skip is always available)
// The particle cloud morphs through these marks, one per act (3s each).
const SHAPES = ['KK', '</>', 'AI', '{ }', 'KK']
const STAGE_MS = DURATION / SHAPES.length
// Real titles from the site (same ones as the hero typewriter).
const LABELS = [
  'AI & Full-Stack Developer',
  'Full Stack Developer',
  'AI Engineer',
  'Cybersecurity Researcher',
  'Python · React · Node.js',
]

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

/* ─── Particle monogram ──────────────────────────────────────────────────
   Thousands of particles start scattered on a wide spiral, then converge
   into the "KK" monogram (targets sampled from real text pixels). The
   pointer/touch pushes them away, a light sweep runs across once formed,
   and on exit they burst outward while the curtain splits open.        */
function ParticleMark({ phase, onProgress, onStage }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = wrap.clientWidth
    const H = wrap.clientHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    // 1) Sample target points for every shape from real text pixels.
    const off = document.createElement('canvas')
    off.width = W
    off.height = H
    const octx = off.getContext('2d', { willReadFrequently: true })
    const family = getComputedStyle(document.body).fontFamily || 'sans-serif'
    const step = 3
    const sample = (str) => {
      octx.clearRect(0, 0, W, H)
      let size = H * 0.95
      octx.font = `800 ${size}px ${family}`
      const tw = octx.measureText(str).width
      if (tw > W * 0.96) { size *= (W * 0.96) / tw; octx.font = `800 ${size}px ${family}` }
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#fff'
      octx.fillText(str, W / 2, H / 2 + size * 0.04)
      const d = octx.getImageData(0, 0, W, H).data
      const out = []
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (d[(y * W + x) * 4 + 3] > 128) out.push([x + (Math.random() - 0.5) * step, y + (Math.random() - 0.5) * step])
        }
      }
      return out
    }
    const sets = SHAPES.map(sample)
    const N = Math.min(2600, Math.max(...sets.map((a) => a.length)))
    // Same particle count for every shape: shuffle, then cycle to length N.
    const targets = sets.map((arr) => {
      const a = arr.slice().sort(() => Math.random() - 0.5)
      return Array.from({ length: N }, (_, i) => a[i % a.length])
    })

    // 2) Particles: enter on a wide spiral, then morph shape to shape.
    const parts = Array.from({ length: N }, (_, i) => {
      const a = Math.random() * Math.PI * 2
      const r = Math.max(W, H) * (0.6 + Math.random() * 1.4)
      return {
        i,
        sx: W / 2 + Math.cos(a) * r,
        sy: H / 2 + Math.sin(a) * r,
        a,
        delay: Math.random() * 0.45,
        mdelay: Math.random() * 380, // stagger so each morph ripples
        x: W / 2, y: H / 2, vx: 0, vy: 0,
        size: 0.9 + Math.random() * 1.1,
        hue: Math.random(),
        stage: 0,
      }
    })

    const ptr = { x: -9999, y: -9999 }
    const move = (e) => {
      const rc = canvas.getBoundingClientRect()
      const p = e.touches ? e.touches[0] : e
      ptr.x = p.clientX - rc.left
      ptr.y = p.clientY - rc.top
    }
    const leave = () => { ptr.x = ptr.y = -9999 }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)

    let raf = 0
    let t0 = null
    let burstAt = null
    let lastStage = -1
    const ASSEMBLE = 2100
    const tick = (now) => {
      if (t0 === null) t0 = now
      const el = now - t0
      onProgress?.(Math.min(1, el / DURATION))
      const stage = Math.min(SHAPES.length - 1, Math.floor(el / STAGE_MS))
      if (stage !== lastStage) {
        lastStage = stage
        onStage?.(stage)
        if (stage > 0) {
          // morph: scatter outward a little, then each particle springs to its new spot
          for (const p of parts) {
            const ang = Math.random() * Math.PI * 2
            const sp = 3 + Math.random() * 6
            p.vx += Math.cos(ang) * sp
            p.vy += Math.sin(ang) * sp
          }
        }
      }
      const bursting = phaseRef.current === 'leaving'
      if (bursting && burstAt === null) {
        burstAt = now
        for (const p of parts) {
          const ang = Math.atan2(p.y - H / 2, p.x - W / 2) + (Math.random() - 0.5) * 0.6
          const sp = 5 + Math.random() * 11
          p.vx = Math.cos(ang) * sp
          p.vy = Math.sin(ang) * sp
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const sinceStage = el - stage * STAGE_MS
      const sweep = ((sinceStage - 1500) / 900) * (W + 120) - 60 // light sweep late in each act
      const fade = bursting ? Math.max(0, 1 - (now - burstAt) / 650) : 1

      for (const p of parts) {
        if (bursting) {
          p.x += p.vx; p.y += p.vy
          p.vx *= 0.985; p.vy *= 0.985
        } else if (el < ASSEMBLE) {
          // act 1 entrance: spiral unwinds as particles converge
          const [tx, ty] = targets[0][p.i]
          const k = Math.min(1, Math.max(0, (el / ASSEMBLE - p.delay) / (1 - p.delay)))
          const e = easeOutExpo(k)
          const swirl = (1 - e) * 1.6
          const ca = Math.cos(swirl), sa = Math.sin(swirl)
          const dx = p.sx - W / 2, dy = p.sy - H / 2
          const bx = W / 2 + dx * ca - dy * sa
          const by = H / 2 + dx * sa + dy * ca
          p.x = bx + (tx - bx) * e
          p.y = by + (ty - by) * e
        } else {
          // settled / morphing: spring to current shape, staggered, with pointer repel
          const [tx, ty] = targets[stage][p.i]
          const active = el - ASSEMBLE > 0 && (stage === 0 || sinceStage > p.mdelay)
          if (active) { p.vx += (tx - p.x) * 0.045; p.vy += (ty - p.y) * 0.045 }
          const dxp = p.x - ptr.x, dyp = p.y - ptr.y
          const d2 = dxp * dxp + dyp * dyp
          if (d2 < 4900) {
            const d = Math.sqrt(d2) || 1
            const f = (70 - d) / 70
            p.vx += (dxp / d) * f * 2.2
            p.vy += (dyp / d) * f * 2.2
          }
          p.vx *= 0.84; p.vy *= 0.84
          p.x += p.vx + Math.sin(now / 700 + p.a) * 0.12
          p.y += p.vy
        }
        const lit = Math.max(0, 1 - Math.abs(p.x - sweep) / 55)
        const base = 0.55 + lit * 0.45
        const m = Math.min(1, Math.max(0, p.x / W))
        const r = Math.round(6 + (129 - 6) * m * (0.6 + p.hue * 0.4))
        const g = Math.round(182 + (140 - 182) * m)
        const b = Math.round(212 + (248 - 212) * m)
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, base) * fade})`
        const sz = p.size * (1 + lit * 0.9)
        ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={wrapRef} className="relative w-[min(78vw,340px)] h-[min(48vw,210px)] sm:w-[460px] sm:h-[270px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [canSkip, setCanSkip] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [stage, setStage] = useState(0)
  const doneRef = useRef(false)
  const gateRef = useRef(false)

  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const leave = () => {
    if (doneRef.current) return
    doneRef.current = true
    setProgress(100)
    setLeaving(true)
    setTimeout(() => onComplete?.(), reduced ? 150 : 1000)
  }

  const onProgress = (f) => {
    const pct = Math.round(f * 100)
    setProgress((p) => (pct > p ? pct : p))
    if (f >= 1 && !gateRef.current) {
      gateRef.current = true
      if (document.readyState === 'complete') leave()
      else window.addEventListener('load', leave, { once: true })
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    let raf = 0
    let start = null
    if (reduced) {
      // Reduced motion: no particles, a short static intro.
      const tick = (now) => {
        if (start === null) start = now
        const f = Math.min(1, (now - start) / 500)
        onProgress(f)
        if (f < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const skipTimer = setTimeout(() => setCanSkip(true), 700)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(skipTimer)
      window.removeEventListener('load', leave)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const curtain = { duration: 0.8, delay: 0.25, ease: [0.76, 0, 0.24, 1] }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Split curtain: two halves slide away on exit */}
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

      {/* Theme glow + faint grid (same palette as the site) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 42%, rgba(6,182,212,0.16) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(129,140,248,0.10) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.06 : 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {reduced ? (
          <div className="font-display font-bold text-gradient text-7xl select-none h-[210px] flex items-center">KK</div>
        ) : (
          <ParticleMark phase={leaving ? 'leaving' : 'intro'} onProgress={onProgress} onStage={setStage} />
        )}

        <h1
          className="mt-6 font-display font-semibold text-white tracking-[0.18em] text-lg sm:text-2xl flex"
          aria-label="Kamran Khan"
        >
          {NAME.split('').map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.7 + i * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={ch === ' ' ? 'w-3 sm:w-4' : ''}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <div className="mt-3 h-5 relative w-full flex justify-center" aria-hidden="true">
          <motion.p
            key={stage}
            initial={reduced ? false : { opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: stage === 0 ? 2.4 : 0.5, duration: 0.6 }}
            className="absolute font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-slate-400 text-center whitespace-nowrap"
          >
            {LABELS[stage]}
          </motion.p>
        </div>

        {/* Thin progress line + counter */}
        <div className="mt-9 w-48 sm:w-60" aria-hidden="true">
          <div className="h-px w-full" style={{ background: 'rgba(148,163,184,0.15)' }}>
            <div
              className="h-px"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #06B6D4, #818cf8)',
                boxShadow: '0 0 10px rgba(6,182,212,0.7)',
              }}
            />
          </div>
          <div className="mt-3 text-center font-mono text-[11px] text-slate-500 tabular-nums tracking-widest">
            {String(progress).padStart(3, '0')}
            <span className="text-brand">%</span>
          </div>
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
