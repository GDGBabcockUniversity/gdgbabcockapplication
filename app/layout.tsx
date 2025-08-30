import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const googleSansDisplay = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSansDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSansDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans-display",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "GDG Babcock University - Leadership Recruitment",
  description:
    "Join the GDG Babcock University leadership team. Apply for exciting leadership positions and build your career in tech.",
  openGraph: {
    title: "GDG Babcock University - Leadership Recruitment",
    description:
      "Join the GDG Babcock University leadership team. Apply for exciting leadership positions and build your career in tech.",
    images: [
      {
        url: "/gdg-logo.svg",
        width: 1200,
        height: 630,
        alt: "GDG Babcock University Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG Babcock University - Leadership Recruitment",
    description:
      "Join the GDG Babcock University leadership team. Apply for exciting leadership positions and build your career in tech.",
    images: ["/gdg-logo.svg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${googleSansDisplay.variable} ${robotoMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
