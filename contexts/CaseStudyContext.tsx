"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Project } from "@/types"

interface CaseStudyContextType {
  selectedProject: Project | null
  isModalOpen: boolean
  deviceStartPosition: DOMRect | null
  openCaseStudy: (project: Project, devicePosition?: DOMRect | null) => void
  closeCaseStudy: () => void
  setDeviceStartPosition: (position: DOMRect | null) => void
}

const CaseStudyContext = createContext<CaseStudyContextType | undefined>(undefined)

export function CaseStudyProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deviceStartPosition, setDeviceStartPosition] = useState<DOMRect | null>(null)
  const pathname = usePathname()

  // Close modal when pathname changes
  useEffect(() => {
    if (isModalOpen) {
      closeCaseStudy()
    }
  }, [pathname])

  const openCaseStudy = (project: Project, devicePosition?: DOMRect | null) => {
    // Allow all projects - CaseStudy component handles coming soon state
    setSelectedProject(project)
    setDeviceStartPosition(devicePosition || null)
    setIsModalOpen(true)
  }

  const closeCaseStudy = () => {
    setIsModalOpen(false)
    // Delay clearing the project to allow exit animation
    setTimeout(() => {
      setSelectedProject(null)
      setDeviceStartPosition(null)
    }, 300)
  }

  return (
    <CaseStudyContext.Provider
      value={{
        selectedProject,
        isModalOpen,
        deviceStartPosition,
        openCaseStudy,
        closeCaseStudy,
        setDeviceStartPosition,
      }}
    >
      {children}
    </CaseStudyContext.Provider>
  )
}

export function useCaseStudy() {
  const context = useContext(CaseStudyContext)
  if (context === undefined) {
    throw new Error("useCaseStudy must be used within a CaseStudyProvider")
  }
  return context
}
