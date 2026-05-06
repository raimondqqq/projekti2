"use client"

import { CaseStudy } from "@/components/home/CaseStudy"
import { useCaseStudy } from "@/contexts/CaseStudyContext"

export function GlobalCaseStudyModal() {
  const { selectedProject, isModalOpen, deviceStartPosition, closeCaseStudy } = useCaseStudy()

  if (!isModalOpen || !selectedProject) return null

  return (
    <CaseStudy
      project={selectedProject}
      deviceStartPosition={deviceStartPosition}
      onClose={closeCaseStudy}
    />
  )
}
