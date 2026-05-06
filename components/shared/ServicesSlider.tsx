"use client"

import { useState, useEffect, useRef } from "react"

const services = [
  {
    number: "01",
    title: "Marketing Strategy",
    description: "We build data-driven marketing strategies that put your brand in front of the right people at the right time.",
    tags: ["strategy", "growth", "analytics"],
    color: "from-blue-600",
    accent: "#3b82f6",
    projects: [
      {
        label: "Campaign Dashboard",
        preview: (
          <div className="w-full h-full bg-[#0a0f1e] p-3 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Live Campaign</span>
              <span className="text-[10px] text-green-400 font-mono">● Active</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[["12.4K","Reach"],["3.2K","Clicks"],["8.4%","CTR"]].map(([v,l]) => (
                <div key={l} className="bg-blue-950/40 border border-blue-800/30 rounded-lg p-2 text-center">
                  <div className="text-white text-sm font-bold">{v}</div>
                  <div className="text-blue-400 text-[9px] font-mono uppercase">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-blue-950/20 rounded-lg p-2 flex flex-col justify-between">
              <div className="text-[9px] text-blue-300 font-mono mb-1">WEEKLY PERFORMANCE</div>
              <div className="flex items-end gap-1 h-10">
                {[40,65,45,80,60,90,75].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm bg-blue-500/60" style={{height:`${h}%`}} />
                ))}
              </div>
            </div>
            <div className="bg-blue-950/30 rounded-lg p-2">
              <div className="text-[9px] text-blue-300 font-mono mb-1">TOP CHANNEL</div>
              <div className="flex gap-1 items-center">
                <div className="h-1.5 rounded-full bg-blue-500" style={{width:'60%'}} />
                <span className="text-[9px] text-white">Instagram 60%</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: "Growth Report",
        preview: (
          <div className="w-full h-full bg-[#0a0f1e] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-blue-400 font-mono uppercase tracking-widest mb-1">Q4 Growth Report</div>
            {[["Brand Awareness","↑ 142%","bg-blue-500"],["Lead Generation","↑ 89%","bg-violet-500"],["Conversion Rate","↑ 34%","bg-emerald-500"],["Revenue Impact","↑ 67%","bg-amber-500"]].map(([label,val,color]) => (
              <div key={label} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                <div className={`w-1.5 h-6 rounded-full ${color}`} />
                <div className="flex-1">
                  <div className="text-[10px] text-white font-medium">{label}</div>
                </div>
                <div className="text-[11px] font-bold text-green-400">{val}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        label: "Audience Map",
        preview: (
          <div className="w-full h-full bg-[#0a0f1e] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-blue-400 font-mono uppercase tracking-widest mb-1">Audience Segments</div>
            <div className="flex-1 relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center text-[9px] text-blue-300 text-center absolute">Core<br/>Buyers</div>
              <div className="w-24 h-24 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-[9px] text-violet-300 absolute translate-x-8 translate-y-4">Prospects</div>
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[9px] text-emerald-300 absolute -translate-x-6 translate-y-6">Engaged</div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[["Core","2.1K","blue"],["Prospects","8.4K","violet"],["Engaged","5.2K","emerald"]].map(([l,v,c]) => (
                <div key={l} className={`bg-${c}-950/40 rounded p-1 text-center`}>
                  <div className="text-white text-[11px] font-bold">{v}</div>
                  <div className={`text-${c}-400 text-[8px] font-mono`}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
  {
    number: "02",
    title: "AI SEO",
    description: "Intelligent search optimization that adapts — automated audits, content scoring, and keyword intelligence powered by AI.",
    tags: ["ai", "seo", "search"],
    color: "from-violet-600",
    accent: "#8b5cf6",
    projects: [
      {
        label: "Keyword Intelligence",
        preview: (
          <div className="w-full h-full bg-[#0d0a1e] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-violet-400 font-mono uppercase tracking-widest mb-1">AI Keyword Scanner</div>
            {[["web design agency","9,900/mo","Low","↑92"],["logo design cost","5,400/mo","Low","↑87"],["seo consultant","14K/mo","Med","↑81"],["brand identity","8,100/mo","Low","↑78"]].map(([kw,vol,diff,score]) => (
              <div key={kw} className="flex items-center gap-2 bg-violet-950/30 border border-violet-800/20 rounded-lg p-1.5">
                <div className="flex-1 text-[9px] text-white font-medium truncate">{kw}</div>
                <div className="text-[9px] text-violet-300 font-mono">{vol}</div>
                <div className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${diff==="Low"?"bg-green-900/50 text-green-400":"bg-amber-900/50 text-amber-400"}`}>{diff}</div>
                <div className="text-[9px] text-violet-400 font-bold">{score}</div>
              </div>
            ))}
            <div className="bg-violet-900/20 rounded-lg p-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <div className="text-[9px] text-violet-300 font-mono">AI scanning 1,240 keywords…</div>
            </div>
          </div>
        ),
      },
      {
        label: "Site Audit",
        preview: (
          <div className="w-full h-full bg-[#0d0a1e] p-3 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-[10px] text-violet-400 font-mono uppercase tracking-widest">SEO Health Score</div>
              <div className="text-2xl font-bold text-white">84<span className="text-[10px] text-violet-400">/100</span></div>
            </div>
            <div className="h-1.5 rounded-full bg-violet-950">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500" style={{width:'84%'}} />
            </div>
            {[["Core Web Vitals","98","✓"],["Meta Tags","72","⚠"],["Backlinks","91","✓"],["Content Score","76","⚠"],["Mobile SEO","88","✓"]].map(([item,score,status]) => (
              <div key={item} className="flex items-center gap-2">
                <span className={`text-[10px] ${status==="✓"?"text-green-400":"text-amber-400"}`}>{status}</span>
                <span className="flex-1 text-[9px] text-white">{item}</span>
                <div className="w-16 h-1 rounded-full bg-violet-950">
                  <div className="h-full rounded-full bg-violet-500" style={{width:`${score}%`}} />
                </div>
                <span className="text-[9px] text-violet-300 w-5 text-right">{score}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        label: "Rank Tracker",
        preview: (
          <div className="w-full h-full bg-[#0d0a1e] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-violet-400 font-mono uppercase tracking-widest mb-1">Ranking Progress</div>
            <div className="flex-1 relative">
              <svg viewBox="0 0 200 80" className="w-full h-full">
                <defs>
                  <linearGradient id="rankGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,60 C30,55 60,40 90,30 C120,20 150,15 200,8" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                <path d="M0,60 C30,55 60,40 90,30 C120,20 150,15 200,8 L200,80 L0,80Z" fill="url(#rankGrad)"/>
                {[[0,60],[50,45],[100,30],[150,15],[200,8]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#8b5cf6" />
                ))}
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[["Start","Pos 48"],["Month 3","Pos 19"],["Now","Pos 4"]].map(([l,v]) => (
                <div key={l} className="bg-violet-950/40 rounded p-1 text-center">
                  <div className="text-white text-[11px] font-bold">{v}</div>
                  <div className="text-violet-400 text-[8px] font-mono">{l}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
  {
    number: "03",
    title: "Logo Branding",
    description: "We craft visual identities that speak before you do — from mark to motion, your brand becomes unforgettable.",
    tags: ["design", "brand", "identity"],
    color: "from-rose-600",
    accent: "#f43f5e",
    projects: [
      {
        label: "Ofro — Brand Mark",
        preview: (
          <div className="w-full h-full bg-[#0f0a0a] flex flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 rotate-6" />
                <div className="absolute inset-0 rounded-2xl bg-[#0f0a0a] flex items-center justify-center">
                  <span className="text-white font-bold text-2xl tracking-tighter">O</span>
                </div>
              </div>
              <div className="text-white text-lg font-light tracking-[0.3em] uppercase">Ofro</div>
            </div>
            <div className="flex gap-3 mt-2">
              {["#f43f5e","#fb923c","#0f0a0a","#ffffff"].map((c) => (
                <div key={c} className="w-6 h-6 rounded-full border border-white/10" style={{background:c}} />
              ))}
            </div>
            <div className="flex gap-2">
              {["Aa","Bb","Cc"].map((l) => (
                <div key={l} className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white/60 text-xs font-mono">{l}</div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: "Nexus — Identity",
        preview: (
          <div className="w-full h-full bg-[#050510] flex flex-col items-center justify-center gap-3 p-4">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 56 56" className="w-full h-full">
                <polygon points="28,4 52,18 52,38 28,52 4,38 4,18" fill="none" stroke="#818cf8" strokeWidth="1.5"/>
                <polygon points="28,12 44,22 44,34 28,44 12,34 12,22" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1"/>
                <circle cx="28" cy="28" r="6" fill="#818cf8"/>
              </svg>
            </div>
            <div className="text-[#818cf8] text-base font-light tracking-[0.4em] uppercase">Nexus</div>
            <div className="text-[8px] text-white/30 font-mono tracking-[0.2em] uppercase">Technology Group</div>
            <div className="flex gap-2 mt-1">
              {["#818cf8","#312e81","#f8fafc","#0f172a"].map((c) => (
                <div key={c} className="w-5 h-5 rounded border border-white/10" style={{background:c}} />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: "Vera — Lifestyle",
        preview: (
          <div className="w-full h-full bg-[#faf7f4] flex flex-col items-center justify-center gap-3 p-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#92400e" strokeWidth="1"/>
                  <path d="M12,20 Q20,8 28,20 Q20,32 12,20Z" fill="#92400e" fillOpacity="0.8"/>
                </svg>
              </div>
              <div>
                <div className="text-[#92400e] text-lg font-serif tracking-wide">Vera</div>
                <div className="text-[#92400e]/50 text-[8px] tracking-[0.3em] uppercase font-mono">Organic Studio</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {["#92400e","#d97706","#fef3c7","#1c1917"].map((c) => (
                <div key={c} className="w-5 h-5 rounded-full border border-black/10" style={{background:c}} />
              ))}
            </div>
            <div className="text-[9px] text-[#92400e]/50 font-mono tracking-widest uppercase mt-1">Brand Identity System</div>
          </div>
        ),
      },
    ],
  },
  {
    number: "04",
    title: "Website Development",
    description: "Modern, fast, conversion-focused websites — built with Next.js and designed to make your brand look world-class online.",
    tags: ["web", "nextjs", "ui/ux"],
    color: "from-emerald-600",
    accent: "#10b981",
    projects: [
      {
        label: "Your Website — Hero",
        preview: (
          <div className="w-full h-full bg-[#030712] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
              <div className="text-[9px] text-white font-light tracking-[0.2em] uppercase">YourBrand</div>
              <div className="flex gap-3">
                {["Work","Services","About"].map((l) => (
                  <span key={l} className="text-[8px] text-white/40 font-mono">{l}</span>
                ))}
              </div>
              <div className="text-[8px] bg-white text-black px-2 py-0.5 rounded-full font-medium">Contact</div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
              <div className="text-[8px] text-emerald-400 font-mono tracking-widest uppercase">Digital Studio</div>
              <div className="text-white text-sm font-extralight tracking-tight text-center leading-tight">We build things<br/>people remember.</div>
              <div className="w-8 h-px bg-white/20" />
              <div className="flex gap-2">
                <div className="text-[8px] bg-white text-black px-3 py-1 rounded-full">View Work</div>
                <div className="text-[8px] border border-white/20 text-white/60 px-3 py-1 rounded-full">Learn More</div>
              </div>
            </div>
            <div className="px-3 pb-2 flex gap-1">
              {[70,45,80,55,90].map((h,i) => (
                <div key={i} className="flex-1 rounded-sm bg-emerald-500/20" style={{height:`${h*0.3}px`}} />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: "Portfolio Site",
        preview: (
          <div className="w-full h-full bg-[#030712] flex flex-col gap-1.5 p-3">
            <div className="text-[9px] text-emerald-400 font-mono uppercase tracking-widest">Selected Work</div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {[["#10b981","Project Alpha"],["#6366f1","Case Study"],["#f59e0b","Campaign"],["#ec4899","Rebrand"]].map(([c,l]) => (
                <div key={l} className="rounded-lg overflow-hidden relative flex items-end p-1.5" style={{background:`${c}18`,border:`1px solid ${c}30`}}>
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full" style={{background:c,opacity:0.7}} />
                  <div className="text-[8px] text-white/70 font-mono">{l}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: "SaaS Dashboard",
        preview: (
          <div className="w-full h-full bg-[#030712] flex overflow-hidden">
            <div className="w-14 border-r border-white/5 flex flex-col gap-2 p-2 pt-3">
              {["◈","⊞","◎","⊕","◷"].map((icon,i) => (
                <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] ${i===0?"bg-emerald-500/20 text-emerald-400":"text-white/20"}`}>{icon}</div>
              ))}
            </div>
            <div className="flex-1 p-2 flex flex-col gap-2">
              <div className="text-[9px] text-white/60 font-mono">Overview</div>
              <div className="grid grid-cols-2 gap-1">
                {[["$24K","Revenue"],["142","Users"]].map(([v,l]) => (
                  <div key={l} className="bg-white/5 rounded p-1.5">
                    <div className="text-white text-xs font-bold">{v}</div>
                    <div className="text-white/30 text-[8px] font-mono">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-white/5 rounded p-1.5 flex flex-col justify-between">
                <div className="text-[8px] text-white/30 font-mono">Activity</div>
                <div className="flex items-end gap-0.5 h-8">
                  {[60,40,80,55,70,90,65].map((h,i) => (
                    <div key={i} className="flex-1 rounded-sm bg-emerald-500/50" style={{height:`${h}%`}} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    number: "05",
    title: "E-commerce Solution",
    description: "Complete online stores built to sell — seamless checkout, inventory management, and integrations that scale.",
    tags: ["ecommerce", "shopify", "payments"],
    color: "from-amber-600",
    accent: "#f59e0b",
    projects: [
      {
        label: "Your Store — Front",
        preview: (
          <div className="w-full h-full bg-[#0c0800] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-amber-900/30">
              <div className="text-[9px] text-amber-400 font-mono tracking-widest uppercase">YourShop</div>
              <div className="flex gap-2 items-center">
                <span className="text-[8px] text-white/30">Search</span>
                <div className="text-[8px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">Cart (3)</div>
              </div>
            </div>
            <div className="flex-1 p-2 grid grid-cols-2 gap-2">
              {[["Premium Kit","$129","🔥"],["Studio Pack","$89",""],["Pro Bundle","$199","NEW"],["Starter","$49",""]].map(([name,price,badge]) => (
                <div key={name} className="bg-amber-950/30 border border-amber-800/20 rounded-lg p-2 flex flex-col gap-1">
                  <div className="flex-1 bg-amber-900/20 rounded h-8 flex items-center justify-center">
                    {badge && <span className="text-[8px] bg-amber-500 text-black px-1 rounded font-bold">{badge}</span>}
                  </div>
                  <div className="text-[9px] text-white font-medium">{name}</div>
                  <div className="text-[9px] text-amber-400 font-bold">{price}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        label: "Checkout Flow",
        preview: (
          <div className="w-full h-full bg-[#0c0800] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-amber-400 font-mono uppercase tracking-widest">Checkout</div>
            <div className="flex gap-1 mb-1">
              {["Cart","Details","Payment","Done"].map((step,i) => (
                <div key={step} className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold ${i<=1?"bg-amber-500 text-black":"bg-white/10 text-white/30"}`}>{i+1}</div>
                  {i<3 && <div className={`w-3 h-px ${i<1?"bg-amber-500":"bg-white/10"}`} />}
                </div>
              ))}
            </div>
            <div className="bg-amber-950/30 border border-amber-800/20 rounded-lg p-2 flex gap-2 items-center">
              <div className="w-8 h-8 bg-amber-900/40 rounded" />
              <div className="flex-1">
                <div className="text-[9px] text-white">Premium Kit</div>
                <div className="text-[9px] text-amber-400 font-bold">$129.00</div>
              </div>
              <div className="text-[8px] text-white/30">×1</div>
            </div>
            <div className="bg-amber-950/20 rounded-lg p-2 flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[9px] text-white/40">Subtotal</span>
                <span className="text-[9px] text-white">$129.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-white/40">Shipping</span>
                <span className="text-[9px] text-green-400">Free</span>
              </div>
              <div className="h-px bg-white/10 my-0.5" />
              <div className="flex justify-between">
                <span className="text-[9px] text-white font-bold">Total</span>
                <span className="text-[9px] text-amber-400 font-bold">$129.00</span>
              </div>
            </div>
            <div className="bg-amber-500 rounded-lg p-2 text-center text-[9px] text-black font-bold">Complete Purchase</div>
          </div>
        ),
      },
      {
        label: "Analytics",
        preview: (
          <div className="w-full h-full bg-[#0c0800] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-amber-400 font-mono uppercase tracking-widest">Store Performance</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[["$8,420","Revenue","↑ 23%"],["142","Orders","↑ 18%"]].map(([v,l,g]) => (
                <div key={l} className="bg-amber-950/30 border border-amber-800/20 rounded-lg p-2">
                  <div className="text-white text-sm font-bold">{v}</div>
                  <div className="text-amber-400/60 text-[8px] font-mono">{l}</div>
                  <div className="text-green-400 text-[8px] font-mono">{g}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-amber-950/20 rounded-lg p-2">
              <div className="text-[8px] text-amber-400/60 font-mono mb-1">DAILY SALES</div>
              <div className="flex items-end gap-1 h-12">
                {[30,55,40,70,50,85,65,90,60,75,80,95].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm bg-amber-500/60" style={{height:`${h}%`}} />
                ))}
              </div>
            </div>
            <div className="flex gap-1">
              {[["Conversion","4.2%"],["AOV","$59"]].map(([l,v]) => (
                <div key={l} className="flex-1 bg-amber-950/20 rounded p-1.5">
                  <div className="text-white text-xs font-bold">{v}</div>
                  <div className="text-amber-400/50 text-[8px] font-mono">{l}</div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
  {
    number: "06",
    title: "Consulting",
    description: "Strategic advisory for businesses navigating digital transformation — clear roadmaps, honest insights, measurable outcomes.",
    tags: ["advisory", "digital", "consulting"],
    color: "from-slate-500",
    accent: "#94a3b8",
    projects: [
      {
        label: "Roadmap",
        preview: (
          <div className="w-full h-full bg-[#080c10] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Digital Roadmap</div>
            {[["Q1","Discovery & Audit","done"],["Q2","Strategy & Design","done"],["Q3","Build & Launch","active"],["Q4","Scale & Optimize","pending"]].map(([q,label,status]) => (
              <div key={q} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-mono font-bold ${status==="done"?"bg-emerald-900/50 text-emerald-400 border border-emerald-700/30":status==="active"?"bg-blue-900/50 text-blue-400 border border-blue-700/30 animate-pulse":"bg-slate-900/50 text-slate-500 border border-slate-700/30"}`}>{status==="done"?"✓":status==="active"?"→":"○"}</div>
                <div className="flex-1">
                  <div className="text-[9px] text-white font-medium">{label}</div>
                </div>
                <div className={`text-[8px] font-mono ${status==="done"?"text-emerald-400":status==="active"?"text-blue-400":"text-slate-600"}`}>{q}</div>
              </div>
            ))}
            <div className="mt-1 bg-slate-900/50 rounded-lg p-2">
              <div className="text-[8px] text-slate-400 font-mono mb-1">OVERALL PROGRESS</div>
              <div className="h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" style={{width:'62%'}} />
              </div>
              <div className="text-right text-[8px] text-slate-400 mt-0.5">62%</div>
            </div>
          </div>
        ),
      },
      {
        label: "Tech Stack Audit",
        preview: (
          <div className="w-full h-full bg-[#080c10] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Stack Recommendation</div>
            {[["Frontend","Next.js + Tailwind","✓ Approved"],["Backend","Node + Prisma","✓ Approved"],["Database","PostgreSQL","✓ Approved"],["Hosting","Vercel + AWS","⚠ Review"],["Analytics","PostHog","○ Pending"]].map(([layer,tech,status]) => (
              <div key={layer} className="flex items-center gap-1.5 bg-slate-900/40 rounded p-1.5">
                <div className="text-[8px] text-slate-500 w-12 font-mono">{layer}</div>
                <div className="flex-1 text-[9px] text-white">{tech}</div>
                <div className={`text-[8px] font-mono ${status.startsWith("✓")?"text-emerald-400":status.startsWith("⚠")?"text-amber-400":"text-slate-500"}`}>{status}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
        label: "KPI Dashboard",
        preview: (
          <div className="w-full h-full bg-[#080c10] p-3 flex flex-col gap-2">
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Business KPIs</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[["NPS Score","72","↑ 12"],["Churn Rate","2.1%","↓ 0.8"],["MRR","$14K","↑ 34%"],["CAC","$42","↓ 18%"]].map(([l,v,delta]) => (
                <div key={l} className="bg-slate-900/50 border border-slate-700/20 rounded-lg p-2">
                  <div className="text-white text-xs font-bold">{v}</div>
                  <div className="text-slate-500 text-[8px] font-mono">{l}</div>
                  <div className={`text-[8px] font-mono ${delta.startsWith("↑")?"text-emerald-400":"text-green-400"}`}>{delta}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900/30 rounded-lg p-2 flex-1 flex flex-col justify-between">
              <div className="text-[8px] text-slate-500 font-mono">GROWTH TREND</div>
              <div className="flex items-end gap-1 h-10">
                {[40,50,45,60,58,70,65,80,75,90].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm bg-slate-400/40" style={{height:`${h}%`}} />
                ))}
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
]

export function ServicesSlider() {
  const [active, setActive] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setActive(index)
    setActiveProject(0)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const next = () => goTo((active + 1) % services.length)
  const prev = () => goTo((active - 1 + services.length) % services.length)

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 4000)
  }

  useEffect(() => {
    resetInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [active])

  const current = services[active]

  return (
    <div className="w-full mt-6">
      <div className="relative w-full rounded-2xl overflow-hidden border border-border/20 bg-[#080c10]" style={{minHeight: 420}}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] h-full min-h-[420px]">

            {/* Left — Info */}
            <div className="flex flex-col justify-between p-8 border-r border-white/5">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{color: current.accent}}>{current.number} / 06</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-white mb-3">{current.title}</h2>
                <p className="text-sm text-white/50 leading-relaxed mb-6">{current.description}</p>
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-3 py-1 rounded-full border" style={{borderColor: `${current.accent}30`, color: current.accent, background: `${current.accent}10`}}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Project tabs */}
              <div className="mt-6">
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-2">Projects</div>
                <div className="flex flex-col gap-1">
                  {current.projects.map((p, i) => (
                    <button
                      key={p.label}
                      onClick={() => { setActiveProject(i); resetInterval() }}
                      className="text-left text-[11px] px-3 py-2 rounded-lg transition-all"
                      style={activeProject === i ? {background: `${current.accent}15`, color: current.accent, borderLeft: `2px solid ${current.accent}`} : {color: "rgba(255,255,255,0.3)", borderLeft: "2px solid transparent"}}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Preview */}
            <div className="relative flex items-center justify-center p-4">
              <div className="w-full max-w-[260px] h-[220px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {current.projects[activeProject].preview}
              </div>
              <div className="absolute bottom-4 right-4 flex gap-1">
                {current.projects.map((_,i) => (
                  <button key={i} onClick={() => { setActiveProject(i); resetInterval() }} className="w-1 h-1 rounded-full transition-all" style={{background: activeProject===i ? current.accent : "rgba(255,255,255,0.2)", width: activeProject===i ? 16 : 4}} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <button onClick={() => { prev(); resetInterval() }} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all text-sm z-10">←</button>
        <button onClick={() => { next(); resetInterval() }} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all text-sm z-10">→</button>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-4 justify-center items-center">
        {services.map((s, i) => (
          <button key={i} onClick={() => { goTo(i); resetInterval() }} className="h-1 rounded-full transition-all duration-300" style={{background: i === active ? current.accent : "rgba(255,255,255,0.15)", width: i === active ? 24 : 6}} />
        ))}
      </div>
    </div>
  )
}