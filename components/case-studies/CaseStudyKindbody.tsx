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
import { CaseStudyTestimonialCarousel } from './CaseStudyTestimonialCarousel'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
}

/**
 * Kindbody Case Study - Redesigned with narrative context
 * Warm, human-centered healthcare aesthetic with pale yellow accents
 */

export function CaseStudyKindbody({ project }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const scroller = containerRef.current?.closest('.overflow-y-auto') as HTMLElement

      // Landscape section: fade in
      gsap.fromTo('.landscape-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.landscape-section',
            start: 'top 75%',
          }
        }
      )

      // Hero: Word reveal on "compassion"
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

      // Hero: Background symbol parallax
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

      // Origin section: fade in
      gsap.fromTo('.origin-section',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.origin-section',
            start: ANIMATION.scroll.start75,
          }
        }
      )

      // Role: ScrambleText animation on "trust"
      const roleScramble = containerRef.current?.querySelector('.role-scramble')
      if (roleScramble) {
        gsap.to(roleScramble, {
          duration: 1.6,
          ease: "power2.inOut",
          scrambleText: {
            text: "trust.",
            chars: "lowerCase",
            revealDelay: 0.5,
            tweenLength: false,
          },
          scrollTrigger: {
            scroller,
            trigger: '.role-section',
            start: "top 75%",
          }
        })
      }

      // Day in the life: fade in
      gsap.fromTo('.day-in-life',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION.duration.slow,
          scrollTrigger: {
            scroller,
            trigger: '.day-in-life',
            start: 'top 75%',
          }
        }
      )

      // Challenge: Problem checklist
      gsap.fromTo('.problem-block .checklist-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.problem-block',
            start: 'top 75%',
          }
        }
      )

      // Challenge: Solution checklist
      gsap.fromTo('.solution-block .solution-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: ANIMATION.ease.outMedium,
          scrollTrigger: {
            scroller,
            trigger: '.solution-block',
            start: 'top 75%',
          }
        }
      )

      // Challenge: Before/After Images
      gsap.fromTo('.before-after-images .ba-image',
        { scale: 0.96, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: '.before-after-images',
            start: 'top 75%',
          }
        }
      )

      // Stats: Animated numbers
      const statsNumbers = containerRef.current?.querySelectorAll('.stats-grid .cs-stat-number')
      statsNumbers?.forEach((stat) => {
        const target = parseInt((stat as HTMLElement).getAttribute('data-target') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            scroller,
            trigger: '.stats-grid',
            start: 'top 75%',
          },
          onUpdate: () => {
            const formatted = Math.round(obj.value).toLocaleString()
            stat.textContent = formatted
          }
        })
      })

      // Process steps: stagger animation
      gsap.fromTo('.process-step',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            scroller,
            trigger: '.process-steps',
            start: 'top 75%',
          }
        }
      )

      // Impact quote: scale in
      gsap.from('.impact-quote', {
        scale: 0.95,
        opacity: 0,
        duration: ANIMATION.duration.xSlow,
        ease: ANIMATION.ease.sine,
        scrollTrigger: {
          scroller,
          trigger: '.impact-quote',
          start: ANIMATION.scroll.start75,
        }
      })

      // Takeaway: Gentle fade in
      gsap.from('.takeaway-section', {
        y: 40,
        opacity: 0,
        duration: ANIMATION.duration.verySlow,
        scrollTrigger: {
          scroller,
          trigger: '.takeaway-section',
          start: ANIMATION.scroll.start75,
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="cs-kindbody min-h-screen relative">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12">
        <div
          className="hero-number absolute top-0 right-0 text-[clamp(15rem,35vw,30rem)] font-extralight leading-none text-amber-300/[0.06] select-none pointer-events-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          ✦
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="cs-badge cs-badge-accent">
                  Case Study
                </span>
              </div>

              <h1 className="hero-headline cs-hero-headline">
                When precision meets <span className="cs-animate-word inline-block text-amber-300">compassion</span>
              </h1>
            </div>

            <div className="cs-tags">
              {['IVF', 'Product Design', 'Clinical Tools', 'Patient Portal'].map((tag) => (
                <span key={tag} className="cs-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-6 text-foreground">
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Company</div>
              <div className="cs-meta-value">Kindbody</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Role</div>
              <div className="cs-meta-value">Lead Product Designer</div>
            </div>
            <div className="cs-meta-group">
              <div className="cs-eyebrow-accent">Focus</div>
              <div className="cs-meta-value">Clinical EMR<br/>Provider Tools<br/>Patient Portal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <section className="relative h-[70vh] overflow-hidden px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto h-full cs-image-container">
          <Image
            src="/img/kindbody/kb-desktop1.webp"
            alt="Kindbody platform dashboard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>
      </section>

      {/* Context */}
      <section className="landscape-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Context</div>
          </div>
          <div className="md:col-span-10">
            <p className="cs-intro-text">
              One in six couples face infertility. The journey to parenthood through IVF is clinical, expensive, and emotionally exhausting. The technology supporting this journey? Often stuck in the 1990s. <span className="text-amber-300">Kindbody set out to change that.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Voice - Richard Forsythe Testimonial */}
      <CaseStudyTestimonial
        quote="Haris' demonstrated a rare ability to translate complex clinical requirements into clean, functional design. His work on our complex EMR workflows brought much-needed clarity to critical processes where accuracy is non-negotiable."
        avatarUrl="/img/kindbody/richard-avatar.avif"
        name="Richard Forsythe"
        title="Chief Product & Technology Officer"
        company="Kindbody"
        accentColor="amber-300"
      />

      {/* The Beginning */}
      <section className="origin-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">The Beginning</div>
          </div>
          <div className="md:col-span-7 space-y-8">
            <p className="cs-intro-text">
              Spreadsheets for lab tracking. Disparate systems for patient data. <span className="text-amber-300">Paper logs for critical embryo information.</span>
            </p>
          </div>
          <div className="md:col-span-3 text-sm font-light text-foreground/70 leading-relaxed space-y-4">
            <p>The challenge wasn't just design—it was earning trust from medical professionals where mistakes have real consequences.</p>
          </div>
        </div>
      </section>

      {/* Section 1: Building Trust */}
      <section className="role-section cs-section relative h-screen">
        <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="cs-section-number cs-section-number-accent">
                01 / Foundation
              </div>
              <h2 className="cs-section-headline">
                Designing for <span className="role-scramble cs-animate-word inline-block">xj%4#8s9gg2y/</span>
              </h2>
            </div>
            <div className="cs-body-text space-y-4">
              <p>
                We didn't speak their language. Early mockups got polite nods and skeptical looks from embryologists who'd been doing this work for decades.
              </p>
              <p className="font-serif font-thin italic text-amber-300 text-3xl">
                "You don't understand what happens in the lab"
              </p>
              <p>
                They were right. This wasn't about beautiful UI. It was about building tools that medical professionals could stake their reputation on—and that patients could trust with their future families.
              </p>
            </div>
          </div>

          <div className="h-100vh relative">
            <Image
              src="/img/kindbody/dashboard1.webp"
              alt="Kindbody provider dashboard interface"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <CaseStudyTestimonialCarousel
        testimonials={[
          {
            quote: "Working together was a pleasure. Haris combines a strong understanding of the business with thoughtful design execution. His work helped modernize our patient portal while improving efficiency and supporting new EMR workflows.",
            avatarUrl: "/img/kindbody/viet-tran-avatar.png",
            name: "Viet Tran",
            title: "Product Manager",
            company: "Kindbody"
          },
          {
            quote: "Haris handled everything from patient portal improvements to complex EMR workflows without missing a beat. Thoughtful, reliable, innovative, and easy to work with, Haris is the kind of collaborator you want on a product team.",
            avatarUrl: "/img/kindbody/elizabeth-avatar.jpeg",
            name: "Elizabeth Garzon",
            title: "Product Manager",
            company: "Kindbody"
          }
        ]}
        accentColor="amber-300"
      />

      {/* The Reality */}
      <section className="day-in-life cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">The Reality</div>
          </div>
          <div className="md:col-span-7">
            <p className="cs-intro-text">
              Picture this:<br></br> An embryologist managing <span className="text-amber-300">12 active IVF cycles</span> across 3 labs.<br></br><br></br> Day 3: Check embryo development. Update patient records. Coordinate with providers across time zones.<br></br><br></br>The tools? <span className="text-amber-300">Excel spreadsheets. Paper logs.</span> A patchwork of disconnected systems.
            </p>
          </div>
          <div className="md:col-span-3 text-sm font-light text-foreground leading-relaxed space-y-4">
            <p>One misclick. One miscommunication. One embryo mislabeled.</p>
            <p className="text-amber-300">That's someone's future child.</p>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="challenge-section cs-section">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number-accent">
                03 / Challenge
              </div>
            </div>
            <div className="md:col-span-10">
              <h2 className="challenge-headline cs-section-headline">
                From fragmented<br />
                to trusted
              </h2>
            </div>
          </div>

          {/* Problem Section */}
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number text-pink-600">
                × Problem
              </div>
            </div>
            <div className="problem-block md:col-span-10 space-y-8">
              <p className="cs-subheadline-lg">
                High-stakes workflow, low-trust tools
              </p>

              <div className="space-y-4">
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Spreadsheets and paper logs for life-changing decisions</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">Data scattered across multiple disconnected systems</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">No real-time collaboration between lab and providers</p>
                </div>
                <div className="checklist-item flex items-center gap-3">
                  <X className="checklist-icon w-5 h-5 text-red-500/60 flex-shrink-0" />
                  <p className="cs-subheadline">One mistake could impact someone's future family</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Visual Comparison */}
          <div className="before-after-images grid md:grid-cols-2 gap-6 md:gap-8 my-16">
            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src="/img/kindbody/kb-emr1.webp"
                alt="Kindbody EMR - clinical interface"
                fill
                className="object-cover"
              />
            </div>

            <div className="ba-image relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src="/img/kindbody/kb-emr2.webp"
                alt="Kindbody EMR - patient data management"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Solution Section */}
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-2">
              <div className="cs-section-number cs-section-number text-emerald-700">
                ✓ Solution
              </div>
            </div>
            <div className="solution-block md:col-span-10 space-y-8">
              <p className="cs-subheadline-lg">
                A unified platform built for precision
              </p>

              <div className="space-y-4">
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Real-time embryo tracking with visual timelines</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Unified EMR connecting lab, providers, and patients</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Built-in safeguards preventing critical errors</p>
                </div>
                <div className="solution-item flex items-center gap-3">
                  <Check className="solution-icon w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="cs-subheadline">Designed with embryologists, trusted by doctors</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid cs-stats-grid">
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="20">0</div>
              <div className="cs-stat-label">clinics nationwide</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-number cs-stat-number-accent" data-target="1800">0</div>
              <div className="cs-stat-label">cycles per month</div>
            </div>
            <div className="cs-stat col-span-2 md:col-span-1">
              <div className="cs-stat-text">Zero</div>
              <div className="cs-stat-label">critical errors</div>
            </div>
          </div>

          <div className="cs-image-wide mt-16">
            <Image
              src="/img/kindbody/app1.webp"
              alt="Kindbody mobile application overview"
              width={1600}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Process</div>
          </div>
          <div className="md:col-span-7">
            <p className="cs-intro-text">
              <span className="text-amber-300">Week 1:</span><br></br> We didn't speak their language. Our mockups landed with a thud.<br></br><span className="text-amber-300"><br></br>Month 2:</span> We shadowed embryologists, learned their workflows. <br></br><br></br><span className="text-amber-300">Month 4:</span> The skeptical head nurse became our biggest advocate. The work stopped being "designers vs. doctors" and became a team.
            </p>
          </div>
          <div className="md:col-span-3 text-sm font-light text-foreground/70 leading-relaxed space-y-4">
            <p>This wasn't about clever UI patterns.</p>
            <p className="text-amber-300/80">It was about earning trust.</p>
          </div>
        </div>
      </section>

      {/* Lesson */}
      <section className="takeaway-section cs-section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="cs-divider-accent"></div>
            <div className="cs-eyebrow">Lesson</div>
          </div>
          <div className="md:col-span-10">
            <p className="cs-intro-text">
              This wasn't about clever UI patterns. It was about earning trust from people where mistakes have real consequences. <span className="text-amber-300">The best design work happens when you shut up and learn someone else's language first.</span>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
