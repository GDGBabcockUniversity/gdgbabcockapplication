"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

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
  "Build products the whole campus uses.",
  "Ship code that outlasts your degree.",
  "Create tools that serve every department.",
  "Learn by building, not just watching.",
]

const HERO_MESSAGES_TRACKS = [
  "Teach the next generation of builders.",
  "Design learning paths that actually work.",
  "Lead workshops. Mentor minds. Set the standard.",
  "Shape what the community learns next.",
]

function RotatingTypewriter({ messages }: { messages: string[] }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    setMessageIndex(0)
    setDisplayText("")
    setIsDeleting(false)
  }, [messages])

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
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/* ─────────── Data ─────────── */
const DEV_TEAM_ROLES = [
  {
    title: "Frontend Specialist",
    mandate: "Build Interfaces",
    purpose: "Build and maintain the user-facing side of GDG Babcock's products. Translate designs into responsive, accessible, and performant interfaces that serve the entire campus community.",
    responsibilities: [
      "Build and maintain UI for community products (GDG Site, BabcockVotes, RADAR, Babcock 100, Apply Portal)",
      "Translate Figma designs into pixel-perfect, responsive components using React and Next.js",
      "Ensure cross-browser compatibility, accessibility, and performance across all products",
      "Collaborate with Product Design Specialists to refine user flows and interaction patterns",
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
    color: "#4285F4",
  },
  {
    title: "Backend Specialist",
    mandate: "Power the Platform",
    purpose: "Design, build, and maintain the server-side logic, APIs, and databases that power GDG Babcock's applications. Ensure data integrity, security, and reliable performance at scale.",
    responsibilities: [
      "Design and build RESTful or GraphQL APIs for community applications",
      "Model and manage databases, write migrations, and optimize queries",
      "Implement authentication, authorization, and data validation logic",
      "Write integration and unit tests; maintain API documentation",
      "Monitor server performance, debug production issues, and optimize bottlenecks",
      "Collaborate with Frontend and DevOps specialists on end-to-end feature delivery",
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
    color: "#EA4335",
  },
  {
    title: "AI/ML Specialist",
    mandate: "Ship Intelligence",
    purpose: "Integrate AI-powered features into GDG Babcock products. Work with LLMs, embeddings, RAG pipelines, and agent frameworks to build tools that solve real problems for the campus community.",
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
    color: "#F9AB00",
  },
  {
    title: "DevOps Specialist",
    mandate: "Keep It Running",
    purpose: "Own deployment pipelines, cloud infrastructure, and observability for all GDG Babcock products. Ensure fast, reliable, and secure delivery of every service the community depends on.",
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
    color: "#34A853",
  },
  {
    title: "Product Design Specialist",
    mandate: "Design the Experience",
    purpose: "Own the visual and interaction design of GDG Babcock's products. Conduct user research, create design systems, and ensure every product is intuitive, accessible, and beautiful.",
    responsibilities: [
      "Design user flows, wireframes, and high-fidelity mockups in Figma",
      "Build and maintain a shared design system used across all community products",
      "Conduct user research, usability testing, and iterate based on feedback",
      "Collaborate with Frontend Specialists to ensure design fidelity in implementation",
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
    color: "#4285F4",
  },
  {
    title: "Project Manager Specialist",
    mandate: "Keep Work Moving",
    purpose: "Coordinate projects across the team, keep delivery visible, and make sure ideas turn into shipped work. Bring structure to planning, communication, and follow-through so the team can move with clarity.",
    responsibilities: [
      "Plan project timelines, milestones, and deliverables with clear ownership",
      "Track progress across design, development, and testing workstreams",
      "Run standups, check-ins, and project reviews that keep the team aligned",
      "Document scope, blockers, decisions, and next steps for every active initiative",
      "Coordinate handoffs between specialists and help resolve dependency gaps",
      "Support release planning and make sure stakeholders stay informed",
    ],
    requirements: [
      "Strong organization, planning, and communication skills",
      "Comfort managing multiple tasks, deadlines, and contributors at once",
      "Familiarity with project management tools such as Notion, Trello, Jira, or similar",
      "Experience leading group work, club projects, or team-based initiatives is a plus",
    ],
    panelLooksFor: [
      "Clear communication and dependable follow-through",
      "Ability to keep a team aligned without creating friction",
      "Practical judgment about priorities, scope, and delivery risk",
      "Comfort turning ambiguity into an actionable plan",
      "A calm, organized approach to coordination and accountability",
    ],
    color: "#F4B400",
  },
  {
    title: "Mobile Specialist",
    mandate: "Build for Every Pocket",
    purpose: "Build polished mobile experiences for GDG Babcock products. Turn useful campus services into fast, accessible applications that students can rely on wherever they are.",
    responsibilities: [
      "Develop and maintain mobile applications using Flutter, React Native, or native Android/iOS tooling",
      "Translate product requirements and designs into responsive, touch-first mobile interfaces",
      "Integrate mobile apps with community APIs, authentication, notifications, and offline-friendly data flows",
      "Test across device sizes and operating systems, then diagnose and resolve mobile-specific issues",
      "Collaborate with frontend, backend, and Product Design Specialists on a consistent cross-platform experience",
      "Contribute reusable mobile components, setup guides, and release documentation",
    ],
    requirements: [
      "Experience building with Flutter, React Native, Kotlin, Swift, or a comparable mobile framework",
      "Working knowledge of mobile UI patterns, state management, and API integration",
      "Understanding of responsive layouts, accessibility, and performance on mobile devices",
      "A mobile project, prototype, or portfolio piece you can discuss",
    ],
    panelLooksFor: [
      "Evidence of care for the small details that make mobile experiences feel natural",
      "Ability to reason about device constraints, connectivity, and real-world user contexts",
      "Strong product instinct — you build useful flows, not just screens",
      "Curiosity about mobile tooling and platform conventions",
      "A collaborative approach to shipping across design, API, and release work",
    ],
    color: "#EA4335",
  },
  {
    title: "Cybersecurity Specialist",
    mandate: "Protect What We Build",
    purpose: "Help make GDG Babcock products trustworthy by identifying risks early, improving security practices, and building secure-by-default habits across the development team.",
    responsibilities: [
      "Review community products for common web and application security risks before release",
      "Support secure authentication, authorization, input validation, and secrets-management practices",
      "Run lightweight security testing, document findings, and work with developers on practical fixes",
      "Help maintain incident-response notes, access reviews, and secure development checklists",
      "Share security awareness through team sessions, threat-model discussions, and clear documentation",
      "Keep up with relevant vulnerabilities and recommend proportionate safeguards for our products",
    ],
    requirements: [
      "Understanding of core cybersecurity concepts and common vulnerabilities such as the OWASP Top 10",
      "Familiarity with web security, networking, Linux, or security-testing tools",
      "Ability to explain security issues clearly and responsibly to non-security teammates",
      "Hands-on learning through labs, CTFs, coursework, home projects, or security write-ups",
    ],
    panelLooksFor: [
      "A responsible, ethical approach to security work and disclosure",
      "Methodical thinking — you investigate before drawing conclusions",
      "Practical judgment about risk, impact, and realistic mitigations",
      "Curiosity demonstrated through labs, write-ups, CTFs, or personal projects",
      "Communication that helps the team improve instead of creating friction",
    ],
    color: "#34A853",
  },
  {
    title: "Development Team Member",
    mandate: "Learn by Shipping",
    purpose: "Join the dev team as a general contributor. Pair with specialists, pick up scoped tasks across the stack, and grow into a specialty by shipping real work on GDG Babcock products.",
    responsibilities: [
      "Take on scoped issues across frontend, backend, design, or ops as capacity allows",
      "Pair with specialists on features, bug fixes, and reviews to build hands-on experience",
      "Contribute to community products (GDG Site, BabcockVotes, RADAR, Babcock 100, Apply Portal)",
      "Write clear PRs, respond to review feedback, and keep commitments visible to the team",
      "Attend team standups, planning, and retros; help document what you learn along the way",
      "Explore a specialization over time and grow into a specialist role",
    ],
    requirements: [
      "Basic programming ability in any language and comfort with Git and GitHub",
      "Willingness to learn the team's stack (React, Next.js, TypeScript, Node, or similar)",
      "Consistent availability for meetings, reviews, and shipping small pieces of work",
      "Openness to feedback and eagerness to pair with more experienced teammates",
    ],
    panelLooksFor: [
      "Curiosity and initiative — you try things before asking to be told what to do",
      "Follow-through on small commitments, not just enthusiasm for big ones",
      "A collaborative attitude and willingness to ask for help early",
      "Signs of a direction you want to grow into, even if not fully decided",
    ],
    color: "#F9AB00",
  },
]

const TRACK_LEAD_ROLES = [
  {
    title: "Software Development & Engineering Lead",
    mandate: "Teach the Stack",
    purpose: "Lead the Software Development & Engineering track. Design curriculum, run workshops, and mentor members across frontend, backend, full-stack, mobile, game development, APIs, databases, Git, and system design.",
    responsibilities: [
      "Design and deliver structured learning sessions for the Software Development track",
      "Mentor track members through projects, code reviews, and one-on-one guidance",
      "Stay current with industry trends and incorporate them into the curriculum",
      "Coordinate with other Track Leads on cross-track workshops and initiatives",
      "Assess member progress and adapt teaching approaches to different skill levels",
      "Collaborate with the dev team to align track content with real product needs",
    ],
    requirements: [
      "Strong proficiency across the software development stack — frontend, backend, or full-stack",
      "Experience teaching, mentoring, or tutoring in a technical capacity",
      "Ability to break down complex engineering concepts for learners at different levels",
      "Active GitHub profile or portfolio demonstrating hands-on work",
    ],
    panelLooksFor: [
      "Depth of technical knowledge and ability to teach it clearly",
      "Curriculum design thinking — structured, progressive, goal-oriented",
      "Patience and empathy for learners at different stages",
      "Track record of mentoring or community contributions",
      "Passion for growing the next generation of developers",
    ],
    color: "#4285F4",
  },
  {
    title: "Data & AI Lead",
    mandate: "Teach Intelligence",
    purpose: "Lead the Data & AI track. Design curriculum, run workshops, and mentor members across data analytics, data science, machine learning, deep learning, generative AI, AI application development, and data visualization.",
    responsibilities: [
      "Design and deliver structured learning sessions for the Data & AI track",
      "Guide members through hands-on ML projects, Kaggle competitions, and AI experiments",
      "Keep the curriculum current with the fast-moving AI landscape",
      "Organize AI-focused events — hackathons, study groups, and Build with AI sessions",
      "Mentor members on building and deploying real AI applications",
      "Collaborate with the dev team on AI-powered features for community products",
    ],
    requirements: [
      "Strong understanding of data science and machine learning fundamentals",
      "Experience with Python and common data/ML libraries (pandas, scikit-learn, TensorFlow/PyTorch)",
      "Familiarity with LLMs, prompt engineering, and generative AI tools",
      "Experience teaching or mentoring in a technical capacity",
    ],
    panelLooksFor: [
      "Ability to make AI accessible — you demystify, not intimidate",
      "Hands-on experience with real datasets and shipped ML/AI projects",
      "Structured approach to teaching complex, fast-evolving topics",
      "Ethical awareness — bias, safety, and responsible AI use",
      "Energy for building a data-driven culture in the community",
    ],
    color: "#EA4335",
  },
  {
    title: "Infrastructure & Security Lead",
    mandate: "Teach the Backbone",
    purpose: "Lead the Infrastructure & Security track. Design curriculum, run workshops, and mentor members across cloud computing, DevOps, cybersecurity, networking, system administration, database administration, and blockchain/Web3.",
    responsibilities: [
      "Design and deliver structured learning sessions for the Infrastructure & Security track",
      "Set up and maintain lab environments for hands-on cloud, DevOps, and security exercises",
      "Organize CTF competitions, security workshops, and cloud certification study groups",
      "Mentor members on industry tools — Docker, Kubernetes, CI/CD, and cloud platforms",
      "Keep the curriculum aligned with industry certifications and best practices",
      "Collaborate with the dev team on deployment and infrastructure for community products",
    ],
    requirements: [
      "Strong understanding of cloud platforms (GCP, AWS, or Azure) and Linux fundamentals",
      "Experience with DevOps practices — CI/CD, containerization, infrastructure as code",
      "Knowledge of cybersecurity fundamentals and common attack/defense patterns",
      "Experience teaching or mentoring in a technical capacity",
    ],
    panelLooksFor: [
      "Systems-level thinking — you understand how the pieces connect",
      "Security-first mindset — you bake safe defaults into everything you teach",
      "Practical, hands-on approach to learning — labs over lectures",
      "Ability to prepare members for real industry roles and certifications",
      "Calm and methodical — infrastructure and security demand precision",
    ],
    color: "#F9AB00",
  },
  {
    title: "Design & Management Lead",
    mandate: "Teach the Craft",
    purpose: "Lead the Design & Management track. Design curriculum, run workshops, and mentor members across UI/UX design, product design, UX research, design systems, product management, project management, agile methodologies, and technical writing.",
    responsibilities: [
      "Design and deliver structured learning sessions for the Design & Management track",
      "Run design critiques, portfolio reviews, and hands-on Figma workshops",
      "Teach product management and agile methodologies through real community projects",
      "Guide members through UX research, usability testing, and design system creation",
      "Mentor members on technical writing — documentation, tutorials, and case studies",
      "Collaborate with dev team and other tracks to embed design thinking into products",
    ],
    requirements: [
      "Strong proficiency in UI/UX design (Figma, design systems, prototyping)",
      "Understanding of product management and agile development methodologies",
      "Portfolio demonstrating design and/or product management work",
      "Experience teaching, mentoring, or facilitating workshops",
    ],
    panelLooksFor: [
      "Design thinking and user-centered problem-solving approach",
      "Ability to bridge design, business, and engineering perspectives",
      "Structured, repeatable approach to teaching creative processes",
      "Quality of design or product portfolio — shipped work over speculation",
      "Passion for cultivating well-rounded builders — not just designers, not just managers",
    ],
    color: "#34A853",
  },
  {
    title: "Marketing Lead",
    mandate: "Teach the Story",
    purpose: "Lead the Marketing track. Design curriculum, run workshops, and mentor members across brand strategy, content marketing, social media, copywriting, community growth, campaign analytics, and developer relations.",
    responsibilities: [
      "Design and deliver structured learning sessions for the Marketing track",
      "Mentor members on writing sharp copy, running campaigns, and measuring what worked",
      "Run workshops on social platforms, brand voice, positioning, and community growth",
      "Coordinate with other Track Leads on cross-track launches, event marketing, and recruitment cycles",
      "Guide members through real campaigns for GDG Babcock events and product launches",
      "Collaborate with Design & Management on assets, and with the dev team on launch messaging",
    ],
    requirements: [
      "Proven marketing experience — campaigns you've shipped, communities you've grown, or content you've published",
      "Strong writing ability with a portfolio of threads, captions, newsletters, or campaign copy",
      "Familiarity with social analytics, scheduling tools, and campaign planning",
      "Experience teaching, mentoring, or facilitating workshops",
    ],
    panelLooksFor: [
      "A portfolio of real marketing work — not just theory",
      "Instinct for what an audience actually clicks, shares, or shows up for",
      "Clarity and voice in writing — no generic corporate tone",
      "Data awareness — you check what worked instead of guessing",
      "Ability to teach marketing as a craft, not a vibe",
    ],
    color: "#4285F4",
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

const TIMELINE_DEV = [
  { step: "01", label: "Applications Open", detail: "Submit your application through the form below", color: "#4285F4" },
  { step: "02", label: "Review & Portfolio Check", detail: "Technical leads review applications, portfolios, and GitHub profiles", color: "#EA4335" },
  { step: "03", label: "Technical Interview", detail: "Short chat — walk us through your projects, interests, and what you want to learn", color: "#F9AB00" },
  { step: "04", label: "Onboarding & Integration", detail: "Join the team, get repo access, meet your squad, and pick your first issue", color: "#34A853" },
]

const TIMELINE_TRACKS = [
  { step: "01", label: "Applications Open", detail: "Submit your application through the form below", color: "#4285F4" },
  { step: "02", label: "Track Fit & Curriculum Review", detail: "Technical leads review your track pitch, teaching background, and curriculum ideas", color: "#EA4335" },
  { step: "03", label: "Lead Interview", detail: "Short chat — walk us through your background, teaching style, and how you'd run the track", color: "#F9AB00" },
  { step: "04", label: "Onboarding & Track Kickoff", detail: "Join the leads circle, get planning access, meet your students, and shape your track's first session", color: "#34A853" },
]

const DEV_TEAM_FORM_URL = "https://forms.gle/xPrMUXsoJyXJ67QD7"
const TRACK_LEAD_FORM_URL = "https://forms.gle/vqUFRmeaCoy6uvQy7"

const VALUES = [
  { title: "Willingness to Learn", detail: "You don't need to know everything. We value curiosity and the drive to figure things out over what you already know.", icon: "📚" },
  { title: "Curiosity", detail: "You tinker, explore new tools, ask why things work the way they do, and push beyond tutorials.", icon: "🔍" },
  { title: "Collaboration", detail: "You share what you learn, review PRs constructively, and lift others up instead of working in isolation.", icon: "🤝" },
  { title: "Product Thinking", detail: "You care about why we build something and who it serves — not just the tech behind it.", icon: "💡" },
  { title: "Reliability", detail: "You show up, communicate early when you're stuck, and follow through on what you commit to.", icon: "⚡" },
  { title: "Community Spirit", detail: "You help others grow, contribute to open source, share knowledge freely, and make the team better.", icon: "🌍" },
]

/* ─────────── Main Page ─────────── */
export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState<"dev" | "tracks">("dev")
  const [activeRole, setActiveRole] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeMessages = activeTab === "dev" ? HERO_MESSAGES : HERO_MESSAGES_TRACKS
  const activeRoles = activeTab === "dev" ? DEV_TEAM_ROLES : TRACK_LEAD_ROLES
  const activeFormUrl = activeTab === "dev" ? DEV_TEAM_FORM_URL : TRACK_LEAD_FORM_URL
  const activeTimeline = activeTab === "dev" ? TIMELINE_DEV : TIMELINE_TRACKS

  const handleTabChange = (tab: "dev" | "tracks") => {
    setActiveTab(tab)
    setActiveRole(0)
  }

  useEffect(() => {
    const targetDate = new Date(2026, 7, 2, 23, 59, 0)
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
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      {/* ═══════ Gradient Orbs Background ═══════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="gradient-orb w-[600px] h-[600px] bg-[#4285F4]/20 top-[-200px] left-[-100px]" style={{ position: 'absolute' }} />
        <div className="gradient-orb w-[500px] h-[500px] bg-[#34A853]/15 bottom-[-150px] right-[-100px]" style={{ position: 'absolute' }} />
        <div className="gradient-orb w-[400px] h-[400px] bg-[#EA4335]/10 top-[40%] right-[10%]" style={{ position: 'absolute' }} />
      </div>

      {/* ═══════ Navigation ═══════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-6">
        <div className="nav-shell max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-5">
          <div className="flex items-center gap-3">
            <img src="/gdg-logo-dark.svg" alt="GDG on Campus Babcock" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="text-white/60 hover:text-white transition-colors duration-200">About</a>
            <a href="#roles" className="text-white/60 hover:text-white transition-colors duration-200">Roles</a>
            <a href="#products" className="text-white/60 hover:text-white transition-colors duration-200">Products</a>
            <a href="#process" className="text-white/60 hover:text-white transition-colors duration-200">Process</a>
            <Button asChild className="bg-white text-[#0a0a0a] hover:bg-[#E8E8E8] rounded-full px-6 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
              <a href={activeFormUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/60 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl glass-strong border border-white/10 px-6 py-4 space-y-3 animate-fade-in">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-white/60 hover:text-white transition-colors py-2">About</a>
            <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="block text-white/60 hover:text-white transition-colors py-2">Roles</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block text-white/60 hover:text-white transition-colors py-2">Products</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block text-white/60 hover:text-white transition-colors py-2">Process</a>
            <Button asChild className="w-full bg-white text-[#0a0a0a] hover:bg-[#E8E8E8] rounded-full px-6 text-sm font-semibold">
              <a href={activeFormUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative z-10 pt-32 pb-16 md:pt-44 md:pb-24 px-6 hero-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_360px] gap-10 xl:gap-20 items-end">
            {/* Left — Copy */}
            <div className="">
              {/* Tab Toggle */}
              <div className="animate-fade-in-up mb-8">
                <div className="inline-flex glass rounded-full p-1">
                  <button
                    onClick={() => handleTabChange("dev")}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === "dev"
                        ? "bg-white text-[#0a0a0a] shadow-lg shadow-white/10"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Dev Team
                  </button>
                  <button
                    onClick={() => handleTabChange("tracks")}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === "tracks"
                        ? "bg-white text-[#0a0a0a] shadow-lg shadow-white/10"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Track Leads
                  </button>
                </div>
              </div>

              <div key={activeTab} className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <GoogleDots />
                  <span className="text-xs font-mono text-white/40 tracking-wider uppercase">
                    {activeTab === "dev" ? "2026 Dev Team Recruitment" : "2026 Track Lead Recruitment"}
                  </span>
                </div>
              </div>

              <RotatingTypewriter messages={activeMessages} />

              <div key={`sub-${activeTab}`} className="animate-fade-in-up animation-delay-100">
                <p className="text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed">
                  {activeTab === "dev"
                    ? "GDG on Campus Babcock is recruiting its next Dev Team. We are looking for people who want to build, learn, and contribute to products the whole campus relies on."
                    : "GDG on Campus Babcock is selecting its next Track Leads. We are looking for people who want to teach, mentor, and shape the learning experience of the community."}
                  
                </p>
              </div>

              <div key={`btns-${activeTab}`} className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
                <Button asChild className="bg-white text-[#0a0a0a] hover:bg-[#E8E8E8] rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02]">
                  <a href={activeFormUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-full px-8 py-6 text-base font-medium transition-all duration-300">
                  <a href="#roles">
                    View Roles
                  </a>
                </Button>
              </div>
            </div>

            {/* Right — application dossier */}
            <aside className="application-dossier animate-slide-in-right animation-delay-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-[11px] font-mono tracking-[0.18em] text-white/45 uppercase">Recruitment brief</span>
                <span className="status-pill"><span className="status-dot" />Open now</span>
              </div>
              <div className="py-8">
                <p className="text-white/45 text-sm mb-3">Applications close</p>
                <p className="text-3xl font-bold tracking-tight leading-none">2ND AUGUST</p>
                <p className="text-sm text-white/45 mt-2">11:59 PM · WAT</p>
              </div>
              <div className="dossier-rule" />
              <div className="grid grid-cols-2 gap-5 py-6">
                <div>
                  <p className="text-2xl font-bold">{String(activeRoles.length).padStart(2, "0")}</p>
                  <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-1">Open paths</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">04</p>
                  <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider mt-1">Steps ahead</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/55 border-t border-white/10 pt-5">
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
                <p className="text-white/50 leading-relaxed mb-4 text-lg">
                  GDG on Campus Babcock is open to every student at Babcock University —
                  regardless of department, level, or background. Computer Science, Nursing,
                  Law, Accounting — if you&apos;re curious about technology, you belong here.
                </p>
                <p className="text-white/50 leading-relaxed text-lg">
                  We build products, run programs, publish stories, and recognize impact.
                  We are part of the global Google Developer Groups network, but we are
                  built and run by Babcock students.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Large card */}
                <div className="bento-card col-span-2 flex items-center gap-6">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
                      <AnimatedCounter target={1500} suffix="+" />
                    </div>
                    <div className="text-xs text-white/40 font-mono uppercase tracking-wider">Community Members</div>
                  </div>
                  <div className="ml-auto flex -space-x-3">
                    {GOOGLE_COLORS.map((c, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]" style={{ backgroundColor: c, opacity: 0.7 }} />
                    ))}
                  </div>
                </div>

                {/* Smaller cards */}
                <div className="bento-card">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                    <AnimatedCounter target={6} />
                  </div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-wider">Products</div>
                  <div className="mt-3 flex gap-1">
                    {GOOGLE_COLORS.map((c, i) => (
                      <span key={i} className="w-1.5 h-6 rounded-full" style={{ backgroundColor: c, opacity: 0.5 }} />
                    ))}
                  </div>
                </div>

                <div className="bento-card">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
                      <AnimatedCounter target={13} suffix="+" />
                  </div>
                  <div className="text-xs text-white/40 font-mono uppercase tracking-wider">Open Roles</div>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-white/50 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                      Recruiting
                    </span>
                  </div>
                </div>

                <div className="bento-card col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1">All</div>
                      <div className="text-xs text-white/40 font-mono uppercase tracking-wider">Departments Welcome</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Roles Section ═══════ */}
      <SectionReveal>
        <section id="roles" className="relative z-10 py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <GoogleDots className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {activeTab === "dev" ? "Dev Team Roles" : "Track Lead Roles"}
              </h2>
              <p className="text-lg text-white/50 max-w-2xl">
                {activeTab === "dev"
                  ? "Each role has a clear focus, real products to build, and a team to collaborate with."
                  : "Lead a learning track. Design curriculum, run workshops, and mentor the next generation of builders."}
              </p>
            </div>

            <div key={activeTab} className="grid lg:grid-cols-[1fr_1.5fr] gap-0 glass rounded-2xl overflow-hidden animate-fade-in-up">
              {/* Role List */}
              <div className="border-r border-white/5 max-h-[640px] overflow-y-auto">
                {activeRoles.map((role, i) => (
                  <button
                    key={i}
                    id={`role-button-${i}`}
                    onClick={() => setActiveRole(i)}
                    className={`w-full text-left px-6 py-5 border-b border-white/5 last:border-b-0 transition-all duration-300 ${
                      activeRole === i
                        ? "bg-white/10 role-card-active"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-base text-white">{role.title}</div>
                        <div className={`text-sm mt-0.5 ${activeRole === i ? "text-white/60" : "text-white/35"}`}>
                          {role.mandate}
                        </div>
                      </div>
                      <div
                        className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${activeRole === i ? "scale-125" : ""}`}
                        style={{ backgroundColor: role.color }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Role Detail */}
              <div className="p-8 md:p-10 flex flex-col min-h-[400px] max-h-[640px] overflow-y-auto">
                <div className="mb-4">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: activeRoles[activeRole].color }}
                  />
                  <span className="text-xs font-mono text-white/35 tracking-wider uppercase">
                    Role {String(activeRole + 1).padStart(2, "0")} of {String(activeRoles.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
                  {activeRoles[activeRole].title}
                </h3>
                <p className="text-base text-white/50 font-medium mb-5">
                  {activeRoles[activeRole].mandate}
                </p>

                {/* Purpose */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeRoles[activeRole].color }} />
                    Purpose
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {activeRoles[activeRole].purpose}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[(activeRole + 1) % 4] }} />
                    Key Responsibilities
                  </h4>
                  <div className="space-y-2.5">
                    {activeRoles[activeRole].responsibilities.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/10 text-[10px] font-mono text-white/30 shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[(activeRole + 2) % 4] }} />
                    Requirements
                  </h4>
                  <div className="space-y-2">
                    {activeRoles[activeRole].requirements.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="w-4 h-4 rounded border border-white/15 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What the Panel Looks For */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOOGLE_COLORS[(activeRole + 3) % 4] }} />
                    What the Panel Looks For
                  </h4>
                  <div className="space-y-1.5">
                    {activeRoles[activeRole].panelLooksFor.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0 mt-[7px]" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button asChild className="bg-white text-[#0a0a0a] hover:bg-[#E8E8E8] rounded-full px-6 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
                    <a href={activeFormUrl} target="_blank" rel="noopener noreferrer">
                      Apply for this role →
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Products Section ═══════ */}
      <SectionReveal>
        <section id="products" className="relative z-10 py-24 md:py-32 px-6">
          {/* Subtle section separator */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4285F4]/[0.03] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <div className="mb-16">
              <GoogleDots className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Past Work</h2>
              <p className="text-lg text-white/40 max-w-2xl">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opacity-40" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-80"
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
                      <svg className="w-4 h-4 text-white/15 group-hover:text-white/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-white/40 mb-3 leading-relaxed">{product.description}</p>
                    <div className="text-xs font-mono text-white/20 uppercase tracking-wider">
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
              <p className="text-lg text-white/40 max-w-2xl">
                You don&apos;t need a stacked portfolio. You need curiosity and the willingness to build.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALUES.map((item, i) => (
                <div key={i} className=" group cursor-default">
                  <div className="flex items-start gap-4">
                    <span
                      className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: GOOGLE_COLORS[i % 4] }}
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-white group-hover:text-[#FFF6E0] transition-colors">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                  {/* Bottom accent line */}
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/15 transition-all duration-500" />
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
              <p className="text-lg text-white/40 max-w-2xl">
                We don&apos;t do elections. We do structured selection — applications, portfolio review, and a short technical chat with the dev leads.
              </p>
            </div>

            <div className="space-y-0">
              {activeTimeline.map((item, i) => (
                <div key={i} className="flex gap-6 md:gap-10 group">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 glass-strong group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 0 20px ${item.color}20` }}
                    >
                      <span style={{ color: item.color }}>{item.step}</span>
                    </div>
                    {i < activeTimeline.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent my-2" />
                    )}
                  </div>
                  <div className="pb-14">
                    <h3 className="font-bold text-lg mb-1 text-white">{item.label}</h3>
                    <p className="text-white/40 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ═══════ Countdown + Final CTA ═══════ */}
      <section className="relative z-10 py-24 md:py-32 px-6">
        {/* Dramatic gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4285F4]/[0.05] to-[#0a0a0a] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <GoogleDots className="mb-6 justify-center" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {isExpired ? (
              "Applications are closed."
            ) : (
              <span className="shimmer-text">The window is open.</span>
            )}
          </h2>
          <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto">
            {isExpired
              ? "Thank you to everyone who applied. The dev leads are now reviewing submissions."
              : "We care about willingness to build and curiosity — not grades or a stacked portfolio."}
          </p>

          {/* Countdown */}
          {!isExpired && (
            <>
              <div className="flex justify-center gap-3 md:gap-5 mb-4 flex-wrap">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="countdown-card p-4 md:p-6 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                    <div className="text-xs text-white/30 uppercase font-mono mt-1 tracking-wider">{unit}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/25 font-mono mb-12">Applications close August 2, 2026 at 11:59 PM</p>
            </>
          )}

       
        </div>
      </section>

      {/* ═══════ Footer ═══════ */}
      <footer className="relative z-10 py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/gdg-logo-dark.svg" alt="GDG on Campus Babcock" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-6 text-sm text-white/35">
            <a href="https://gdgbabcock.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">gdgbabcock.com</a>
         
          </div>
          <p className="text-sm text-white/25 font-mono">
            © {new Date().getFullYear()} GDG on Campus Babcock
          </p>
        </div>
      </footer>
    </div>
  )
}
