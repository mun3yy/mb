"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import GameCard from "@/components/game-card"

// Sample game data
const GAMES = [
  {
    id: "2048",
    title: "2048",
    description: "Combine the numbers to reach 2048!",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/2048",
  },
  {
    id: "snake",
    title: "Snake",
    description: "Classic snake game. Eat and grow!",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/snake",
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "Arrange falling blocks to clear lines.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/tetris",
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "Navigate through pipes without touching them.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/flappy-bird",
  },
  {
    id: "pacman",
    title: "Pac-Man",
    description: "Eat all the dots while avoiding ghosts.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/pacman",
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    description: "Find all the mines without detonating any.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/minesweeper",
  },
  {
    id: "chess",
    title: "Chess",
    description: "Classic strategy board game.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/chess",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description: "Fill the grid with numbers 1-9 without repeating.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/sudoku",
  },
]

export default function GamesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState(null)

  const filteredGames = GAMES.filter((game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedGame ? (
        <GameFrame game={selectedGame} onBack={() => setSelectedGame(null)} />
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
          >
            HTML <span className="text-purple-500">Games</span>
          </motion.h1>

          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search games..."
              className="pl-10 bg-black/50 border-white/10 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GameCard game={game} onClick={() => setSelectedGame(game)} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function GameFrame({ game, onBack }) {
  return (
    <div className="w-full">
      <button onClick={onBack} className="mb-4 text-purple-400 hover:text-purple-300 flex items-center">
        ← Back to Games
      </button>

      <h2 className="text-2xl font-bold text-white mb-4">{game.title}</h2>

      <div className="w-full h-[75vh] bg-black/50 rounded-lg border border-white/10 overflow-hidden">
        <iframe src={game.url} className="w-full h-full" title={game.title} sandbox="allow-scripts allow-same-origin" />
      </div>
    </div>
  )
}
