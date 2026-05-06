import { db } from "@/lib/db"
import { ProjectForm } from "@/components/admin/ProjectForm"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await db.project.findUnique({
    where: { id },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/projects">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground mt-1">{project.name}</p>
      </div>

      <ProjectForm mode="edit" project={project} />
    </div>
  )
}
