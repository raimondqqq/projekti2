export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  stargazers_count: number
  watchers_count: number
  language: string | null
  default_branch: string
}

export interface PlaygroundExperiment {
  id: number
  title: string
  description: string | null
  githubUrl: string
  liveUrl: string | null
  tags: string[]
  thumbnail: string | null
  updatedAt: string
}

const GITHUB_API_BASE = "https://api.github.com"
const PLAYGROUND_PREFIX = "playground-"

/**
 * Fetch all playground repositories from GitHub
 * @param username - GitHub username (e.g., "haris")
 * @returns Array of playground experiments
 */
export async function fetchPlaygroundRepos(
  username: string = "haris"
): Promise<PlaygroundExperiment[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    // Add token if available (for higher rate limits)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    // Fetch all repositories for the user
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter repos that start with "playground-"
    const playgroundRepos = repos.filter((repo) =>
      repo.name.startsWith(PLAYGROUND_PREFIX)
    )

    // Transform to PlaygroundExperiment format
    const experiments: PlaygroundExperiment[] = playgroundRepos.map((repo) => ({
      id: repo.id,
      title: cleanPlaygroundTitle(repo.name),
      description: repo.description,
      githubUrl: repo.html_url,
      liveUrl: repo.homepage,
      tags: repo.topics || [],
      thumbnail: getThumbnailUrl(username, repo.name, repo.default_branch, repo.pushed_at),
      updatedAt: repo.updated_at,
    }))

    return experiments
  } catch (error) {
    console.error("Error fetching playground repos:", error)
    return []
  }
}

/**
 * Fetch a single playground repository by name
 * @param username - GitHub username
 * @param repoName - Repository name
 */
export async function fetchPlaygroundRepo(
  username: string,
  repoName: string
): Promise<PlaygroundExperiment | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      return null
    }

    const repo: GitHubRepo = await response.json()

    return {
      id: repo.id,
      title: cleanPlaygroundTitle(repo.name),
      description: repo.description,
      githubUrl: repo.html_url,
      liveUrl: repo.homepage,
      tags: repo.topics || [],
      thumbnail: getThumbnailUrl(username, repo.name, repo.default_branch, repo.pushed_at),
      updatedAt: repo.updated_at,
    }
  } catch (error) {
    console.error("Error fetching playground repo:", error)
    return null
  }
}

/**
 * Clean the playground title by removing prefix and formatting
 * @param repoName - Repository name (e.g., "playground-button-morph")
 * @returns Cleaned title (e.g., "Button Morph")
 */
function cleanPlaygroundTitle(repoName: string): string {
  return repoName
    .replace(PLAYGROUND_PREFIX, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Get the thumbnail URL from the repo with cache-busting
 * @param username - GitHub username
 * @param repoName - Repository name
 * @param branch - Branch name (e.g., "main" or "master")
 * @param pushedAt - Timestamp of last push (used for cache-busting)
 * @returns URL to preview.png in the repo with cache-busting parameter
 */
function getThumbnailUrl(username: string, repoName: string, branch: string = "main", pushedAt?: string): string {
  const baseUrl = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/preview.png`

  // Add cache-busting query parameter using pushed_at timestamp
  // This ensures images update when the repo is updated
  if (pushedAt) {
    const timestamp = new Date(pushedAt).getTime()
    return `${baseUrl}?t=${timestamp}`
  }

  return baseUrl
}
