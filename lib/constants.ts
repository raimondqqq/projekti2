/**
 * Application-wide constants
 *
 * This file contains all magic strings and configuration values used throughout
 * the application. Centralizing these values makes them easier to maintain and
 * provides type safety.
 */

/**
 * Device types for project mockups
 */
export const DEVICE_TYPES = {
  LAPTOP: 'laptop',
  MOBILE: 'mobile',
} as const

export type DeviceType = typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES]

/**
 * Layout variants for project display
 * Each variant defines a different arrangement of title, device mockup, and metadata
 */
export const LAYOUT_VARIANTS = {
  /** Centered: title above, device below */
  A: 'A',
  /** Left text, right device */
  B: 'B',
  /** Left device, right text */
  C: 'C',
  /** Top text, wide device bottom */
  D: 'D',
  /** Top device, bottom text */
  E: 'E',
  /** Editorial offset */
  F: 'F',
} as const

export type LayoutVariant = typeof LAYOUT_VARIANTS[keyof typeof LAYOUT_VARIANTS]

/**
 * Layout variant descriptions for admin UI
 */
export const LAYOUT_VARIANT_DESCRIPTIONS = {
  [LAYOUT_VARIANTS.A]: 'Centered (title above, device below)',
  [LAYOUT_VARIANTS.B]: 'Left text, right device',
  [LAYOUT_VARIANTS.C]: 'Left device, right text',
  [LAYOUT_VARIANTS.D]: 'Top text, wide device bottom',
  [LAYOUT_VARIANTS.E]: 'Top device, bottom text',
  [LAYOUT_VARIANTS.F]: 'Editorial offset',
} as const

/**
 * GSAP animation durations (in seconds)
 */
export const ANIMATION_DURATIONS = {
  /** Quick animations (0.3s) */
  SHORT: 0.3,
  /** Medium animations (0.6s) */
  MEDIUM: 0.6,
  /** Slow animations (0.8s) */
  SLOW: 0.8,
  /** Long animations (1.0s+) */
  LONG: 1.0,
} as const

/**
 * Image storage folders on Vercel Blob
 */
export const IMAGE_FOLDERS = {
  /** Project hero images */
  PROJECT_HEROES: 'theoria/projects/heroes',
  /** Project device mockups */
  PROJECT_MOCKUPS: 'theoria/projects/mockups',
  /** Team member photos */
  TEAM_PHOTOS: 'theoria/team',
} as const

/**
 * Image aspect ratios for uploads
 */
export const ASPECT_RATIOS = {
  /** Hero images (16:9) */
  HERO: '16/9',
  /** Laptop mockups (16:10) */
  LAPTOP: '16/10',
  /** Mobile mockups (9:19.5) */
  MOBILE: '9/19.5',
} as const

/**
 * Page state enum for HomePage component
 */
export const PAGE_STATES = {
  DEFAULT: 'default',
  PREVIEW: 'preview',
  CASE_STUDY: 'case-study',
  MENU: 'menu',
} as const

export type PageState = typeof PAGE_STATES[keyof typeof PAGE_STATES]

/**
 * Z-index layers for consistent stacking
 */
export const Z_INDEX = {
  /** Background elements */
  BACKGROUND: 1,
  /** Content layer */
  CONTENT: 10,
  /** Hover preview layer */
  PREVIEW: 6,
  /** Case study overlay */
  CASE_STUDY: 50,
  /** Navigation dock */
  DOCK: 999,
  /** Menu overlay */
  MENU: 900,
} as const

/**
 * Breakpoints (in pixels) - matches Tailwind config
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

/**
 * Maximum file sizes for uploads (in bytes)
 */
export const MAX_FILE_SIZES = {
  /** 10MB for images */
  IMAGE: 10 * 1024 * 1024,
  /** 5MB for general files */
  GENERAL: 5 * 1024 * 1024,
} as const
