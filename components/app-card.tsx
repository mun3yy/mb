"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"

export default function AppCard({ app, onClick }) {
  // Dynamically get the icon component
  const IconComponent = LucideIcons[app.icon] || LucideIcons.App

  return (
    <Card
      className="bg-black/50 border-white/10 hover:border-purple-500/50 transition-all cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
          <IconComponent className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white text-center">{app.title}</h3>
        <p className="text-gray-400 text-sm mt-1 text-center">{app.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-white/5">
        <button className="w-full text-center text-purple-400 text-sm hover:text-purple-300">Open App</button>
      </CardFooter>
    </Card>
  )
}
