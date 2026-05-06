import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/middleware/auth"

// PUT /api/admin/projects/[id] - Update project
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

    const project = await db.project.update({
      where: { id },
      data: {
        name: body.name,
        client: body.client,
        summary: body.summary || null,
        startYear: parseInt(body.startYear),
        endYear: body.endYear ? parseInt(body.endYear) : null,
        services: JSON.stringify(body.services || []),
        industry: JSON.stringify(body.industry || []),
        website: body.website || null,
        heroImage: body.heroImage,
        deviceMockup: body.deviceMockup,
        deviceType: body.deviceType,
        layoutVariant: body.layoutVariant,
        caseStudy: body.caseStudy || null,
        caseStudySlug: body.caseStudySlug || null,
        comingSoon: body.comingSoon ?? true,
      },
    })

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")
    revalidatePath(`/projects/${id}`)

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    const { id} = await params

    await db.project.delete({
      where: { id },
    })

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
