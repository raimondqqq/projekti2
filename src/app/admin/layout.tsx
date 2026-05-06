import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/admin/Sidebar"

const AUTHORIZED_ADMINS = [
  "haris.ovcina@gmail.com",
  "harisovcina@gmail.com",
]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Skip auth check if bypassed (for local development only)
  if (!BYPASS_AUTH_IN_DEV) {
    const session = await auth()

    // If not signed in at all, redirect to sign in page
    if (!session?.user?.email) {
      redirect("/api/auth/signin?callbackUrl=/admin")
    }

    // If signed in but not authorized, redirect to homepage
    if (!AUTHORIZED_ADMINS.includes(session.user.email)) {
      redirect("/")
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-muted/30">
        {children}
      </main>
    </div>
  )
}
