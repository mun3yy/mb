"use client"

import { useEffect } from "react"

export default function Game2048() {
  useEffect(() => {
    // This would contain the 2048 game implementation
    // For demonstration purposes, we're showing a placeholder
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#776e65"
        ctx.font = "bold 48px Arial"
        ctx.textAlign = "center"
        ctx.fillText("2048", canvas.width / 2, canvas.height / 2 - 50)

        ctx.font = "16px Arial"
        ctx.fillText("Use arrow keys to move tiles", canvas.width / 2, canvas.height / 2)
        ctx.fillText("Combine same numbers to reach 2048", canvas.width / 2, canvas.height / 2 + 30)
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96]">
      <h1 className="text-3xl font-bold text-white mb-8">2048</h1>
      <canvas id="game-canvas" width="400" height="400" className="bg-[#bbada0] rounded-md" />
      <p className="text-gray-400 mt-4">Use arrow keys to move tiles. Combine same numbers to reach 2048!</p>
    </div>
  )
}
