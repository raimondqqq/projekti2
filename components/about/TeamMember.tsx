"use client"

import { useState } from "react"
import Image from "next/image"
import { MailIcon, LinkedinIcon, FileTextIcon } from "lucide-react"

interface TeamMemberProps {
  member: {
    id: string
    name: string
    role: string
    babyPhoto: string
    adultPhoto: string
    email: string | null
    linkedin: string | null
    cvLink: string | null
  }
}

export function TeamMember({ member }: TeamMemberProps) {
  const [showAdult, setShowAdult] = useState(false)

  return (
    <div className="group">
      {/* Photo */}
      <div
        className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 cursor-pointer"
        onMouseEnter={() => setShowAdult(true)}
        onMouseLeave={() => setShowAdult(false)}
      >
        {/* Baby Photo (Default) */}
        <Image
          src={member.babyPhoto}
          alt={`${member.name} - Baby photo`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            showAdult ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Adult Photo (On Hover) */}
        <Image
          src={member.adultPhoto}
          alt={`${member.name} - Adult photo`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            showAdult ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="text-xl font-medium">{member.name}</h3>
        <p className="text-sm text-foreground/60">{member.role}</p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-foreground/60 hover:text-foreground transition-colors"
              title="Email"
            >
              <MailIcon className="w-4 h-4" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {member.cvLink && (
            <a
              href={member.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
              title="CV"
            >
              <FileTextIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
