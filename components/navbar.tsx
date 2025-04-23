"use client"

import { Button } from "@/components/ui/button"
import { Menu, DollarSign, Laptop } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

export default function Navbar({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "games", label: "Games" },
    { id: "apps", label: "Apps" },
    { id: "proxy", label: "Proxy" },
    { id: "settings", label: "Settings" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <div className="flex items-center space-x-2">
        <DollarSign className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">$MUNNY PROXY$</span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            active={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
          />
        ))}

        <Link href="/browser">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
            <Laptop className="w-4 h-4" />
            <span>Browser</span>
          </Button>
        </Link>
      </div>

      <div className="md:hidden relative">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </Button>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg z-50"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`block w-full text-left px-4 py-2 ${
                  activeSection === item.id ? "text-purple-400" : "text-gray-300"
                } hover:bg-white/5`}
                onClick={() => {
                  setActiveSection(item.id)
                  setMobileMenuOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}

            <Link href="/browser" className="block w-full text-left px-4 py-2 text-purple-400 hover:bg-white/5">
              Browser
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function NavItem({ id, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-gray-300 hover:text-white transition-colors relative group ${active ? "text-purple-400" : ""}`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  )
}
