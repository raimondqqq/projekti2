"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FolderIcon, UsersIcon, LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { handleSignOut } from "@/app/actions/auth"

const navItems = [
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderIcon,
  },
  {
    label: "Team",
    href: "/admin/team",
    icon: UsersIcon,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-background min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold">THEORIA ADMIN</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <form action={handleSignOut}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3"
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </Button>
        </form>
      </div>
    </aside>
  )
}
