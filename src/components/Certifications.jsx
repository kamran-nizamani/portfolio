import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPLETED = [
  {
    id: 'c1',
    title: 'AI for Data Analysis',
    provider: 'Google',
    platform: 'Google Career Certificates',
    tags: ['google', 'ai'],
    icon: 'logos:google',
    accent: '#06B6D4',
    year: '2024',
    completionDate: 'June 2024',
    skills: ['Prompt Engineering', 'Data Cleaning', 'AI-Assisted Analysis', 'Spreadsheets'],
    image: '/certs/c1.jpg',
    url: null,
  },
  {
    id: 'c2',
    title: 'Foundations of Data Science',
    provider: 'Google',
    platform: 'Google Career Certificates',
    tags: ['google'],
    icon: 'logos:google',
    accent: '#0056D3',
    year: '2024',
    completionDate: 'April 2024',
    skills: ['Statistics', 'Data Visualization', 'Python', 'SQL'],
    image: '/certs/c2.jpg',
    url: null,
  },
  {
    id: 'c3',
    title: 'Foundations of Cybersecurity',
    provider: 'Google',
    platform: 'Google Cybersecurity Certificate',
    tags: ['google', 'cybersecurity'],
    icon: 'logos:google',
    accent: '#818cf8',
    year: '2024',
    completionDate: 'February 2024',
    skills: ['Security Frameworks', 'Threat Landscape', 'Network Security', 'Linux'],
    image: '/certs/c3.jpg',
    url: null,
  },
  {
    id: 'c4',
    title: 'Play It Safe: Manage Security Risks',
    provider: 'Google',
    platform: 'Google Cybersecurity Certificate',
    tags: ['google', 'cybersecurity'],
    icon: 'logos:google',
    accent: '#818cf8',
    year: '2024',
    completionDate: 'March 2024',
    skills: ['Risk Management', 'SIEM Tools', 'Incident Response', 'Security Controls'],
    image: '/certs/c4.jpg',
    url: null,
  },
]

const IN_PROGRESS = [
  {
    id: 'p1',
    title: 'Google IT Support Professional Certificate',
    provider: 'Google',
    platform: 'Coursera',
    tags: ['google'],
    icon: 'logos:google',
    accent: '#06B6D4',
    courses: [
      { title: 'Technical Support Fundamentals',                     progress: 85 },
      { title: 'The Bits and Bytes of Computer Networking',          progress: 70 },
      { title: 'Operating Systems and You: Becoming a Power User',   progress: 55 },
      { title: 'System Administration and IT Infrastructure Services', progress: 30 },
      { title: 'IT Security: Defense Against the Digital Dark Arts', progress: 10 },
    ],
  },
  {
    id: 'p2',
    title: 'Google AI Essentials',
    provider: 'Google',
    platform: 'Google Career Certificates',
    tags: ['google', 'ai'],
    icon: 'logos:google',
    accent: '#38bdf8',
    courses: [
      { title: 'AI Fundamentals',                   progress: 90 },
      { title: 'AI for Brainstorming and Planning', progress: 75 },
      { title: 'AI for Research and Insights',      progress: 60 },
      { title: 'AI for Writing and Communicating',  progress: 45 },
      { title: 'AI for Content Creation',           progress: 25 },
      { title: 'AI for App Building',               progress: 15 },
    ],
  },
  {
    id: 'p3',
    title: 'Google Cybersecurity Professional Certificate',
    provider: 'Google',
    platform: 'Coursera',
    tags: ['google', 'cybersecurity'],
    icon: 'logos:google',
    accent: '#818cf8',
    courses: [
      { title: 'Connect and Protect: Networks and Network Security', progress: 80 },
      { title: 'Tools of the Trade: Linux and SQL',                  progress: 65 },
      { title: 'Assets, Threats and Vulnerabilities',               progress: 45 },
      { title: 'Detection and Response',                            progress: 30 },
      { title: 'Automate Cybersecurity Tasks with Python',          progress: 15 },
      { title: 'Prepare for Cybersecurity Jobs',                    progress:  5 },
    ],
  },
  {
    id: 'p4',
    title: 'Google Career Development & AI Tools',
    provider: 'Google',
    platform: 'Google Career Certificates',
    tags: ['google', 'ai'],
    icon: 'logos:google',
    accent: '#c084fc',
    courses: [
      { title: 'Foundations of Digital Marketing & E-commerce',     progress: 70 },
      { title: 'Prompting Essentials',                              progress: 85 },
      { title: 'Design Prompts for Everyday Work Tasks',            progress: 60 },
      { title: 'Speed Up Data Analysis & Presentation Building',    progress: 40 },
      { title: 'Use AI as a Creative or Expert Partner',            progress: 25 },
    ],
  },
]

const FILTERS = [
  { id: 'all',           label: 'All',           icon: 'lucide:layout-grid' },
  { id: 'completed',     label: 'Completed',     icon: 'lucide:check-circle' },
  { id: 'in-progress',   label: 'In Progress',   icon: 'lucide:loader' },
  { id: 'google',        label: 'Google',        icon: 'lucide:globe' },
  { id: 'ai',            label: 'AI',            icon: 'lucide:brain' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: 'lucide:shield' },
]

const TIMELINE = [
  {
    period: '2023',
    title: 'Started CS Degree',
    detail: 'Enrolled at Sukkur IBA University — B.S. Computer Science',
    icon: 'lucide:graduation-cap',
    color: '#06B6D4',
  },
  {
    period: '2024 Q1',
    title: 'Security Foundations',
    detail: 'Completed Cybersecurity & Security Risk Management modules',
    icon: 'lucide:shield-check',
    color: '#818cf8',
  },
  {
    period: '2024 Q2',
    title: 'AI & Data Science',
    detail: 'Earned AI for Data Analysis & Data Science certifications',
    icon: 'lucide:brain',
    color: '#38bdf8',
  },
  {
    period: '2024 Q3',
    title: 'Full-Stack Engineering',
    detail: 'Mastered React, Node.js & MySQL — launched Prepioneer',
    icon: 'lucide:code-2',
    color: '#06B6D4',
  },
  {
    period: '2025',
    title: 'AI Research & Publishing',
    detail: 'Authored papers on NLP emotion simulation & deepfake detection',
    icon: 'lucide:file-text',
    color: '#c084fc',
  },
  {
    period: '2026+',
    title: 'Continuous Growth',
    detail: 'Advancing in AI, cloud infrastructure & ethical hacking',
    icon: 'lucide:rocket',
    color: '#06B6D4',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avg = courses =>
  Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

// ─── AnimatedNumber ───────────────────────────────────────────────────────────

function AnimatedNumber({ target, active }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let cur = 0
    const step = target / 40
    const id = setInterval(() => {
      cur += step
      if (cur >= target) { setN(target); clearInterval(id) }
      else setN(Math.floor(cur))
    }, 28)
    return () => clearInterval(id)
  }, [active, target])
  return (
    <span className="text-2xl sm:text-3xl font-semibold text-white font-display">{n}</span>
  )
}

// ─── CompletedCard (3D flip card) ──────────────────────────────────────────────

function CompletedCard({ cert, delay }) {
  const [flipped, setFlipped] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="flip-card-scene h-[300px]"
    >
      <div
        className={`flip-card-inner ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(f => !f) } }}
        aria-label={`${cert.title} certificate — press to flip`}
        aria-pressed={flipped}
      >
        {/* ── Front face: certificate preview ── */}
        <div
          className="flip-card-face gradient-border card rounded-xl overflow-hidden flex flex-col cursor-pointer"
          style={{ boxShadow: `0 16px 40px ${cert.accent}18` }}
        >
          {/* Preview art */}
          <div className="relative h-[150px] flex-shrink-0 overflow-hidden">
            {imgOk && (
              <img
                src={cert.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
                onError={() => setImgOk(false)}
              />
            )}
            {!imgOk && (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${cert.accent}22, rgba(15,23,42,0.9))` }}
              >
                <Icon icon={cert.icon} className="text-5xl opacity-70" aria-hidden="true" />
              </div>
            )}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 55%)' }}
              aria-hidden="true"
            />
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <Icon icon="lucide:check-circle" className="text-green-400 text-[11px]" aria-hidden="true" />
              <span className="font-mono text-[9px] text-green-400 tracking-wider">DONE</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col gap-1.5">
            <h3 className="text-sm font-semibold text-white leading-snug">{cert.title}</h3>
            <p className="font-mono text-[10px] text-slate-500 tracking-wide">{cert.platform}</p>
            <div className="flex items-center gap-1.5 mt-auto pt-2">
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{ background: `${cert.accent}14`, color: cert.accent, border: `1px solid ${cert.accent}20` }}
              >
                {cert.provider}
              </span>
              <span className="font-mono text-[9px] text-slate-700 ml-auto flex items-center gap-1">
                <Icon icon="lucide:rotate-3d" className="text-[10px]" aria-hidden="true" />
                flip
              </span>
            </div>
          </div>
        </div>

        {/* ── Back face: details ── */}
        <div
          className="flip-card-face flip-card-face--back gradient-border card rounded-xl p-5 flex flex-col gap-3 cursor-pointer"
          style={{ boxShadow: `0 16px 40px ${cert.accent}18` }}
        >
          <div className="flex items-start justify-between gap-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${cert.accent}18`, border: `1px solid ${cert.accent}28` }}
            >
              <Icon icon={cert.icon} className="text-base" aria-hidden="true" />
            </div>
            <Icon icon="lucide:x" className="text-slate-600 text-sm mt-1" aria-hidden="true" />
          </div>

          <h3 className="text-sm font-semibold text-white leading-snug">{cert.title}</h3>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
            <Icon icon="lucide:calendar-check" className="text-xs" style={{ color: cert.accent }} aria-hidden="true" />
            Completed {cert.completionDate}
          </div>

          <div className="flex-1 min-h-0">
            <p className="font-mono text-[9px] text-slate-600 tracking-widest uppercase mb-2">Skills Learned</p>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map(skill => (
                <span
                  key={skill}
                  className="font-mono text-[9px] px-2 py-1 rounded-full"
                  style={{ background: `${cert.accent}12`, color: cert.accent, border: `1px solid ${cert.accent}22` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <motion.a
            href={cert.url ?? '#'}
            target={cert.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            whileHover={{ x: 3 }}
            onClick={e => { e.stopPropagation(); if (!cert.url) e.preventDefault() }}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-brand hover:text-brand-light transition-colors group mt-auto"
            aria-label={`View ${cert.title} certificate`}
          >
            <Icon icon="lucide:external-link" className="text-xs" />
            View Certificate
            <Icon
              icon="lucide:arrow-right"
              className="text-[10px] group-hover:translate-x-0.5 transition-transform"
            />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── InProgressCard ───────────────────────────────────────────────────────────

function InProgressCard({ group, delay }) {
  const [open, setOpen] = useState(false)
  const overall = avg(group.courses)
  const completed = group.courses.filter(c => c.progress === 100).length

  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -4 }}
      className="gradient-border card rounded-xl p-5 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden"
    >
      {/* Subtle top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${group.accent}60, transparent)` }}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${group.accent}18`, border: `1px solid ${group.accent}28` }}
        >
          <Icon icon={group.icon} className="text-base" aria-hidden="true" />
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 flex-shrink-0"
          style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.18)' }}
        >
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full block"
            style={{ background: group.accent }}
            aria-hidden="true"
          />
          <span className="font-mono text-[9px] text-brand tracking-wider">IN PROGRESS</span>
        </div>
      </div>

      {/* Title + meta */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-white leading-snug">{group.title}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded-full"
            style={{ background: `${group.accent}14`, color: group.accent, border: `1px solid ${group.accent}20` }}
          >
            {group.provider}
          </span>
          <span className="font-mono text-[9px] text-slate-600">{group.platform}</span>
          <span className="font-mono text-[9px] text-slate-600">·</span>
          <span className="font-mono text-[9px] text-slate-600">{group.courses.length} courses</span>
        </div>
      </div>

      {/* Overall progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[9px] text-slate-600 tracking-wider uppercase">
            Overall Progress
          </span>
          <span className="font-mono text-xs font-semibold" style={{ color: group.accent }}>
            {overall}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${overall}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${group.accent}, #818cf8)` }}
          />
        </div>
        <p className="font-mono text-[9px] text-slate-700 mt-1.5">
          {completed} of {group.courses.length} courses completed
        </p>
      </div>

      {/* Expandable course list */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="space-y-3 pt-1 pb-1 pl-3"
              style={{ borderLeft: `1px solid ${group.accent}25` }}
            >
              {group.courses.map((c, i) => (
                <div key={c.title}>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[11px] text-slate-400 leading-snug flex-1">{c.title}</span>
                    <span className="font-mono text-[10px] flex-shrink-0" style={{ color: group.accent }}>
                      {c.progress}%
                    </span>
                  </div>
                  <div
                    className="h-px rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.progress}%` }}
                      transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: `${group.accent}90` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-brand transition-colors self-start"
        aria-expanded={open}
      >
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <Icon icon="lucide:chevron-down" className="text-xs" />
        </motion.span>
        {open ? 'Hide courses' : `Expand ${group.courses.length} courses`}
      </button>
    </motion.div>
  )
}

// ─── LearningTimeline ─────────────────────────────────────────────────────────

function LearningTimeline() {
  return (
    <div
      className="mt-14 pt-10"
      style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
    >
      <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-10">
        <Icon icon="lucide:git-branch" className="text-brand text-sm" aria-hidden="true" />
        <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">
          Learning Timeline
        </span>
      </motion.div>

      <div className="relative">
        {/* Horizontal connector — desktop only */}
        <div
          className="hidden lg:block absolute top-5 left-[20px] right-[20px] h-px z-0"
          style={{
            background:
              'linear-gradient(to right, transparent, #06B6D4 15%, #818cf8 85%, transparent)',
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex lg:flex-col gap-4 lg:gap-3 lg:items-center lg:text-center"
            >
              {/* Vertical connector — mobile/tablet */}
              {i < TIMELINE.length - 1 && (
                <div
                  className="lg:hidden absolute left-5 top-10 bottom-[-24px] w-px z-0"
                  style={{
                    background: `linear-gradient(to bottom, ${item.color}50, transparent)`,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Node dot */}
              <motion.div
                whileHover={{
                  scale: 1.18,
                  boxShadow: `0 0 24px ${item.color}55`,
                }}
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center cursor-default transition-shadow duration-300"
                style={{
                  background: `${item.color}16`,
                  border: `1.5px solid ${item.color}45`,
                  boxShadow: `0 0 10px ${item.color}20`,
                }}
                aria-hidden="true"
              >
                <Icon icon={item.icon} className="text-sm" style={{ color: item.color }} />
              </motion.div>

              {/* Text */}
              <div className="flex-1 lg:flex-none min-w-0">
                <p
                  className="font-mono text-[10px] tracking-wider mb-1"
                  style={{ color: item.color }}
                >
                  {item.period}
                </p>
                <p className="text-xs font-semibold text-white leading-snug mb-1">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 font-light leading-snug">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Certifications() {
  const [filter, setFilter] = useState('all')
  const statsRef  = useRef(null)
  const statsView = useInView(statsRef, { once: true, amount: 0.5 })

  const matchFilter = (tags, status) => {
    if (filter === 'all')           return true
    if (filter === 'completed')     return status === 'completed'
    if (filter === 'in-progress')   return status === 'in-progress'
    return tags.includes(filter)
  }

  const visibleCompleted   = COMPLETED.filter(c  => matchFilter(c.tags,  'completed'))
  const visibleInProgress  = IN_PROGRESS.filter(g => matchFilter(g.tags, 'in-progress'))
  const showCompleted      = visibleCompleted.length > 0
  const showInProgress     = visibleInProgress.length > 0
  const showEmpty          = !showCompleted && !showInProgress

  const totalPrograms  = COMPLETED.length + IN_PROGRESS.length
  const totalCompleted = COMPLETED.length
  const totalProgress  = IN_PROGRESS.length

  return (
    <section
      id="certifications"
      className="relative py-16 md:py-24 lg:py-32 px-6"
      aria-label="Certifications section"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12 md:mb-14">
          <motion.p {...fadeUp(0)} className="section-label mb-4">
            &lt;certifications&gt;
          </motion.p>
          <motion.h2
            {...fadeUp(0.08)}
            className="text-3xl md:text-5xl font-semibold tracking-tight"
          >
            Certifications &amp;{' '}
            <span className="text-gradient">Professional Learning</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.14)}
            className="text-slate-500 font-light mt-4 max-w-xl mx-auto text-[15px]"
          >
            Continuous upskilling across AI, cybersecurity, and full-stack development.
          </motion.p>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          {...fadeUp(0.2)}
          ref={statsRef}
          className="grid grid-cols-3 gap-2 sm:gap-5 mb-10"
        >
          {[
            { target: totalPrograms,  label: 'Programs',    icon: 'lucide:folder-open',  color: '#06B6D4' },
            { target: totalCompleted, label: 'Completed',   icon: 'lucide:check-circle', color: '#22c55e' },
            { target: totalProgress,  label: 'In Progress', icon: 'lucide:clock',        color: '#818cf8' },
          ].map(({ target, label, icon, color }) => (
            <div key={label} className="card rounded-xl p-4 sm:p-6 text-center">
              <Icon
                icon={icon}
                className="text-xl sm:text-2xl mb-2 mx-auto block"
                style={{ color }}
                aria-hidden="true"
              />
              <AnimatedNumber target={target} active={statsView} />
              <p className="font-mono text-[9px] sm:text-[10px] text-slate-500 tracking-widest mt-1">
                {label.toUpperCase()}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          {...fadeUp(0.26)}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter certifications"
        >
          {FILTERS.map(f => (
            <motion.button
              key={f.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(f.id)}
              role="tab"
              aria-selected={filter === f.id}
              className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                filter === f.id
                  ? 'bg-brand text-white border-brand'
                  : 'border-white/8 text-slate-500 hover:border-brand/40 hover:text-slate-300'
              }`}
              style={filter === f.id ? { boxShadow: '0 0 18px rgba(6,182,212,0.35)' } : {}}
            >
              <Icon icon={f.icon} className="text-xs" aria-hidden="true" />
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Empty state ── */}
        <AnimatePresence>
          {showEmpty && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="text-center py-16"
            >
              <Icon
                icon="lucide:search-x"
                className="text-slate-700 text-4xl mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="text-slate-600 font-mono text-xs tracking-wider">
                No certifications match this filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Completed section ── */}
        <AnimatePresence mode="wait">
          {showCompleted && (
            <motion.div
              key={`completed-${filter}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              {/* Section label */}
              <div className="flex items-center gap-2 mb-5">
                <Icon
                  icon="lucide:check-circle"
                  className="text-green-400 text-sm"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] text-slate-500 tracking-widest">
                  COMPLETED CERTIFICATIONS — {visibleCompleted.length}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {visibleCompleted.map((cert, i) => (
                  <CompletedCard key={cert.id} cert={cert} delay={i * 0.07} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── In Progress section ── */}
        <AnimatePresence mode="wait">
          {showInProgress && (
            <motion.div
              key={`progress-${filter}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section label */}
              <div className="flex items-center gap-2 mb-5">
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 rounded-full block bg-brand"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] text-slate-500 tracking-widest">
                  IN PROGRESS — {visibleInProgress.length}{' '}
                  {visibleInProgress.length === 1 ? 'PROGRAM' : 'PROGRAMS'}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibleInProgress.map((group, i) => (
                  <InProgressCard key={group.id} group={group} delay={i * 0.09} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Learning Timeline ── */}
        <LearningTimeline />

        <motion.p {...fadeUp(0.3)} className="section-label text-center mt-12">
          &lt;/certifications&gt;
        </motion.p>
      </div>
    </section>
  )
}
