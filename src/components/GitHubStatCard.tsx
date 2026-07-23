import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { Icon } from '@iconify/react'
import type { MetricStatus } from '../types/githubStats'

interface GitHubStatCardProps {
  icon: string
  label: string
  value: number | null
  status: MetricStatus
  color: string
  suffix?: string
  delay?: number
  onRetry?: () => void
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export default function GitHubStatCard({
  icon,
  label,
  value,
  status,
  color,
  suffix = '',
  delay = 0,
  onRetry,
}: GitHubStatCardProps) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (status !== 'success' || value == null) return
    const controls = animate(0, value, {
      duration: 1.3,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [status, value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, boxShadow: `0 0 32px ${color}2E` }}
      className="card rounded-xl p-5 flex flex-col gap-4 transition-shadow duration-300 cursor-default"
      role="listitem"
      aria-label={status === 'success' && value != null ? `${label}: ${formatNumber(value)}` : label}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}1A` }}
        >
          <Icon icon={icon} className="text-lg" style={{ color }} aria-hidden="true" />
        </div>
        {status === 'error' && (
          <button
            type="button"
            onClick={onRetry}
            className="text-slate-500 hover:text-brand transition-colors"
            aria-label={`Retry loading ${label}`}
          >
            <Icon icon="lucide:refresh-cw" className="text-sm" />
          </button>
        )}
      </div>

      <div className="min-h-[2.25rem] flex items-end">
        {status === 'loading' && (
          <div className="h-7 w-20 rounded-md bg-white/5 animate-pulse" aria-hidden="true" />
        )}
        {status === 'error' && (
          <span className="text-xl font-semibold tracking-tight text-slate-600 font-mono">—</span>
        )}
        {status === 'success' && (
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white font-display">
            {formatNumber(display)}
            {suffix}
          </span>
        )}
      </div>

      <p className="font-mono text-[11px] text-slate-400 tracking-wide leading-snug">{label}</p>
    </motion.div>
  )
}
