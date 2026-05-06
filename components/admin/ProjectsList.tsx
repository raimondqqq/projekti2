"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  EditIcon,
  TrashIcon,
  GripVerticalIcon,
  EyeOffIcon,
  PlusIcon,
} from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Project {
  id: string
  name: string
  client: string
  startYear: number
  endYear?: number | null
  heroImage: string
  comingSoon: boolean
  order: number
}

interface ProjectsListProps {
  projects: Project[]
}

function SortableProjectItem({ project }: { project: Project }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Project deleted")
      window.location.reload()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete project")
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className="p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-4">
          <button
            className="cursor-grab active:cursor-grabbing touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="relative w-24 h-16 rounded overflow-hidden border border-border flex-shrink-0">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{project.name}</h3>
              {project.comingSoon && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  <EyeOffIcon className="w-3 h-3" />
                  Coming Soon
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {project.client} • {project.endYear ? `${project.startYear}–${project.endYear}` : project.startYear}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/admin/projects/${project.id}`}>
              <Button variant="outline" size="icon">
                <EditIcon className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{project.name}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function ProjectsList({ projects: initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = projects.findIndex((p) => p.id === active.id)
    const newIndex = projects.findIndex((p) => p.id === over.id)

    const newProjects = arrayMove(projects, oldIndex, newIndex)
    setProjects(newProjects)

    // Save new order
    try {
      setIsSaving(true)
      const response = await fetch("/api/admin/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectIds: newProjects.map((p) => p.id),
        }),
      })

      if (!response.ok) throw new Error("Failed to save order")

      toast.success("Order saved")
    } catch (error) {
      console.error("Reorder error:", error)
      toast.error("Failed to save order")
      setProjects(initialProjects) // Revert on error
    } finally {
      setIsSaving(false)
    }
  }

  if (projects.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">No projects yet</p>
        <Link href="/admin/projects/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {isSaving && (
        <div className="text-sm text-muted-foreground">Saving order...</div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          {projects.map((project) => (
            <SortableProjectItem key={project.id} project={project} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
