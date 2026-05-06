"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

// Client logos
const CLIENTS = [
  { name: "Client 1", logo: "/img/clientlogos/client1.svg" },
  { name: "Client 2", logo: "/img/clientlogos/client2.svg" },
  { name: "Client 3", logo: "/img/clientlogos/client3.svg" },
  { name: "Client 4", logo: "/img/clientlogos/client4.svg" },
  { name: "Client 5", logo: "/img/clientlogos/client5.svg" },
  { name: "Client 6", logo: "/img/clientlogos/client6.svg" },
  { name: "KB", logo: "/img/clientlogos/kb-light.svg" },
  { name: "Sematext", logo: "/img/clientlogos/sematext-light.svg" },
  { name: "Solidshape", logo: "/img/clientlogos/solidshape-logo-white.svg" },
  { name: "ITX", logo: "/img/clientlogos/itx.svg" },
  { name: "Mita", logo: "/img/clientlogos/mita.png" },
  { name: "Remgu", logo: "/img/clientlogos/remgu-logo-white.svg" }
]

export function ClientCarousel() {
  const carousel1Ref = useRef<HTMLDivElement>(null)
  const carousel2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!carousel1Ref.current || !carousel2Ref.current) return

    // Calculate height of one complete set (no gap between items)
    const itemHeight = 128 // h-32 (128px)
    const totalHeight = itemHeight * CLIENTS.length

    // Column 1: Seamless infinite scroll down
    gsap.to(carousel1Ref.current, {
      y: -totalHeight,
      duration: 30,
      ease: "none",
      repeat: -1
    })

    // Column 2: Seamless infinite scroll up (reversed)
    gsap.fromTo(carousel2Ref.current,
      { y: -totalHeight },
      {
        y: 0,
        duration: 30,
        ease: "none",
        repeat: -1
      }
    )
  }, [])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Two columns with opposite animations */}
      <div className="flex gap-0">
        {/* Column 1 - Scrolling Down */}
        <div
          ref={carousel1Ref}
          className="flex-1 flex flex-col"
        >
          {/* Duplicate the entire set twice for seamless infinite scrolling */}
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <div
              key={`col1-${index}`}
              className="flex items-center justify-center h-32 border-b border-l border-foreground/10 hover:bg-foreground/5 transition-colors duration-300 px-8"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale brightness-0 invert"
              />
            </div>
          ))}
        </div>

        {/* Column 2 - Scrolling Up (Reversed) */}
        <div
          ref={carousel2Ref}
          className="flex-1 flex flex-col"
        >
          {/* Duplicate the entire set twice for seamless infinite scrolling */}
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <div
              key={`col2-${index}`}
              className="flex items-center justify-center h-32 border-b border-l border-r border-foreground/10 hover:bg-foreground/5 transition-colors duration-300 px-8"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
