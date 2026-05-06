"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  image: string
  linkedin: string
}

type Stat = {
  value: string
  label: string
}

export function AboutClient({ teamMembers, stats }: { teamMembers: TeamMember[]; stats: Stat[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end px-8 md:px-16 pb-20 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.02] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-border/30" />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">About Ofro Digital</p>
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-[1.05] mb-6">
                We build brands<br />
                <span className="text-muted-foreground">that move people.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                A modern digital agency combining strategy, creativity, and technology to deliver measurable growth for ambitious businesses across the region and beyond.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 shrink-0">
              {stats.map((s) => (
                <div key={s.label} className="text-right">
                  <div className="text-3xl md:text-4xl font-extralight text-foreground">{s.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-8 md:px-16 py-20 border-t border-border/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: "◎", title: "Our Mission", text: "To help every client build a powerful, lasting digital presence — with strategy, creativity, and technology working as one." },
            { icon: "◈", title: "Our Approach", text: "We start with deep discovery, move with precision, and iterate until results speak louder than promises." },
            { icon: "◷", title: "Our Promise", text: "Transparent communication, measurable outcomes, and a team that treats your business goals as our own." },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="text-2xl text-muted-foreground">{item.icon}</div>
              <h3 className="text-base font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section ref={sectionRef} className="px-8 md:px-16 py-20 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">The People</p>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">Meet the team</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed">
              Six specialists. One shared mission — to make your brand impossible to ignore.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {teamMembers.map((member, i) => (
              <button
                key={member.id}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="group flex flex-col items-center gap-3 focus:outline-none"
              >
                <div className={`relative transition-all duration-300 ${activeIndex === i ? "scale-105" : "hover:scale-105"}`}>
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ${activeIndex === i ? "border-foreground shadow-lg shadow-foreground/10" : "border-border/30 group-hover:border-foreground/40"}`}>
                    <Image src={member.image} alt={member.name} width={96} height={96} className="w-full h-full object-cover" />
                  </div>
                  {activeIndex === i && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-foreground leading-tight">{member.name.split(" ")[0]}</div>
                  <div className="text-[9px] font-mono text-muted-foreground mt-0.5 leading-tight">{member.role.split(" ")[0]}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Expanded member card */}
          <div className={`transition-all duration-500 overflow-hidden ${activeIndex !== null ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            {activeIndex !== null && (
              <div className="border border-border/30 rounded-2xl p-6 md:p-8 bg-card/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-border/30">
                      <Image src={teamMembers[activeIndex].image} alt={teamMembers[activeIndex].name} width={144} height={144} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                      <span className="text-background text-[9px] font-bold">0{activeIndex + 1}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-extralight text-foreground">{teamMembers[activeIndex].name}</h3>
                        <p className="text-sm font-mono text-muted-foreground mt-1 uppercase tracking-wider">{teamMembers[activeIndex].role}</p>
                      </div>
                      <a href={teamMembers[activeIndex].linkedin} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border/30 rounded-full px-4 py-2 shrink-0">
                        LinkedIn ↗
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{teamMembers[activeIndex].bio}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {teamMembers[activeIndex].role.split(" & ").map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-3 py-1 rounded-full bg-foreground/5 text-muted-foreground border border-border/20">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setActiveIndex(null)} className="shrink-0 w-8 h-8 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all text-sm">
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-8 md:px-16 py-20 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-12">What drives us</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20">
            {[
              { num: "01", title: "Results First", text: "Every decision we make is tied to a metric. We don't chase trends — we chase outcomes." },
              { num: "02", title: "Radical Transparency", text: "You'll always know what we're doing, why, and how it's performing. No smoke, no mirrors." },
              { num: "03", title: "Long-term Thinking", text: "We build systems and strategies designed to compound over time — not quick fixes that fade." },
              { num: "04", title: "Creative Precision", text: "Beautiful work that actually performs. We believe aesthetics and analytics belong together." },
            ].map((v) => (
              <div key={v.num} className="bg-background p-8 md:p-10 group hover:bg-foreground/[0.02] transition-colors">
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-4">{v.num}</div>
                <h3 className="text-xl font-light text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-8 md:px-16 py-20 border-t border-border/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Get in touch</p>
            <a href="mailto:info@ofrodigital.com" className="text-3xl md:text-5xl font-extralight text-foreground hover:text-muted-foreground transition-colors">
              info@ofrodigital.com
            </a>
          </div>
          <div className="flex flex-col gap-1 md:text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Prishtina, Kosovo</span>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">© 2025 Ofro Digital</span>
          </div>
        </div>
      </section>
    </>
  )
}