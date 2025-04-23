"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import AppCard from "@/components/app-card"

// Sample apps data
const APPS = [
  {
    id: "chatgpt",
    title: "ChatGPT",
    description: "AI assistant for homework help and more",
    icon: "MessageSquare",
    url: "https://chat.openai.com",
  },
  {
    id: "calculator",
    title: "Scientific Calculator",
    description: "Advanced calculator for math problems",
    icon: "Calculator",
    url: "/apps/calculator",
  },
  {
    id: "notes",
    title: "Quick Notes",
    description: "Take notes during class",
    icon: "FileText",
    url: "/apps/notes",
  },
  {
    id: "translator",
    title: "Language Translator",
    description: "Translate text between languages",
    icon: "Globe",
    url: "/apps/translator",
  },
  {
    id: "timer",
    title: "Study Timer",
    description: "Pomodoro timer for focused study sessions",
    icon: "Clock",
    url: "/apps/timer",
  },
  {
    id: "dictionary",
    title: "Dictionary",
    description: "Look up definitions and synonyms",
    icon: "BookOpen",
    url: "/apps/dictionary",
  },
  {
    id: "whiteboard",
    title: "Whiteboard",
    description: "Digital whiteboard for brainstorming",
    icon: "PenTool",
    url: "/apps/whiteboard",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Create and study with digital flashcards",
    icon: "Layers",
    url: "/apps/flashcards",
  },
]

export default function AppsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApp, setSelectedApp] = useState(null)

  const filteredApps = APPS.filter((app) => app.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedApp ? (
        <AppFrame app={selectedApp} onBack={() => setSelectedApp(null)} />
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
          >
            Useful <span className="text-purple-500">Apps</span>
          </motion.h1>

          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search apps..."
              className="pl-10 bg-black/50 border-white/10 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AppCard app={app} onClick={() => setSelectedApp(app)} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function AppFrame({ app, onBack }) {
  return (
    <div className="w-full">
      <button onClick={onBack} className="mb-4 text-purple-400 hover:text-purple-300 flex items-center">
        ← Back to Apps
      </button>

      <h2 className="text-2xl font-bold text-white mb-4">{app.title}</h2>

      <div className="w-full h-[75vh] bg-black/50 rounded-lg border border-white/10 overflow-hidden">
        <iframe
          src={app.url}
          className="w-full h-full"
          title={app.title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  )
}
