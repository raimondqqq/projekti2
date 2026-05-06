"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Flip } from "gsap/dist/Flip"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip)
}

export function FlipWordDemo() {
  const containerRef = useRef<HTMLElement>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const scroller = containerRef.current.closest('.overflow-y-auto') as HTMLElement

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Flip Demo: Smooth word transition between sections
    if (section1Ref.current && section2Ref.current) {
      // Split both sections into words
      SplitText.create(section1Ref.current, {
        type: "words",
        wordsClass: "flip-word",
        autoSplit: true,
        onSplit(self) {
          const split1 = self

          const split2 = SplitText.create(section2Ref.current, {
            type: "words",
            wordsClass: "flip-word",
            autoSplit: true
          })

          // Find the word "MOVE" in section 1
          const wordToMove = Array.from(split1.words).find(word =>
            word.textContent?.toUpperCase().includes('MOVE')
          ) as HTMLElement | undefined

          // Find first word in section 2
          const firstWord = split2.words[0] as HTMLElement

          if (wordToMove && firstWord) {
            // Store original parent and next sibling for proper restoration
            const originalParent = wordToMove.parentNode
            const originalNextSibling = wordToMove.nextSibling

            // Style the word to move with accent color
            wordToMove.style.display = 'inline-block'
            wordToMove.style.willChange = 'transform, opacity'
            wordToMove.style.color = '#14b8a6' // Teal-500
            wordToMove.style.fontWeight = '600'

            let hasAnimated = false

            ScrollTrigger.create({
              scroller: scroller,
              trigger: section2Ref.current,
              start: "top 60%",
              end: "top 40%",
              onEnter: () => {
                if (hasAnimated) return
                hasAnimated = true

                // 1. Capture state with ALL surrounding words
                const flipState = Flip.getState([wordToMove, ...(split2.words as HTMLElement[])])

                // 2. Move word directly to new location
                firstWord.parentNode?.insertBefore(wordToMove, firstWord)

                // Apply accent styling
                wordToMove.style.color = '#14b8a6'
                wordToMove.style.fontWeight = '600'
                wordToMove.style.marginRight = '0.25em'

                // 3. Animate with smooth easing - Flip handles the layout shift
                Flip.from(flipState, {
                  duration: 1.2,
                  ease: "power2.inOut",
                  absolute: true,
                  scale: true
                })
              },
              onLeaveBack: () => {
                if (!hasAnimated) return
                hasAnimated = false

                // 1. Capture state with ALL words
                const state = Flip.getState([wordToMove, ...(split2.words as HTMLElement[])])

                // 2. Move word back to original position
                if (originalParent) {
                  if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
                    originalParent.insertBefore(wordToMove, originalNextSibling)
                  } else {
                    originalParent.appendChild(wordToMove)
                  }
                }

                // Reapply accent styling
                wordToMove.style.color = '#14b8a6'
                wordToMove.style.fontWeight = '600'

                // 3. Animate back smoothly
                Flip.from(state, {
                  duration: 1.2,
                  ease: "power2.inOut",
                  absolute: true,
                  scale: true
                })
              }
            })
          }
        }
      })
    }

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-between py-24 px-6 md:px-12">
      <div className="flex flex-col justify-center min-h-[45vh] max-w-7xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-foreground/30 mb-8">Scroll to see the magic ↓</div>
        <p
          ref={section1Ref}
          className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[1.2] text-foreground"
          style={{ letterSpacing: '-0.02em' }}
        >
          This is an example of a string that will MOVE
        </p>
      </div>
      <div className="flex flex-col justify-center min-h-[45vh] items-end max-w-7xl mx-auto w-full">
        <div className="text-xs uppercase tracking-[0.2em] text-foreground/30 mb-8 text-right">Watch it land here ↓</div>
        <p
          ref={section2Ref}
          className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[1.2] text-foreground text-right"
          style={{ letterSpacing: '-0.02em' }}
        >
          here and move the rest of the content accordingly
        </p>
      </div>
    </section>
  )
}
