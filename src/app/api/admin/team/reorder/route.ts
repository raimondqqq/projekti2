import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/middleware/auth"

// PUT /api/admin/team/reorder - Reorder team members
export async function PUT(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    const body = await req.json()
    const { memberIds } = body as { memberIds: string[] }

    if (!Array.isArray(memberIds)) {
      return NextResponse.json(
        { error: "Invalid memberIds format" },
        { status: 400 }
      )
    }

    // Update order for each team member
    await Promise.all(
      memberIds.map((id, index) =>
        db.teamMember.update({
          where: { id },
          data: { order: index },
        })
      )
    )

    // Revalidate pages
    revalidatePath("/about")
    revalidatePath("/admin/team")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering team members:", error)
    return NextResponse.json(
      { error: "Failed to reorder team members" },
      { status: 500 }
    )
  }
}
