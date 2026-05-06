"use client"

import { useState, useEffect } from 'react'
import { Project } from '@/types'

interface UseAssetPreloaderProps {
  projects: Project[]
  enabled?: boolean
}

interface AssetPreloaderResult {
  isLoaded: boolean
  progress: number
}

/**
 * Comprehensive asset preloader that waits for:
 * - All project preview images
 * - All project thumbnails
 * - Background video
 * - All fonts (via document.fonts.ready)
 * - DOM ready state
 *
 * This ensures smooth animations without content popping in
 */
export function useAssetPreloader({ projects, enabled = true }: UseAssetPreloaderProps): AssetPreloaderResult {
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setIsLoaded(true)
      setProgress(100)
      return
    }

    let cancelled = false

    const preloadAssets = async () => {
      try {
        // Step 1: Wait for DOM to be interactive (10%)
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true })
          })
        }
        if (cancelled) return
        setProgress(10)

        // Step 2: Collect all image URLs from projects (20%)
        const imageUrls: string[] = []

        projects.forEach(project => {
          // Hero images (main project images)
          if (project.heroImage) {
            imageUrls.push(project.heroImage)
          }

          // Device mockup images
          if (project.deviceMockup) {
            imageUrls.push(project.deviceMockup)
          }

          // Case study images (if they exist in JSON format)
          if (project.caseStudyImages) {
            try {
              const caseStudyImages = JSON.parse(project.caseStudyImages)
              if (Array.isArray(caseStudyImages)) {
                imageUrls.push(...caseStudyImages)
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }

          // Hardcoded case study images (for Kindbody and other case studies with /img/ paths)
          // TODO: Eventually move these to database, but preload them for now
          if (project.caseStudySlug === 'kindbody') {
            const kindbodyImages = [
              '/img/kindbody/kb-desktop1.webp',
              '/img/kindbody/dashboard1.webp',
              '/img/kindbody/kb-app2.webp',
              '/img/kindbody/truck.webp',
              '/img/kindbody/app1.webp',
              '/img/kindbody/pills.webp',
              '/img/kindbody/kindbodyclinic.webp',
              '/img/kindbody/viet-tran-avatar.png',
            ]
            imageUrls.push(...kindbodyImages)
          }

          // Add more case studies here as needed
          // if (project.slug === 'another-project') {
          //   imageUrls.push('/img/another-project/image.webp')
          // }
        })

        if (cancelled) return
        setProgress(20)

        // Step 3: Preload all images (20% -> 70%)
        const totalImages = imageUrls.length
        let loadedImages = 0

        const imagePromises = imageUrls.map((url, index) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image()

            const onLoad = () => {
              loadedImages++
              const imageProgress = 20 + (loadedImages / totalImages) * 50
              if (!cancelled) {
                setProgress(Math.round(imageProgress))
              }
              resolve()
            }

            const onError = () => {
              console.warn(`Failed to preload image: ${url}`)
              loadedImages++
              const imageProgress = 20 + (loadedImages / totalImages) * 50
              if (!cancelled) {
                setProgress(Math.round(imageProgress))
              }
              resolve() // Resolve anyway to not block the loader
            }

            img.addEventListener('load', onLoad, { once: true })
            img.addEventListener('error', onError, { once: true })

            // Set src after listeners are attached
            img.src = url

            // If image is already cached, it might load synchronously
            if (img.complete) {
              onLoad()
            }
          })
        })

        await Promise.all(imagePromises)
        if (cancelled) return
        setProgress(70)

        // Step 4: Preload background video (75%)
        const videoElement = document.querySelector('video[src*="background-video"]') as HTMLVideoElement
        if (videoElement) {
          await new Promise<void>((resolve) => {
            if (videoElement.readyState >= 3) {
              // HAVE_FUTURE_DATA or better
              resolve()
            } else {
              const onCanPlay = () => {
                videoElement.removeEventListener('canplay', onCanPlay)
                resolve()
              }
              videoElement.addEventListener('canplay', onCanPlay)
              // Timeout after 3 seconds to not block forever
              setTimeout(() => {
                videoElement.removeEventListener('canplay', onCanPlay)
                resolve()
              }, 3000)
            }
          })
        }
        if (cancelled) return
        setProgress(75)

        // Step 5: Wait for fonts to load (85%)
        if (document.fonts) {
          await document.fonts.ready
        }
        if (cancelled) return
        setProgress(85)

        // Step 6: Wait for window load event (95%)
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true })
          })
        }
        if (cancelled) return
        setProgress(95)

        // Step 7: Small buffer to ensure everything is painted (100%)
        await new Promise(resolve => setTimeout(resolve, 100))
        if (cancelled) return
        setProgress(100)

        // Mark as loaded
        setIsLoaded(true)

      } catch (error) {
        console.error('Asset preloading error:', error)
        // Even on error, mark as loaded to not block the UI forever
        setIsLoaded(true)
        setProgress(100)
      }
    }

    preloadAssets()

    return () => {
      cancelled = true
    }
  }, [projects, enabled])

  return { isLoaded, progress }
}
