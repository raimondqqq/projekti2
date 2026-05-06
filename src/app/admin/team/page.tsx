import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { TeamList } from "@/components/admin/TeamList"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const teamMembers = await db.teamMember.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team</h1>
          <p className="text-muted-foreground">
            Manage team member information
          </p>
        </div>
        <Link href="/admin/team/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Team Member
          </Button>
        </Link>
      </div>

      <TeamList teamMembers={teamMembers} />
    </div>
  )
}
