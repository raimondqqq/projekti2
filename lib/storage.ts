import { put, del } from "@vercel/blob"

export interface UploadResult {
  url: string
  path: string
}

/**
 * Upload a file to Vercel Blob Storage
 * @param file - File buffer or base64 string
 * @param bucket - Storage bucket/folder name (e.g., "projects", "team") - used as pathname prefix
 * @param path - File path within bucket
 * @returns Public URL and path
 */
export async function uploadToSupabase(
  file: Buffer | string,
  bucket: string,
  path: string
): Promise<UploadResult> {
  try {
    let fileBuffer: Buffer

    // Convert base64 to buffer if needed
    if (typeof file === "string") {
      const base64Data = file.split(",")[1] || file
      fileBuffer = Buffer.from(base64Data, "base64")
    } else {
      fileBuffer = file
    }

    // Upload to Vercel Blob
    // Combine bucket and path for full pathname
    const fullPath = `${bucket}/${path}`

    const blob = await put(fullPath, fileBuffer, {
      access: "public",
      addRandomSuffix: false, // We already have unique names from upload route
    })

    return {
      url: blob.url,
      path: fullPath,
    }
  } catch (error) {
    console.error("Vercel Blob upload error:", error)
    throw new Error("Failed to upload file to Vercel Blob Storage")
  }
}

/**
 * Delete a file from Vercel Blob Storage
 * @param bucket - Storage bucket name (not used in Vercel Blob, kept for API compatibility)
 * @param path - File path to delete
 */
export async function deleteFromSupabase(
  bucket: string,
  path: string
): Promise<void> {
  try {
    // In Vercel Blob, we need the full URL to delete
    // If path is already a full URL, use it; otherwise construct it
    const urlToDelete = path.startsWith("http") ? path : `${bucket}/${path}`

    await del(urlToDelete)
  } catch (error) {
    console.error("Vercel Blob delete error:", error)
    throw new Error("Failed to delete file from Vercel Blob Storage")
  }
}

/**
 * Get public URL for a file in Vercel Blob Storage
 * Note: Vercel Blob returns URLs directly, so this is mainly for API compatibility
 * @param bucket - Storage bucket name
 * @param path - File path
 * @returns Public URL
 */
export function getPublicUrl(bucket: string, path: string): string {
  // If the path is already a full URL, return it
  if (path.startsWith("http")) {
    return path
  }

  // Otherwise, this would need to be constructed based on your Vercel Blob URL pattern
  // In practice, you should store the full URL from the upload response
  return path
}
