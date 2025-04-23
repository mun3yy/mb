"use client"

import { useEffect, useRef, useState } from "react"

export default function SnakeGame() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gridSize = 20
    const width = canvas.width
    const height = canvas.height

    let snake = [
      { x: 5 * gridSize, y: 5 * gridSize },
      { x: 4 * gridSize, y: 5 * gridSize },
      { x: 3 * gridSize, y: 5 * gridSize },
    ]

    let direction = "right"
    let food = generateFood()
    let gameInterval

    function generateFood() {
      const x = Math.floor(Math.random() * (width / gridSize)) * gridSize
      const y = Math.floor(Math.random() * (height / gridSize)) * gridSize

      // Make sure food doesn't spawn on snake
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
          return generateFood()
        }
      }

      return { x, y }
    }

    function drawSnake() {
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4c1d95" : "#8b5cf6"
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize)
        ctx.strokeStyle = "#000"
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize)
      })
    }

    function drawFood() {
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(food.x, food.y, gridSize, gridSize)
      ctx.strokeStyle = "#000"
      ctx.strokeRect(food.x, food.y, gridSize, gridSize)
    }

    function moveSnake() {
      const head = { ...snake[0] }

      switch (direction) {
        case "up":
          head.y -= gridSize
          break
        case "down":
          head.y += gridSize
          break
        case "left":
          head.x -= gridSize
          break
        case "right":
          head.x += gridSize
          break
      }

      // Check for collision with walls
      if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        gameOver()
        return
      }

      // Check for collision with self
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          gameOver()
          return
        }
      }

      snake.unshift(head)

      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        food = generateFood()
        setScore((prevScore) => prevScore + 1)
      } else {
        snake.pop()
      }
    }

    function gameOver() {
      clearInterval(gameInterval)
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)"
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = "#fff"
      ctx.font = "30px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Game Over", width / 2, height / 2)
      ctx.font = "20px Arial"
      ctx.fillText(`Score: ${score}`, width / 2, height / 2 + 40)
      ctx.fillText("Press Space to Restart", width / 2, height / 2 + 80)
    }

    function gameLoop() {
      ctx.clearRect(0, 0, width, height)
      drawSnake()
      drawFood()
      moveSnake()
    }

    function handleKeyDown(e) {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "down") direction = "up"
          break
        case "ArrowDown":
          if (direction !== "up") direction = "down"
          break
        case "ArrowLeft":
          if (direction !== "right") direction = "left"
          break
        case "ArrowRight":
          if (direction !== "left") direction = "right"
          break
        case " ":
          if (!gameInterval) {
            snake = [
              { x: 5 * gridSize, y: 5 * gridSize },
              { x: 4 * gridSize, y: 5 * gridSize },
              { x: 3 * gridSize, y: 5 * gridSize },
            ]
            direction = "right"
            food = generateFood()
            setScore(0)
            gameInterval = setInterval(gameLoop, 150)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    gameInterval = setInterval(gameLoop, 150)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInterval(gameInterval)
    }
  }, [score])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96]">
      <h1 className="text-3xl font-bold text-white mb-2">Snake Game</h1>
      <p className="text-gray-400 mb-4">Score: {score}</p>
      <canvas ref={canvasRef} width="400" height="400" className="bg-gray-800 rounded-md" />
      <p className="text-gray-400 mt-4">Use arrow keys to control the snake. Eat the red food to grow!</p>
    </div>
  )
}
