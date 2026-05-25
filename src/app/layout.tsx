import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ΒάΛτο Τέρμα",
  description: "Event reservation — Ελληνική pop μουσική 2000s",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
