"use client"

import Image from "next/image"

interface CaseStudyTestimonialProps {
  quote: string
  avatarUrl: string
  name: string
  title: string
  company: string
  accentColor?: string
  className?: string
}

/**
 * CaseStudyTestimonial Component
 * Inverted testimonial with accent background and white text for emphasis
 * AAA-compliant contrast for accessibility
 */
export function CaseStudyTestimonial({
  quote,
  avatarUrl,
  name,
  title,
  company,
  accentColor = "amber-300",
  className = ""
}: CaseStudyTestimonialProps) {
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
                {quote}
              </p>
            </blockquote>

            {/* Attribution */}
            <div className="testimonial-meta flex items-start gap-6">
              <div className="testimonial-avatar relative w-16 h-16 flex-shrink-0 ring-4 ring-black/10 rounded-full">
                <Image
                  src={avatarUrl}
                  alt={`${name} - ${title} at ${company}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="pt-2">
                <div className="font-semibold text-xl text-black">
                  {name}
                </div>
                <div className="text-xs text-black font-mono uppercase font-normal">
                  {title} @ {company}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Empty for balance */}
          <div className="md:col-span-3"></div>
        </div>
      </div>
    </section>
  )
}

