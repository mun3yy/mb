"use client"

import { useEffect, useRef } from "react"

export default function GalaxyBackground() {
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!starsRef.current) return

    const starsContainer = starsRef.current
    const starCount = 200
    starsContainer.innerHTML = ""

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"

      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Random size
      const size = Math.random() * 3
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Random animation duration and opacity
      star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`)
      star.style.setProperty("--opacity", `${Math.random() * 0.7 + 0.3}`)

      // Random delay
      star.style.animationDelay = `${Math.random() * 5}s`

      starsContainer.appendChild(star)
    }
  }, [])

  return (
    <>
      <div className="galaxy-bg"></div>
      <div ref={starsRef} className="stars"></div>
    </>
  )
}
