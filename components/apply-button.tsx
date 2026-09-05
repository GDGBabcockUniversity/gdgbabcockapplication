import { Button } from "@/components/ui/button"

/** Renders disabled when the team's form URL hasn't been filled in yet (lib/roles.ts). */
export function ApplyButton({
  formUrl,
  label = "Apply Now",
  className = "",
}: {
  formUrl: string
  label?: string
  className?: string
}) {
  if (!formUrl) {
    return (
      <Button
        disabled
        className={`bg-secondary text-fg/40 rounded-full px-8 py-6 text-base font-semibold cursor-not-allowed ${className}`}
      >
        Form coming soon
      </Button>
    )
  }

  return (
    <Button
      asChild
      className={`bg-fg text-bg hover:bg-fg/90 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${className}`}
    >
      <a href={formUrl} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Button>
  )
}
