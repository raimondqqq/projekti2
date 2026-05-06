"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { marked } from "marked"
import { caseStudyComponents } from "../case-studies"
import { Project } from '@/types'
import { parseJsonField } from '@/lib/json-utils'

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

// Configure marked for synchronous operation
marked.use({ async: false })

// Helper function to handle marked's sync parsing
// TypeScript types don't reflect the async: false config, so we use single assertion
const parseMarkdownSync = (markdown: string): string => {
  const result = marked.parse(markdown)
  // With async: false configured, this returns a string synchronously
  return result as string
}

interface CaseStudyProps {
  project: Project | null
  deviceStartPosition: DOMRect | null
  onClose: () => void
}

function ComingSoonState({ project }: { project: Project }) {
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Floating orbs animation
  useGSAP(() => {
    if (!orb1Ref.current || !orb2Ref.current || !orb3Ref.current) return

    // Orb 1 - Slow drift
    gsap.to(orb1Ref.current, {
      x: 40,
      y: -60,
      scale: 1.2,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    // Orb 2 - Medium drift
    gsap.to(orb2Ref.current, {
      x: -50,
      y: 40,
      scale: 0.8,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    // Orb 3 - Fast drift
    gsap.to(orb3Ref.current, {
      x: 30,
      y: 50,
      scale: 1.1,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
  }, [])

  // Staggered entrance animation
  useGSAP(() => {
    const elements = [badgeRef.current, titleRef.current, subtitleRef.current]

    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.2)",
      }
    )
  }, [])

  // Pulsating dot animation
  useGSAP(() => {
    if (!dotRef.current) return

    gsap.to(dotRef.current, {
      scale: 1.4,
      opacity: 1,
      duration: 0.8,
      ease: "back.inOut",
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <div
      className="relative flex items-start justify-center min-h-screen overflow-hidden py-64 bg-background"
      style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.08) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]" />
      </div>

      {/* Floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/3 w-32 h-32 bg-violet-500/10 rounded-full blur-xl"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 right-1/3 w-28 h-28 bg-violet-500/5 rounded-full blur-xl"
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl px-8">
        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center mb-12">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-background backdrop-blur-custom border border-foreground/10">
            <div ref={dotRef} className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              In Progress
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-none mb-8"
        >
          Coming Soon
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-sm md:text-base font-extralight text-foreground leading-relaxed"
        >
          We're crafting a detailed case study for{" "}
          <span className="text-foreground font-semibold">{project.name}</span>.
          <br />
          Check back soon to explore the full story.
        </p>
      </div>
    </div>
  )
}

export function CaseStudy({ project, deviceStartPosition, onClose }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Pulsating dot animation
  useGSAP(() => {
    if (!dotRef.current) return

    gsap.to(dotRef.current, {
      scale: 1.4,
      opacity: 1,
      duration: 0.8,
      ease: "back.inOut",
      repeat: -1,
      yoyo: true,
    })
  }, [])

  useGSAP(() => {
    if (!project || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Disable scrolling during animation
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.overflow = 'hidden'
      }

      // Get elements via CSS selectors
      const overlay = '.case-study-overlay'
      const header = '.case-study-header'
      const content = '.case-study-content'
      const device = '.case-study-device'
      const deviceInner = '.device-inner'

      // Initial setup
      gsap.set(overlay, { opacity: 0 })
      gsap.set(header, { y: -500, opacity: 0 })
      gsap.set(content, { y: 0, opacity: 0 })

      // Use ACTUAL device position from HoverPreview
      let startX = 0

      if (deviceStartPosition) {
        // Calculate offset from center
        const centerX = window.innerWidth / 2
        const deviceCenterX = deviceStartPosition.left + deviceStartPosition.width / 2
        startX = deviceCenterX - centerX
      }

      gsap.set(deviceInner, { x: startX })

      // Calculate target dimensions - full width with proper aspect ratio
      const targetWidth = window.innerWidth
      // Calculate height to maintain aspect ratio of the initial dimensions
      const initialWidth = project.deviceType === "laptop" ? 600 : 280
      const initialHeight = project.deviceType === "laptop" ? 400 : 580
      const aspectRatio = initialHeight / initialWidth
      const targetHeight = targetWidth * aspectRatio

      // Responsive y-shift: dynamically calculated based on screen size
      const screenWidth = window.innerWidth
      let yShift: number

      if (screenWidth < 768) {
        // Mobile
        yShift = 96
      } else if (screenWidth >= 768 && screenWidth < 1020) {
        // Medium (tablets)
        yShift = 160
      } else if (screenWidth >= 1020 && screenWidth < 2000) {
        // Desktop
        yShift = 480
      } else {
        // Extra-wide screens (2000px+)
        yShift = 640
      }

      // Animation timeline
      const timeline = gsap.timeline()

      timeline
        // 1. Fade in dark background
        .to(overlay, {
          opacity: 1,
          duration: 1.6,
          ease: "power1.Out",
        }, 0)
        // 2. Move to center AND expand simultaneously from TIME 0!
        .to(deviceInner, {
          x: 0,
          width: targetWidth,
          height: targetHeight,
          duration: 1.2,
          ease: "power1.inOut",
        }, 0)
        // 3. pause (let it breathe)
        .to({}, { duration: 0.2 })
        // 4. Content shifts down, revealing title and meta
        .to(device, {
          y: yShift,
          duration: 0.6,
          ease: "back.Out",
        })
        .to(header, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.Out",
        }, "-=1.1")
        // 5. Fade in case study content
        .to(content, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.Out",
          onComplete: () => {
            // Re-enable scrolling after animation completes
            if (scrollContainerRef.current) {
              scrollContainerRef.current.style.overflow = 'auto'
            }
          }
        }, "-=1.1")
    }, containerRef)

    return () => ctx.revert()
  }, [project])

  const handleClose = () => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: onClose,
      })

      timeline
        .to(['.case-study-header', '.case-study-device', '.case-study-content'], {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .to('.case-study-overlay', {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        }, 0.1)
    }, containerRef)
  }

  if (!project) return null

  const services = parseJsonField(project.services)
  const industries = parseJsonField(project.industry)

  const getLayoutClasses = () => {
    switch (project.layoutVariant) {
      case "A": // Centered
        return "flex-col items-center justify-center gap-8"
      case "B": // Left text, right device
        return "flex-row items-center justify-between gap-12"
      case "C": // Left device, right text
        return "flex-row-reverse items-center justify-between gap-12"
      case "D": // Top text, wide device bottom
        return "flex-col items-center justify-center gap-6"
      case "E": // Top device, bottom text
        return "flex-col-reverse items-center justify-center gap-6"
      case "F": // Editorial offset
        return "grid grid-cols-2 gap-8 items-center"
      default:
        return "flex-col items-center justify-center gap-8"
    }
  }

  const renderContent = () => {
    // Priority 1: Custom component via slug
    if (project.caseStudySlug && caseStudyComponents[project.caseStudySlug]) {
      const CustomComponent = caseStudyComponents[project.caseStudySlug]
      return <CustomComponent project={project} />
    }

    // Priority 2: Markdown content
    if (project.caseStudy && !project.comingSoon) {
      return (
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdownSync(project.caseStudy) }}
        />
      )
    }

    // Priority 3: Coming soon state
    return <ComingSoonState project={project} />
  }

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 z-50"
      role="dialog"
      aria-label={`${project.name} Case Study`}
      aria-modal="true"
    >
      {/* Dark Background Overlay */}
      <div
        className="case-study-overlay absolute inset-0 bg-background"
      />

      {/* Scrollable container - everything scrolls together */}
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden z-30">
        <div className="relative min-h-screen">
          {/* Header Section - Revealed after device moves down */}
          <div
            className="case-study-header absolute mt-24 md:mt-32 left-0 right-0 z-10 px-8 md:px-16 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto">
              {/* Large project name */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tight leading-none mb-4 md:mb-8 font-serif">
                {project.name}
              </h1>

              {/* Compact metadata - single line on desktop, stacked on mobile */}
              <div className="flex flex-wrap gap-x-12 gap-y-2 text-sm md:text-base">
                {/* Website */}
                {project.website && (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-foreground/40 font-mono">See Live</span>
                      <div ref={dotRef} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <a
                      href={project.website.startsWith('http') ? project.website : `https://${project.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-light text-foreground/80 hover:text-foreground transition-colors duration-200 pointer-events-auto"
                    >
                      @{project.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  </div>
                )}

                {/* Year */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-foreground/40 font-mono">Year</span>
                  <span className="font-light text-foreground tabular-nums">
                    {project.endYear ? `${project.startYear}–${project.endYear}` : project.startYear}
                  </span>
                </div>

                {/* Industry */}
                {industries.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-foreground/40 font-mono">Industry</span>
                    <span className="font-light text-foreground/80">{industries.join(", ")}</span>
                  </div>
                )}

                {/* Services */}
                {services.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-foreground/40 font-mono">Services</span>
                    <span className="font-light text-foreground/80">{services.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Device Mockup - Expands immediately from hover position */}
          <div
            className="case-study-device absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ height: "100vh" }}
          >
            <div
              className={`device-inner ${
                project.deviceType === "laptop"
                  ? "w-[1200px] h-[900px]"
                  : "w-[580px] h-[580px]"
              }`}
            >
              <Image
                src={project.deviceMockup}
                alt={`${project.name} mockup`}
                fill
                className="object-cover drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Spacer to push content down */}
          <div style={{ height: "100vh" }} />

          {/* Case Study Content */}
          <div
            className="case-study-content relative bg-background py-1 min-h-screen z-40"
          >
            {renderContent()}

            {/* Image Copyright Credit */}
            <div className="absolute bottom-8 right-8 md:right-16 lg:right-20 xl:right-24 z-50">
              <p className="font-mono text-xs uppercase tracking-wider text-foreground/50">
                IMAGE © {project.client}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
