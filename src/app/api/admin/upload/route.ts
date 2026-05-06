import { uploadToSupabase } from "@/lib/storage"
import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/middleware/auth"

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAdmin(req)
    if (authError) return authError

    // Get form data
    const formData = await req.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExt = file.name.split(".").pop()
    const fileName = `${timestamp}-${randomString}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Determine bucket based on folder
    const bucket = folder.includes("team") ? "team" : "projects"

    // Upload to Supabase Storage
    const result = await uploadToSupabase(buffer, bucket, filePath)

    return NextResponse.json({
      url: result.url,
      path: result.path,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
