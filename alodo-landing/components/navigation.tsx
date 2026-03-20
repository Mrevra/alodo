"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-serif font-black text-cyan-600">
                Alɔdó
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <Link
                  href="#context"
                  className="text-gray-600 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contexte
                </Link>
                <Link
                  href="#solutions"
                  className="text-gray-600 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Solutions
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Fonctionnement
                </Link>
                <Link
                  href="#impact"
                  className="text-gray-600 hover:text-cyan-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Impact
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#contact">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Nous rejoindre</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-cyan-600 p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="#context"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contexte
              </Link>
              <Link
                href="#solutions"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="#how-it-works"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnement
              </Link>
              <Link
                href="#impact"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-cyan-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Impact
              </Link>
              <Link href="#contact" className="block px-3 py-2" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white mb-2">Nous rejoindre</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
