"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Globe, Search, ArrowLeft, ArrowRight, RotateCw, Home, Plus, X, Bookmark, Shield, History } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function EmbeddedBrowser() {
  const [url, setUrl] = useState("https://www.google.com")
  const [displayUrl, setDisplayUrl] = useState("https://www.google.com")
  const [isLoading, setIsLoading] = useState(false)
  const [tabs, setTabs] = useState([
    { id: "tab1", url: "https://www.google.com", title: "Google", favicon: "https://www.google.com/favicon.ico" },
  ])
  const [activeTab, setActiveTab] = useState("tab1")
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [bookmarks, setBookmarks] = useState([])
  const [proxyMethod, setProxyMethod] = useState("corsproxy")
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarContent, setSidebarContent] = useState("bookmarks")
  const iframeRef = useRef(null)

  // Get the active tab's URL
  const activeTabUrl = tabs.find((tab) => tab.id === activeTab)?.url || ""

  // Update URL when active tab changes
  useEffect(() => {
    const tab = tabs.find((tab) => tab.id === activeTab)
    if (tab) {
      setUrl(tab.url)
      setDisplayUrl(tab.url)
    }
  }, [activeTab, tabs])

  // Function to create a proxied URL
  const createProxyUrl = (targetUrl) => {
    // Make sure URL has protocol
    let formattedUrl = targetUrl
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl
    }

    // For search queries, redirect to search engine
    if (!formattedUrl.includes(".") || formattedUrl.includes(" ")) {
      return `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}&igu=1`
    }

    // Different proxy methods
    switch (proxyMethod) {
      case "corsproxy":
        return `/api/proxy?url=${encodeURIComponent(formattedUrl)}&method=corsproxy`
      case "alloy":
        return `/api/proxy?url=${encodeURIComponent(formattedUrl)}&method=alloy`
      case "duckduckgo":
        return `/api/proxy?url=${encodeURIComponent(formattedUrl)}&method=duckduckgo`
      case "direct":
        return formattedUrl
      default:
        return `/api/proxy?url=${encodeURIComponent(formattedUrl)}&method=corsproxy`
    }
  }

  const navigate = (targetUrl) => {
    setIsLoading(true)

    // Update the current tab
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab
          ? {
              ...tab,
              url: targetUrl,
              title: targetUrl.replace("https://", "").replace("http://", "").split("/")[0],
            }
          : tab,
      ),
    )

    // Update URL state
    setUrl(targetUrl)
    setDisplayUrl(targetUrl)

    // Add to history
    if (historyIndex < history.length - 1) {
      // If we navigated back and then to a new page, truncate the forward history
      setHistory([...history.slice(0, historyIndex + 1), targetUrl])
      setHistoryIndex(historyIndex + 1)
    } else {
      setHistory([...history, targetUrl])
      setHistoryIndex(history.length)
    }

    // Return the proxied URL for the iframe
    return createProxyUrl(targetUrl)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(displayUrl)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      const previousUrl = history[historyIndex - 1]
      setUrl(previousUrl)
      setDisplayUrl(previousUrl)

      // Update the current tab without adding to history
      setTabs(
        tabs.map((tab) =>
          tab.id === activeTab
            ? {
                ...tab,
                url: previousUrl,
                title: previousUrl.replace("https://", "").replace("http://", "").split("/")[0],
              }
            : tab,
        ),
      )
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      const nextUrl = history[historyIndex + 1]
      setUrl(nextUrl)
      setDisplayUrl(nextUrl)

      // Update the current tab without adding to history
      setTabs(
        tabs.map((tab) =>
          tab.id === activeTab
            ? {
                ...tab,
                url: nextUrl,
                title: nextUrl.replace("https://", "").replace("http://", "").split("/")[0],
              }
            : tab,
        ),
      )
    }
  }

  const refresh = () => {
    setIsLoading(true)
    const currentTab = tabs.find((tab) => tab.id === activeTab)
    if (currentTab) {
      navigate(currentTab.url)
    }
  }

  const goHome = () => {
    navigate("https://www.google.com")
  }

  const addTab = () => {
    const newTabId = `tab${Date.now()}`
    setTabs([...tabs, { id: newTabId, url: "https://www.google.com", title: "New Tab" }])
    setActiveTab(newTabId)
  }

  const closeTab = (tabId) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId) {
        setActiveTab(newTabs[0].id)
      }
    }
  }

  const addBookmark = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab)
    if (currentTab && !bookmarks.some((b) => b.url === currentTab.url)) {
      setBookmarks([
        ...bookmarks,
        {
          url: currentTab.url,
          title: currentTab.title || currentTab.url.replace("https://", "").replace("http://", "").split("/")[0],
        },
      ])
    }
  }

  const toggleSidebar = (content) => {
    if (showSidebar && sidebarContent === content) {
      setShowSidebar(false)
    } else {
      setShowSidebar(true)
      setSidebarContent(content)
    }
  }

  const renderTabContent = () => {
    const proxiedUrl = createProxyUrl(activeTabUrl)

    return (
      <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={proxiedUrl}
          className="w-full h-full border-none"
          title="Embedded Browser"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 rounded-lg overflow-hidden">
      {/* Browser toolbar */}
      <div className="bg-gray-800 p-2 flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={goBack} disabled={historyIndex <= 0}>
                <ArrowLeft className="h-4 w-4 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={goForward} disabled={historyIndex >= history.length - 1}>
                <ArrowRight className="h-4 w-4 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={refresh}>
                <RotateCw className="h-4 w-4 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={goHome}>
                <Home className="h-4 w-4 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <form onSubmit={handleSubmit} className="flex-1 relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            value={displayUrl}
            onChange={(e) => setDisplayUrl(e.target.value)}
            className="pl-9 pr-9 py-1 bg-gray-700 border-gray-600 text-white text-sm rounded-full"
            placeholder="Enter URL or search term"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer"
            onClick={handleSubmit}
          />
        </form>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => toggleSidebar("bookmarks")}>
                <Bookmark
                  className={`h-4 w-4 ${sidebarContent === "bookmarks" && showSidebar ? "text-purple-400" : "text-gray-300"}`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bookmarks</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => toggleSidebar("history")}>
                <History
                  className={`h-4 w-4 ${sidebarContent === "history" && showSidebar ? "text-purple-400" : "text-gray-300"}`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>History</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={addBookmark}>
                <Plus className="h-4 w-4 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Bookmark</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <select
                  value={proxyMethod}
                  onChange={(e) => setProxyMethod(e.target.value)}
                  className="bg-gray-700 text-white text-xs border-gray-600 rounded p-1"
                >
                  <option value="corsproxy">CORS Proxy</option>
                  <option value="alloy">Alloy</option>
                  <option value="duckduckgo">DuckDuckGo</option>
                  <option value="direct">Direct (No Proxy)</option>
                </select>
              </div>
            </TooltipTrigger>
            <TooltipContent>Proxy Method</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-purple-400">
                <Shield className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>GoGuardian Protection Active</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Tabs bar */}
      <div className="bg-gray-700 flex items-center">
        <div className="flex-1 overflow-x-auto whitespace-nowrap px-2 py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex items-center px-3 py-1 text-sm rounded-t-md mr-1 ${
                activeTab === tab.id ? "bg-gray-100 text-gray-800" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="max-w-[100px] truncate">{tab.title}</span>
              {tabs.length > 1 && (
                <X
                  className="ml-2 h-3 w-3 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="text-gray-300 mr-2" onClick={addTab}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Browser content with optional sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <div className="w-64 bg-gray-800 text-white p-3 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">{sidebarContent === "bookmarks" ? "Bookmarks" : "History"}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {sidebarContent === "bookmarks" ? (
              <div className="space-y-2">
                {bookmarks.length === 0 ? (
                  <p className="text-sm text-gray-400">No bookmarks yet</p>
                ) : (
                  bookmarks.map((bookmark, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center"
                      onClick={() => {
                        navigate(bookmark.url)
                        setShowSidebar(false)
                      }}
                    >
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm truncate">{bookmark.title}</span>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {history.length === 0 ? (
                  <p className="text-sm text-gray-400">No history yet</p>
                ) : (
                  [...history].reverse().map((url, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center"
                      onClick={() => {
                        navigate(url)
                        setShowSidebar(false)
                      }}
                    >
                      <History className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm truncate">{url.replace("https://", "").replace("http://", "")}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex-1">{renderTabContent()}</div>
      </div>
    </div>
  )
}
