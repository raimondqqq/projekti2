"use client"

import Image from "next/image"
import { CaseStudyProps } from '@/types'
import { parseJsonField } from '@/lib/json-utils'

/**
 * Example custom case study component
 * This demonstrates how to create a fully custom layout for a specific project
 *
 * To use this:
 * 1. Copy this file and rename it (e.g., AcmeCorpCaseStudy.tsx)
 * 2. Update the component name
 * 3. Set the caseStudySlug in the admin panel to match the filename (e.g., "acme-corp")
 * 4. Add your custom content, layouts, animations, etc.
 */
export function ExampleCaseStudy({ project }: CaseStudyProps) {
  const services = parseJsonField(project.services)
  const industries = parseJsonField(project.industry)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light mb-4">The Challenge</h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            {project.client} approached us with a vision to transform their digital presence
            and create an experience that would set them apart in the {industries.join(" and ")} space.
          </p>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-light">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-medium">{service}</h3>
                <p className="text-foreground/70">
                  Custom description for {service.toLowerCase()} work...
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Image Gallery Section - Example of custom layout */}
      <section className="space-y-8">
        <h2 className="text-3xl font-light">Visual Identity</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-video bg-foreground/5 rounded-lg overflow-hidden">
            <Image
              src={project.heroImage}
              alt={`${project.name} hero`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-video bg-foreground/5 rounded-lg overflow-hidden">
            <Image
              src={project.deviceMockup}
              alt={`${project.name} device`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-light">The Results</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-5xl font-light">+150%</div>
            <p className="text-foreground/70">Increase in engagement</p>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-light">50k+</div>
            <p className="text-foreground/70">New users onboarded</p>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-light">4.8★</div>
            <p className="text-foreground/70">Average user rating</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Optional */}
      <section className="border-l-2 border-foreground/20 pl-8 py-4">
        <blockquote className="text-2xl font-light italic text-foreground/80 mb-4">
          "Working with the team was an absolute pleasure. They transformed our vision
          into reality with exceptional attention to detail."
        </blockquote>
        <cite className="text-foreground/60 not-italic">
          — Client Name, Position at {project.client}
        </cite>
      </section>
    </div>
  )
}
