import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ROLES, getRole, getTeam, formUrlFor } from "@/lib/roles"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ApplyButton } from "@/components/apply-button"

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const role = getRole((await params).slug)
  if (!role) return { title: "Role not found — GDG on Campus Babcock" }
  const team = getTeam(role.team)
  return {
    title: `${role.title} — ${team.name} · GDG on Campus Babcock`,
    description: role.purpose,
    openGraph: { title: `${role.title} — ${team.name}`, description: role.purpose },
  }
}

function Section({
  label,
  color,
  children,
}: {
  label: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xs font-mono text-fg/40 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </h2>
      {children}
    </div>
  )
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const role = getRole((await params).slug)
  if (!role) notFound()

  const team = getTeam(role.team)

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="gradient-orb w-[600px] h-[600px] top-[-250px] left-[-150px]" style={{ position: "absolute", backgroundColor: role.color }} />
      </div>

      <SiteNav />

      <main className="relative z-10 pt-32 md:pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-6"
              style={{ backgroundColor: `${role.color}1a`, color: role.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
              {team.name}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">{role.title}</h1>
            <p className="text-lg text-fg/50 max-w-xl mx-auto leading-relaxed">{role.mandate} · {team.blurb}</p>
          </div>

          <div className="dossier-rule mb-12" />

          <Section label="About this role" color={role.color}>
            <p className="text-base text-fg/70 leading-relaxed">{role.purpose}</p>
          </Section>

          <Section label="What you'll be doing" color="#EA4335">
            <div className="space-y-3">
              {role.responsibilities.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm md:text-base text-fg/65">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-fg/10 text-[10px] font-mono text-fg/35 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Requirements" color="#F9AB00">
            <div className="space-y-2.5">
              {role.requirements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm md:text-base text-fg/65">
                  <span className="w-4 h-4 rounded border border-fg/20 shrink-0 mt-1" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section label="What the panel looks for" color="#34A853">
            <div className="space-y-2">
              {role.panelLooksFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm md:text-base text-fg/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-fg/30 shrink-0 mt-[9px]" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <div className="bento-card mt-14 text-center py-10">
            <h3 className="text-2xl font-bold tracking-tight mb-2">Ready to apply?</h3>
            <p className="text-fg/45 text-sm mb-7 max-w-sm mx-auto">
              Applications for {role.title} are reviewed by the {team.name} panel.
            </p>
            <ApplyButton formUrl={formUrlFor(role)} label={`Apply for ${role.title}`} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
