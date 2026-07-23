import { motion } from 'framer-motion'
import { useGitHubStats } from '../hooks/useGitHubStats'
import GitHubStatCard from './GitHubStatCard'
import type { GitHubMetricKey } from '../types/githubStats'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

interface CardConfig {
  key: GitHubMetricKey
  label: string
  icon: string
  color: string
}

const CARDS: CardConfig[] = [
  { key: 'totalCommits', label: 'Total Commits', icon: 'lucide:git-commit-horizontal', color: '#06B6D4' },
  { key: 'currentStreak', label: 'Current Streak', icon: 'lucide:flame', color: '#f59e0b' },
  { key: 'longestStreak', label: 'Longest Streak', icon: 'lucide:trophy', color: '#f59e0b' },
  { key: 'totalContributions', label: 'Total Contributions', icon: 'lucide:activity', color: '#38bdf8' },
  { key: 'totalPullRequests', label: 'Total Pull Requests', icon: 'lucide:git-pull-request', color: '#818cf8' },
  { key: 'totalIssues', label: 'Total Issues', icon: 'lucide:circle-dot', color: '#c084fc' },
  { key: 'reposContributedTo', label: 'Repositories Contributed To', icon: 'lucide:git-fork', color: '#22c55e' },
]

export default function GitHubStats() {
  const stats = useGitHubStats()

  return (
    <section id="github-stats" className="relative py-16 md:py-24 lg:py-32 px-6 overflow-hidden" aria-label="GitHub statistics section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p {...fadeUp(0)} className="section-label mb-4">&lt;github-stats&gt;</motion.p>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl md:text-5xl font-semibold tracking-tight">
            Live GitHub <span className="text-gradient">Activity</span>
          </motion.h2>
          <motion.p {...fadeUp(0.14)} className="text-slate-500 font-light mt-4 max-w-lg mx-auto text-[15px]">
            Real-time stats pulled straight from my GitHub profile
          </motion.p>
        </div>

        {/* Stat cards */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          role="list"
          aria-label="GitHub statistics"
        >
          {CARDS.map((c, i) => {
            const metric = stats[c.key]
            return (
              <GitHubStatCard
                key={c.key}
                icon={c.icon}
                label={c.label}
                value={metric.value}
                status={metric.status}
                color={c.color}
                delay={i * 0.06}
                onRetry={stats.refetch}
              />
            )
          })}
        </div>

        <motion.p {...fadeUp(0.3)} className="section-label text-center mt-16">&lt;/github-stats&gt;</motion.p>
      </div>
    </section>
  )
}
