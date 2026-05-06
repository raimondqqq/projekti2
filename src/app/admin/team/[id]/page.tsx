import { db } from "@/lib/db"
import { TeamForm } from "@/components/admin/TeamForm"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const teamMember = await db.teamMember.findUnique({
    where: { id },
  })

  if (!teamMember) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/team">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Team
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Team Member</h1>
        <p className="text-muted-foreground mt-1">{teamMember.name}</p>
      </div>

      <TeamForm mode="edit" teamMember={teamMember} />
    </div>
  )
}
