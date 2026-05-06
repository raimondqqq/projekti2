"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function BreakAnimation() {
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!wordRef.current) return

    // Split the word into individual characters
    const word = wordRef.current
    const text = word.textContent || ""
    word.innerHTML = ""

    // Create individual spans for each character
    const chars = text.split("").map((char) => {
      const span = document.createElement("span")
      span.textContent = char
      span.style.display = "inline-block"
      span.style.position = "relative"
      word.appendChild(span)
      return span
    })

    // Set up the animation timeline
    const tl = gsap.timeline({
      paused: true,
    })

    // Blast/explode effect - characters fly out in different directions
    tl.to(chars, {
      x: (i) => gsap.utils.random(-80, 80),
      y: (i) => gsap.utils.random(-80, 80),
      rotation: (i) => gsap.utils.random(-360, 360),
      scale: (i) => gsap.utils.random(0.5, 1.5),
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        each: 0.03,
        from: "center",
      },
    })

    // Reassemble - characters come back together
    tl.to(
      chars,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.03,
          from: "edges",
        },
      },
      "+=0.2"
    )

    // Play animation once on load with a slight delay
    gsap.delayedCall(1.2, () => {
      tl.play()
    })

    // Mouse enter handler
    const handleMouseEnter = () => {
      tl.restart()
    }

    word.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      word.removeEventListener("mouseenter", handleMouseEnter)
      tl.kill()
    }
  }, [])

  return (
    <span
      ref={wordRef}
      className="inline-block cursor-pointer transition-colors hover:text-foreground"
      style={{ whiteSpace: "nowrap" }}
    >
      break
    </span>
  )
}
