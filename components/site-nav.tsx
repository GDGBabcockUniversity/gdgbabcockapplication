"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#roles", label: "Open Roles" },
  { href: "/#products", label: "Products" },
  { href: "/#process", label: "Process" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-6">
      <div className="nav-shell max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-5">
        <Link href="/" className="flex items-center gap-3">
          <img src="/gdg-logo.svg" alt="GDG on Campus Babcock" className="h-10 w-auto dark:hidden" />
          <img src="/gdg-logo-dark.svg" alt="GDG on Campus Babcock" className="h-10 w-auto hidden dark:block" />
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-fg/60 hover:text-fg transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <Button asChild className="bg-fg text-bg hover:bg-fg/90 rounded-full px-6 text-sm font-semibold transition-all duration-300 hover:shadow-lg">
            <a href="/#roles">Apply Now</a>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-fg/60 hover:text-fg transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl glass-strong px-6 py-4 space-y-3 animate-fade-in">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-fg/60 hover:text-fg transition-colors py-2"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full bg-fg text-bg hover:bg-fg/90 rounded-full px-6 text-sm font-semibold">
            <a href="/#roles" onClick={() => setOpen(false)}>Apply Now</a>
          </Button>
        </div>
      )}
    </nav>
  )
}
