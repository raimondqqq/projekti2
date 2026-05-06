"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  quote: string
  avatarUrl: string
  name: string
  title: string
  company: string
}

interface CaseStudyTestimonialCarouselProps {
  testimonials: Testimonial[]
  accentColor?: string
  className?: string
}

/**
 * CaseStudyTestimonialCarousel Component
 * Multiple testimonials with navigation controls
 * Inverted design with accent background
 */
export function CaseStudyTestimonialCarousel({
  testimonials,
  accentColor = "amber-300",
  className = ""
}: CaseStudyTestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Map accent colors to their background equivalents
  const bgColorMap: Record<string, string> = {
    'amber-300': 'bg-amber-400',
    'yellow-300': 'bg-yellow-300',
    'orange-400': 'bg-orange-400',
    'blue-300': 'bg-blue-500',
    'sky-400': 'bg-sky-400',
    'emerald-300': 'bg-emerald-500',
    'purple-300': 'bg-purple-500',
  }

  const bgColor = bgColorMap[accentColor] || 'bg-amber-400'
  const current = testimonials[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className={`testimonial-section ${bgColor} ${className} w-screen relative left-1/2 right-1/2 -mx-[50vw] py-16 md:py-28 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Left column - Label */}
          <div className="md:col-span-2 space-y-6">
            <div className="h-px w-12 bg-black"></div>
            <div className="text-xs uppercase font-mono tracking-widest text-black font-medium">
              Voice
            </div>
          </div>

          {/* Center column - Quote */}
          <div className="md:col-span-7 space-y-8">
            <blockquote className="testimonial-quote">
              <p className="text-[clamp(1rem,1.5rem,2.25rem)] font-light leading-[1.4] text-black"
                 style={{ letterSpacing: '-0.015em' }}>
                {current.quote}
              </p>
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-between">
              <div className="testimonial-meta flex items-start gap-6">
                <div className="testimonial-avatar relative w-16 h-16 flex-shrink-0 ring-4 ring-black/10 rounded-full">
                  <Image
                    src={current.avatarUrl}
                    alt={`${current.name} - ${current.title} at ${current.company}`}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="pt-2">
                  <div className="font-semibold text-xl text-black">
                    {current.name}
                  </div>
                  <div className="text-xs text-black font-mono uppercase font-normal">
                    {current.title} @ {current.company}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              {testimonials.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-black" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-black" />
                  </button>
                </div>
              )}
            </div>

            {/* Indicator dots */}
            {testimonials.length > 1 && (
              <div className="flex gap-2 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-black'
                        : 'w-1.5 bg-black/30 hover:bg-black/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right column - Empty for balance */}
          <div className="md:col-span-3"></div>
        </div>
      </div>
    </section>
  )
}
