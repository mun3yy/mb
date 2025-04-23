import MainNav from "@/components/main-nav"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample game data
const GAMES = [
  {
    id: "2048",
    title: "2048",
    description: "Combine the numbers to reach 2048!",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/2048",
    category: "Puzzle",
  },
  {
    id: "snake",
    title: "Snake",
    description: "Classic snake game. Eat and grow!",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/snake",
    category: "Arcade",
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "Arrange falling blocks to clear lines.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/tetris",
    category: "Puzzle",
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "Navigate through pipes without touching them.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/flappy-bird",
    category: "Arcade",
  },
  {
    id: "pacman",
    title: "Pac-Man",
    description: "Eat all the dots while avoiding ghosts.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/pacman",
    category: "Arcade",
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    description: "Find all the mines without detonating any.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/minesweeper",
    category: "Puzzle",
  },
  {
    id: "chess",
    title: "Chess",
    description: "Classic strategy board game.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/chess",
    category: "Board",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description: "Fill the grid with numbers 1-9 without repeating.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/sudoku",
    category: "Puzzle",
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    description: "Cross busy roads and rivers without getting hit.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/crossy-road",
    category: "Arcade",
  },
  {
    id: "geometry-dash",
    title: "Geometry Dash",
    description: "Rhythm-based platformer game.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/geometry-dash",
    category: "Platformer",
  },
  {
    id: "among-us",
    title: "Among Us Clone",
    description: "Find the impostor among the crew.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/among-us",
    category: "Multiplayer",
  },
  {
    id: "minecraft",
    title: "Minecraft Classic",
    description: "Build and explore in this classic version.",
    image: "/placeholder.svg?height=200&width=300",
    url: "/games/minecraft",
    category: "Sandbox",
  },
]

// Game categories
const CATEGORIES = ["All", "Arcade", "Puzzle", "Board", "Platformer", "Multiplayer", "Sandbox"]

export default function GamesPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />

      <main className="flex-1 ml-16 md:ml-64 p-6">
        <div className="max-w-6xl mx-auto pt-8">
          <h1 className="text-3xl font-bold mb-6">Games</h1>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search games"
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-medium mb-3">Categories</h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <li key={category}>
                      <button className="w-full text-left px-2 py-1 rounded hover:bg-secondary text-sm transition-colors">
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-medium mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-foreground">
                    Action
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-foreground">
                    Adventure
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-foreground">
                    Strategy
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-foreground">
                    Casual
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-foreground">
                    Retro
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GAMES.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function GameCard({ game }) {
  return (
    <Link href={game.url}>
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer h-full flex flex-col">
        <div className="relative h-40 w-full">
          <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{game.title}</h3>
            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{game.category}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3 flex-1">{game.description}</p>
          <div className="text-xs text-primary font-medium">Play Now</div>
        </div>
      </div>
    </Link>
  )
}
