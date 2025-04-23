"use client"

import EmbeddedBrowser from "@/components/embedded-browser"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import GalaxyBackground from "@/components/galaxy-background"

export default function BrowserPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <GalaxyBackground />
      <div className="p-4">
        <Link href="/">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-4">
        <EmbeddedBrowser />
      </div>
    </div>
  )
}
