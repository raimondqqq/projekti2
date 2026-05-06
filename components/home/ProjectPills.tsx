"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Project } from '@/types'

interface ProjectPillsProps {
  projects: Project[]
  onHover: (project: Project | null) => void
  onClick: (project: Project) => void
  hoverPreviewRef: React.RefObject<{ getDevicePosition: () => DOMRect | null; reverse: () => void; play: () => void } | null>
}

interface ProjectPillProps {
  project: Project
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

function ProjectPill({ project, onMouseEnter, onMouseLeave, onClick }: ProjectPillProps) {
  return (
    <button
      aria-label={`${project.comingSoon ? 'Coming soon: ' : 'View '}${project.name} project`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(
        // Layout
        "flex items-center gap-2 w-fit px-2.5 py-2 rounded-full",
        // Appearance
        "bg-background/10 backdrop-blur-custom",
        "border border-foreground/5",
        // Animation
        "opacity-0 animate-fade-in animation-delay-600",
        // Interaction
        "transition-colors duration-200 ease-out",
        "hover:bg-foreground/10 hover:border-foreground/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
        "pointer-events-auto"
      )}
    >
      <span className="text-[11px] font-normal font-mono uppercase tracking-widest whitespace-nowrap">
        {project.name}
      </span>
      {project.comingSoon && (
        <span className="text-[8px] opacity-70 text-violet-500 uppercase tracking-wider">
          Soon
        </span>
      )}
    </button>
  )
}

export function ProjectPills({ projects, onHover, onClick, hoverPreviewRef }: ProjectPillsProps) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentProjectRef = useRef<Project | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (project: Project) => {
    // Clear any pending hover off timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    // Clear any pending switch timeout
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current)
    }

    // If switching between pills (not from null state), add 1s delay
    if (currentProjectRef.current && currentProjectRef.current.id !== project.id) {
      switchTimeoutRef.current = setTimeout(() => {
        onHover(project)
        hoverPreviewRef.current?.play()
        currentProjectRef.current = project
      }, 550)
    } else {
      // First hover or re-hovering same pill - no delay
      onHover(project)
      hoverPreviewRef.current?.play()
      currentProjectRef.current = project
    }
  }

  const handleMouseLeave = () => {
    // Immediately trigger reverse animation
    hoverPreviewRef.current?.reverse()

    // After 2 seconds, clear the project
    hoverTimeoutRef.current = setTimeout(() => {
      onHover(null)
      currentProjectRef.current = null
    }, 1200)
  }

  return (
    <div
      className={cn(
        // Base positioning
        "fixed z-10 pointer-events-none",
        // Mobile: 3-column grid at bottom, full width
        "left-4 right-4 bottom-16",
        "grid grid-cols-3 gap-1",
        // Tablet: adjust spacing and position
        "md:left-8 md:right-auto md:bottom-24 md:gap-2 md:w-fit",
        // Desktop: vertical stack, truly centered vertically
        "xl:left-12 xl:top-[50vh] xl:-translate-y-1/2 xl:bottom-auto",
        "xl:flex xl:flex-col"
      )}
    >
      {projects.map((project) => (
        <ProjectPill
          key={project.id}
          project={project}
          onMouseEnter={() => handleMouseEnter(project)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClick(project)}
        />
      ))}
    </div>
  )
}

