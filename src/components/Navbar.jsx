import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

const LINKS = [
  { href: 'about',           label: 'About' },
  { href: 'research',        label: 'Research' },
  { href: 'open-source',     label: 'Open Source' },
  { href: 'projects',        label: 'Projects' },
  { href: 'skills',          label: 'Skills' },
  { href: 'education',       label: 'Education' },
  { href: 'certifications',  label: 'Certifications' },
  { href: 'contact',         label: 'Contact' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const ids = LINKS.map(l => l.href)
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActive(ids[i])
          break
        }
      }
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Close the menu first, then scroll once it has collapsed (scrolling while it animates shut was dropped on phones).
  const goFromMenu = (id) => {
    setOpen(false)
    setTimeout(() => scrollTo(id), 350)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || open ? 'glass-dark' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <div
            className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center font-mono font-bold text-lg text-white group-hover:scale-110 transition-transform duration-300"
            style={{ boxShadow: '0 0 18px rgba(6,182,212,0.45)' }}
          >
            K
          </div>
          <span className="font-mono text-sm text-slate-300 hidden sm:block lg:hidden xl:block group-hover:text-brand transition-colors">
            kamran.dev
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Main navigation">
          {LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`relative whitespace-nowrap text-[13px] xl:text-sm font-medium tracking-wide uppercase transition-colors duration-200 py-2 focus-visible:outline-none focus-visible:text-brand ${
                active === href ? 'text-brand' : 'text-slate-300 hover:text-white'
              }`}
              aria-current={active === href ? 'page' : undefined}
            >
              {label}
              {active === href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute bottom-0.5 left-0 w-full h-px bg-brand"
                  style={{ boxShadow: '0 0 8px rgba(6,182,212,0.8)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(6,182,212,0.35)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('contact')}
            className="btn-primary hidden sm:inline-flex whitespace-nowrap"
            style={{ padding: '10px 22px', fontSize: '12px' }}
          >
            Hire Me <Icon icon="lucide:arrow-right" className="text-sm" />
          </motion.button>
          <button
            className="lg:hidden text-slate-300 hover:text-white w-11 h-11 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Icon icon={open ? 'lucide:x' : 'lucide:menu'} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-dark overflow-y-auto overscroll-contain border-t border-white/5 max-h-[calc(100dvh-5rem)]"
          >
            <nav className="px-6 py-5 flex flex-col gap-1" aria-label="Mobile navigation">
              {LINKS.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => goFromMenu(href)}
                  className={`text-left px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium tracking-wide uppercase transition-colors ${
                    active === href
                      ? 'text-brand bg-brand/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => goFromMenu('contact')}
                className="btn-primary sm:hidden mt-3 justify-center whitespace-nowrap"
                style={{ padding: '12px 22px', fontSize: '13px' }}
              >
                Hire Me <Icon icon="lucide:arrow-right" className="text-sm" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
