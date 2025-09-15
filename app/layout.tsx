import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Pashu Netra - Cattle Classification System",
  description: "AI-powered cattle and buffalo breed identification system for farmers and veterinarians",
  generator: "v0.app",
  keywords: ["cattle", "classification", "AI", "agriculture", "livestock", "breed identification"],
  authors: [{ name: "Pashu Netra Team" }],
  creator: "Pashu Netra",
  publisher: "Pashu Netra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pashu-netra.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pashu Netra - Cattle Classification System",
    description: "AI-powered cattle and buffalo breed identification system",
    url: "https://pashu-netra.vercel.app",
    siteName: "Pashu Netra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pashu Netra - Cattle Classification System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pashu Netra - Cattle Classification System",
    description: "AI-powered cattle and buffalo breed identification system",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
