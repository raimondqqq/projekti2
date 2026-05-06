"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLinkIcon, GithubIcon, TagIcon } from "lucide-react"
import { PlaygroundModal } from "./PlaygroundModal"

interface Experiment {
  id: number
  title: string
  description: string | null
  githubUrl: string
  liveUrl: string | null
  tags: string[]
  thumbnail: string | null
  updatedAt: string
}

interface PlaygroundGridProps {
  experiments: Experiment[]
}

export function PlaygroundGrid({ experiments }: PlaygroundGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [selectedExperiment, setSelectedExperiment] =
    useState<Experiment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageError = (id: number) => {
    setImageErrors((prev) => new Set(prev).add(id))
  }

  const openModal = (experiment: Experiment) => {
    setSelectedExperiment(experiment)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedExperiment(null), 300)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in animation-delay-600">
        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            onClick={() => openModal(experiment)}
            className="group border border-border/40 rounded-xl overflow-hidden hover:border-border transition-all duration-200 bg-background/50 backdrop-blur-sm cursor-pointer"
          >
          {/* Thumbnail */}
          <div className="relative w-full aspect-video bg-muted overflow-hidden">
            {experiment.thumbnail && !imageErrors.has(experiment.id) ? (
              <Image
                src={experiment.thumbnail}
                alt={experiment.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => handleImageError(experiment.id)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/20">
                <TagIcon className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-medium mb-2 group-hover:text-foreground/80 transition-colors">
              {experiment.title}
            </h3>

            {experiment.description && (
              <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
                {experiment.description}
              </p>
            )}

            {/* Tags */}
            {experiment.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {experiment.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-muted text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-3">
              <a
                href={experiment.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Code</span>
              </a>

              {experiment.liveUrl && (
                <>
                  <span className="text-foreground/20">•</span>
                  <a
                    href={experiment.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    <PlaygroundModal
      isOpen={isModalOpen}
      onClose={closeModal}
      experiment={selectedExperiment}
    />
  </>
  )
}
