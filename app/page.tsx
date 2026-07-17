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
  "Build products the whole campus uses.",
  "Ship code that outlasts your degree.",
  "Create tools that serve every department.",
  "Learn by building, not just watching.",
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

const DEV_TEAM_ROLES = [
  {
    title: "Frontend Developer",
    mandate: "Build Interfaces",
    purpose:
      "Build and maintain the user-facing side of GDG Babcock's products. Translate designs into responsive, accessible, and performant interfaces that serve the entire campus community.",
    responsibilities: [
      "Build and maintain UI for community products (GDG Site, BabcockVotes, RADAR, Babcock 100, Apply Portal)",
      "Translate Figma designs into pixel-perfect, responsive components using React and Next.js",
      "Ensure cross-browser compatibility, accessibility, and performance across all products",
      "Collaborate with UI/UX Designers to refine user flows and interaction patterns",
      "Write reusable component libraries and maintain frontend documentation",
      "Review frontend PRs and mentor junior contributors on best practices",
    ],
    requirements: [
      "Experience with React, Next.js, or similar frontend frameworks",
      "Working knowledge of HTML, CSS, and TypeScript",
      "Understanding of responsive design and accessibility principles",
      "Familiarity with Tailwind CSS or similar utility-first frameworks",
    ],
    panelLooksFor: [
      "Quality of past UI work — live sites, components, or side projects",
      "Attention to visual detail and user experience intuition",
      "Ability to articulate design-to-code decisions",
      "Eagerness to learn and adopt new frontend tools",
      "Collaborative mindset — open to design feedback and iteration",
    ],
  },
  {
    title: "Backend Developer",
    mandate: "Power the Platform",
    purpose:
      "Design, build, and maintain the server-side logic, APIs, and databases that power GDG Babcock's applications. Ensure data integrity, security, and reliable performance at scale.",
    responsibilities: [
      "Design and build RESTful or GraphQL APIs for community applications",
      "Model and manage databases, write migrations, and optimize queries",
      "Implement authentication, authorization, and data validation logic",
      "Write integration and unit tests; maintain API documentation",
      "Monitor server performance, debug production issues, and optimize bottlenecks",
      "Collaborate with Frontend and DevOps engineers on end-to-end feature delivery",
    ],
    requirements: [
      "Experience with Node.js, Python, or similar backend languages",
      "Working knowledge of databases (PostgreSQL, MongoDB, or similar)",
      "Understanding of REST API design and HTTP fundamentals",
      "Familiarity with version control and collaborative development workflows",
    ],
    panelLooksFor: [
      "Ability to reason about data models and API design trade-offs",
      "Attention to security — input validation, auth patterns, safe defaults",
      "Debugging discipline — methodical approach to tracing issues",
      "Understanding of how backend choices affect frontend and product experience",
      "Willingness to document and communicate technical decisions",
    ],
  },
  {
    title: "AI/ML Engineer",
    mandate: "Ship Intelligence",
    purpose:
      "Integrate AI-powered features into GDG Babcock products. Work with LLMs, embeddings, RAG pipelines, and agent frameworks to build tools that solve real problems for the campus community.",
    responsibilities: [
      "Build and deploy AI-powered features (chatbots, search, recommendations) for community products",
      "Experiment with LLM APIs, RAG architectures, and agent frameworks",
      "Prototype AI tools for internal workflows — content generation, data analysis, automation",
      "Stay current with the AI ecosystem and share learnings with the team",
      "Collaborate on StudySmart, Chatbothon, and other AI-focused initiatives",
      "Write clear documentation for AI features and contribute to internal knowledge base",
    ],
    requirements: [
      "Familiarity with LLM APIs (Gemini, OpenAI, or similar)",
      "Basic understanding of prompt engineering, embeddings, and retrieval concepts",
      "Comfortable with Python or JavaScript for prototyping",
      "Curiosity-driven — you experiment with new AI tools and share what you find",
    ],
    panelLooksFor: [
      "Evidence of AI experimentation — side projects, notebooks, prototypes",
      "Ability to separate hype from practical utility",
      "Creative problem-solving — finding where AI genuinely adds value",
      "Ethical awareness — bias, safety, and responsible deployment",
      "Communication skills — can explain AI concepts to non-technical teammates",
    ],
  },
  {
    title: "DevOps/Cloud Engineer",
    mandate: "Keep It Running",
    purpose:
      "Own deployment pipelines, cloud infrastructure, and observability for all GDG Babcock products. Ensure fast, reliable, and secure delivery of every service the community depends on.",
    responsibilities: [
      "Set up and maintain CI/CD pipelines for all community projects",
      "Manage cloud infrastructure (Vercel, GCP, or similar) and domain/DNS configuration",
      "Implement monitoring, alerting, and logging for production applications",
      "Automate repetitive operational tasks and document runbooks",
      "Conduct security reviews of deployment configurations and access controls",
      "Support the dev team with environment setup and troubleshooting",
    ],
    requirements: [
      "Familiarity with cloud platforms (GCP, AWS, Vercel, or similar)",
      "Understanding of CI/CD concepts and Git-based workflows",
      "Basic knowledge of Linux, shell scripting, and networking fundamentals",
      "Experience with Docker or containerization is a plus",
    ],
    panelLooksFor: [
      "Systems thinking — you see how deployment, infra, and code connect",
      "Automation instinct — if you do it twice, you script it",
      "Security consciousness — least privilege, secret management, safe defaults",
      "Calm under pressure — production incidents don't rattle you",
      "Documentation habit — runbooks, setup guides, post-mortems",
    ],
  },
  {
    title: "UI/UX Designer",
    mandate: "Design the Experience",
    purpose:
      "Own the visual and interaction design of GDG Babcock's products. Conduct user research, create design systems, and ensure every product is intuitive, accessible, and beautiful.",
    responsibilities: [
      "Design user flows, wireframes, and high-fidelity mockups in Figma",
      "Build and maintain a shared design system used across all community products",
      "Conduct user research, usability testing, and iterate based on feedback",
      "Collaborate with Frontend Developers to ensure design fidelity in implementation",
      "Design for accessibility — color contrast, keyboard navigation, screen readers",
      "Lead design critiques and contribute to the visual identity of the GDG Babcock brand",
    ],
    requirements: [
      "Proficiency with Figma (components, auto-layout, prototyping)",
      "Portfolio demonstrating UI/UX work — even personal or speculative projects",
      "Understanding of design fundamentals — typography, color, spacing, hierarchy",
      "Familiarity with accessibility standards (WCAG) is a strong plus",
    ],
    panelLooksFor: [
      "Quality and thoughtfulness of design portfolio",
      "User-centered thinking — you design for people, not aesthetics alone",
      "Ability to give and receive constructive design feedback",
      "Systems thinking — reusable components over one-off designs",
      "Curiosity about the intersection of design and code",
    ],
  },
  {
    title: "Full-Stack Developer",
    mandate: "Deliver End-to-End",
    purpose:
      "Work across the entire stack to deliver complete features. Bridge frontend and backend concerns, own features from database to UI, and unblock teammates wherever needed.",
    responsibilities: [
      "Deliver complete features end-to-end — from database schema to UI component",
      "Jump between frontend and backend as needed to keep projects moving",
      "Review PRs across the stack and provide constructive, context-aware feedback",
      "Prototype quickly to validate ideas before investing in polished implementation",
      "Mentor team members who are stronger on one side of the stack",
      "Contribute to architectural decisions that span the full application",
    ],
    requirements: [
      "Comfortable with both frontend (React, HTML/CSS) and backend (APIs, databases)",
      "Understanding of how the full web stack connects — DNS to database",
      "Experience shipping a project from idea to production",
      "Strong debugging skills — you can trace a bug through multiple layers",
    ],
    panelLooksFor: [
      "Breadth of knowledge across the stack — depth in at least one area",
      "Shipping track record — projects that are live, not just local",
      "Adaptability — comfortable jumping into unfamiliar code or tools",
      "Teaching ability — you lift others up as you move across the stack",
      "Pragmatism — you choose the right tool for the problem, not the trendiest",
    ],
  },
  {
    title: "Mobile Developer",
    mandate: "Go Where Users Are",
    purpose:
      "Build and maintain mobile experiences for GDG Babcock products. Extend community tools to iOS and Android, ensuring native-quality performance and a seamless user experience on every device.",
    responsibilities: [
      "Build and maintain mobile apps for community products using Flutter or React Native",
      "Ensure smooth cross-platform performance on both iOS and Android",
      "Integrate mobile apps with backend APIs and handle offline/connectivity edge cases",
      "Publish and manage app store listings (Google Play, Apple App Store)",
      "Collaborate with UI/UX Designers on mobile-specific interaction patterns",
      "Stay current with mobile platform updates and ecosystem changes",
    ],
    requirements: [
      "Experience with Flutter, React Native, or native mobile development",
      "Understanding of mobile UI patterns and platform conventions",
      "Familiarity with state management approaches (Riverpod, Redux, or similar)",
      "A published or side-project app is a strong plus",
    ],
    panelLooksFor: [
      "Quality of mobile work — published apps, APKs, or prototypes",
      "Platform awareness — you understand iOS and Android differences",
      "Performance sensitivity — jank, load time, battery impact matter to you",
      "User empathy — you think about who uses the app and in what context",
      "Initiative — you spot mobile opportunities in existing products",
    ],
  },
  {
    title: "Technical Writer",
    mandate: "Document Everything",
    purpose:
      "Create and maintain clear, useful documentation across all GDG Babcock products. Write API references, onboarding guides, tutorials, and technical articles that make the team and community smarter.",
    responsibilities: [
      "Write and maintain API documentation, setup guides, and architecture overviews",
      "Create onboarding materials and quickstart guides for new contributors",
      "Author technical articles for RADAR — tutorials, post-mortems, deep dives",
      "Review and improve existing documentation for clarity, accuracy, and completeness",
      "Collaborate with developers to document features as they're built",
      "Establish and enforce documentation standards and templates across projects",
    ],
    requirements: [
      "Strong written communication skills — clear, concise, and well-structured",
      "Ability to understand and explain technical concepts to different audiences",
      "Familiarity with Markdown, static site generators, or docs platforms",
      "Experience writing tutorials, guides, or technical blog posts",
    ],
    panelLooksFor: [
      "Quality of writing samples — tutorials, blog posts, READMEs, or guides",
      "Ability to learn unfamiliar technical topics and explain them clearly",
      "Organizational thinking — you structure information for findability",
      "Empathy for the reader — you anticipate confusion and address it upfront",
      "Consistency and attention to detail in written work",
    ],
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
  { step: "02", label: "Review & Portfolio Check", detail: "Dev leads review applications, portfolios, and GitHub profiles" },
  { step: "03", label: "Technical Interview", detail: "Short chat — walk us through your projects, interests, and what you want to learn" },
  { step: "04", label: "Onboarding & Integration", detail: "Join the team, get repo access, meet your squad, and pick your first issue" },
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
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const targetDate = new Date("2026-07-24T18:00:00")
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
      } else {
        setIsExpired(true)
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
            <img src="/gdg-logo.svg" alt="GDG on Campus Babcock" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#roles" className="hover:opacity-60 transition-opacity">Roles</a>
            <a href="#products" className="hover:opacity-60 transition-opacity">Products</a>
            <a href="#process" className="hover:opacity-60 transition-opacity">Process</a>
            <Button asChild className="bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-6 text-sm">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
          <Button asChild className="md:hidden bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-5 text-sm">
            <a href="#" target="_blank" rel="noopener noreferrer">
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
              <span className="text-sm font-mono text-[#444444] tracking-wider uppercase">2026 Dev Team Recruitment</span>
            </div>
          </div>
          <RotatingTypewriter />
          <p className="text-lg md:text-xl text-[#444444] max-w-2xl mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            GDG on Campus Babcock is recruiting its next Dev Team.
            We are looking for people who want to build, learn, and contribute
            to products the whole campus relies on.
            <span className="block mt-3 text-base font-mono text-[#6B6B6B]">Applications open — deadline July 24, 2026 at 6:00 PM</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Button asChild className="bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-8 py-6 text-base font-medium">
              <a href="#" target="_blank" rel="noopener noreferrer">
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
                { value: "1,500+", label: "Community Members" },
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Dev Team Roles</h2>
            <p className="text-lg text-[#444444] max-w-2xl">
              Eight roles. Each with a clear focus, real products to build, and a team to collaborate with.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-0 border border-[#E8DFC8] rounded-2xl overflow-hidden bg-white">
            {/* Role List */}
            <div className="border-r border-[#E8DFC8] max-h-[600px] overflow-y-auto">
              {DEV_TEAM_ROLES.map((role, i) => (
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
            <div className="p-8 md:p-10 flex flex-col min-h-[400px] max-h-[600px] overflow-y-auto">
              <div className="mb-4">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: GOOGLE_COLORS[activeRole % 4] }}
                />
                <span className="text-sm font-mono text-[#444444] tracking-wider uppercase">
                  Role {String(activeRole + 1).padStart(2, "0")} of 08
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                {DEV_TEAM_ROLES[activeRole].title}
              </h3>
              <p className="text-base text-[#444444] font-medium mb-5">
                {DEV_TEAM_ROLES[activeRole].mandate}
              </p>

              {/* Purpose */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[activeRole % 4] }} />
                  Purpose
                </h4>
                <p className="text-sm text-[#2D2D2D] leading-relaxed">
                  {DEV_TEAM_ROLES[activeRole].purpose}
                </p>
              </div>

              {/* Key Responsibilities */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[(activeRole + 1) % 4] }} />
                  Key Responsibilities
                </h4>
                <div className="space-y-2">
                  {DEV_TEAM_ROLES[activeRole].responsibilities.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#2D2D2D]">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#E8DFC8] text-[10px] font-mono text-[#6B6B6B] shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[(activeRole + 2) % 4] }} />
                  Requirements
                </h4>
                <div className="space-y-2">
                  {DEV_TEAM_ROLES[activeRole].requirements.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#2D2D2D]">
                      <span className="w-4 h-4 rounded border border-[#D0C9B8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What the Panel Looks For */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-[#6B6B6B] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[(activeRole + 3) % 4] }} />
                  What the Panel Looks For
                </h4>
                <div className="space-y-1.5">
                  {DEV_TEAM_ROLES[activeRole].panelLooksFor.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[#2D2D2D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] shrink-0 mt-[7px]" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4">
                <Button asChild className="bg-[#0F0F0F] text-[#FFF6E0] hover:bg-[#2D2D2D] rounded-full px-6 text-sm">
                  <a href="#" target="_blank" rel="noopener noreferrer">
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
              You don&apos;t need a stacked portfolio. You need curiosity and the willingness to build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Willingness to Learn", detail: "You don't need to know everything. We value curiosity and the drive to figure things out over what you already know." },
              { title: "Curiosity", detail: "You tinker, explore new tools, ask why things work the way they do, and push beyond tutorials." },
              { title: "Collaboration", detail: "You share what you learn, review PRs constructively, and lift others up instead of working in isolation." },
              { title: "Product Thinking", detail: "You care about why we build something and who it serves — not just the tech behind it." },
              { title: "Reliability", detail: "You show up, communicate early when you're stuck, and follow through on what you commit to." },
              { title: "Community Spirit", detail: "You help others grow, contribute to open source, share knowledge freely, and make the team better." },
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
              We don&apos;t do elections. We do structured selection — applications, portfolio review, and a short technical chat with the dev leads.
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
            {isExpired ? "Applications are closed." : "The window is open."}
          </h2>
          <p className="text-lg text-[#FFF6E0]/60 mb-12 max-w-xl mx-auto">
            {isExpired
              ? "Thank you to everyone who applied. The dev leads are now reviewing submissions."
              : "We care about willingness to build and curiosity — not grades or a stacked portfolio."}
          </p>

          {/* Countdown */}
          {!isExpired && (
            <>
              <div className="flex justify-center gap-4 md:gap-6 mb-4 flex-wrap">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-[#1a1a1a] border border-[#2D2D2D] rounded-xl p-4 md:p-6 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                    <div className="text-xs text-[#FFF6E0]/40 uppercase font-mono mt-1 tracking-wider">{unit}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#FFF6E0]/40 font-mono mb-12">Applications close July 24, 2026 at 6:00 PM</p>
            </>
          )}

          {!isExpired && (
            <Button asChild className="bg-[#FFF6E0] text-[#0F0F0F] hover:bg-white rounded-full px-10 py-6 text-base font-bold">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Submit Your Application
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/gdg-logo.svg" alt="GDG on Campus Babcock" className="h-8 w-auto" />
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
