"use client"

import { HomePage } from "./HomePage"
import { Project } from "@/types"

interface HomePageWrapperProps {
  projects: Project[]
}

export function HomePageWrapper({ projects }: HomePageWrapperProps) {
  return <HomePage projects={projects} />
}
