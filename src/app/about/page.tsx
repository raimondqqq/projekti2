import { db } from "@/lib/db"
import { PageMenuDock } from "@/components/shared/PageMenuDock"
import { AboutClient } from "@/components/shared/AboutClient"

export const dynamic = "force-dynamic"

const teamMembers = [
  {
    id: 1,
    name: "Blerina Ademi",
    role: "Chief Executive Officer",
    bio: "Visionary leader with 12+ years driving digital growth strategies for ambitious brands across the region.",
    image: "/team/blerina.png",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Amdi Alija",
    role: "Digital Marketing Specialist",
    bio: "Expert in crafting multi-channel campaigns that convert — from paid media to organic community growth.",
    image: "/team/amdi.png",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Gresa Abazi",
    role: "Digital Marketing Specialist",
    bio: "Creative strategist focused on brand storytelling, audience engagement, and performance-driven content.",
    image: "/team/gresa.png",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Endrit Kryeziu",
    role: "SEO & Google Ads Expert",
    bio: "Data-obsessed search specialist helping clients dominate rankings and maximize ROI on every ad dollar.",
    image: "/team/endrit.png",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Egzon Shehu",
    role: "Digital Marketing Specialist",
    bio: "Growth hacker with a sharp eye for analytics, automation, and scaling campaigns that actually deliver.",
    image: "/team/egzon.png",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Raimond Qyqalla",
    role: "Web Developer & E-commerce Specialist",
    bio: "Full-stack developer and graphic designer building fast, beautiful digital experiences and online stores.",
    image: "/team/raimond.jpeg",
    linkedin: "#",
  },
]

const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "6", label: "Core Specialists" },
]

export default async function AboutPage() {
  const projects = await db.project.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <main className="min-h-screen bg-background">
      <PageMenuDock projects={projects} />
      <AboutClient teamMembers={teamMembers} stats={stats} />
    </main>
  )
}