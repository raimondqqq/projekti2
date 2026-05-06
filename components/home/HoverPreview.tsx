"use client"

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Project } from '@/types'
import { HOVER_PREVIEW } from '@/lib/animations'

/**
 * Layout Clip-Path Configurations
 *
 * Each layout variant has initial clip-path values for title, device, and meta elements.
 * These define the starting state before animating to "inset(0% 0% 0% 0%)" (fully revealed).
 *
 * Clip-path format: "inset(top right bottom left)"
 * - "100% 0% 0% 0%" = hidden at top (reveals downward)
 * - "0% 100% 0% 0%" = hidden at right (reveals leftward)
 * - "0% 0% 0% 100%" = hidden at left (reveals rightward)
 * - "50% 50% 50% 50%" = hidden at center (reveals outward)
 */
const LAYOUT_CONFIGS = {
  A: { // Centered: title above, device below - expand from top
    title: "0% 0% 100% 0%",
    device: "100% 0% 0% 0%",
    meta: "0% 0% 100% 0%",
  },
  B: { // Left text, right device - expand from left to right
    title: "0% 100% 0% 0%",
    device: "0% 0% 0% 100%",
    meta: "0% 100% 0% 0%",
  },
  C: { // Left device, right text - expand from right to left
    device: "0% 0% 0% 100%",
    title: "0% 100% 0% 0%",
    meta: "0% 100% 0% 0%",
  },
  D: { // Top text, wide device bottom - expand from top
    title: "0% 0% 100% 0%",
    device: "100% 0% 0% 0%",
    meta: "0% 0% 100% 0%",
  },
  E: { // Top device, bottom text - expand from bottom
    device: "100% 0% 0% 0%",
    title: "0% 0% 100% 0%",
    meta: "0% 0% 100% 0%",
  },
  F: { // Editorial offset - expand from center
    title: "50% 50% 50% 50%",
    device: "50% 50% 50% 50%",
    meta: "50% 50% 50% 50%",
  },
} as const

interface HoverPreviewProps {
  project: Project | null
  hideDevice?: boolean
}

export const HoverPreview = forwardRef<{ getDevicePosition: () => DOMRect | null }, HoverPreviewProps>(
  function HoverPreview({ project, hideDevice }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const deviceRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const metaRef = useRef<HTMLDivElement>(null)
    const previousProjectId = useRef<string | null>(null)

    // Store timelines for reversible animations
    const backgroundTween = useRef<gsap.core.Tween | null>(null)
    const contentTimeline = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)

    useImperativeHandle(ref, () => ({
      getDevicePosition: () => {
        return deviceRef.current?.getBoundingClientRect() || null
      },
      reverse: () => {
        // Reverse the animations immediately
        backgroundTween.current?.reverse()
        contentTimeline.current?.reverse()
      },
      play: () => {
        // Play/restart the animations forward
        backgroundTween.current?.play()
        contentTimeline.current?.play()
      },
    }))

  useGSAP(() => {
    if (!project) {
      // Fade out background with opacity only
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          opacity: 0,
          duration: HOVER_PREVIEW.duration.background,
          ease: HOVER_PREVIEW.ease.reveal,
        })
      }
      // Collapse device and text with clip-path
      const clipElements = [deviceRef.current, titleRef.current, metaRef.current].filter(Boolean)
      if (clipElements.length > 0) {
        gsap.to(clipElements, {
          clipPath: "inset(50% 50% 50% 50%)",
          duration: HOVER_PREVIEW.duration.collapse,
          ease: HOVER_PREVIEW.ease.collapse,
          force3D: true,
        })
      }
      previousProjectId.current = null
      return
    }

    // If switching between projects, crossfade
    const isNewProject = previousProjectId.current !== project.id
    previousProjectId.current = project.id

    // Background crossfade - simple opacity only, NO clip-path EVER
    if (backgroundRef.current) {
      // Force set clipPath to none to ensure no clip-path is applied
      gsap.set(backgroundRef.current, { clipPath: "none" })

      // Store the tween for reversing - use fromTo for explicit start/end
      backgroundTween.current = gsap.fromTo(backgroundRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: HOVER_PREVIEW.duration.background,
          ease: HOVER_PREVIEW.ease.reveal,
        }
      )
    }

    // Animate device mockup based on layout variant
    if (!deviceRef.current || !titleRef.current || !metaRef.current) return

    const mm = gsap.matchMedia()

    // Mobile: Simple fade + slide (better performance, no clip-path)
    mm.add("(max-width: 767px)", () => {
      // Store the tween for reversing
      contentTimeline.current = gsap.fromTo(
        [titleRef.current, deviceRef.current, metaRef.current],
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: HOVER_PREVIEW.ease.reveal,
          force3D: true,
        }
      )
    })

    // Desktop: Complex clip-path animations
    mm.add("(min-width: 768px)", () => {
      const config = LAYOUT_CONFIGS[project.layoutVariant as keyof typeof LAYOUT_CONFIGS] || LAYOUT_CONFIGS.A

      // Set initial states
      gsap.set(titleRef.current, { clipPath: `inset(${config.title})` })
      gsap.set(deviceRef.current, { clipPath: `inset(${config.device})` })
      gsap.set(metaRef.current, { clipPath: `inset(${config.meta})` })

      // Store timeline for reversing - use fromTo for explicit reversing
      contentTimeline.current = gsap.timeline()
      contentTimeline.current
        .fromTo(titleRef.current,
          { clipPath: `inset(${config.title})` },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: HOVER_PREVIEW.duration.content,
            ease: HOVER_PREVIEW.ease.reveal,
            force3D: true,
          }, HOVER_PREVIEW.stagger.base)
        .fromTo(deviceRef.current,
          { clipPath: `inset(${config.device})` },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: HOVER_PREVIEW.duration.content,
            ease: HOVER_PREVIEW.ease.reveal,
            force3D: true,
          }, HOVER_PREVIEW.stagger.medium)
        .fromTo(metaRef.current,
          { clipPath: `inset(${config.meta})` },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: HOVER_PREVIEW.duration.meta,
            ease: HOVER_PREVIEW.ease.reveal,
            force3D: true,
          }, HOVER_PREVIEW.stagger.delayed)
    })

    return () => mm.revert()
  }, [project])

  const getLayoutClasses = () => {
    if (!project) return "flex-col items-center justify-center gap-8"

    switch (project.layoutVariant) {
      case "A": // Centered
        return "flex-col-reverse items-start justify-center gap-32"
      case "B": // Left text, right device
        return "flex-row items-start justify-between gap-2"
      case "C": // Left device, right text
        return "flex-row-reverse items-start justify-between gap-24"
      case "D": // Top text, wide device bottom
        return "flex-col items-start justify-center gap-6"
      case "E": // Top device, bottom text
        return "grid grid-cols-2 items-end text-left justify-center gap-6"
      case "F": // Editorial offset
        return "grid grid-cols-2 gap-8 items-start"
      default:
        return "flex-col items-start justify-center gap-8"
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 6 }}>
      {/* Background Image - Completely separate layer, only opacity animation */}
      {project && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 opacity-0"
          style={{ willChange: "opacity" }}
        >
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/50" />

          {/* Image Copyright Credit */}
          <div className="absolute bottom-[clamp(1.5rem,3vw,2rem)] right-[clamp(1.5rem,4vw,4rem)] z-50">
            <p className="font-mono text-[clamp(0.625rem,0.8vw,0.75rem)] uppercase tracking-wider text-foreground/50">
              IMAGE © UNSPLASH
            </p>
          </div>
        </div>
      )}

      {/* Content Layer - Device and text with clip-path animations */}
      {project && (
        <div className="absolute inset-0 flex items-center justify-center pl-[clamp(8rem,10vw,12rem)]">
          <div className={`flex max-w-9xl w-full p-[clamp(3rem,5vw,6rem)] ${getLayoutClasses()}`}>
            {/* Device Mockup */}
            {!hideDevice && (
              <div
                ref={deviceRef}
                className="relative"
                style={{ willChange: "clip-path" }}
              >
              <div className={`relative ${
                project.deviceType === "laptop"
                  ? "w-[clamp(18.75rem,50vw,37.5rem)] h-[clamp(12.5rem,33vw,25rem)]"
                  : "w-[clamp(12.5rem,40vw,17.5rem)] h-[clamp(25rem,80vw,36.25rem)]"
              }`}>
                <Image
                  src={project.deviceMockup}
                  alt={`${project.name} mockup`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              </div>
            )}

            {/* Text Content */}
            <div
              ref={titleRef}
              className={`flex flex-col gap-4 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
                project.layoutVariant === "B" ? "items-start text-left" :
                project.layoutVariant === "C" ? "items-start text-left" :
                project.layoutVariant === "F" ? "items-start" :
                "items-start text-start"
              }`}
              style={{ willChange: "clip-path" }}
            >
              <div>
                <h2 className="text-[clamp(2.25rem,5vw+1rem,6rem)] font-thin tracking-tight mb-2 font-serif">
                  {project.name}
                </h2>
                {project.summary && (
                  <p className="text-[clamp(0.6875rem,1vw,1.25rem)] font-extralight text-foreground mt-3">
                    {project.summary}
                  </p>
                )}
              </div>
              <div
                ref={metaRef}
                className="text-foreground space-y-1"
              >
                <p className="text-[clamp(0.875rem,1.2vw,1rem)] font-mono">
                  {project.endYear ? `${project.startYear} - ${project.endYear}` : project.startYear}
                </p>
                {project.services && (
                  <p className="text-[clamp(0.625rem,1vw,0.75rem)] font-mono uppercase">
                    {JSON.parse(project.services).join(" · ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
