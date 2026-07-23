import { useCallback, useEffect, useRef, useState } from 'react'
import type { GitHubStatsState, MetricState } from '../types/githubStats'

const GITHUB_USERNAME = 'kamran-nizamani'
const CACHE_KEY = `gh-stats:${GITHUB_USERNAME}`
const CACHE_TTL_MS = 15 * 60 * 1000

const loading = <T,>(): MetricState<T> => ({ value: null, status: 'loading' })

const INITIAL_STATE: GitHubStatsState = {
  totalCommits: loading(),
  totalPullRequests: loading(),
  totalIssues: loading(),
  reposContributedTo: loading(),
  totalContributions: loading(),
  currentStreak: loading(),
  longestStreak: loading(),
}

type CachePayload = {
  savedAt: number
  data: { [K in keyof GitHubStatsState]: number | null }
}

function readCache(): CachePayload['data'] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed: CachePayload = JSON.parse(raw)
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeCache(data: CachePayload['data']) {
  try {
    const payload: CachePayload = { savedAt: Date.now(), data }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // sessionStorage unavailable (private browsing, quota) — safe to skip caching
  }
}

interface GitHubSearchResponse {
  total_count: number
  items: Array<{ repository_url: string }>
}

async function fetchSearchCount(query: string, signal: AbortSignal): Promise<GitHubSearchResponse> {
  const res = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100`,
    { signal, headers: { Accept: 'application/vnd.github+json' } }
  )
  if (!res.ok) throw new Error(`GitHub search failed: ${res.status}`)
  return res.json()
}

async function fetchCommitCount(username: string, signal: AbortSignal): Promise<number> {
  const res = await fetch(
    `https://api.github.com/search/commits?q=${encodeURIComponent(`author:${username}`)}`,
    { signal, headers: { Accept: 'application/vnd.github.cloak-preview+json' } }
  )
  if (!res.ok) throw new Error(`GitHub commit search failed: ${res.status}`)
  const json = await res.json()
  return json.total_count
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionsResponse {
  total: Record<string, number>
  contributions: ContributionDay[]
}

/** The GitHub Readme Streak Stats SVG endpoint doesn't send CORS headers, so it
 *  can't be fetched from the browser. The contributions calendar (same source
 *  data GitHub's own streak widgets read from) is CORS-enabled, so streak and
 *  total-contribution counts are derived from it directly. */
async function fetchStreakStats(username: string, signal: AbortSignal) {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`, { signal })
  if (!res.ok) throw new Error(`Contributions API failed: ${res.status}`)
  const json: ContributionsResponse = await res.json()

  const todayStr = new Date().toISOString().slice(0, 10)
  const days = json.contributions
    .filter(d => d.date <= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))

  const totalContributions = Object.values(json.total).reduce((sum, n) => sum + n, 0)

  let longestStreak = 0
  let run = 0
  for (const day of days) {
    if (day.count > 0) {
      run += 1
      longestStreak = Math.max(longestStreak, run)
    } else {
      run = 0
    }
  }

  // Walk backward from today; if today has no contributions yet, the streak
  // isn't "broken" until the day ends, so start counting from yesterday.
  let currentStreak = 0
  let i = days.length - 1
  if (i >= 0 && days[i].count === 0) i -= 1
  while (i >= 0 && days[i].count > 0) {
    currentStreak += 1
    i -= 1
  }

  return { totalContributions, currentStreak, longestStreak }
}

function uniqueRepoCount(...responses: GitHubSearchResponse[]): number {
  const repos = new Set<string>()
  for (const res of responses) {
    for (const item of res.items) repos.add(item.repository_url)
  }
  return repos.size
}

export function useGitHubStats() {
  const [state, setState] = useState<GitHubStatsState>(INITIAL_STATE)
  const [refreshToken, setRefreshToken] = useState(0)
  const cacheHitRef = useRef(false)

  const refetch = useCallback(() => setRefreshToken(t => t + 1), [])

  useEffect(() => {
    const cached = readCache()
    if (cached && refreshToken === 0) {
      cacheHitRef.current = true
      setState({
        totalCommits: { value: cached.totalCommits, status: cached.totalCommits == null ? 'error' : 'success' },
        totalPullRequests: { value: cached.totalPullRequests, status: cached.totalPullRequests == null ? 'error' : 'success' },
        totalIssues: { value: cached.totalIssues, status: cached.totalIssues == null ? 'error' : 'success' },
        reposContributedTo: { value: cached.reposContributedTo, status: cached.reposContributedTo == null ? 'error' : 'success' },
        totalContributions: { value: cached.totalContributions, status: cached.totalContributions == null ? 'error' : 'success' },
        currentStreak: { value: cached.currentStreak, status: cached.currentStreak == null ? 'error' : 'success' },
        longestStreak: { value: cached.longestStreak, status: cached.longestStreak == null ? 'error' : 'success' },
      })
      return
    }

    const controller = new AbortController()
    setState(INITIAL_STATE)

    let prResult: GitHubSearchResponse | null = null
    let issueResult: GitHubSearchResponse | null = null
    let prSettled = false
    let issueSettled = false

    const updateRepoCount = () => {
      if (!prSettled || !issueSettled) return
      const responses = [prResult, issueResult].filter((r): r is GitHubSearchResponse => r !== null)
      if (responses.length === 0) {
        setState(prev => ({ ...prev, reposContributedTo: { value: null, status: 'error' } }))
        return
      }
      setState(prev => ({
        ...prev,
        reposContributedTo: { value: uniqueRepoCount(...responses), status: 'success' },
      }))
    }

    fetchCommitCount(GITHUB_USERNAME, controller.signal)
      .then(value => setState(prev => ({ ...prev, totalCommits: { value, status: 'success' } })))
      .catch(() => setState(prev => ({ ...prev, totalCommits: { value: null, status: 'error' } })))

    fetchSearchCount(`author:${GITHUB_USERNAME} type:pr`, controller.signal)
      .then(res => {
        prResult = res
        setState(prev => ({ ...prev, totalPullRequests: { value: res.total_count, status: 'success' } }))
      })
      .catch(() => setState(prev => ({ ...prev, totalPullRequests: { value: null, status: 'error' } })))
      .finally(() => {
        prSettled = true
        updateRepoCount()
      })

    fetchSearchCount(`author:${GITHUB_USERNAME} type:issue`, controller.signal)
      .then(res => {
        issueResult = res
        setState(prev => ({ ...prev, totalIssues: { value: res.total_count, status: 'success' } }))
      })
      .catch(() => setState(prev => ({ ...prev, totalIssues: { value: null, status: 'error' } })))
      .finally(() => {
        issueSettled = true
        updateRepoCount()
      })

    fetchStreakStats(GITHUB_USERNAME, controller.signal)
      .then(({ totalContributions, currentStreak, longestStreak }) => {
        setState(prev => ({
          ...prev,
          totalContributions: { value: totalContributions, status: totalContributions == null ? 'error' : 'success' },
          currentStreak: { value: currentStreak, status: currentStreak == null ? 'error' : 'success' },
          longestStreak: { value: longestStreak, status: longestStreak == null ? 'error' : 'success' },
        }))
      })
      .catch(() => {
        setState(prev => ({
          ...prev,
          totalContributions: { value: null, status: 'error' },
          currentStreak: { value: null, status: 'error' },
          longestStreak: { value: null, status: 'error' },
        }))
      })

    return () => controller.abort()
  }, [refreshToken])

  // Persist to cache once every metric has settled (success or error).
  useEffect(() => {
    if (cacheHitRef.current) return
    const allSettled = Object.values(state).every(m => m.status !== 'loading')
    if (!allSettled) return
    writeCache({
      totalCommits: state.totalCommits.value,
      totalPullRequests: state.totalPullRequests.value,
      totalIssues: state.totalIssues.value,
      reposContributedTo: state.reposContributedTo.value,
      totalContributions: state.totalContributions.value,
      currentStreak: state.currentStreak.value,
      longestStreak: state.longestStreak.value,
    })
  }, [state])

  return { ...state, refetch }
}
