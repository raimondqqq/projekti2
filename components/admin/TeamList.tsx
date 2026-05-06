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
  MailIcon,
  LinkedinIcon,
  FileTextIcon,
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

interface TeamMember {
  id: string
  name: string
  role: string
  babyPhoto: string
  adultPhoto: string
  email: string | null
  linkedin: string | null
  cvLink: string | null
  order: number
}

interface TeamListProps {
  teamMembers: TeamMember[]
}

function SortableTeamItem({ member }: { member: TeamMember }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAdultPhoto, setShowAdultPhoto] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/admin/team/${member.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast.success("Team member deleted")
      window.location.reload()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete team member")
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

          <div
            className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border flex-shrink-0 cursor-pointer"
            onMouseEnter={() => setShowAdultPhoto(true)}
            onMouseLeave={() => setShowAdultPhoto(false)}
          >
            <Image
              src={showAdultPhoto ? member.adultPhoto : member.babyPhoto}
              alt={member.name}
              fill
              className="object-cover transition-opacity"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <div className="flex items-center gap-2 mt-1">
              {member.email && (
                <MailIcon className="w-3 h-3 text-muted-foreground" />
              )}
              {member.linkedin && (
                <LinkedinIcon className="w-3 h-3 text-muted-foreground" />
              )}
              {member.cvLink && (
                <FileTextIcon className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/admin/team/${member.id}`}>
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
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {member.name}? This action
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

export function TeamList({ teamMembers: initialTeamMembers }: TeamListProps) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
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

    const oldIndex = teamMembers.findIndex((m) => m.id === active.id)
    const newIndex = teamMembers.findIndex((m) => m.id === over.id)

    const newTeamMembers = arrayMove(teamMembers, oldIndex, newIndex)
    setTeamMembers(newTeamMembers)

    // Save new order
    try {
      setIsSaving(true)
      const response = await fetch("/api/admin/team/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberIds: newTeamMembers.map((m) => m.id),
        }),
      })

      if (!response.ok) throw new Error("Failed to save order")

      toast.success("Order saved")
    } catch (error) {
      console.error("Reorder error:", error)
      toast.error("Failed to save order")
      setTeamMembers(initialTeamMembers) // Revert on error
    } finally {
      setIsSaving(false)
    }
  }

  if (teamMembers.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">No team members yet</p>
        <Link href="/admin/team/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Your First Team Member
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
          items={teamMembers.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          {teamMembers.map((member) => (
            <SortableTeamItem key={member.id} member={member} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
