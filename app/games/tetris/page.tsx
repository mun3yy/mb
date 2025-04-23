"use client"

import { useEffect } from "react"

export default function TetrisGame() {
  useEffect(() => {
    // This would contain the Tetris game implementation
    // For demonstration purposes, we're showing a placeholder
    const canvas = document.getElementById("tetris-canvas") as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#fff"
        ctx.font = "bold 36px Arial"
        ctx.textAlign = "center"
        ctx.fillText("TETRIS", canvas.width / 2, canvas.height / 2 - 50)

        // Draw some tetris blocks as a placeholder
        const colors = ["#FF0D72", "#0DC2FF", "#0DFF72", "#F538FF", "#FF8E0D", "#FFE138", "#3877FF"]

        for (let i = 0; i < 7; i++) {
          ctx.fillStyle = colors[i]
          ctx.fillRect(canvas.width / 2 - 105 + i * 30, canvas.height / 2, 25, 25)
        }

        ctx.font = "16px Arial"
        ctx.fillStyle = "#fff"
        ctx.fillText("Use arrow keys to move and rotate pieces", canvas.width / 2, canvas.height / 2 + 60)
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96]">
      <h1 className="text-3xl font-bold text-white mb-8">Tetris</h1>
      <canvas id="tetris-canvas" width="320" height="640" className="bg-gray-900 rounded-md" />
      <p className="text-gray-400 mt-4">Use arrow keys to move and rotate pieces. Clear lines to score points!</p>
    </div>
  )
}
