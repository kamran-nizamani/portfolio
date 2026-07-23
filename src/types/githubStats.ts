export type MetricStatus = 'loading' | 'success' | 'error'

export interface MetricState<T> {
  value: T | null
  status: MetricStatus
}

export interface GitHubStatsState {
  totalCommits: MetricState<number>
  totalPullRequests: MetricState<number>
  totalIssues: MetricState<number>
  reposContributedTo: MetricState<number>
  totalContributions: MetricState<number>
  currentStreak: MetricState<number>
  longestStreak: MetricState<number>
}

export type GitHubMetricKey = keyof GitHubStatsState
