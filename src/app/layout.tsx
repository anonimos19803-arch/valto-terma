import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ΒάΛτο Τέρμα — Κράτηση",
  description: "Κάνε κράτηση για το ΒάΛτο Τέρμα event — Ελληνική pop μουσική 2000s στη Λευκωσία",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el" className={`${playfair.variable} ${inter.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
