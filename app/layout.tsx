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
    title: "GDG Babcock University - Leadership Recruitment",
    description:
      "Join the GDG Babcock University leadership team. Apply for exciting leadership positions and build your career in tech.",
    images: [
      {
        url: "https://gdgbabcockapplications.vercel.app/gdg-logo.svg",
        width: 1200,
        height: 630,
        alt: "GDG Babcock University Logo",
      },
    ],
    type: "website",
    siteName: "GDG Babcock University",
    url: "https://gdgbabcockapplications.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG Babcock University - Leadership Recruitment",
    description:
      "Join the GDG Babcock University leadership team. Apply for exciting leadership positions and build your career in tech.",
    images: ["https://gdgbabcockapplications.vercel.app/gdg-logo.svg"],
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/svg+xml",
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
      <head>
        <link rel="icon" href="/gdg-logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`font-sans ${googleSansDisplay.variable} ${robotoMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
