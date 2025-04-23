import MainNav from "@/components/main-nav"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

// Sample apps data
const APPS = [
  {
    id: "chatgpt",
    title: "ChatGPT",
    description: "AI assistant for homework help and more",
    icon: "MessageSquare",
    url: "/apps/chatgpt",
    category: "AI",
  },
  {
    id: "calculator",
    title: "Scientific Calculator",
    description: "Advanced calculator for math problems",
    icon: "Calculator",
    url: "/apps/calculator",
    category: "Tools",
  },
  {
    id: "notes",
    title: "Quick Notes",
    description: "Take notes during class",
    icon: "FileText",
    url: "/apps/notes",
    category: "Productivity",
  },
  {
    id: "translator",
    title: "Language Translator",
    description: "Translate text between languages",
    icon: "Globe",
    url: "/apps/translator",
    category: "Tools",
  },
  {
    id: "timer",
    title: "Study Timer",
    description: "Pomodoro timer for focused study sessions",
    icon: "Clock",
    url: "/apps/timer",
    category: "Productivity",
  },
  {
    id: "dictionary",
    title: "Dictionary",
    description: "Look up definitions and synonyms",
    icon: "BookOpen",
    url: "/apps/dictionary",
    category: "Reference",
  },
  {
    id: "whiteboard",
    title: "Whiteboard",
    description: "Digital whiteboard for brainstorming",
    icon: "PenTool",
    url: "/apps/whiteboard",
    category: "Creativity",
  },
  {
    id: "youtube",
    title: "YouTube",
    description: "Watch videos without restrictions",
    icon: "Youtube",
    url: "/apps/youtube",
    category: "Entertainment",
  },
  {
    id: "discord",
    title: "Discord",
    description: "Chat with friends securely",
    icon: "MessageCircle",
    url: "/apps/discord",
    category: "Social",
  },
  {
    id: "spotify",
    title: "Music Player",
    description: "Listen to your favorite music",
    icon: "Music",
    url: "/apps/spotify",
    category: "Entertainment",
  },
  {
    id: "reddit",
    title: "Reddit",
    description: "Browse Reddit without restrictions",
    icon: "Globe",
    url: "/apps/reddit",
    category: "Social",
  },
  {
    id: "tiktok",
    title: "TikTok Viewer",
    description: "Watch TikTok videos anonymously",
    icon: "Video",
    url: "/apps/tiktok",
    category: "Entertainment",
  },
]

// App categories
const CATEGORIES = ["All", "Entertainment", "Productivity", "Tools", "Social", "AI", "Reference", "Creativity"]

export default function AppsPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />

      <main className="flex-1 ml-16 md:ml-64 p-6">
        <div className="max-w-6xl mx-auto pt-8">
          <h1 className="text-3xl font-bold mb-6">Apps</h1>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search apps"
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
                <h3 className="font-medium mb-3">Featured</h3>
                <div className="space-y-2">
                  <FeaturedApp title="ChatGPT" description="AI assistant for homework" icon="MessageSquare" />
                  <FeaturedApp title="YouTube" description="Watch videos without restrictions" icon="Youtube" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {APPS.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function AppCard({ app }) {
  const IconComponent = getIconComponent(app.icon)

  return (
    <Link href={app.url}>
      <div className="bg-card rounded-lg p-4 border border-border hover:border-primary transition-colors cursor-pointer h-full flex flex-col">
        <div className="mb-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{app.title}</h3>
          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{app.category}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 flex-1">{app.description}</p>
        <div className="text-xs text-primary font-medium">Open App</div>
      </div>
    </Link>
  )
}

function FeaturedApp({ title, description, icon }) {
  const IconComponent = getIconComponent(icon)

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <IconComponent className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function getIconComponent(iconName) {
  // This is a simplified version - in a real app, you'd import all icons
  const icons = {
    MessageSquare: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    Calculator: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" x2="16" y1="6" y2="6" />
        <line x1="16" x2="16" y1="14" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
      </svg>
    ),
    FileText: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    ),
    Globe: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    Clock: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    BookOpen: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    PenTool: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    Youtube: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
    MessageCircle: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    Music: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    Video: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
  }

  return icons[iconName] || icons.Globe
}
