"use client"

import { ReactNode } from "react"
import { CaseStudyProvider } from "@/contexts/CaseStudyContext"
import { GlobalCaseStudyModal } from "@/components/shared/GlobalCaseStudyModal"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CaseStudyProvider>
      {children}
      <GlobalCaseStudyModal />
    </CaseStudyProvider>
  )
}
