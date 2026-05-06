import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/middleware/auth"

// POST /api/admin/projects - Create project
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    const body = await req.json()

    // Get the highest order number and increment
    const maxOrder = await db.project.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const project = await db.project.create({
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
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
