"use client"

import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface LoaderProps {
  progress: number
  onComplete?: () => void
}

/**
 * Editorial-style loader with refined typography and sophisticated animations
 * Matches the design language of the main site with magazine-inspired aesthetics
 */
export function Loader({ progress, onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const [displayProgress, setDisplayProgress] = useState(0)

  // Animate progress bar and counter
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: progress / 100,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Animate the counter with GSAP
    const counter = { value: displayProgress }
    gsap.to(counter, {
      value: progress,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayProgress(Math.round(counter.value))
      }
    })
  }, [progress, displayProgress])

  // Entrance animation
  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' }
    })

    const progressBarContainer = progressBarRef.current?.parentElement

    // Stagger in the elements with editorial timing
    if (labelRef.current) {
      tl.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
    }

    if (percentRef.current) {
      tl.from(percentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.4')
    }

    if (progressBarContainer) {
      tl.from(progressBarContainer, {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        transformOrigin: 'left center',
      }, '-=0.5')
    }

    if (subtextRef.current) {
      tl.from(subtextRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.5,
      }, '-=0.3')
    }

  }, { scope: containerRef })

  // Exit animation when complete
  useGSAP(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      })

      const progressBarContainer = progressBarRef.current?.parentElement

      if (percentRef.current) {
        tl.to(percentRef.current, {
          scale: 1.1,
          ease: 'back.out(2)',
          duration: 0.3,
        })
        .to(percentRef.current, {
          scale: 1,
          ease: 'power2.out',
          duration: 0.2,
        })
      }

      const exitTargets = [labelRef.current, subtextRef.current].filter(Boolean)
      if (exitTargets.length > 0) {
        tl.to(exitTargets, {
          y: -10,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.05,
        }, '-=0.1')
      }

      if (progressBarContainer) {
        tl.to(progressBarContainer, {
          scaleX: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          transformOrigin: 'right center',
        }, '-=0.3')
      }

      if (percentRef.current) {
        tl.to(percentRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        }, '-=0.4')
      }

      if (containerRef.current) {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        }, '-=0.2')
      }
    }
  }, [progress])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#F0FFFE] flex items-center justify-center z-[1001]"
    >
      <div className="relative flex flex-col items-center gap-12 max-w-lg w-full px-8">

        {/* Label */}
        <div
          ref={labelRef}
          className="text-xs uppercase tracking-[0.3em] font-mono text-black/40 font-light"
        >
          Preparing Experience
        </div>

        {/* Large Percentage Display */}
        <div className="relative overflow-hidden px-8 py-4">
          <div
            ref={percentRef}
            className="text-[clamp(4rem,12vw,8rem)] font-extralight leading-none tracking-tight text-black inline-flex items-baseline tabular-nums"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
          >
            {displayProgress}
            <span className="ml-4 text-[0.4em] opacity-50">%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs relative">
          <div className="h-[1px] bg-black/10 overflow-hidden relative">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-black origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* Subtext */}
        <div
          ref={subtextRef}
          className="text-xs uppercase font-light text-black/30 tracking-widest text-center font-mono"
        >
          Loading assets & preparing animations
        </div>

      </div>
    </div>
  )
}
