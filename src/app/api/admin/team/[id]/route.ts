import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/middleware/auth"

// PUT /api/admin/team/[id] - Update team member
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    const { id } = await params
    const body = await req.json()

    const teamMember = await db.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        babyPhoto: body.babyPhoto,
        adultPhoto: body.adultPhoto,
        email: body.email || null,
        linkedin: body.linkedin || null,
        cvLink: body.cvLink || null,
      },
    })

    // Revalidate pages
    revalidatePath("/about")
    revalidatePath("/admin/team")

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/team/[id] - Delete team member
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    const { id } = await params

    await db.teamMember.delete({
      where: { id },
    })

    // Revalidate pages
    revalidatePath("/about")
    revalidatePath("/admin/team")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    )
  }
}
