"use client"

import { useState } from "react"
import MainNav from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, X, Globe, ArrowLeft, ArrowRight, RotateCw, Bookmark, Shield } from "lucide-react"
import { bareClient } from "@/components/bare-client"

export default function TabsPage() {
  const [tabs, setTabs] = useState([
    { id: "tab1", url: "https://www.google.com", title: "Google", favicon: "https://www.google.com/favicon.ico" },
  ])
  const [activeTab, setActiveTab] = useState("tab1")
  const [url, setUrl] = useState("https://www.google.com")
  const [isLoading, setIsLoading] = useState(false)
  const [proxyMethod, setProxyMethod] = useState("bare")

  const addTab = () => {
    const newTabId = `tab${Date.now()}`
    setTabs([...tabs, { id: newTabId, url: "https://www.google.com", title: "New Tab", favicon: "" }])
    setActiveTab(newTabId)
    setUrl("https://www.google.com")
  }

  const closeTab = (tabId, e) => {
    e.stopPropagation()
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId) {
        setActiveTab(newTabs[0].id)
        setUrl(newTabs[0].url)
      }
    }
  }

  const navigate = (targetUrl) => {
    setIsLoading(true)

    // Make sure URL has protocol
    let formattedUrl = targetUrl
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl
    }

    // For search queries, redirect to search engine
    if (!formattedUrl.includes(".") || formattedUrl.includes(" ")) {
      formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}`
    }

    // Update the current tab
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab
          ? {
              ...tab,
              url: formattedUrl,
              title: formattedUrl.replace("https://", "").replace("http://", "").split("/")[0],
            }
          : tab,
      ),
    )

    setUrl(formattedUrl)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(url)
  }

  const refresh = () => {
    setIsLoading(true)
    const currentTab = tabs.find((tab) => tab.id === activeTab)
    if (currentTab) {
      navigate(currentTab.url)
    }
  }

  const goBack = () => {
    // In a real implementation, this would use browser history
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const goForward = () => {
    // In a real implementation, this would use browser history
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const getProxyUrl = (url) => {
    switch (proxyMethod) {
      case "bare":
        return bareClient.createProxyUrl(url)
      case "corsproxy":
        return `/api/bare-proxy?url=${encodeURIComponent(url)}&method=corsproxy`
      case "alloy":
        return `/api/bare-proxy?url=${encodeURIComponent(url)}&method=alloy`
      default:
        return bareClient.createProxyUrl(url)
    }
  }

  return (
    <div className="flex min-h-screen">
      <MainNav />

      <main className="flex-1 ml-16 md:ml-64 flex flex-col h-screen">
        <div className="bg-card border-b border-border p-2 flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={goBack} className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={goForward} className="text-muted-foreground">
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={refresh} className="text-muted-foreground">
            <RotateCw className="h-4 w-4" />
          </Button>

          <form onSubmit={handleSubmit} className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-9 pr-9 py-1 bg-background border-border text-foreground"
              placeholder="Enter URL or search term"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer"
              onClick={handleSubmit}
            />
          </form>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bookmark className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="text-primary">
            <Shield className="h-4 w-4" />
          </Button>

          <select
            value={proxyMethod}
            onChange={(e) => setProxyMethod(e.target.value)}
            className="bg-background text-foreground text-xs border-border rounded p-1"
          >
            <option value="bare">Bare Server</option>
            <option value="corsproxy">CORS Proxy</option>
            <option value="alloy">Alloy</option>
          </select>
        </div>

        <div className="bg-muted flex items-center">
          <div className="flex-1 overflow-x-auto whitespace-nowrap px-2 py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`inline-flex items-center px-3 py-1 text-sm rounded-t-md mr-1 ${
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "bg-card text-muted-foreground hover:bg-secondary"
                }`}
                onClick={() => {
                  setActiveTab(tab.id)
                  setUrl(tab.url)
                }}
              >
                {tab.favicon && <img src={tab.favicon || "/placeholder.svg"} alt="" className="w-4 h-4 mr-2" />}
                <span className="max-w-[100px] truncate">{tab.title}</span>
                {tabs.length > 1 && (
                  <X
                    className="ml-2 h-3 w-3 text-muted-foreground hover:text-foreground"
                    onClick={(e) => closeTab(tab.id, e)}
                  />
                )}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground mr-2" onClick={addTab}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 bg-white relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <iframe
            src={getProxyUrl(tabs.find((tab) => tab.id === activeTab)?.url || "https://www.google.com")}
            className="w-full h-full border-none"
            title="Browser Frame"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </main>
    </div>
  )
}
