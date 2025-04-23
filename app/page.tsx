import MainNav from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Rocket, Shield } from "lucide-react"
import GalaxyBackground from "@/components/galaxy-background"
import { SparklesCore } from "@/components/sparkles"

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <GalaxyBackground />
      <MainNav />

      <main className="flex-1 ml-16 md:ml-64 p-6 relative">
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="max-w-4xl mx-auto pt-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              $MUNNY PROXY$
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Browse the web freely, play games, and access apps without restrictions.
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/10">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search the web or enter a URL"
                className="pl-10 py-6 bg-black/50 border-white/10 text-white"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700"
              >
                Go
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FeatureCard
              icon={<Rocket className="w-6 h-6 text-purple-500" />}
              title="Fast Browsing"
              description="Browse websites with our high-speed proxy technology"
              href="/proxy"
            />
            <FeatureCard
              icon={<Gamepad2 className="w-6 h-6 text-blue-500" />}
              title="Games Collection"
              description="Play hundreds of unblocked games directly in your browser"
              href="/a"
            />
            <FeatureCard
              icon={<Apps className="w-6 h-6 text-pink-500" />}
              title="Useful Apps"
              description="Access productivity tools and entertainment apps"
              href="/b"
            />
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold">Privacy Protected</h2>
            </div>
            <p className="text-gray-400 mb-4">
              $MUNNY PROXY$ helps you bypass web filters and browse anonymously. Your browsing activity is not tracked
              or monitored.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge text="Bypass Filters" />
              <Badge text="No Logs" />
              <Badge text="Fast Connection" />
              <Badge text="Multiple Proxy Methods" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Gamepad2(props) {
  return (
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
      <line x1="6" x2="10" y1="11" y2="11" />
      <line x1="8" x2="8" y1="9" y2="13" />
      <line x1="15" x2="15.01" y1="12" y2="12" />
      <line x1="18" x2="18.01" y1="10" y2="10" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.152A4 4 0 0 0 17.32 5z" />
    </svg>
  )
}

function Apps(props) {
  return (
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="3" x2="21" y1="15" y2="15" />
      <line x1="9" x2="9" y1="3" y2="21" />
      <line x1="15" x2="15" y1="3" y2="21" />
    </svg>
  )
}

function FeatureCard({ icon, title, description, href }) {
  return (
    <Link href={href}>
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer h-full flex flex-col">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </Link>
  )
}

function Badge({ text }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-white border border-white/10">
      {text}
    </span>
  )
}
