"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Gamepad2, AppWindowIcon as Apps, Settings, Layers, DollarSign } from "lucide-react"

export default function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/a", label: "Games", icon: Gamepad2 },
    { href: "/b", label: "Apps", icon: Apps },
    { href: "/proxy", label: "Proxy", icon: Globe },
    { href: "/c", label: "Settings", icon: Settings },
    { href: "/d", label: "Tabs", icon: Layers },
  ]

  return (
    <nav className="fixed top-0 left-0 h-full w-16 md:w-64 bg-black/50 backdrop-blur-md border-r border-white/10 flex flex-col z-40">
      <div className="p-4 border-b border-white/10 flex items-center justify-center md:justify-start gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-white" />
        </div>
        <span className="hidden md:block font-bold text-lg">$MUNNY PROXY$</span>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive =
              (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href))

            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link href={item.href} className={`nav-link ${isActive ? "active" : ""}`}>
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-white/10 text-center text-xs text-gray-500">
        <div className="hidden md:block">$MUNNY PROXY$ v1.0.0</div>
        <div className="block md:hidden">v1.0.0</div>
      </div>
    </nav>
  )
}

function Globe(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
