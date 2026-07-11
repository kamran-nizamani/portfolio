import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useIsMobile } from '../hooks/useIsMobile'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─── Circular Profile Image ────────────────────────────────────────── */
function ProfileImage() {
  const wrapRef  = useRef(null)
  const [tilt, setTilt]     = useState({ x: 0, y: 0 })
  const [imgOk, setImgOk]   = useState(true)

  const onMouseMove = useCallback((e) => {
    if (!wrapRef.current) return
    const r  = wrapRef.current.getBoundingClientRect()
    const cx = r.left + r.width  / 2
    const cy = r.top  + r.height / 2
    const rx = -((e.clientY - cy) / (r.height / 2)) * 9   // tilt up/down
    const ry =  ((e.clientX - cx) / (r.width  / 2)) * 9   // tilt left/right
    setTilt({ x: rx, y: ry })
  }, [])

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  return (
    /* Outer wrapper — controls float animation */
    <motion.div
      animate={{ y: [0, -16, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      /* sizing: responsive via Tailwind */
      className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[410px] lg:h-[410px] xl:w-[440px] xl:h-[440px]"
      style={{ perspective: '900px' }}
    >
      {/* Soft outer glow (static, behind everything) */}
      <div className="profile-glow" aria-hidden="true" />

      {/* Inner wrapper — controls mouse tilt */}
      <motion.div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Spinning gradient border ring */}
        <div className="profile-ring" aria-hidden="true" />

        {/* Glassmorphism frame — sits 3px inside the ring */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            inset: '3px',
            background: 'rgba(15,23,42,0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(0,229,255,0.12)',
          }}
        >
          {/* Profile photo — swap /profile.jpg for your own image */}
          {imgOk && (
            <img
              src="/profile.jpg"
              alt="Kamran Khan — AI & Full-Stack Developer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
              onError={() => setImgOk(false)}
            />
          )}

          {/* Fallback: elegant KK monogram shown when no photo exists */}
          {!imgOk && (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(129,140,248,0.1) 100%)',
              }}
              aria-label="Kamran Khan initials"
            >
              <span
                className="font-display font-bold text-brand leading-none select-none"
                style={{ fontSize: 'clamp(3rem, 12vw, 6.5rem)', textShadow: '0 0 40px rgba(0,229,255,0.5)' }}
              >
                KK
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">
                kamran.dev
              </span>
            </div>
          )}

          {/* Subtle inner cyan rim light */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(0,229,255,0.08)' }}
            aria-hidden="true"
          />
        </div>

        {/* Corner accent dots */}
        {[
          { top: '8%',  left: '8%'  },
          { top: '8%',  right: '8%' },
          { bottom: '8%', left: '8%'  },
          { bottom: '8%', right: '8%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-brand"
            style={{ ...pos, boxShadow: '0 0 6px rgba(0,229,255,0.8)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.4, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ─── Hero Section ──────────────────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef(null)
  const typed     = useTypewriter()
  const isMobile  = useIsMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    // The WebGL particle scene is skipped on mobile: Android Chrome has
    // well-known GPU compositing bugs that corrupt an alpha-blended canvas
    // layered under blurred/transformed content, showing up as static-like
    // banding. three.js is also dynamically imported so mobile never
    // downloads/parses its ~117KB gzipped bundle, keeping Lighthouse high.
    if (!canvas || isMobile) return

    let cancelled = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

      // Wireframe objects
      const torus = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32, 2, 3),
        new THREE.MeshBasicMaterial({ color: 0x06B6D4, wireframe: true, transparent: true, opacity: 0.09 })
      )
      scene.add(torus)

      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.8, 1),
        new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.07 })
      )
      scene.add(ico)

      // Particles
      const N   = 1200
      const pos = new Float32Array(N * 3)
      const col = new Float32Array(N * 3)
      const sz  = new Float32Array(N)
      for (let i = 0; i < N; i++) {
        const i3 = i * 3
        const r  = 3 + Math.random() * 9
        const t  = Math.random() * Math.PI * 2
        const p  = Math.acos(2 * Math.random() - 1)
        pos[i3]   = r * Math.sin(p) * Math.cos(t)
        pos[i3+1] = r * Math.sin(p) * Math.sin(t)
        pos[i3+2] = r * Math.cos(p)
        if (Math.random() > 0.72) {
          col[i3]=0.02; col[i3+1]=0.71; col[i3+2]=0.83
        } else {
          col[i3]=0.31; col[i3+1]=0.55; col[i3+2]=0.97
        }
        sz[i] = Math.random() * 1.2 + 0.2
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aColor',   new THREE.BufferAttribute(col, 3))
      geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1))

      const mat = new THREE.ShaderMaterial({
        vertexShader: `
          attribute float size; attribute vec3 aColor; varying vec3 vC;
          void main(){vC=aColor;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=size*(140./-mv.z);gl_Position=projectionMatrix*mv;}
        `,
        fragmentShader: `
          varying vec3 vC;
          void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(vC,(1.-smoothstep(0.,.5,d))*.45);}
        `,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      })
      scene.add(new THREE.Points(geo, mat))

      let mx=0, my=0, tx=0, ty=0
      const onMove = e => { tx=(e.clientX/window.innerWidth-.5)*2; ty=(e.clientY/window.innerHeight-.5)*2 }
      window.addEventListener('mousemove', onMove, { passive: true })

      let animId
      const animate = () => {
        animId = requestAnimationFrame(animate)
        mx+=(tx-mx)*0.04; my+=(ty-my)*0.04
        const t = performance.now() * 0.001
        torus.rotation.x = t*0.15+my*0.3
        torus.rotation.y = t*0.2 +mx*0.3
        torus.rotation.z = t*0.05
        ico.rotation.x   = -t*0.3+my*0.5
        ico.rotation.y   = t*0.4 +mx*0.5
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [isMobile])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden scanline"
      aria-label="Hero section"
    >
      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />

      {/* Background overlays */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(120deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.3) 100%)' }} />
      <div className="absolute bottom-0 left-0 w-full h-48 z-[1]"
        style={{ background: 'linear-gradient(to top, #0f172a, transparent)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(15,23,42,0.35)' }} />

      {/* ── Two-column content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 lg:py-0">
        {/*
          DOM order: [text-col, image-col]
          Mobile  (`flex-col-reverse`): image renders on TOP, text below  ✓
          Desktop (`lg:flex-row`):      text on LEFT, image on RIGHT       ✓
        */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* ── Left: text content ── */}
          <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16,1,0.3,1] }}
              className="mb-7 inline-flex items-center gap-2 glass rounded-full px-5 py-2.5"
            >
              <span className="relative w-2 h-2 rounded-full bg-green-500 pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-xs text-slate-400 tracking-wider">OPEN TO OPPORTUNITIES</span>
            </motion.div>

            {/* Greeting + Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-slate-400 font-light text-xl md:text-2xl mb-3 tracking-wide">Hello, I'm</p>
              <h1
                className="glitch text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-none glow-cyan"
                data-text="KAMRAN KHAN"
              >
                KAMRAN KHAN
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-5 mb-4 font-mono text-base md:text-lg text-slate-400"
            >
              <span className="text-brand mr-1">$</span>
              <span className="typing-cursor">{typed}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-slate-400 font-light leading-relaxed mb-9 text-sm md:text-base lg:text-[15px] max-w-lg mx-auto lg:mx-0"
            >
              AI & Data Enthusiast · Full-Stack Developer · Cybersecurity Researcher —
              building secure, intelligent, and high-performance software from{' '}
              <span className="text-brand font-medium">Sukkur, Pakistan</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(6,182,212,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('projects')}
                className="btn-primary w-full sm:w-auto"
                aria-label="View Projects"
              >
                View Projects <Icon icon="lucide:arrow-down" className="text-sm" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('contact')}
                className="btn-outline w-full sm:w-auto"
                aria-label="Get in Touch"
              >
                Get in Touch
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="#"
                className="btn-ghost w-full sm:w-auto"
                aria-label="Download Resume"
              >
                <Icon icon="lucide:download" className="text-sm" /> Resume
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex justify-center"
          >
            <ProfileImage />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '1.5px solid rgba(148,163,184,0.18)' }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-1 h-3 rounded-full bg-brand"
          />
        </div>
      </motion.div>
    </section>
  )
}
