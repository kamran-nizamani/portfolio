import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useIsMobile } from '../hooks/useIsMobile'

const STATS = [
  { target: 5,  label: 'Projects',  suffix: '+' },
  { target: 2,  label: 'Research',  suffix: ''  },
  { target: 5,  label: 'Certs',     suffix: '+' },
]

const LINKS = [
  { href: 'https://github.com/kamran-nizamani',   icon: 'lucide:github',  label: 'GitHub'   },
  { href: 'https://linkedin.com/in/kamran-nizamani', icon: 'mdi:linkedin', label: 'LinkedIn' },
  { href: 'https://kamrandev.me',                 icon: 'lucide:globe',   label: 'Website'  },
]

function Counter({ target, suffix, active }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let n = 0
    const step = target / 50
    const id = setInterval(() => {
      n += step
      if (n >= target) { setCount(target); clearInterval(id) }
      else setCount(Math.floor(n))
    }, 28)
    return () => clearInterval(id)
  }, [active, target])
  return <>{count}{suffix}</>
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function About() {
  const canvasRef = useRef(null)
  const statsRef  = useRef(null)
  const statsView = useInView(statsRef, { once: true, amount: 0.5 })
  const isMobile  = useIsMobile()

  useEffect(() => {
    const c = canvasRef.current
    // Skipped on mobile — same Android Chrome WebGL/alpha-canvas
    // compositing bug as the Hero background. three.js is dynamically
    // imported so mobile never downloads its bundle either.
    if (!c || isMobile) return

    let cancelled = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (cancelled) return

      const p = c.parentElement
      const w = p.clientWidth, h = p.clientHeight

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, w/h, 0.1, 100)
      camera.position.z = 4

      const renderer = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

      const group = new THREE.Group()
      scene.add(group)

      const geos = [
        new THREE.OctahedronGeometry(0.5),
        new THREE.TetrahedronGeometry(0.4),
        new THREE.BoxGeometry(0.35, 0.35, 0.35),
        new THREE.DodecahedronGeometry(0.3),
        new THREE.IcosahedronGeometry(0.35),
        new THREE.ConeGeometry(0.25, 0.5, 6),
      ]
      const meshes = geos.map((g, i) => {
        const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x06B6D4 : 0x818cf8,
          wireframe: true, transparent: true, opacity: 0.28,
        }))
        const a = (i / geos.length) * Math.PI * 2
        const r = 1.2 + Math.random() * 0.4
        m.position.set(Math.cos(a)*r, (Math.random()-.5)*1.4, Math.sin(a)*r)
        m.userData = { sp: 0.3+Math.random()*0.4, of: Math.random()*Math.PI*2 }
        group.add(m)
        return m
      })

      let id
      const animate = () => {
        id = requestAnimationFrame(animate)
        const t = performance.now() * 0.001
        meshes.forEach(m => {
          m.rotation.x = t * m.userData.sp * 0.5
          m.rotation.y = t * m.userData.sp
          m.position.y += Math.sin(t * m.userData.sp + m.userData.of) * 0.002
        })
        group.rotation.y = t * 0.08
        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => cancelAnimationFrame(id)
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [isMobile])

  return (
    <section id="about" className="relative py-16 md:py-24 lg:py-32 px-6" aria-label="About section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">

          {/* 3D canvas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto rounded-2xl overflow-hidden relative card">
              <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

              {/* KK avatar overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
                <div className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.22)', backdropFilter: 'blur(8px)' }}>
                  <span className="text-4xl font-semibold text-brand">KK</span>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-5 left-5 glass rounded-xl px-3 py-2 float" style={{ zIndex: 2 }}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:graduation-cap" className="text-brand text-sm" />
                  <span className="font-mono text-[11px] text-white">Sukkur IBA</span>
                </div>
              </div>
              <div className="absolute bottom-5 right-5 glass rounded-xl px-3 py-2 float-delay" style={{ zIndex: 2 }}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:file-text" className="text-yellow-400 text-sm" />
                  <span className="font-mono text-[11px] text-white">2 Research Papers</span>
                </div>
              </div>
              <div className="absolute top-5 right-5 glass rounded-xl px-3 py-2 float hidden sm:flex" style={{ zIndex: 2 }}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:folder-git-2" className="text-green-400 text-sm" />
                  <span className="font-mono text-[11px] text-white">5+ Projects</span>
                </div>
              </div>

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: '1px solid rgba(148,163,184,0.07)' }} />
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;about&gt;</motion.p>

            <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Building the{' '}
              <span className="text-gradient">Future of AI & Web</span>
            </motion.h2>

            <motion.p {...fadeUp(0.14)} className="text-slate-400 font-light leading-relaxed mb-5 text-[15px]">
              Results-driven Computer Science student at{' '}
              <strong className="text-white font-medium">Sukkur IBA University</strong>, specializing
              in AI, data analysis, and full-stack web development. Experienced in engineering scalable
              web applications and extracting actionable insights from complex datasets.
            </motion.p>

            <motion.p {...fadeUp(0.2)} className="text-slate-400 font-light leading-relaxed mb-10 text-[15px]">
              Currently authoring supervised research papers on{' '}
              <strong className="text-white font-medium">mimicking human emotions using NLP</strong> and{' '}
              <strong className="text-white font-medium">AI-based deepfake detection</strong>.
            </motion.p>

            {/* Stats */}
            <motion.div {...fadeUp(0.26)} ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10">
              {STATS.map(({ target, label, suffix }) => (
                <div key={label} className="card p-3 sm:p-5 rounded-xl text-center">
                  <div className="text-xl sm:text-3xl font-semibold text-white mb-1 font-display">
                    <Counter target={target} suffix={suffix} active={statsView} />
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-slate-500 tracking-wide sm:tracking-widest">{label.toUpperCase()}</div>
                </div>
              ))}
            </motion.div>

            {/* Links */}
            <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-5">
              {LINKS.map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-light text-sm font-medium tracking-wider uppercase transition-colors group"
                  whileHover={{ x: 3 }}
                  aria-label={`Visit ${label}`}
                >
                  <Icon icon={icon} className="text-sm" />
                  {label}
                  <Icon icon="lucide:arrow-up-right" className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              ))}
            </motion.div>

            <motion.p {...fadeUp(0.38)} className="section-label mt-8">&lt;/about&gt;</motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
