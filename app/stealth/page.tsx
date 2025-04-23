"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StealthPage() {
  useEffect(() => {
    // Set the page title and favicon to look like Google Classroom
    document.title = "Google Classroom"

    const favicon = document.querySelector("link[rel='icon']")
    if (favicon) {
      favicon.href = "https://ssl.gstatic.com/classroom/favicon.png"
    } else {
      const newFavicon = document.createElement("link")
      newFavicon.rel = "icon"
      newFavicon.href = "https://ssl.gstatic.com/classroom/favicon.png"
      document.head.appendChild(newFavicon)
    }

    // Add a fake URL to history to make it look like we're on Google Classroom
    try {
      window.history.pushState({}, "", "/c/NjgwMjk2MzI1Njha/t/all")
    } catch (e) {
      console.error("Could not update history:", e)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* This page looks like Google Classroom but actually loads our app */}
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <img
            src="https://ssl.gstatic.com/classroom/logo_square_rounded.png"
            alt="Classroom"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Google Classroom</h1>
          <p className="text-gray-600 mb-6">Loading your classes...</p>

          <div className="mt-8">
            <Link href="/">
              <Button className="bg-[#1a73e8] hover:bg-[#1765cc] text-white">Continue to Classes</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
