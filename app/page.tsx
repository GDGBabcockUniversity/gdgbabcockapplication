"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#F9AB00", "#34A853"]

function useScrollReveal(threshold = 0.15) {
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

function SectionReveal({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  )
}

const HERO_MESSAGES = [
  "Build products that outlast your tenure.",
  "Lead with responsibility, not prestige.",
  "Ship code the whole campus relies on.",
  "Create opportunities across every department.",
]

const TYPEWRITER_COLOR = "#6B6B6B"

function RotatingTypewriter() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  const fullText = HERO_MESSAGES[messageIndex]

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorTimer)
  }, [])

  // Typewriter effect
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
      setMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, fullText])

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 animate-fade-in-up animation-delay-100 min-h-[1.9em] md:min-h-[2.85em]">
      <span style={{ color: TYPEWRITER_COLOR }}>{displayText}</span>
      <span
        className="inline-block w-[3px] md:w-[4px] h-[0.85em] ml-1 align-baseline relative -top-1 rounded-full"
        style={{
          backgroundColor: TYPEWRITER_COLOR,
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </h1>
  )
}

const EXECUTIVE_ROLES = [
  {
    title: "Organizer",
    mandate: "Lead the Chapter",
    description:
      "Serve as the principal leader and public representative. Provide strategic direction, chair executive meetings, and ensure institutional integrity across the tenure.",
  },
  {
    title: "Vice-President",
    mandate: "Coordinate & Align",
    description:
      "Serve as the principal deputy. Coordinate strategic internal administration, monitor accountability across offices, and chair the Extended Leadership Council.",
  },
  {
    title: "Operations Lead",
    mandate: "Record & Administer",
    description:
      "Serve as the official record-keeper. Maintain minutes, prepare agendas, manage the physical asset register, and ensure orderly handover of all Chapter property.",
  },
  {
    title: "Technical Lead (Development)",
    mandate: "Build & Maintain",
    description:
      "Head the technical arm. Oversee digital infrastructure, platforms, repositories, deployments, and technical continuity. Ensure institutional ownership of all technical systems.",
  },
  {
    title: "Technical Lead (Tracks)",
    mandate: "Teach & Develop",
    description:
      "Head the learning and curriculum function. Oversee technical tracks, workshops, and structured learning programs. Supervise Track Leads and ensure quality delivery.",
  },
  {
    title: "Programs Lead",
    mandate: "Plan & Execute",
    description:
      "Head events and major activations. Oversee ORBIT, GDG Week, and all flagship programs. Coordinate timelines, logistics, and post-event review.",
  },
  {
    title: "Community Lead",
    mandate: "Engage & Support",
    description:
      "Head member engagement and internal community life. Oversee onboarding, retention, the monthly meetup, team welfare, and at least one non-work team activity per month.",
  },
  {
    title: "Media Lead",
    mandate: "Document & Recognize",
    description:
      "Head editorial, documentation, and archives. Oversee RADAR, all publication outputs, and recognition products including the Babcock 100.",
  },
  {
    title: "Marketing Lead",
    mandate: "Promote & Grow",
    description:
      "Head communications, promotion, and audience growth. Oversee visibility strategies, campaign calendars, brand consistency, and distribution across all channels.",
  },
  {
    title: "Partnerships Lead",
    mandate: "Connect & Sustain",
    description:
      "Head sponsorship, external relations, and alumni coordination. Maintain partner and alumni records, support the resource needs of major initiatives, and oversee alumni engagement.",
  },
]

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
  { step: "01", label: "Applications Open", detail: "Submit your application through the form below" },
  { step: "02", label: "Review & Interview", detail: "The Leadership Selection Panel reviews and interviews candidates" },
  { step: "03", label: "Selection", detail: "Decisions recorded and communicated through official channels" },
  { step: "04", label: "14-Day Handover", detail: "Structured transition with outgoing officers before assumption of office" },
]

function GoogleDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-1.5 ${className}`}>
      {GOOGLE_COLORS.map((color, i) => (
        <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </span>
  )
}

function AnimatedCounter({ target }: { target: string }) {
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

  return (
    <span ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {target}
    </span>
  )
}

export default function ApplyPage() {
  const [activeRole, setActiveRole] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("2025-09-07T23:59:59")
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#FFF6E0] text-[#0F0F0F]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF6E0]/90 backdrop-blur-md border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/gdg-logo.svg" alt="GDG on Campus Babcock" className="h-8 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#roles" className="hover:opacity-60 transition-opacity">Roles</a>
            <a href="#products" className="hover:opacity-60 transition-opacity">Products</a>
            <a href="#process" className="hover:opacity-60 transition-opacity">Process</a>
            <Button asChild className="bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-6 text-sm">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
          <Button asChild className="md:hidden bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-5 text-sm">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header" target="_blank" rel="noopener noreferrer">
              Apply
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <GoogleDots />
              <span className="text-sm font-mono text-[#444444] tracking-wider uppercase">2026–2027 Leadership Transition</span>
            </div>
          </div>
          <RotatingTypewriter />
          <p className="text-lg md:text-xl text-[#444444] max-w-2xl mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            GDG on Campus Babcock is selecting its next Executive Leadership.
            We are looking for ten people who understand that office is for
            responsibility, not prestige.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Button asChild className="bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-8 py-6 text-base font-medium">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
            <Button asChild variant="outline" className="border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-[#FFF6E0] rounded-full px-8 py-6 text-base font-medium transition-all">
              <a href="#roles">
                View Roles
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img src="/community.png" alt="GDG Babcock community members" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src="/speaker.png" alt="Speaking at a GDG event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src="/workshop.png" alt="Workshop session" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* About / Stats */}
      <SectionReveal>
      <section id="about" className="py-20 px-6 border-y border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <GoogleDots className="mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Babcock&apos;s largest student tech community.
              </h2>
              <p className="text-[#444444] leading-relaxed mb-4">
                GDG on Campus Babcock is open to every student at Babcock University —
                regardless of department, level, or background. Computer Science, Nursing,
                Law, Accounting — if you&apos;re curious about technology, you belong here.
              </p>
              <p className="text-[#444444] leading-relaxed">
                We build products, run programs, publish stories, and recognize impact.
                We are part of the global Google Developer Groups network, but we are
                built and run by Babcock students.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "1,200+", label: "Community Members" },
                { value: "10", label: "Executive Offices" },
                { value: "6", label: "Institutional Products" },
                { value: "All", label: "Departments Welcome" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-[#E8DFC8]">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                    <AnimatedCounter target={stat.value} />
                  </div>
                  <div className="text-xs text-[#444444] font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* Roles Section */}
      <SectionReveal>
      <section id="roles" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <GoogleDots className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Executive Leadership</h2>
            <p className="text-lg text-[#444444] max-w-2xl">
              Ten offices. Each with a clear mandate, a standing team, and constitutional accountability.
              No office has two equal heads.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-0 border border-[#E8DFC8] rounded-2xl overflow-hidden bg-white">
            {/* Role List */}
            <div className="border-r border-[#E8DFC8] max-h-[600px] overflow-y-auto">
              {EXECUTIVE_ROLES.map((role, i) => (
                <button
                  key={i}
                  id={`role-button-${i}`}
                  onClick={() => setActiveRole(i)}
                  className={`w-full text-left px-6 py-5 border-b border-[#E8DFC8] last:border-b-0 transition-all duration-200 ${
                    activeRole === i
                      ? "bg-[#0F0F0F] text-[#FFF6E0]"
                      : "hover:bg-[#F5EDD6]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-base">{role.title}</div>
                      <div className={`text-sm mt-0.5 ${activeRole === i ? "text-[#FFF6E0]/60" : "text-[#444444]"}`}>
                        {role.mandate}
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: activeRole === i ? "#FFF6E0" : GOOGLE_COLORS[i % 4] }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Role Detail */}
            <div className="p-8 md:p-12 flex flex-col justify-center min-h-[400px]">
              <div className="mb-6">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: GOOGLE_COLORS[activeRole % 4] }}
                />
                <span className="text-sm font-mono text-[#444444] tracking-wider uppercase">
                  Office {String(activeRole + 1).padStart(2, "0")} of 10
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                {EXECUTIVE_ROLES[activeRole].title}
              </h3>
              <p className="text-lg text-[#444444] font-medium mb-6">
                {EXECUTIVE_ROLES[activeRole].mandate}
              </p>
              <p className="text-base text-[#2D2D2D] leading-relaxed max-w-xl">
                {EXECUTIVE_ROLES[activeRole].description}
              </p>
              <div className="mt-8">
                <Button asChild className="bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-6 text-sm">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                    Apply for this role →
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* Products Section — Clickable Cards */}
      <section id="products" className="py-24 md:py-32 px-6 bg-[#0F0F0F] text-[#FFF6E0]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <GoogleDots className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What We Build</h2>
            <p className="text-lg text-[#FFF6E0]/60 max-w-2xl">
              Products that serve the school, not just the community. Every one has a Constitutional Owner,
              a documented timeline, and a minimum delivery standard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((product, i) => (
              <a
                key={i}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-[#1a1a1a] border border-[#2D2D2D] rounded-2xl overflow-hidden hover:border-[#444444] transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: product.color }}
                      />
                      <h3 className="text-lg font-bold">{product.name}</h3>
                    </div>
                    <svg className="w-4 h-4 text-[#FFF6E0]/20 group-hover:text-[#FFF6E0]/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#FFF6E0]/50 mb-3 leading-relaxed">{product.description}</p>
                  <div className="text-xs font-mono text-[#FFF6E0]/30 uppercase tracking-wider">
                    {product.owner}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* What We Value */}
      <SectionReveal>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <GoogleDots className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What We Look For</h2>
            <p className="text-lg text-[#444444] max-w-2xl">
              You don&apos;t need to be a Computer Science student. You need to care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Competence", detail: "Demonstrated ability in the domain of the office you seek. Show us what you've done." },
              { title: "Reliability", detail: "Consistency, follow-through, and the ability to deliver when it matters. Not just promises." },
              { title: "Institutional Understanding", detail: "Knowledge of our structure, mission, products, and how they connect across offices." },
              { title: "Continuity Mindset", detail: "Build things that survive your departure. The institution outlasts every tenure." },
              { title: "Commitment", detail: "Executive members may not hold concurrent principal leadership in other student organizations." },
              { title: "Initiative", detail: "The capacity to see what needs doing and do it before being asked. Leaders act." },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-4">
                  <span
                    className="w-2 h-2 rounded-full mt-2.5 shrink-0"
                    style={{ backgroundColor: GOOGLE_COLORS[i % 4] }}
                  />
                  <div>
                    <h3 className="font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                    <p className="text-[#444444] text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </SectionReveal>

      {/* Application Process */}
      <section id="process" className="py-24 md:py-32 px-6 border-t border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <GoogleDots className="mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-[#444444] max-w-2xl">
              We don&apos;t do elections. We do structured selection — applications, interviews, and deliberation by the Leadership Selection Panel.
            </p>
          </div>

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: GOOGLE_COLORS[i % 4] }}
                  >
                    {item.step}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px h-full bg-[#E8DFC8] my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                  <p className="text-[#444444] text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown + Final CTA */}
      <section className="py-24 md:py-32 px-6 bg-[#0F0F0F] text-[#FFF6E0]">
        <div className="max-w-4xl mx-auto text-center">
          <GoogleDots className="mb-6 justify-center" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            The window is open.
          </h2>
          <p className="text-lg text-[#FFF6E0]/60 mb-12 max-w-xl mx-auto">
            Office is for responsibility, not prestige. If you understand that, we want to hear from you.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 md:gap-6 mb-12 flex-wrap">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-[#1a1a1a] border border-[#2D2D2D] rounded-xl p-4 md:p-6 min-w-[80px]">
                <div className="text-3xl md:text-4xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                <div className="text-xs text-[#FFF6E0]/40 uppercase font-mono mt-1 tracking-wider">{unit}</div>
              </div>
            ))}
          </div>

          <Button asChild className="bg-[#FFF6E0] text-[#0F0F0F] hover:bg-white rounded-full px-10 py-6 text-base font-bold">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header" target="_blank" rel="noopener noreferrer">
              Submit Your Application
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/gdg-logo.svg" alt="GDG on Campus Babcock" className="h-6 w-auto" />
          </div>
          <div className="flex items-center gap-6 text-sm text-[#444444]">
            <a href="https://gdgbabcock.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0F0F0F] transition-colors">gdgbabcock.com</a>
            <a href="https://babcockvotes.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0F0F0F] transition-colors">babcockvotes.com</a>
          </div>
          <p className="text-sm text-[#444444] font-mono">
            © {new Date().getFullYear()} GDG on Campus Babcock
          </p>
        </div>
      </footer>
    </div>
  )
}
