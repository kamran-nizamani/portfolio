import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const SKILLS = [
  { label: 'Python / AI & ML',             level: 92, icon: 'logos:python',       color: '#06B6D4' },
  { label: 'JavaScript / React / Next.js',  level: 90, icon: 'logos:react',         color: '#38bdf8' },
  { label: 'NLP / Sentiment Analysis',      level: 88, icon: 'lucide:brain',        color: '#818cf8' },
  { label: 'Node.js / MySQL / REST APIs',   level: 85, icon: 'logos:nodejs-icon',   color: '#06B6D4' },
  { label: 'Java / C++ / DSA',              level: 80, icon: 'lucide:cpu',          color: '#38bdf8' },
  { label: 'Cybersecurity / Ethical Hacking', level: 75, icon: 'lucide:shield',    color: '#818cf8' },
]

const TOOLS = [
  { icon: 'logos:react',       label: 'React'      },
  { icon: 'logos:nextjs-icon', label: 'Next.js'    },
  { icon: 'logos:python',      label: 'Python'     },
  { icon: 'logos:tensorflow',  label: 'TensorFlow' },
  { icon: 'logos:nodejs-icon', label: 'Node.js'    },
  { icon: 'logos:mysql',       label: 'MySQL'      },
  { icon: 'logos:git-icon',    label: 'Git'        },
  { icon: 'logos:linux-tux',   label: 'Linux'      },
  { icon: 'logos:docker-icon', label: 'Docker'     },
  { icon: 'logos:aws',         label: 'AWS'        },
  { icon: 'logos:github-actions', label: 'GitHub Actions' },
  { icon: 'logos:vercel-icon', label: 'Vercel'     },
  { icon: 'logos:mongodb-icon', label: 'MongoDB'   },
  { icon: 'logos:postgresql',  label: 'PostgreSQL' },
]

const CERTS = [
  'AI for Data Analysis — Google Career Certificates',
  'Foundations of Data Science — Google Career Certificates',
  'Foundations of Cybersecurity — Google Cybersecurity Certificate',
  'Play It Safe: Manage Security Risks — Google Cybersecurity Certificate',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Skills() {
  return (
    <section id="skills" className="relative py-16 md:py-24 lg:py-32 px-6 overflow-hidden" aria-label="Skills section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;skills&gt;</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight">
            Tech <span className="text-gradient">Arsenal</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Skill cards (replacing progress bars) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, boxShadow: `0 0 28px ${s.color}22` }}
                className="card rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 cursor-default"
                style={{ '--glow': s.color }}
                role="listitem"
                aria-label={`${s.label}: ${s.level}%`}
              >
                <div className="flex items-center justify-between">
                  <Icon icon={s.icon} className="text-2xl" aria-hidden="true" />
                  <span className="font-mono text-xs font-medium" style={{ color: s.color }}>{s.level}%</span>
                </div>
                <p className="font-mono text-xs text-slate-300 leading-snug">{s.label}</p>
                {/* Mini progress bar */}
                <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.07 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, ${s.color}, #818cf8)` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Toolkit + Certifications */}
          <div className="space-y-10">

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-xs text-slate-500 tracking-widest mb-4">TOOLKIT</p>
              <div className="flex flex-wrap gap-3" role="list" aria-label="Technologies">
                {TOOLS.map(t => (
                  <motion.div
                    key={t.label}
                    whileHover={{ y: -3, boxShadow: '0 0 18px rgba(6,182,212,0.2)' }}
                    className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 cursor-default transition-all duration-300"
                    role="listitem"
                    aria-label={t.label}
                  >
                    <Icon icon={t.icon} className="text-lg" aria-hidden="true" />
                    <span className="font-mono text-[11px] text-slate-400">{t.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-xs text-slate-500 tracking-widest mb-4">CERTIFICATIONS</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list" aria-label="Certifications">
                {CERTS.map((cert, i) => (
                  <motion.div
                    key={cert}
                    whileHover={{ x: 4, borderColor: 'rgba(6,182,212,0.3)' }}
                    className={`glass rounded-xl p-3.5 flex items-start gap-3 transition-all duration-300 ${
                      i === CERTS.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                    role="listitem"
                  >
                    <Icon icon="lucide:award" className="text-brand mt-0.5 flex-shrink-0 text-sm" aria-hidden="true" />
                    <span className="text-xs text-slate-400 leading-snug">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p {...fadeUp(0.3)} className="section-label text-center mt-16">&lt;/skills&gt;</motion.p>
      </div>
    </section>
  )
}
