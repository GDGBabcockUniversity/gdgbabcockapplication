import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
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

const SITE_URL = "https://gdgbabcockapplications.vercel.app"
const TITLE = "Apply — GDG on Campus Babcock"
const DESCRIPTION =
  "Applications are open for the 2026 GDG on Campus Babcock contributor team. Sixteen roles across Media, Marketing, and Events & Planning — writers, photographers, videographers, designers, social media managers, and event planners. Browse the roles and apply by September 25, 2026."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "GDG on Campus Babcock",
    "Google Developer Groups",
    "Babcock University",
    "student community application",
    "media team",
    "marketing team",
    "events and planning",
  ],
  icons: {
    icon: [
      { url: "/gdg-logo.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/gdg-logo.svg",
        width: 1200,
        height: 630,
        alt: "GDG on Campus Babcock",
      },
    ],
    type: "website",
    siteName: "GDG on Campus Babcock",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/gdg-logo.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/gdg-logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`font-sans ${googleSansDisplay.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
