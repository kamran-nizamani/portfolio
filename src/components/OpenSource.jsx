import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const CONTRIBUTIONS = [
  {
    id: 1,
    repo: 'huggingface/transformers',
    icon: 'simple-icons:huggingface',
    iconColor: 'text-yellow-400',
    iconBg: 'rgba(250,204,21,0.1)',
    title: 'feat(pipelines): accept numpy arrays and tensors in ImageClassificationPipeline',
    description:
      'Extended ImageClassificationPipeline.preprocess() to accept NumPy arrays and PyTorch tensors directly, removing a PIL.Image-only bottleneck.',
    status: 'Merged',
    statusColor: 'text-green-400',
    url: 'https://github.com/huggingface/transformers/pull/39607',
    prLabel: '#39607',
    tags: ['Python', 'PyTorch', 'Hugging Face'],
  },
  {
    id: 2,
    repo: 'langchain-ai/langchain',
    icon: 'simple-icons:langchain',
    iconColor: 'text-emerald-400',
    iconBg: 'rgba(52,211,153,0.1)',
    title: 'fix(core): prevent bool→int silent coercion in merge_dicts',
    description:
      "Fixed a type-coercion bug in LangChain core's merge_dicts utility where booleans were silently being cast to integers.",
    status: 'Merged',
    statusColor: 'text-green-400',
    url: 'https://github.com/langchain-ai/langchain/pull/38064',
    prLabel: '#38064',
    tags: ['Python', 'LangChain Core'],
  },
  {
    id: 3,
    repo: 'googleapis/mcp-toolbox',
    icon: 'logos:google-cloud',
    iconColor: 'text-blue-400',
    iconBg: 'rgba(96,165,250,0.1)',
    title: 'Improve Spanner tool descriptions for graph queries',
    description:
      'Improved the prebuilt Spanner SQL tool descriptions to give clearer guidance for LLM agents on graph queries, with no behavioral changes.',
    status: 'Submitted',
    statusColor: 'text-brand',
    url: 'https://github.com/googleapis/mcp-toolbox/pull/3673',
    prLabel: '#3673',
    tags: ['Go', 'MCP', 'Spanner'],
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function OpenSource() {
  return (
    <section id="open-source" className="relative py-16 md:py-24 lg:py-32 px-6" aria-label="Open source contributions section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;open-source&gt;</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight">
            Open Source <span className="text-gradient">Contributions</span>
          </motion.h2>
          <motion.p {...fadeUp(0.14)} className="text-slate-500 font-light mt-4 max-w-lg mx-auto text-[15px]">
            Pull requests submitted to widely-used open-source projects
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTRIBUTIONS.map((c, i) => (
            <motion.article
              key={c.id}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -6 }}
              className="gradient-border card rounded-xl overflow-hidden p-5 md:p-6 flex flex-col h-full transition-colors duration-300"
              style={{ '--hover-border': 'rgba(6,182,212,0.3)' }}
              aria-label={c.title}
            >
              {/* Header row */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: c.iconBg }}>
                  <Icon icon={c.icon} className={`${c.iconColor} text-2xl`} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-slate-300 tracking-wide truncate">{c.repo}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Icon icon="lucide:git-pull-request" className={`${c.statusColor} text-xs`} aria-hidden="true" />
                    <span className={`font-mono text-[10px] ${c.statusColor}`}>{c.status} · {c.prLabel}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-semibold tracking-tight text-white mb-3 leading-snug">{c.title}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-5 flex-1">{c.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {c.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <motion.a
                whileHover={{ x: 3 }}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand transition-colors"
                aria-label={`View pull request on ${c.repo}`}
              >
                <Icon icon="lucide:github" className="text-base" /> View Pull Request
              </motion.a>
            </motion.article>
          ))}
        </div>

        <motion.p {...fadeUp(0.3)} className="section-label text-center mt-16">&lt;/open-source&gt;</motion.p>
      </div>
    </section>
  )
}
