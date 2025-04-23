"use client"

import GoogleSearch from "@/components/google-search"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import GalaxyBackground from "@/components/galaxy-background"
import { Suspense } from "react"

export default function GoogleProxyPage() {
  return (
    <div className="min-h-screen bg-black/[0.96] flex flex-col">
      <GalaxyBackground />
      <div className="p-4">
        <Link href="/proxy">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Proxy
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-white">Loading search...</div>}>
          <GoogleSearch />
        </Suspense>
      </div>

      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>This is a proxy service for educational purposes only.</p>
      </footer>
    </div>
  )
}
