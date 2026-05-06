import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { ProjectsList } from "@/components/admin/ProjectsList"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage your project portfolio
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <ProjectsList projects={projects} />
    </div>
  )
}
