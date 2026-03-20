import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Alɔdó - Innovation Financière pour les MPME au Bénin",
  description:
    "Solution hybride pour l'accès à l'information sectorielle, la tenue de comptabilité, l'accès au financement et la formalisation des MPME au Bénin.",
  generator: "v0.app",
}

import Navigation from "@/components/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
