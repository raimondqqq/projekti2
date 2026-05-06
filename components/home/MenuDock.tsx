"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { Project } from '@/types'

interface MenuDockProps {
  onMenuClick: () => void
  isMenuOpen: boolean
  isCaseStudy?: boolean
  onBackClick?: () => void
  projects?: Project[]
  onProjectHover?: (project: Project | null) => void
  onProjectClick?: (project: Project) => void
}

export function MenuDock({ onMenuClick, isMenuOpen, isCaseStudy = false, onBackClick, projects = [], onProjectHover, onProjectClick }: MenuDockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Manage menu mount/unmount with delay for exit animation
  useEffect(() => {
    if (isMenuOpen) {
      setShouldRenderMenu(true)
    } else if (shouldRenderMenu) {
      const timer = setTimeout(() => setShouldRenderMenu(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen, shouldRenderMenu])

  // Cleanup hover timeout
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleProjectMouseEnter = (project: Project) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    onProjectHover?.(project)
  }

  const handleProjectMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      onProjectHover?.(null)
    }, 200)
  }

  // Dock expansion animation
  useGSAP(() => {
    if (!dockRef.current) return

    if (isCaseStudy) {
      // Expand to full width with responsive margins
      // Mobile (<768px): 80px total margins
      // Tablet (768-1280px): 200px total margins
      // Desktop (>1280px): 800px total margins
      let margin = 80
      if (window.innerWidth >= 1280) {
        margin = 800
      } else if (window.innerWidth >= 768) {
        margin = 200
      }
      const targetWidth = window.innerWidth - margin

      gsap.to(dockRef.current, {
        width: targetWidth,
        duration: 0.8,
        ease: "back.in",
      })
    } else {
      // Collapse back to original size
      gsap.to(dockRef.current, {
        width: "auto",
        duration: 0.8,
        ease: "back.in",
      })
    }
  }, [isCaseStudy])

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
    <>
      {/* Dock */}
      <div
        ref={dockRef}
        className={cn(
          "fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[999] opacity-0 animate-fade-in animation-delay-800",
          "flex items-center justify-between gap-32 md:gap-48 lg:gap-72 px-2 py-1 rounded-full",
          "bg-background/5 backdrop-blur-custom",
          "border border-white/10",
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
        )}
      >
        {/* Left Side - Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={isCaseStudy ? onBackClick : onMenuClick}
            aria-label={isCaseStudy ? "Back to projects" : "Toggle menu"}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            className={cn(
              "rounded-full flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
              isCaseStudy ? "px-2 py-2 bg-foreground/10" : "w-10 h-10"
            )}
          >
            {isCaseStudy ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <div className="w-4 h-4 flex flex-col items-center justify-center gap-1">
                <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "rotate-45 translate-y-[5.5px]")} />
                <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "opacity-0")} />
                <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "-rotate-45 -translate-y-[5.5px]")} />
              </div>
            )}
          </button>

          {isCaseStudy && (
            <button
              onClick={onMenuClick}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="main-menu"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              <div className="w-4 h-4 flex flex-col items-center justify-center gap-1">
                <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "rotate-45 translate-y-[5.5px]")} />
                <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "opacity-0")} />
                <span className={cn("w-4 h-[1.5px] bg-foreground rounded-full", isMenuOpen && "-rotate-45 -translate-y-[5.5px]")} />
              </div>
            </button>
          )}
        </div>

        {/* Logo - Absolutely Centered */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo.svg"
            alt="theoria"
            width={100}
            height={22}
            className="h-4 w-24"
            priority
          />
        </Link>

        {/* Right Spacer */}
        <div className="w-10 h-10 flex items-center justify-center">
          <div ref={dotRef} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Expanded Menu */}
      {shouldRenderMenu && (
        <div
          id="main-menu"
          role="navigation"
          aria-label="Main navigation menu"
          className={cn(
            "fixed inset-0 z-[900] flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-custom",
            "transition-all duration-500 ease-out",
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
          onClick={onMenuClick}
        >
          {/* Gradient Accents */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[120px] opacity-0 animate-fade-in animation-delay-200 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] opacity-0 animate-fade-in animation-delay-300 pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-12">
              {[
                { href: "/about", label: "About", number: "01" },
                { href: "/work", label: "Our Work", number: "02" },
                { href: "/playground", label: "Our Services", number: "03" }
              ].map(({ href, label, number }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative opacity-0 animate-fade-in-up animation-delay-400"
                >
                  <span className="absolute -left-16 top-1/2 -translate-y-1/2 font-mono text-xs text-foreground/30 group-hover:text-foreground/50 transition-colors duration-300">
                    {number}
                  </span>
                  <h2 className="text-base uppercase font-mono tracking-widest leading-none transition-all duration-500 ease-out group-hover:tracking-[8]">
                    {label}
                  </h2>
                  <div className="absolute inset-0 -z-10 bg-foreground/0 group-hover:bg-foreground/10 blur-xl transition-all duration-500 rounded-full scale-0 group-hover:scale-150" />
                </Link>
              ))}
            </nav>

            {/* Case Studies Pills - Separate Container */}
            {projects.length > 0 && (
              <div className="flex flex-col items-center gap-4 mt-24 opacity-0 animate-fade-in-up animation-delay-600">
                {/* Divider */}
                <div className="w-12 h-[1px] my-8 bg-foreground/10" />

                {/* Pills Grid */}
                <div className="grid grid-cols-3 items-start gap-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      className={cn(
                        "group flex items-center gap-2 w-fit px-5 py-2.5 rounded-full",
                        "bg-background/10 backdrop-blur-custom border border-foreground/5",
                        "transition-[background-color,color,border-color,box-shadow,opacity] duration-200 ease-out",
                        "hover:bg-foreground hover:text-background hover:border-foreground hover:shadow-md",
                        "text-left pointer-events-auto",
                        project.comingSoon && "opacity-40 hover:opacity-50"
                      )}
                      onMouseEnter={() => handleProjectMouseEnter(project)}
                      onMouseLeave={handleProjectMouseLeave}
                      onClick={() => {
                        onProjectClick?.(project)
                        onMenuClick() // Close the menu after clicking a project
                      }}
                    >
                      <span className="text-xs font-normal font-mono uppercase tracking-widest whitespace-nowrap">
                        {project.name}
                      </span>
                      {project.comingSoon && (
                        <span className="text-[8px] text-violet-500 uppercase tracking-wider">
                          Soon
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Close Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-foreground/30 opacity-0 animate-fade-in animation-delay-600">
            Click anywhere to close
          </div>
        </div>
      )}
    </>
  )
}
