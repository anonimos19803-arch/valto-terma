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
  title: "Βάλ' το Τέρμα — Κράτηση Τραπεζιού",
  description: "Κάνε κράτηση τραπεζιού για το Βάλ' το Τέρμα — Ελληνική pop μουσική 2000s στη Λευκωσία. Περιορισμένα τραπέζια, κλείσε τώρα!",
  openGraph: {
    title: "Βάλ' το Τέρμα — Κράτηση Τραπεζιού",
    description: "Ελληνική pop μουσική 2000s στη Λευκωσία. Κλείσε τραπέζι τώρα!",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#1E3A6E" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
