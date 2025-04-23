"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Mic } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function GoogleSearch() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query) return

    setIsLoading(true)

    // Use DuckDuckGo as a fallback search engine (fewer restrictions)
    const searchUrl = `/api/proxy?url=${encodeURIComponent(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`)}`

    window.open(searchUrl, "_blank")
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="relative w-auto h-24">
          <Image
            src="/placeholder.svg?height=92&width=272"
            alt="Google"
            width={272}
            height={92}
            className="w-auto h-24"
          />
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Google or type a URL"
          className="pl-10 pr-10 py-6 bg-white/5 border border-white/10 rounded-full text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer" />
      </form>

      <div className="flex justify-center space-x-4">
        <Button type="submit" onClick={handleSearch} className="bg-white/10 hover:bg-white/20 text-white">
          Google Search
        </Button>
        <Button
          type="button"
          className="bg-white/10 hover:bg-white/20 text-white"
          onClick={() => {
            const randomUrl = `/api/proxy?url=${encodeURIComponent("https://duckduckgo.com/?q=I%27m+feeling+lucky")}`
            window.open(randomUrl, "_blank")
          }}
        >
          I'm Feeling Lucky
        </Button>
      </div>
    </div>
  )
}
