"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MenuDock } from "@/components/home/MenuDock"
import { Project } from "@/types"
import { useCaseStudy } from "@/contexts/CaseStudyContext"

interface PageMenuDockProps {
  projects?: Project[]
}

export function PageMenuDock({ projects = [] }: PageMenuDockProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { isModalOpen, openCaseStudy, closeCaseStudy } = useCaseStudy()

  const handleProjectClick = (project: Project) => {
    // Allow all projects to be clicked - CaseStudy component handles "coming soon" state
    openCaseStudy(project, null)
  }

  return (
    <MenuDock
      onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
      isMenuOpen={isMenuOpen}
      isCaseStudy={isModalOpen}
      onBackClick={() => {
        if (isModalOpen) {
          closeCaseStudy()
        } else {
          router.push("/")
        }
      }}
      projects={projects}
      onProjectClick={handleProjectClick}
    />
  )
}
