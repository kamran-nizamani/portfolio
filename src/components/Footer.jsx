import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function Footer() {
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-mono font-bold text-xs text-white"
            style={{ boxShadow: '0 0 12px rgba(6,182,212,0.35)' }}
            aria-hidden="true"
          >
            K
          </div>
          <span className="font-mono text-xs text-slate-500">
            Designed & Built by{' '}
            <span className="text-slate-400">Kamran Khan</span> © 2026
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: 'lucide:github', href: 'https://github.com/kamran-nizamani',       label: 'GitHub'   },
            { icon: 'mdi:linkedin',  href: 'https://linkedin.com/in/kamran-nizamani',  label: 'LinkedIn' },
            { icon: 'lucide:globe',  href: 'https://kamrandev.me',                     label: 'Website'  },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, color: '#06B6D4' }}
              className="text-slate-600 hover:text-brand transition-colors"
              aria-label={label}
            >
              <Icon icon={icon} className="text-lg" aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        <p className="font-mono text-[10px] text-slate-700 tracking-widest hidden md:block" aria-hidden="true">
          &lt;/body&gt; &lt;/html&gt;
        </p>
      </div>
    </footer>
  )
}
