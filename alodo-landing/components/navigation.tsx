"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-serif font-black text-[#1a3c6b] tracking-tight">
              Alɔdó
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {[
                { href: "#context", label: "Contexte" },
                { href: "#solutions", label: "Solutions" },
                { href: "#how-it-works", label: "Fonctionnement" },
                { href: "#impact", label: "Impact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-gray-600 hover:text-[#1a3c6b] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="#contact">
              <Button className="bg-[#1a3c6b] hover:bg-[#14305a] text-white rounded-md text-sm font-bold h-9 px-5 border-none">
                Nous rejoindre
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#1a3c6b] p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { href: "#context", label: "Contexte" },
                { href: "#solutions", label: "Solutions" },
                { href: "#how-it-works", label: "Fonctionnement" },
                { href: "#impact", label: "Impact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#1a3c6b]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link href="#contact" className="block px-3 py-2" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#1a3c6b] hover:bg-[#14305a] text-white rounded-md font-bold border-none">
                  Nous rejoindre
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Bénin flag bar under nav */}
      <div className="flex w-full h-1.5">
        <div className="flex-1 bg-[#008751]" />
        <div className="flex-1 bg-[#FCD116]" />
        <div className="flex-1 bg-[#E8112D]" />
      </div>
    </nav>
  )
}
