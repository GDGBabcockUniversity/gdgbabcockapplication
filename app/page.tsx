"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ROLES, TEAMS, formUrlFor, type TeamId } from "@/lib/roles"

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#F9AB00", "#34A853"]

/* ─────────── Scroll Reveal Hook ─────────── */
function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* ─────────── Typewriter ─────────── */
const HERO_MESSAGES = [
  "Join the team building GDG Babcock.",
  "Tell the stories behind the work.",
  "Get the whole campus talking.",
  "Bring the ideas people show up for.",
]

function RotatingTypewriter({ messages }: { messages: string[] }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  const fullText = messages[messageIndex]

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorTimer)
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, 50 + Math.random() * 40)
    } else if (!isDeleting && displayText.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2500)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1))
      }, 25)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, fullText, messages])

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
      <span className="inline-grid align-top">
        {messages.map((m, i) => (
          <span key={i} aria-hidden className="invisible col-start-1 row-start-1">{m}</span>
        ))}
        <span className="col-start-1 row-start-1">
          <span className="shimmer-text">{displayText}</span>
          <span
            className="inline-block w-[3px] md:w-[4px] h-[0.85em] ml-1 align-baseline relative -top-1 rounded-full"
            style={{
              backgroundColor: "#4285F4",
              opacity: cursorVisible ? 1 : 0,
              transition: "opacity 0.1s",
            }}
          />
        </span>
      </span>
    </h1>
  )
}

/* ─────────── Google Dots ─────────── */
function GoogleDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-1.5 ${className}`}>
      {GOOGLE_COLORS.map((color, i) => (
        <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </span>
  )
}

/* ─────────── Animated Counter ─────────── */
function AnimatedCounter({ target, suffix = "", pad = false }: { target: number; suffix?: string; pad?: boolean }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const duration = 1500
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {pad ? String(count).padStart(2, "0") : count.toLocaleString()}{suffix}
    </span>
  )
}

/* ─────────── Data ─────────── */
const PRODUCTS = [
  {
    name: "Monthly Meetup",
    description: "Our recurring community touchpoint. Every month, open to everyone.",
    owner: "Community Lead",
    href: "https://gdgbabcock.com",
    color: "#4285F4",
    image: "/product-meetup.png",
  },
  {
    name: "RADAR",
    description: "Our publication and signal platform. Campus tech stories, delivered.",
    owner: "Media Lead",
    href: "https://radar.gdgbabcock.com",
    color: "#EA4335",
    image: "/product-radar.png",
  },
  {
    name: "ORBIT",
    description: "First-semester flagship summit. Industry trips, conference, career fair.",
    owner: "Programs Lead",
    href: "https://orbit.gdgbabcock.com",
    color: "#F9AB00",
    image: "/product-orbit.png",
  },
  {
    name: "GDG Week",
    description: "Second-semester concentrated program. Workshops, Build with AI, and more.",
    owner: "Programs Lead",
    href: "https://gdgbabcock.com/buildwithai",
    color: "#34A853",
    image: "/product-gdgweek.png",
  },
  {
    name: "Babcock 100",
    description: "Annual recognition of 100 students making an impact. All departments.",
    owner: "Media Lead",
    href: "https://gdgbabcock.com",
    color: "#4285F4",
    image: "/product-babcock100.png",
  },
  {
    name: "BabcockVotes",
    description: "The campus election platform. Built by GDG, used by the whole school.",
    owner: "Technical Lead",
    href: "https://babcockvotes.com",
    color: "#EA4335",
    image: "/product-votes.png",
  },
]

const TIMELINE = [
  { step: "01", label: "Applications Open", detail: "Pick a role and submit its application form", color: "#4285F4" },
  { step: "02", label: "Review & Portfolio Check", detail: "Team leads review applications, portfolios, and past work", color: "#EA4335" },
  { step: "03", label: "Interview", detail: "Short chat — walk us through your work, interests, and what you want to learn", color: "#F9AB00" },
  { step: "04", label: "Onboarding & Integration", detail: "Join the team, get access, meet your squad, and pick up your first task", color: "#34A853" },
]

const APPLICATION_DEADLINE = new Date(2026, 7, 19, 23, 59, 0)

const VALUES = [
  { title: "Willingness to Learn", detail: "You don't need to know everything. We value curiosity and the drive to figure things out over what you already know.", icon: "📚" },
  { title: "Curiosity", detail: "You tinker, explore new tools, ask why things work the way they do, and push beyond tutorials.", icon: "🔍" },
  { title: "Collaboration", detail: "You share what you learn, review work constructively, and lift others up instead of working in isolation.", icon: "🤝" },
  { title: "Product Thinking", detail: "You care about why we build something and who it serves — not just the craft behind it.", icon: "💡" },
  { title: "Reliability", detail: "You show up, communicate early when you're stuck, and follow through on what you commit to.", icon: "⚡" },
  { title: "Community Spirit", detail: "You help others grow, contribute openly, share knowledge freely, and make the team better.", icon: "🌍" },
]

/* ─────────── Job Board ─────────── */
function JobBoard() {
  const [filter, setFilter] = useState<TeamId | "all">("all")
  const visibleTeams = TEAMS.filter((t) => filter === "all" || t.id === filter)

  return (
    <>
      {/* Team filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            filter === "all" ? "bg-fg text-bg" : "glass text-fg/50 hover:text-fg"
          }`}
        >
          All roles · {ROLES.length}
        </button>
        {TEAMS.map((team) => {
          const count = ROLES.filter((r) => r.team === team.id).length
          return (
            <button
              key={team.id}
              onClick={() => setFilter(team.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === team.id ? "bg-fg text-bg" : "glass text-fg/50 hover:text-fg"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: team.color }} />
              {team.name} · {count}
            </button>
          )
        })}
      </div>

      {/* Grouped role rows */}
      <div className="space-y-14">
        {visibleTeams.map((team) => (
          <div key={team.id}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5">
              <div>
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: team.color }} />
                  {team.name}
                </h3>
                <p className="text-sm text-fg/45 mt-1.5 max-w-xl">{team.blurb}</p>
              </div>
            </div>

            <div className="border-t border-fg/10">
              {ROLES.filter((r) => r.team === team.id).map((role) => (
                <Link
                  key={role.slug}
                  href={`/roles/${role.slug}`}
                  className="group flex items-center justify-between gap-4 py-5 px-2 md:px-4 border-b border-fg/10 hover:bg-secondary transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-base md:text-lg truncate">{role.title}</div>
                    <div className="text-sm text-fg/40 mt-0.5">{role.mandate}</div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {formUrlFor(role) ? (
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-fg/35">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
                        {team.name}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono uppercase tracking-wider text-fg/35 border border-fg/10 rounded-full px-3 py-1 whitespace-nowrap">
                        Form coming soon
                      </span>
                    )}
                    <svg className="w-4 h-4 text-fg/20 group-hover:text-fg/70 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ─────────── Main Page ─────────── */
export default function ApplyPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(() => Date.now() >= APPLICATION_DEADLINE.getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = APPLICATION_DEADLINE.getTime() - now
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setIsExpired(true)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* ═══════ Gradient Orbs Background ═══════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="gradient-orb w-[600px] h-[600px] bg-[#4285F4]/20 top-[-200px] left-[-100px]" style={{ position: 'absolute' }} />
        <div className="gradient-orb w-[500px] h-[500px] bg-[#34A853]/15 bottom-[-150px] right-[-100px]" style={{ position: 'absolute' }} />
        <div className="gradient-orb w-[400px] h-[400px] bg-[#EA4335]/10 top-[40%] right-[10%]" style={{ position: 'absolute' }} />
      </div>

      <SiteNav />

      {/* ═══════ HERO ═══════ */}
      <section className="relative z-10 pt-32 pb-16 md:pt-44 md:pb-24 px-6 hero-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_360px] gap-10 xl:gap-20 items-end">
            {/* Left — Copy */}
            <div>
              <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                <GoogleDots />
                <span className="text-xs font-mono text-fg/40 tracking-wider uppercase">
                  2026 Contributor Recruitment
                </span>
              </div>

              <RotatingTypewriter messages={HERO_MESSAGES} />

              <div className="animate-fade-in-up animation-delay-100">
                <p className="text-lg md:text-xl text-fg/50 max-w-xl mb-10 leading-relaxed">
                  GDG on Campus Babcock is recruiting contributors across media, marketing,
                  and events &amp; planning. Find the role that fits and apply.
                  <span className="block mt-3 text-sm font-mono text-fg/35">
                    {isExpired ? "Applications closed — August 19, 2026 at 11:59 PM" : "Applications open — deadline August 19, 2026 at 11:59 PM"}
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
                <Button asChild className="bg-fg text-bg hover:bg-fg/90 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <a href="#roles">View Open Roles</a>
                </Button>
                <Button asChild variant="outline" className="border-fg/20 text-fg hover:bg-secondary hover:border-fg/30 rounded-full px-8 py-6 text-base font-medium transition-all duration-300">
                  <a href="#about">About GDG Babcock</a>
                </Button>
              </div>
            </div>

            {/* Right — application dossier */}
            <aside className="application-dossier animate-slide-in-right animation-delay-300">
              <div className="flex items-center justify-between border-b border-fg/10 pb-5">
                <span className="text-[11px] font-mono tracking-[0.18em] text-fg/45 uppercase">Recruitment brief</span>
                {isExpired ? (
                  <span className="status-pill" style={{ color: "#f8c9c2", background: "rgba(234, 67, 53, 0.13)" }}>
                    <span className="status-dot dot-red" style={{ boxShadow: "0 0 0 4px rgba(234, 67, 53, 0.12)" }} />
                    Closed
                  </span>
                ) : (
                  <span className="status-pill"><span className="status-dot" />Open now</span>
                )}
              </div>
              <div className="py-8">
                <p className="text-fg/45 text-sm mb-3">{isExpired ? "Applications closed" : "Applications close"}</p>
                <p className="text-3xl font-bold tracking-tight leading-none">19TH AUGUST</p>
                <p className="text-sm text-fg/45 mt-2">11:59 PM · WAT</p>
                {!isExpired && (
                  <div className="mt-5 flex items-center gap-1.5 font-mono text-sm">
                    {(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => (
                      <span key={unit} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-fg/20">:</span>}
                        <span className="tabular-nums font-bold" style={{ color: GOOGLE_COLORS[i] }}>
                          {String(timeLeft[unit]).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] text-fg/30 uppercase">{unit[0]}</span>
                      </span>
                    ))}
                    <span className="ml-auto text-[10px] text-fg/30 uppercase tracking-wider">left</span>
                  </div>
                )}
              </div>
              <div className="dossier-rule" />
              <div className="grid grid-cols-2 gap-5 py-6">
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    <AnimatedCounter target={ROLES.length} pad />
                  </p>
                  <p className="text-[11px] font-mono text-fg/40 uppercase tracking-wider mt-1">Open roles</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    <AnimatedCounter target={TEAMS.length} pad />
                  </p>
                  <p className="text-[11px] font-mono text-fg/40 uppercase tracking-wider mt-1">Teams hiring</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-fg/55 border-t border-fg/10 pt-5">
                Pick a path, show us how you think, then meet the people you&apos;ll build with.
              </p>
              <a href="#process" className="dossier-link">Explore the process <span>↘</span></a>
            </aside>
          </div>

          <div className="hero-footnote mt-14 md:mt-20">
            <span>GDG ON CAMPUS · BABCOCK UNIVERSITY</span>
            <span className="hidden sm:block">BUILD · LEARN · CONTRIBUTE</span>
          </div>
        </div>
      </section>

      {/* ═══════ About — Bento Grid Stats ═══════ */}
      <SectionReveal>
        <section id="about" className="relative z-10 py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Text */}
              <div>
                <GoogleDots className="mb-4" />
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                  Babcock&apos;s largest student<br />
                  <span className="shimmer-text">tech community.</span>
                </h2>
                <p className="text-fg/50 leading-relaxed mb-4 text-lg">
                  GDG on Campus Babcock is open to every student at Babcock University —
                  regardless of department, level, or background. Computer Science, Nursing,
                  Law, Accounting — if you&apos;re curious about technology, you belong here.
                </p>
                <p className="text-fg/50 leading-relaxed text-lg">
                  We build products, run programs, publish stories, and recognize impact.
                  We are part of the global Google Developer Groups network, but we are
                  built and run by Babcock students.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bento-card col-span-2 flex items-center gap-6">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
                      <AnimatedCounter target={1500} suffix="+" />
                    </div>
                    <div className="text-xs text-fg/40 font-mono uppercase tracking-wider">Community Members</div>
                  </div>
                  <div className="ml-auto flex -space-x-3">
                    {GOOGLE_COLORS.map((c, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background" style={{ backgroundColor: c, opacity: 0.7 }} />
                    ))}
                  </div>
                </div>

                <div className="bento-card">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                    <AnimatedCounter target={6} />
                  </div>
                  <div className="text-xs text-fg/40 font-mono uppercase tracking-wider">Products</div>
                  <div className="mt-3 flex gap-1">
                    {GOOGLE_COLORS.map((c, i) => (
                      <span key={i} className="w-1.5 h-6 rounded-full" style={{ backgroundColor: c, opacity: 0.5 }} />
                    ))}
                  </div>
                </div>

                <div className="bento-card">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                    <AnimatedCounter target={ROLES.length} />
                  </div>
                  <div className="text-xs text-fg/40 font-mono uppercase tracking-wider">Open Roles</div>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-fg/50 border border-fg/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                      Recruiting
                    </span>
                  </div>
                </div>

                <div className="bento-card col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">All</div>
                      <div className="text-xs text-fg/40 font-mono uppercase tracking-wider">Departments Welcome</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Job Board ═══════ */}
      <SectionReveal>
        <section id="roles" className="relative z-10 py-24 md:py-32 px-6 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <GoogleDots className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Open Roles</h2>
              <p className="text-lg text-fg/50 max-w-2xl">
                {ROLES.length} roles across {TEAMS.length} teams. Every role has its own brief —
                what you&apos;ll do, what we ask for, and what the panel looks for.
              </p>
            </div>

            <JobBoard />
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Products Section ═══════ */}
      <SectionReveal>
        <section id="products" className="relative z-10 py-24 md:py-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4285F4]/[0.03] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="mb-16">
              <GoogleDots className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Past Work</h2>
              <p className="text-lg text-fg/40 max-w-2xl">
                Projects and events that occured during the previous tenure that serve the school, not just the community.
                Each has a Constitutional Owner and a minimum delivery standard.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((product, i) => (
                <a
                  key={i}
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bento-card p-0 overflow-hidden product-card-glow cursor-pointer"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-40" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100 dark:opacity-60 dark:group-hover:opacity-80"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: product.color }}
                        />
                        <h3 className="text-lg font-bold">{product.name}</h3>
                      </div>
                      <svg className="w-4 h-4 text-fg/15 group-hover:text-fg/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-fg/40 mb-3 leading-relaxed">{product.description}</p>
                    <div className="text-xs font-mono text-fg/25 uppercase tracking-wider">
                      {product.owner}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ What We Value ═══════ */}
      <SectionReveal>
        <section className="relative z-10 py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <GoogleDots className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What We Look For</h2>
              <p className="text-lg text-fg/40 max-w-2xl">
                You don&apos;t need a stacked portfolio. You need curiosity and the willingness to build.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALUES.map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-start gap-4">
                    <span
                      className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: GOOGLE_COLORS[i % 4] }}
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-fg/40 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-fg/5 to-transparent group-hover:via-fg/15 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Application Process ═══════ */}
      <SectionReveal>
        <section id="process" className="relative z-10 py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <GoogleDots className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
              <p className="text-lg text-fg/40 max-w-2xl">
                We don&apos;t do elections. We do structured selection — applications, portfolio review, and a short chat with the team leads.
              </p>
            </div>

            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-6 md:gap-10 group">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 glass-strong group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 0 20px ${item.color}20` }}
                    >
                      <span style={{ color: item.color }}>{item.step}</span>
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-fg/15 to-transparent my-2" />
                    )}
                  </div>
                  <div className="pb-14">
                    <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                    <p className="text-fg/40 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Countdown + Final CTA ═══════ */}
      <section className="relative z-10 py-24 md:py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4285F4]/[0.05] to-background pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <GoogleDots className="mb-6 justify-center" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {isExpired ? (
              "Applications are closed."
            ) : (
              <span className="shimmer-text">The window is open.</span>
            )}
          </h2>
          <p className="text-lg text-fg/40 mb-12 max-w-xl mx-auto">
            {isExpired
              ? "Thank you to everyone who applied. The team leads are now reviewing submissions."
              : "We care about willingness to build and curiosity — not grades or a stacked portfolio."}
          </p>

          {!isExpired && (
            <>
              <div className="flex justify-center gap-3 md:gap-5 mb-4 flex-wrap">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="countdown-card p-4 md:p-6 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                    <div className="text-xs text-fg/35 uppercase font-mono mt-1 tracking-wider">{unit}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-fg/30 font-mono mb-12">Applications close August 19, 2026 at 11:59 PM</p>

              <Button asChild className="bg-fg text-bg hover:bg-fg/90 rounded-full px-10 py-6 text-base font-bold transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
                <a href="#roles">Browse Open Roles</a>
              </Button>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
