"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Code,
  Database,
  Shield,
  Palette,
  Gamepad2,
  BarChart3,
  Brain,
  Cloud,
  Smartphone,
  TestTube,
  Zap,
  Target,
  Settings,
} from "lucide-react"

export default function GDGRecruitmentPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-09-06T23:59:59")

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const leadershipTracks = [
    {
      title: "Software Development & Engineering Track",
      roles: [
        {
          name: "Frontend Web Development Specialist",
          icon: Code,
          description:
            "Lead frontend development workshops, mentor students in modern web technologies, and guide projects using cutting-edge frameworks.",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Backend Systems Specialist",
          icon: Database,
          description:
            "Design scalable backend architectures, teach API development, and guide students through server-side programming concepts.",
          skills: ["Node.js", "Python", "APIs", "Databases"],
        },
        {
          name: "Data Structures & Algorithms Specialist",
          icon: Brain,
          description:
            "Conduct coding interview prep sessions, organize competitive programming events, and help students master algorithmic thinking.",
          skills: ["Algorithms", "Data Structures", "Problem Solving", "Competitive Programming"],
        },
        {
          name: "Mobile Development Specialist",
          icon: Smartphone,
          description:
            "Lead mobile app development workshops, guide cross-platform projects, and mentor students in mobile-first design principles.",
          skills: ["Flutter", "React Native", "iOS", "Android"],
        },
        {
          name: "QA Specialist (Quality Assurance & Testing)",
          icon: TestTube,
          description:
            "Teach testing methodologies, organize code review sessions, and help students build robust, reliable applications.",
          skills: ["Testing", "Automation", "Quality Assurance", "Code Review"],
        },
      ],
    },
    {
      title: "Data & AI Track",
      roles: [
        {
          name: "Data Science Specialist",
          icon: BarChart3,
          description:
            "Lead data science projects, organize analytics workshops, and guide students through real-world data challenges.",
          skills: ["Python", "Statistics", "Data Analysis", "Visualization"],
        },
        {
          name: "Data Analytics Specialist",
          icon: Target,
          description:
            "Teach business intelligence tools, lead data visualization workshops, and help students understand data-driven decision making.",
          skills: ["SQL", "Power BI", "Tableau", "Excel"],
        },
        {
          name: "Machine Learning Specialist",
          icon: Brain,
          description:
            "Guide ML project development, organize AI workshops, and help students explore Google AI tools like TensorFlow and Gemini.",
          skills: ["TensorFlow", "Machine Learning", "AI", "Deep Learning"],
        },
        {
          name: "Data Engineering Specialist",
          icon: Database,
          description:
            "Lead big data processing workshops, teach data pipeline development, and guide students in building scalable data systems.",
          skills: ["Big Data", "ETL", "Data Pipelines", "Apache Spark"],
        },
      ],
    },
    {
      title: "Infrastructure & Security Track",
      roles: [
        {
          name: "Cloud Computing Specialist",
          icon: Cloud,
          description:
            "Guide cloud deployment workshops, teach DevOps practices, and help students understand scalable infrastructure.",
          skills: ["Google Cloud", "AWS", "Docker", "Kubernetes"],
        },
        {
          name: "Cybersecurity Specialist",
          icon: Shield,
          description:
            "Conduct security workshops, teach ethical hacking principles, and guide students through cybersecurity best practices.",
          skills: ["Security", "Ethical Hacking", "Penetration Testing", "Network Security"],
        },
        {
          name: "Web3 & Blockchain Specialist",
          icon: Zap,
          description:
            "Lead blockchain development workshops, teach smart contract programming, and guide decentralized application projects.",
          skills: ["Blockchain", "Smart Contracts", "Web3", "DeFi"],
        },
      ],
    },

    {
      title: "Design & Management Track",
      roles: [
        {
          name: "Product Design Specialist",
          icon: Palette,
          description:
            "Lead UI/UX design workshops, mentor students in design thinking, and organize user research and prototyping sessions.",
          skills: ["Figma", "UI/UX", "Design Thinking", "Prototyping"],
        },
        {
          name: "Product Management Specialist",
          icon: Settings,
          description:
            "Guide product development projects, teach agile methodologies, and help students understand product strategy and roadmapping.",
          skills: ["Product Strategy", "Agile", "Roadmapping", "Analytics"],
        },
        {
          name: "Games & Interactive Media Specialist",
          icon: Gamepad2,
          description:
            "Lead game development workshops, organize game jams, and guide students in creating interactive digital experiences.",
          skills: ["Unity", "Game Development", "C#", "3D Modeling"],
        },
      ],
    },
  ]

  const coreTeam = [
    {
      name: "Organizer",
      description:
        "Lead GDG Babcock's overall strategy, coordinate with Google Developer Groups globally, manage partnerships with industry leaders, and oversee all chapter activities and growth initiatives.",
      icon: Users,
    },
    {
      name: "Community Manager",
      description:
        "Foster member engagement, manage onboarding processes, organize social events and networking sessions, ensure inclusive community culture, and drive member retention and satisfaction.",
      icon: Users,
    },
    {
      name: "Technical Lead",
      description:
        "Oversee all technical tracks and specialist programs, mentor technical team leads, ensure quality of workshops and coding sessions, and guide the chapter's technical direction and curriculum.",
      icon: Code,
    },
    {
      name: "Operations Lead",
      description:
        "Manage event logistics, coordinate venue bookings and equipment, handle budgets and sponsorships, organize field trips and external partnerships, and ensure smooth execution of all activities.",
      icon: Settings,
    },
    {
      name: "Media & Marketing Lead",
      description:
        "Manage social media presence, create promotional campaigns, handle event photography and videography, oversee newsletter content, and maintain brand consistency across all communications.",
      icon: Palette,
    },
  ]

  const timeline = [
    { date: "September 6, 2025", event: "Application Deadline", status: "deadline", number: 1, color: "bg-blue-500" },
    { date: "September 9-13, 2025", event: "Interview Period", status: "process", number: 2, color: "bg-green-500" },
    { date: "September 16, 2025", event: "Results Announcement", status: "results", number: 3, color: "bg-yellow-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(66,133,244,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <img src="/gdg-logo.svg" alt="GDG Babcock University" className="h-32 w-auto" />
              </div>
              <Badge variant="secondary" className="mb-4 text-sm font-mono bg-blue-600 text-white hover:bg-blue-700">
                GDGoC Babcock University
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white">
                Lead the Future of <span className="text-blue-400">Technology</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 text-pretty">
                Join our leadership team and shape the next generation of developers. Build your career, expand your
                network, and make a lasting impact.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-12">
              <h3 className="text-lg font-mono mb-4 text-gray-400">Application Deadline</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-w-[80px]">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">{value}</div>
                    <div className="text-sm text-gray-400 capitalize font-mono">{unit}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Why Join Our Leadership Team?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
              Unlock opportunities that will accelerate your career and expand your impact in the tech industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Industry Connections",
                description: "Network with Google engineers, industry leaders, and fellow developers",
                icon: Users,
              },
              {
                title: "Real Leadership Experience",
                description: "Lead projects, manage teams, and develop essential leadership skills",
                icon: Target,
              },
              {
                title: "Community Impact",
                description: "Mentor students and contribute to the growth of the tech community",
                icon: Users,
              },
              {
                title: "Portfolio Building",
                description: "Work on real projects that showcase your skills to future employers",
                icon: Code,
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-colors">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
                  <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Leadership */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Core Team Leadership</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreTeam.map((role, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-blue-600/10 to-green-600/10 border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center">
                  <role.icon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-xl text-white">{role.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-sm leading-relaxed">
                    {role.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Tracks */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Leadership Tracks</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
              Choose your specialization and lead in the areas you're most passionate about.
            </p>
          </div>

          <div className="space-y-12">
            {leadershipTracks.slice(0, 4).map((track, trackIndex) => (
              <div key={trackIndex}>
                <div className="flex items-center mb-8">
                  <div className="w-1 h-8 bg-blue-500 mr-4"></div>
                  <h3 className="text-2xl md:text-3xl font-bold font-mono text-blue-400">{track.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {track.roles.map((role, roleIndex) => (
                    <Card
                      key={roleIndex}
                      className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <CardHeader>
                        <role.icon className="h-10 w-10 text-blue-400 mb-3" />
                        <CardTitle className="text-lg text-white">{role.name}</CardTitle>
                        <CardDescription className="text-gray-300 text-sm leading-relaxed">
                          {role.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Timeline */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Application Process</h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line - hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

            {/* Mobile layout */}
            <div className="md:hidden space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold flex-shrink-0`}
                  >
                    {item.number}
                  </div>
                  <Card className="bg-gray-800 border-gray-600 flex-1">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{item.event}</CardTitle>
                      <CardDescription className="text-gray-300 font-mono text-sm">{item.date}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            {/* Desktop layout */}
            <div className="hidden md:block space-y-16">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Circle with number */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {item.number}
                    </div>
                  </div>

                  {/* Card positioned alternately */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                    <Card className="bg-gray-800 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">{item.event}</CardTitle>
                        <CardDescription className="text-gray-300 font-mono">{item.date}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 via-green-600/10 to-yellow-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Lead?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
            Don't miss this opportunity to join the GDG Babcock University leadership team. Applications close on
            September 6, 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSevGSx5ShuLbwMRlF-VgHwCWS171D96-t92euUX509FHk1C9A/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-gray-600 text-white hover:bg-gray-800"
              asChild
            >
              <a
                href="https://docs.google.com/document/d/1rNHZVqd5A6ErkXUXRRNYAqBvBD_wyBsNNC-MkVbfMoo/edit?tab=t.0#heading=h.ab3dtdd21670"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 font-mono">© 2025 GDGoC Babcock University. Part of Google Developer Groups.</p>
        </div>
      </footer>
    </div>
  )
}
