import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

const INFO = [
  { icon: 'lucide:mail',    label: 'EMAIL',    value: 'kamrannizamani35@gmail.com', href: 'mailto:kamrannizamani35@gmail.com' },
  { icon: 'lucide:phone',   label: 'PHONE',    value: '+92 325 8313573',            href: 'tel:+923258313573'                 },
  { icon: 'lucide:map-pin', label: 'LOCATION', value: 'Sukkur, Pakistan',           href: null                               },
]

const SOCIALS = [
  { icon: 'lucide:github', href: 'https://github.com/kamran-nizamani',      label: 'GitHub'   },
  { icon: 'mdi:linkedin',  href: 'https://linkedin.com/in/kamran-nizamani', label: 'LinkedIn' },
  { icon: 'lucide:globe',  href: 'https://kamrandev.me',                    label: 'Website'  },
  { icon: 'lucide:mail',   href: 'mailto:kamrannizamani35@gmail.com',        label: 'Email'    },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Contact() {
  const [status, setStatus] = useState(null) // 'sent' | null
  const formRef = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sent')
    formRef.current?.reset()
    setTimeout(() => setStatus(null), 4500)
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 px-6" aria-label="Contact section">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;contact&gt;</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight">
            Let's <span className="text-gradient">Connect</span>
          </motion.h2>
          <motion.p {...fadeUp(0.14)} className="text-slate-500 font-light mt-4 max-w-xl mx-auto text-[15px]">
            Have a project, collaboration, or research opportunity? I'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-10">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 space-y-4"
          >
            {INFO.map(({ icon, label, value, href }) => {
              const Wrapper = href ? 'a' : 'div'
              return (
                <motion.div key={label} whileHover={{ x: 4 }}>
                  <Wrapper
                    {...(href ? { href, target: label === 'EMAIL' ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                    className="glass rounded-xl p-5 block transition-colors hover:border-brand/20"
                    style={{ border: '1px solid rgba(148,163,184,0.08)' }}
                    aria-label={`${label}: ${value}`}
                  >
                    <Icon icon={icon} className="text-brand text-xl mb-3" aria-hidden="true" />
                    <p className="font-mono text-[10px] text-slate-500 tracking-widest mb-1">{label}</p>
                    <p className="text-sm text-white break-words">{value}</p>
                  </Wrapper>
                </motion.div>
              )
            })}

            {/* Socials */}
            <div className="flex gap-2.5 pt-2">
              {SOCIALS.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, boxShadow: '0 0 18px rgba(6,182,212,0.3)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-brand transition-colors"
                  aria-label={label}
                >
                  <Icon icon={icon} className="text-lg" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="font-mono text-xs text-slate-500 tracking-widest block mb-2">NAME</label>
                  <input
                    id="name" type="text" required placeholder="Your name"
                    className="w-full rounded-xl px-4 py-3.5 text-sm transition-colors"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-xs text-slate-500 tracking-widest block mb-2">EMAIL</label>
                  <input
                    id="email" type="email" required placeholder="your@email.com"
                    className="w-full rounded-xl px-4 py-3.5 text-sm transition-colors"
                    aria-required="true"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="font-mono text-xs text-slate-500 tracking-widest block mb-2">SUBJECT</label>
                <input
                  id="subject" type="text" required placeholder="Project / Research / Opportunity"
                  className="w-full rounded-xl px-4 py-3.5 text-sm transition-colors"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-xs text-slate-500 tracking-widest block mb-2">MESSAGE</label>
                <textarea
                  id="message" rows={5} required placeholder="Tell me about your idea..."
                  className="w-full rounded-xl px-4 py-3.5 text-sm resize-none transition-colors"
                  aria-required="true"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6,182,212,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full sm:w-auto"
                aria-label="Send message"
              >
                Send Message <Icon icon="lucide:send" className="text-sm" aria-hidden="true" />
              </motion.button>
            </form>

            {/* Toast */}
            <AnimatePresence>
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-5 glass rounded-xl px-5 py-4 flex items-center gap-3"
                  role="status"
                  aria-live="polite"
                >
                  <Icon icon="lucide:check-circle" className="text-green-400 text-xl flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-slate-300">Message sent! I'll get back to you soon, InshaAllah.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.p {...fadeUp(0.4)} className="section-label text-center mt-16">&lt;/contact&gt;</motion.p>
      </div>
    </section>
  )
}
