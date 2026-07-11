import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const TIMELINE = [
  {
    id: 1,
    period: '2023 — 2027 (Expected)',
    icon: 'lucide:graduation-cap',
    title: 'B.S. Computer Science',
    subtitle: 'Sukkur IBA University — Sukkur, Pakistan',
    tags: ['Data Structures', 'DBMS', 'Machine Learning', 'Web Engineering', 'Cybersecurity'],
    side: 'left',
  },
  {
    id: 2,
    period: 'Continuous Learning',
    icon: 'lucide:award',
    title: '5+ Technical Certifications',
    subtitle: 'Online Platforms',
    desc: 'AI, data analysis, cybersecurity, and full-stack web development across global platforms.',
    side: 'right',
  },
]

export default function Education() {
  return (
    <section id="education" className="relative py-16 md:py-24 lg:py-32 px-6" aria-label="Education section">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            &lt;education&gt;
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight"
          >
            Academic <span className="text-gradient">Background</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #06B6D4, #06B6D4, transparent)' }}
            aria-hidden="true"
          />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row md:items-start ${i < TIMELINE.length - 1 ? 'mb-14' : 'mb-4'}`}
            >
              {/* Left side */}
              {item.side === 'left' ? (
                <>
                  <div className="md:w-1/2 md:pr-14 md:text-right pl-12 pr-4 md:pl-0 md:pr-0">
                    <p className="font-mono text-[10px] text-brand tracking-widest mb-2">{item.period}</p>
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{item.subtitle}</p>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {item.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                  <TimelineDot icon={item.icon} />
                  <div className="md:w-1/2 md:pl-14 hidden md:block" />
                </>
              ) : (
                <>
                  <div className="md:w-1/2 md:pr-14 hidden md:block" />
                  <TimelineDot icon={item.icon} />
                  <div className="md:w-1/2 md:pl-14 pl-12">
                    <p className="font-mono text-[10px] text-brand tracking-widest mb-2">{item.period}</p>
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-3">{item.subtitle}</p>
                    {item.desc && <p className="text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="section-label text-center mt-8"
        >
          &lt;/education&gt;
        </motion.p>
      </div>
    </section>
  )
}

function TimelineDot({ icon }) {
  return (
    <div
      className="absolute left-1.5 md:static md:left-auto md:translate-x-0 flex-shrink-0 w-5 h-5 rounded-full bg-brand flex items-center justify-center md:mt-1"
      style={{ boxShadow: '0 0 12px rgba(6,182,212,0.5)', border: '3px solid #0f172a' }}
      aria-hidden="true"
    >
      <span className="sr-only"><Icon icon={icon} /></span>
    </div>
  )
}
