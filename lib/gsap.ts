"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register all plugins
gsap.registerPlugin(useGSAP, ScrollTrigger)

// Set global defaults
gsap.defaults({
  ease: "power1.out",
  duration: 0.6,
})

// Export everything
export { gsap, useGSAP, ScrollTrigger }
