/**
 * Animation Constants
 *
 * Centralized animation configuration for consistent timing and easing
 * throughout the application. Used primarily with GSAP animations.
 *
 * Usage:
 * import { ANIMATION } from '@/lib/animations'
 *
 * gsap.to(element, {
 *   opacity: 1,
 *   duration: ANIMATION.duration.normal,
 *   ease: ANIMATION.ease.out,
 * })
 */

export const ANIMATION = {
  /**
   * Standard animation durations in seconds
   */
  duration: {
    instant: 0.15,   // Very fast, micro-interactions
    fast: 0.3,       // Quick transitions, hovers
    normal: 0.6,     // Standard animations
    medium: 0.8,     // Moderate animations
    slow: 0.9,       // Slow, deliberate animations
    verySlow: 1.2,   // Extra slow, emphasis
    xSlow: 1.8,      // Very slow, dramatic reveals
  },

  /**
   * Easing functions for natural motion
   * Based on GSAP's Power ease system
   */
  ease: {
    // Out easings (fast start, slow end) - Most common
    out: "power1.out",
    outMedium: "power2.out",
    outStrong: "power3.out",

    // In easings (slow start, fast end)
    in: "power1.in",
    inMedium: "power2.in",
    inStrong: "power3.in",

    // InOut easings (slow start and end)
    inOut: "power2.inOut",
    inOutStrong: "power3.inOut",

    // Special easings
    sine: "sine.out",
    elastic: "elastic.out(1, 0.3)",
    back: "back.out(1.7)",
    expo: "expo.inOut",
  },

  /**
   * ScrollTrigger default positions
   */
  scroll: {
    start: "top 80%",        // Element enters bottom 20% of viewport
    start75: "top 75%",      // Element enters at 75%
    startMid: "top 60%",     // Element enters middle of viewport
    startTop: "top 20%",     // Element near top of viewport
    startBottom: "top bottom", // Element starts at bottom
    end: "bottom 20%",       // Element exits top 20% of viewport
    endTop: "bottom top",    // Element exits at top
    center: "center center", // Element centered in viewport
  },

  /**
   * Common animation delays in seconds
   */
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.3,
    xLong: 0.4,
  },

  /**
   * Stagger configuration for sequential animations
   */
  stagger: {
    fast: 0.05,     // Rapid succession
    normal: 0.1,    // Standard stagger
    medium: 0.12,   // Medium stagger
    slow: 0.15,     // Slower, more deliberate
    verySlow: 0.2,  // Very deliberate
  },

  /**
   * Parallax scroll speeds
   * Higher number = faster movement
   */
  parallax: {
    subtle: 0.1,    // Very subtle movement
    light: 0.3,     // Light parallax
    normal: 0.5,    // Standard parallax
    medium: 0.7,    // More pronounced
    strong: 1.0,    // Strong parallax effect
  },
} as const

/**
 * HoverPreview Component Animation Configuration
 *
 * Optimized for smooth, refined motion based on GSAP best practices:
 * - Softer easing (power1 instead of power3) for subtlety
 * - Faster durations (0.4-0.6s instead of 0.5-0.9s) for snappier feel
 * - More noticeable stagger (0.15-0.3s instead of 0.05-0.25s)
 *
 * Usage:
 * import { HOVER_PREVIEW } from '@/lib/animations'
 *
 * gsap.to(element, {
 *   opacity: 1,
 *   duration: HOVER_PREVIEW.duration.background,
 *   ease: HOVER_PREVIEW.ease.reveal,
 * })
 */
export const HOVER_PREVIEW = {
  duration: {
    background: 0.2,  // Background image fade in/out
    content: 0.3,     // Device/text clip-path reveals
    meta: 0.25,        // Meta information (year, services)
    collapse: 0.25,    // Exit animation when project deselected
  },
  ease: {
    reveal: "power1.out",  // Gentle deceleration for reveals (was power3.out - too harsh)
    collapse: "sine.in",   // Smooth acceleration for collapse (was power3.in - too harsh)
  },
  stagger: {
    base: 0,           // First element starts immediately
    medium: 0.15,      // Second element (was 0.05-0.1 - barely noticeable)
    delayed: 0.3,      // Third element (was 0.15-0.25 - needs more separation)
  },
} as const

/**
 * Type exports for TypeScript
 */
export type AnimationDuration = keyof typeof ANIMATION.duration
export type AnimationEase = keyof typeof ANIMATION.ease
export type ScrollTriggerPosition = keyof typeof ANIMATION.scroll
