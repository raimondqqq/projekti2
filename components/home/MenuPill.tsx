"use client"

import { cn } from "@/lib/utils"
import { MenuIcon } from "lucide-react"

interface MenuPillProps {
  onClick: () => void
  isExpanded: boolean
}

export function MenuPill({ onClick, isExpanded }: MenuPillProps) {
  return (
    <button
      className={cn(
        "px-5 py-2.5 rounded-full border border-border/40",
        "bg-background/60 backdrop-blur-custom",
        "transition-all duration-200 ease-out",
        "hover:bg-foreground hover:text-background hover:border-foreground",
        "hover:shadow-md hover:scale-[1.02]",
        "pointer-events-auto",
        "active:scale-[0.98]",
        isExpanded && "bg-foreground text-background border-foreground"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <MenuIcon className="w-4 h-4" />
        <span className="text-7xl font-normal">Menu</span>
      </div>
    </button>
  )
}
