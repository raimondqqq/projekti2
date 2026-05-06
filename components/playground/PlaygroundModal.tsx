"use client"

import { useEffect, useRef, useState } from "react"
import { X, ExternalLink, Github, GitFork, Calendar } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface PlaygroundModalProps {
  isOpen: boolean
  onClose: () => void
  experiment: {
    id: number
    title: string
    description: string | null
    githubUrl: string
    liveUrl: string | null
    tags: string[]
    updatedAt: string
  } | null
}

export function PlaygroundModal({
  isOpen,
  onClose,
  experiment,
}: PlaygroundModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isAnimatingRef = useRef(false)
  const iframeContainerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Preset screen sizes
  const screenSizes = [
    { name: "Default", width: 0 },
    { name: "iPhone SE", width: 375 },
    { name: "iPhone 15", width: 393 },
    { name: "iPhone Plus", width: 428 },
    { name: "Tablet", width: 768 },
  ]

  const [activeSize, setActiveSize] = useState("Default")

  // Entrance animation
  useGSAP(
    () => {
      if (isOpen && experiment && backdropRef.current && modalRef.current) {
        const tl = gsap.timeline()

        // Reset initial state
        gsap.set(backdropRef.current, { opacity: 0 })
        gsap.set(modalRef.current, { scale: 0.9, opacity: 0 })
        gsap.set(contentRef.current?.children || [], {
          opacity: 0,
          y: 20,
        })

        // Animate in
        tl.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
          .to(
            modalRef.current,
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.2)",
            },
            "-=0.15"
          )
          .to(
            contentRef.current?.children || [],
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.2"
          )
      }
    },
    { dependencies: [isOpen, experiment], scope: backdropRef }
  )

  // Exit animation
  const handleClose = () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false
        onClose()
      },
    })

    tl.to(contentRef.current?.children || [], {
      opacity: 0,
      y: -10,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
    })
      .to(
        closeButtonRef.current,
        {
          rotation: 90,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
        },
        0
      )
      .to(
        modalRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        },
        "-=0.1"
      )
      .to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.15"
      )
  }

  // Change screen size with animation
  const changeScreenSize = (name: string, width: number) => {
    if (!iframeRef.current) return

    setActiveSize(name)

    if (width === 0) {
      // Animate to full width
      gsap.to(iframeRef.current, {
        width: "100%",
        duration: 0.4,
        ease: "power2.inOut",
      })
    } else {
      // Animate to specific width (centered)
      gsap.to(iframeRef.current, {
        width: width,
        duration: 0.4,
        ease: "power2.inOut",
      })
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !experiment) return null

  const formattedDate = new Date(experiment.updatedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  )

  const handleFork = () => {
    // Extract owner and repo name from GitHub URL
    const match = experiment.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (match) {
      const [, owner, repo] = match
      window.open(`https://github.com/${owner}/${repo}/fork`, "_blank")
    }
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full h-full max-w-7xl max-h-[90vh] m-4 md:m-8 bg-background border border-border/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-foreground hover:text-background transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Side - Iframe Preview */}
          <div
            ref={iframeContainerRef}
            className="flex-1 bg-muted relative flex items-center justify-center"
            style={{
              minWidth: "320px",
              backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.15) 1px, transparent 1px)",
              backgroundSize: "16px 16px"
            }}
          >
            {experiment.liveUrl ? (
              <iframe
                ref={iframeRef}
                src={experiment.liveUrl}
                className="h-full border-0"
                style={{ width: "100%" }}
                title={experiment.title}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/40">
                <div className="text-center">
                  <ExternalLink className="w-12 h-12 mx-auto mb-4" />
                  <p>No live preview available</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Metadata */}
          <div
            ref={contentRef}
            className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-border/40 overflow-y-auto flex-shrink-0"
          >
          {/* Title */}
          <h2 className="text-2xl font-light tracking-tight mb-2">
            {experiment.title}
          </h2>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
            <Calendar className="w-4 h-4" />
            <span>Updated {formattedDate}</span>
          </div>

          {/* Screen Size Pills */}
          <div className="hidden md:block mb-6">
            <h3 className="text-sm font-medium text-foreground/60 mb-3">
              Screen Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {screenSizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => changeScreenSize(size.name, size.width)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
                    activeSize === size.name
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground/70 hover:bg-foreground/10"
                  }`}
                >
                  {size.name}
                  {size.width > 0 && (
                    <span className="ml-1 opacity-60">({size.width}px)</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          {experiment.description && (
            <p className="text-foreground/70 mb-6 leading-relaxed">
              {experiment.description}
            </p>
          )}

          {/* Tags */}
          {experiment.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground/60 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {experiment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted text-foreground/70 border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto space-y-3">
            {/* View on GitHub */}
            <a
              href={experiment.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-border/40 bg-background/60 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">View on GitHub</span>
            </a>

            {/* Fork Repository */}
            <button
              onClick={handleFork}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-border/40 bg-background/60 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <GitFork className="w-4 h-4" />
              <span className="text-sm font-medium">Fork Repository</span>
            </button>

            {/* Open Live Demo */}
            {experiment.liveUrl && (
              <a
                href={experiment.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-border/40 bg-background/60 hover:bg-foreground hover:text-background transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Open in New Tab</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

