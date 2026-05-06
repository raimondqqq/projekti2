import { TeamForm } from "@/components/admin/TeamForm"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewTeamMemberPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/team">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Team
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add Team Member</h1>
      </div>

      <TeamForm mode="create" />
    </div>
  )
}
