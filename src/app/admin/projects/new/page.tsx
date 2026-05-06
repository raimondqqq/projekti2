import { ProjectForm } from "@/components/admin/ProjectForm"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/projects">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create Project</h1>
      </div>

      <ProjectForm mode="create" />
    </div>
  )
}
