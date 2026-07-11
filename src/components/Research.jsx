import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const PAPERS = [
  {
    id: 1,
    period: '2024 — Present',
    icon: 'lucide:brain',
    iconColor: 'text-brand',
    iconBg: 'rgba(6,182,212,0.1)',
    title: 'Mimicking Human Emotions Using AI',
    description:
      'Emotion simulation using NLP-based sentiment analysis to replicate human emotional responses in conversational AI systems.',
    points: [
      'Synthesized 20+ peer-reviewed papers on affective computing',
      'Developed emotion classification pipeline with Python & TensorFlow',
      'Exploring BERT & GPT variants for contextual emotion detection',
    ],
    tags: ['NLP', 'BERT', 'TensorFlow', 'GPT'],
    checkColor: 'text-brand',
  },
  {
    id: 2,
    period: '2024 — Present',
    icon: 'lucide:shield-check',
    iconColor: 'text-purple-400',
    iconBg: 'rgba(168,85,247,0.1)',
    title: 'AI-Based Deepfake Detection',
    description:
      'AI-driven deepfake detection to identify manipulated media using CNNs and Vision Transformers for cybersecurity.',
    points: [
      'Training CNNs & Vision Transformers for forgery detection',
      'Reviewing GAN-based forgery generation literature',
      'Evaluating robustness against adversarial attacks',
    ],
    tags: ['CNN', 'Vision Transformer', 'Deepfake', 'GANs'],
    checkColor: 'text-purple-400',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Research() {
  return (
    <section id="research" className="relative py-16 md:py-24 lg:py-32 px-6" aria-label="Research section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;research&gt;</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight">
            Research <span className="text-gradient">Papers</span>
          </motion.h2>
          <motion.p {...fadeUp(0.14)} className="text-slate-500 font-light mt-4 max-w-lg mx-auto text-[15px]">
            Supervised research at Sukkur IBA University
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAPERS.map((p, i) => (
            <motion.article
              key={p.id}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="gradient-border card rounded-xl overflow-hidden p-5 md:p-8 flex flex-col h-full transition-colors duration-300"
              style={{ '--hover-border': 'rgba(6,182,212,0.3)' }}
              aria-label={p.title}
            >
              {/* Header row */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: p.iconBg }}>
                  <Icon icon={p.icon} className={`${p.iconColor} text-2xl`} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-brand tracking-wider">{p.period}</p>
                  <p className="text-xs text-slate-500 mt-0.5">SUPERVISED RESEARCH</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-5">{p.description}</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {p.points.map(pt => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <Icon icon="lucide:check" className={`${p.checkColor} mt-0.5 flex-shrink-0 text-sm`} aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p {...fadeUp(0.3)} className="section-label text-center mt-16">&lt;/research&gt;</motion.p>
      </div>
    </section>
  )
}
