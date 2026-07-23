import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

function ProjectThumb({ project }) {
  const [imgOk, setImgOk] = useState(true)

  if (imgOk && project.image) {
    return (
      <img
        src={project.image}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        onError={() => setImgOk(false)}
      />
    )
  }

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${project.bg} flex items-center justify-center`}>
      <Icon
        icon={project.icon}
        className={`text-[120px] ${project.iconColor} group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 pointer-events-none`}
        aria-hidden="true"
      />
      <div className="absolute bottom-4 right-4 opacity-40 pointer-events-none">
        <Icon icon={project.accentIcon} className={`text-3xl ${project.accentColor}`} aria-hidden="true" />
      </div>
    </div>
  )
}

const FILTERS = [
  { id: 'all',       label: 'All'       },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'ai',        label: 'AI/ML'     },
  { id: 'tools',     label: 'Dev Tools' },
]

const PROJECTS = [
  {
    id: 1,
    category: 'fullstack',
    badge: 'FULL-STACK',
    badgeColor: 'text-brand',
    title: 'Smart Exam Prep',
    description: 'Exam preparation platform with automated scheduling and topic-prioritization engine.',
    features: [
      'Adaptive scheduling engine ranks topics by weakness',
      'Progress dashboard with per-subject analytics',
      'Role-based access for students & instructors',
    ],
    tags: ['React', 'MySQL', 'Node.js'],
    icon: 'lucide:graduation-cap',
    image: '/projects/1.jpg',
    bg: 'from-blue-950 via-indigo-950 to-slate-950',
    iconColor: 'text-blue-400/25',
    accentIcon: 'lucide:calendar-check',
    accentColor: 'text-blue-300',
    github: 'https://github.com/kamran-nizamani/Smart_Exam_Prep',
    featured: false,
  },
  {
    id: 2,
    category: 'fullstack',
    badge: 'LIVE APP',
    badgeColor: 'text-cyan-400',
    title: 'Prepioneer',
    description: 'Production-grade learning platform with CI/CD via Vercel and iterated UI/UX.',
    features: [
      'Automated CI/CD pipeline with zero-downtime deploys',
      'Iterated UI/UX driven by real user session data',
      'Optimized for sub-1s Lighthouse performance scores',
    ],
    tags: ['React', 'Vercel', 'CI/CD'],
    icon: 'lucide:rocket',
    image: '/projects/2.jpg',
    bg: 'from-violet-950 via-purple-950 to-slate-950',
    iconColor: 'text-violet-400/25',
    accentIcon: 'lucide:external-link',
    accentColor: 'text-violet-300',
    github: 'https://github.com/kamran-nizamani/prepioneer-demo',
    live: 'https://kamrandev.me',
    featured: true,
  },
  {
    id: 3,
    category: 'ai',
    badge: 'AI/ML',
    badgeColor: 'text-green-400',
    title: 'AI Crop Disease Detection',
    description: 'CNN trained on 10,000+ leaf images with a lightweight inference API for real-world deployment.',
    features: [
      'CNN model trained on 10,000+ labeled leaf images',
      'Lightweight REST inference API for mobile/edge use',
      '94%+ classification accuracy across 12 disease classes',
    ],
    tags: ['TensorFlow', 'CNN', 'Python'],
    icon: 'lucide:brain',
    image: '/projects/3.jpg',
    bg: 'from-emerald-950 via-green-950 to-slate-950',
    iconColor: 'text-emerald-400/25',
    accentIcon: 'lucide:leaf',
    accentColor: 'text-emerald-300',
    github: 'https://github.com/kamran-nizamani',
    featured: true,
  },
  {
    id: 4,
    category: 'tools',
    badge: 'OPEN SOURCE',
    badgeColor: 'text-purple-400',
    title: 'Next.js Boilerplate',
    description: 'Production-ready starter with ESLint, Prettier, modular structure, and best practices.',
    features: [
      'Pre-configured ESLint + Prettier + Husky hooks',
      'Modular folder structure ready to scale',
      'Dark-mode-first Tailwind design system',
    ],
    tags: ['Next.js', 'ESLint', 'Prettier'],
    icon: 'lucide:code-2',
    image: '/projects/4.jpg',
    bg: 'from-slate-900 via-zinc-900 to-slate-950',
    iconColor: 'text-slate-400/15',
    accentIcon: 'lucide:package',
    accentColor: 'text-purple-300',
    github: 'https://github.com/kamran-nizamani',
    featured: false,
  },
  {
    id: 5,
    category: 'fullstack',
    badge: 'AI TOOL',
    badgeColor: 'text-yellow-400',
    title: 'PromptBank',
    description: 'Centralized AI prompt management system with tagging, search, and team collaboration.',
    features: [
      'Full-text search & tagging across saved prompts',
      'Real-time team collaboration with shared workspaces',
      'REST API for programmatic prompt retrieval',
    ],
    tags: ['React', 'Node.js', 'REST API'],
    icon: 'lucide:sparkles',
    image: '/projects/5.jpg',
    bg: 'from-amber-950 via-orange-950 to-slate-950',
    iconColor: 'text-amber-400/25',
    accentIcon: 'lucide:message-square',
    accentColor: 'text-amber-300',
    github: 'https://github.com/kamran-nizamani/PromptBank',
    featured: false,
  },
  {
    id: 6,
    category: 'tools',
    badge: 'DEV TOOL',
    badgeColor: 'text-teal-400',
    title: 'World Clock',
    description: 'Responsive multi-timezone clock with digital & analog views, search, and persistent local storage.',
    features: [
      '34+ timezones with live digital & analog displays',
      'Search, add & persist timezones via localStorage',
      'One-click copy-to-clipboard for any selected time',
    ],
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    icon: 'lucide:globe',
    bg: 'from-sky-950 via-cyan-950 to-slate-950',
    iconColor: 'text-sky-400/25',
    accentIcon: 'lucide:clock-4',
    accentColor: 'text-sky-300',
    github: 'https://github.com/kamran-nizamani/world-clock',
    featured: false,
  },
  {
    id: 7,
    category: 'fullstack',
    badge: 'LIVE APP',
    badgeColor: 'text-cyan-400',
    title: 'AutoBugFix (BugFlow AI)',
    description: 'AI bug-detection & project-management platform with Kanban triage, OWASP-style code scanning, and Gemini-powered diagnostics.',
    features: [
      'AI-powered bug triage with severity & root-cause classification',
      'Kanban issue board across triage → diagnostics → QA → resolved',
      'AI code scanner, sprint planner, and multi-tenant org/team roles',
    ],
    tags: ['React', 'Express', 'Gemini AI'],
    icon: 'lucide:bug',
    bg: 'from-rose-950 via-red-950 to-slate-950',
    iconColor: 'text-rose-400/25',
    accentIcon: 'lucide:sparkles',
    accentColor: 'text-rose-300',
    github: 'https://github.com/kamran-nizamani/AutoBugFix',
    live: 'https://auto-bug-fix-one.vercel.app',
    featured: true,
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = PROJECTS.filter(p => active === 'all' || p.category === active)

  return (
    <section id="projects" className="relative py-16 md:py-24 lg:py-32 px-6" aria-label="Projects section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;projects&gt;</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight">
            Featured <span className="text-gradient">Work</span>
          </motion.h2>
        </div>

        {/* Filter */}
        <motion.div {...fadeUp(0.14)} className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Filter projects">
          {FILTERS.map(f => (
            <motion.button
              key={f.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActive(f.id)}
              role="tab"
              aria-selected={active === f.id}
              className={`font-mono text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                active === f.id
                  ? 'bg-brand text-white border-brand'
                  : 'border-white/8 text-slate-500 hover:border-brand/40 hover:text-slate-300'
              }`}
              style={active === f.id ? { boxShadow: '0 0 18px rgba(6,182,212,0.35)' } : {}}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        {/* relative: required by AnimatePresence mode="popLayout" — it pulls
            exiting cards into position:absolute, which needs a positioned
            parent or they render relative to a distant ancestor and overlap
            the remaining cards during filter transitions. */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className={`gradient-border card rounded-xl overflow-hidden group relative ${
                  p.featured ? 'ring-1 ring-brand/40' : ''
                }`}
                style={p.featured ? { boxShadow: '0 0 40px rgba(6,182,212,0.12)' } : {}}
                aria-label={p.title}
              >
                {/* Featured ribbon */}
                {p.featured && (
                  <div
                    className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{ background: 'rgba(6,182,212,0.16)', border: '1px solid rgba(6,182,212,0.35)', backdropFilter: 'blur(6px)' }}
                  >
                    <Icon icon="lucide:star" className="text-brand text-[11px]" aria-hidden="true" />
                    <span className="font-mono text-[9px] text-brand tracking-wider">FEATURED</span>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <ProjectThumb project={p} />
                  {/* Overlay */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.5) 50%, transparent 100%)' }} />
                  <div className="absolute top-4 left-4">
                    <span className="glass font-mono text-[10px] tracking-wider px-3 py-1 rounded-full" style={{ color: p.badgeColor.replace('text-', '') }}>
                      <span className={p.badgeColor}>{p.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-2 group-hover:text-brand transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-4">{p.description}</p>

                  {p.features?.length > 0 && (
                    <ul className="space-y-1.5 mb-5">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-slate-400 leading-snug">
                          <Icon icon="lucide:check" className="text-brand mt-0.5 flex-shrink-0 text-[11px]" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.a
                      whileHover={{ x: 3 }}
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand transition-colors"
                      aria-label={`View ${p.title} on GitHub`}
                    >
                      <Icon icon="lucide:github" className="text-base" /> Code
                    </motion.a>
                    {p.live && (
                      <motion.a
                        whileHover={{ x: 3 }}
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand transition-colors"
                        aria-label={`Visit ${p.title} live`}
                      >
                        <Icon icon="lucide:external-link" className="text-base" /> Live
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <motion.p {...fadeUp(0.3)} className="section-label text-center mt-16">&lt;/projects&gt;</motion.p>
      </div>
    </section>
  )
}
