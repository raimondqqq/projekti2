import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/middleware/auth"

// POST /api/admin/team - Create team member
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    const body = await req.json()

    // Get the highest order number and increment
    const maxOrder = await db.teamMember.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const teamMember = await db.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        babyPhoto: body.babyPhoto,
        adultPhoto: body.adultPhoto,
        email: body.email || null,
        linkedin: body.linkedin || null,
        cvLink: body.cvLink || null,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    // Revalidate pages
    revalidatePath("/about")
    revalidatePath("/admin/team")

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    )
  }
}
