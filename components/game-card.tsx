"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export default function GameCard({ game, onClick }) {
  return (
    <Card
      className="bg-black/50 border-white/10 hover:border-purple-500/50 transition-all cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white">{game.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{game.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <button className="text-purple-400 text-sm hover:text-purple-300">Play Now</button>
      </CardFooter>
    </Card>
  )
}
