"use client"

import { useEffect, useRef, useState } from "react"

export default function FlappyBirdGame() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bird = {
      x: 50,
      y: canvas.height / 2,
      radius: 15,
      velocity: 0,
      gravity: 0.5,
      jump: -8,
    }

    const pipes = []
    const pipeWidth = 50
    const pipeGap = 150
    let gameLoop
    let frameCount = 0

    function drawBird() {
      ctx.fillStyle = "#f59e0b"
      ctx.beginPath()
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    function drawPipes() {
      pipes.forEach((pipe) => {
        ctx.fillStyle = "#10b981"

        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top)

        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap)
      })
    }

    function updateBird() {
      bird.velocity += bird.gravity
      bird.y += bird.velocity

      // Check for collision with floor or ceiling
      if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius
        endGame()
      } else if (bird.y - bird.radius < 0) {
        bird.y = bird.radius
        bird.velocity = 0
      }
    }

    function updatePipes() {
      frameCount++

      // Add new pipe every 100 frames
      if (frameCount % 100 === 0) {
        const pipeTop = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50
        pipes.push({
          x: canvas.width,
          top: pipeTop,
          passed: false,
        })
      }

      // Move pipes and check for collisions
      for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2

        // Remove pipes that are off screen
        if (pipes[i].x + pipeWidth < 0) {
          pipes.splice(i, 1)
          i--
          continue
        }

        // Check if bird passed pipe
        if (!pipes[i].passed && pipes[i].x + pipeWidth < bird.x) {
          pipes[i].passed = true
          setScore((prevScore) => prevScore + 1)
        }

        // Check for collision with pipes
        if (bird.x + bird.radius > pipes[i].x && bird.x - bird.radius < pipes[i].x + pipeWidth) {
          // Check if bird is between pipes
          if (bird.y - bird.radius < pipes[i].top || bird.y + bird.radius > pipes[i].top + pipeGap) {
            endGame()
          }
        }
      }
    }

    function endGame() {
      clearInterval(gameLoop)
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#fff"
      ctx.font = "30px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2)
      ctx.font = "20px Arial"
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40)
      ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 80)
      setGameStarted(false)
    }

    function startGame() {
      if (gameLoop) clearInterval(gameLoop)

      // Reset game state
      bird.y = canvas.height / 2
      bird.velocity = 0
      pipes.length = 0
      frameCount = 0
      setScore(0)

      gameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        updateBird()
        updatePipes()
        drawPipes()
        drawBird()
      }, 20)

      setGameStarted(true)
    }

    function handleClick() {
      if (gameStarted) {
        bird.velocity = bird.jump
      } else {
        startGame()
      }
    }

    function handleKeyDown(e) {
      if (e.code === "Space") {
        if (gameStarted) {
          bird.velocity = bird.jump
        } else {
          startGame()
        }
      }
    }

    // Draw initial screen
    ctx.fillStyle = "#fff"
    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Flappy Bird", canvas.width / 2, canvas.height / 2 - 50)
    ctx.font = "20px Arial"
    ctx.fillText("Click or press Space to start", canvas.width / 2, canvas.height / 2 + 20)

    canvas.addEventListener("click", handleClick)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      canvas.removeEventListener("click", handleClick)
      window.removeEventListener("keydown", handleKeyDown)
      if (gameLoop) clearInterval(gameLoop)
    }
  }, [score])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96]">
      <h1 className="text-3xl font-bold text-white mb-2">Flappy Bird</h1>
      <p className="text-gray-400 mb-4">Score: {score}</p>
      <canvas ref={canvasRef} width="400" height="600" className="bg-[#70c5ce] rounded-md" />
      <p className="text-gray-400 mt-4">Click or press Space to flap. Avoid the pipes!</p>
    </div>
  )
}
