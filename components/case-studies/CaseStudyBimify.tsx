"use client"

import { useRef } from "react"
import Image from "next/image"
import { CaseStudyProps } from '@/types'
import { ANIMATION } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { Check, X } from 'lucide-react'
import { CaseStudyTestimonial } from './CaseStudyTestimonial'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
}

/**
 * Bimify Case Study - Redesigned with narrative context
 * Construction tech aesthetic with orange accents
 */

export function CaseStudyBimify({ project }: CaseStudyProps) {
  const images = project.caseStudyImages ? JSON.parse(project.caseStudyImages) : []
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const scroller = containerRef.current?.closest('.overflow-y-auto') as HTMLElement

      // Context section: fade in
      gsap.fromTo('.context-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.context-section',
            start: 'top 75%',
          }
        }
      )

      // Hero: Word reveal on "architects"
      gsap.fromTo('.hero-headline .cs-animate-word',
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          stagger: 0.075,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            scroller,
            trigger: '.hero-headline',
            start: 'top 80%',
          }
        }
      )

      // Hero: Background number parallax
      gsap.to('.hero-number', {
        y: 150,
        opacity: 0.03,
        ease: 'none',
        scrollTrigger: {
          scroller,
          trigger: '.hero-headline',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // How we worked section: fade in
      gsap.fromTo('.workflow-section',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.workflow-section',
            start: ANIMATION.scroll.start75,
          }
        }
      )

      // Section 1: ScrambleText animation on "coherent"
      const section1Scramble = containerRef.current?.querySelector('.section1-scramble')
      if (section1Scramble) {
        gsap.to(section1Scramble, {
          duration: 1.6,
          ease: "power2.inOut",
          scrambleText: {
            text: "coherent.",
            chars: "lowerCase",
            revealDelay: 0.5,
            tweenLength: false,
          },
          scrollTrigger: {
            scroller,
            trigger: '.section1-headline',
            start: "top 75%",
          }
        })
      }

      // Section 1 Image: Parallax effect
      gsap.to('.section1-image img', {
        y: -60,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          scroller,
          trigger: '.section1-image',
          start: ANIMATION.scroll.startBottom,
          end: ANIMATION.scroll.endTop,
          scrub: true,
        }
      })

      // Process steps: enhanced stagger with scale
      gsap.fromTo('.process-step',
        { y: 60, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.25,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            scroller,
            trigger: '.process-steps',
            start: 'top 75%',
          }
        }
      )

      // Process step numbers: slide in from left
      gsap.fromTo('.process-step .cs-section-number',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.25,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.process-steps',
            start: 'top 75%',
          }
        }
      )

      // Gallery: Staggered image reveal with rotation
      gsap.fromTo('.gallery-section .cs-gallery-item',
        { scale: 0.94, y: 40, opacity: 0, rotateZ: -2 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            scroller,
            trigger: '.gallery-section',
            start: 'top 75%',
          }
        }
      )

      // Closing headline: word reveal
      gsap.fromTo('.closing-headline',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          ease: ANIMATION.ease.sine,
          scrollTrigger: {
            scroller,
            trigger: '.closing-section',
            start: 'top 75%',
          }
        }
      )

      // Closing text: fade in with delay
      gsap.fromTo('.closing-text',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.medium,
          delay: 0.3,
          scrollTrigger: {
            scroller,
            trigger: '.closing-section',
            start: 'top 75%',
          }
        }
      )

      // "Still shipping" emphasis
      gsap.fromTo('.still-shipping',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.medium,
          delay: 0.5,
          scrollTrigger: {
            scroller,
            trigger: '.closing-section',
            start: 'top 75%',
          }
        }
      )

      // Final emphasis line: special reveal with scale
      gsap.fromTo('.embedded-emphasis',
        { scale: 0.92, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            scroller,
            trigger: '.closing-section',
            start: 'top 75%',
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="cs-bimify min-h-screen relative">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12">
        <div
          className="hero-number absolute top-0 right-0 text-[clamp(15rem,35vw,30rem)] font-extralight leading-none text-orange-400/[0.02] select-none pointer-events-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          20
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="cs-badge cs-badge-accent">
                  Case Study
                </span>
              </div>

              <h1 className="hero-headline cs-hero-headline">
                Designed by architects. Built for <span className="cs-animate-word inline-block text-orange-400">architects.</span>
              </h1>
            </div>

            <div className="cs-tags">
              {['Construction Tech', '·', 'SaaS', '·', 'Product Design', '·', 'Design System'].map((tag, index) => (
                <span key={`${tag}-${index}`} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:col-span-4 space-y-4 text-foreground/80">
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Platform</div>
              <div className="cs-meta-value">Bimify</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Impact</div>
              <div className="cs-meta-value">1 design system from day one<br/>Full product design</div>
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="context-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Context</div>
          </div>
          <div className="md:col-span-10">
            <p className="cs-intro-text">
              Bimify automates BIM processes — taking 2D drawings to full BIM models in minutes. The founding team is a mix of engineers, architects, and civil engineers who knew exactly what they wanted to build but needed someone to figure out how it should work and look.
              <br/><br/>
              That's where the architecture background became a cheat code. We didn't need a crash course in Revit, AutoCAD, or 3ds Max. We didn't need anyone to explain what a clash detection is or why LOD matters. <span className="text-orange-400">Architectural degrees on our side meant we spoke the same language from day one.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Voice - Aleksandar Testimonial */}
      <CaseStudyTestimonial
        quote="Having architects on the design side changed everything — we skipped months of back and forth explaining how our industry works. The design system they put in place became the backbone of our entire development process."
        avatarUrl="/img/bimify/aleksandar.webp"
        name="Aleksandar Balicevac"
        title="Founder"
        company="Bimify"
        accentColor="orange-400"
      />

      {/* How we worked */}
      <section className="workflow-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">How we worked</div>
          </div>
          <div className="md:col-span-7">
            <p className="cs-intro-text">
              We came in early — early enough that the product was still being shaped — and that meant every screen, every flow, every interaction went through our hands first.
            </p>
          </div>
          <div className="md:col-span-3 text-sm font-light text-foreground/70 leading-relaxed space-y-4">
            <p>When you're embedded from day one, you don't just design the product. You shape it.</p>
          </div>
        </div>
      </section>

      {/* Section 1: Design System First */}
      <section className="cs-section relative h-screen">
        <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                01 / Foundation
              </div>
              <h2 className="section1-headline cs-section-headline">
                One <span className="section1-scramble cs-animate-word inline-block">xj%4#8s9gg2&!ty/</span> product
              </h2>
            </div>
            <div className="cs-body-text space-y-4">
              <p>
                <span className="text-orange-400 font-normal">Design system first, features second.</span> Before touching a single feature, we built the system. Components, patterns, spacing, typography — all locked in so the engineering team could move fast without waiting on us for every button and modal.
              </p>
              <p>
                When you're shipping features continuously, you can't afford to design each one from scratch.
              </p>
            </div>
          </div>

          <div className="section1-image h-100vh relative overflow-hidden">
            <Image
              src={images[0] || "/img/bimify/bimify-ortho.webp"}
              alt="Bimify design system"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="process-steps grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="process-step space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                02 / Continuous refinement
              </div>
              <h3 className="text-3xl md:text-4xl font-extralight leading-tight tracking-tight text-foreground/90">
                No hero features
              </h3>
              <p className="cs-body-text">
                There's no single feature we'd put on a pedestal. The work was cumulative — dozens of features, each one iterated on, each one informed by the last. The value wasn't in any one screen. It was in the fact that the whole thing held together as one coherent product.
              </p>
            </div>

            <div className="process-step space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                03 / Speaking the language
              </div>
              <h3 className="text-3xl md:text-4xl font-extralight leading-tight tracking-tight text-foreground/90">
                Architects for architects
              </h3>
              <p className="cs-body-text">
                When your designers have sat through the same university crits, used the same clunky software, felt the same pain points — the work just hits different. We didn't design <span className="italic">for</span> architects. We designed <span className="italic text-orange-400">as</span> architects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src={images[1] || "/img/bimify/bimify-front.webp"} alt="Bimify interface" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src={images[2] || "/img/bimify/bimify-front-final.webp"} alt="Bimify final interface" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-5 aspect-[4/3] cs-image-container">
              <Image src={images[3] || "/img/bimify/bim-device.webp"} alt="Bimify on device" width={800} height={450} className="w-full h-full object-cover" />
            </div>
            <div className="cs-gallery-item md:col-span-7 aspect-[4/3] cs-image-container">
              <Image src={images[4] || "/img/bimify/bimify-ortho-final.webp"} alt="Bimify orthographic view" width={800} height={450} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="closing-section cs-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="cs-divider-accent"></div>
              <div className="cs-eyebrow">Outro</div>
            </div>
            <div className="md:col-span-10 space-y-8">
              <h2 className="closing-headline text-[clamp(2.5rem,6vw,4rem)] max-w-4xl font-extralight leading-[1.1] tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                When the design team doesn't need a translator
              </h2>
              <p className="closing-text text-lg md:text-xl font-light leading-relaxed text-foreground/70 max-w-3xl">
                Bimify is what happens when the design team doesn't need a translator. When your designers have sat through the same university crits, used the same clunky software, felt the same pain points — the work just hits different.
              </p>
              <div className="still-shipping pt-8 border-t border-white/5 max-w-3xl">
                <p className="text-lg md:text-xl font-light leading-relaxed text-foreground/70">
                  <span className="text-orange-400">Still shipping.</span> The collaboration didn't end with a handoff deck. One of our designers joined Bimify full-time, continuing the work—designing new features, supporting releases, iterating on the system.
                </p>
                <p className="embedded-emphasis text-2xl md:text-4xl font-light leading-tight text-orange-400 mt-8 tracking-tight">
                  This is embedded design, not deliverables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
