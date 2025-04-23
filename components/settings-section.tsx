"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Eye, RefreshCw, Check, AlertTriangle, BookOpen, LinkIcon } from "lucide-react"

export default function SettingsSection() {
  const [tabCloaking, setTabCloaking] = useState(false)
  const [aboutBlank, setAboutBlank] = useState(false)
  const [customTitle, setCustomTitle] = useState("Google Classroom")
  const [customIcon, setCustomIcon] = useState("https://ssl.gstatic.com/classroom/favicon.png")
  const [notification, setNotification] = useState(null)

  const handleTabCloaking = (checked) => {
    setTabCloaking(checked)
    if (checked) {
      // Apply tab cloaking
      try {
        document.title = customTitle
        const favicon = document.querySelector("link[rel='icon']")
        if (favicon) {
          favicon.href = customIcon
        } else {
          const newFavicon = document.createElement("link")
          newFavicon.rel = "icon"
          newFavicon.href = customIcon
          document.head.appendChild(newFavicon)
        }
        showNotification("success", "Tab cloaking applied successfully!")
      } catch (error) {
        showNotification("error", "Failed to apply tab cloaking")
      }
    } else {
      // Remove tab cloaking
      document.title = "$MUNNY PROXY$"
      const favicon = document.querySelector("link[rel='icon']")
      if (favicon) {
        favicon.href = "/favicon.ico"
      }
      showNotification("info", "Tab cloaking removed")
    }
  }

  const openInAboutBlank = () => {
    try {
      const newWindow = window.open("about:blank", "_blank")
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${customTitle}</title>
              <link rel="icon" href="${customIcon}">
            </head>
            <body style="margin:0;padding:0;height:100vh;width:100vw;">
              <iframe src="${window.location.href}" style="border:none;width:100%;height:100%;"></iframe>
            </body>
          </html>
        `)
        newWindow.document.close()
        setAboutBlank(true)
        showNotification("success", "Opened in about:blank successfully!")
      } else {
        showNotification("error", "Pop-up blocked. Please allow pop-ups for this site.")
      }
    } catch (error) {
      showNotification("error", "Failed to open in about:blank")
    }
  }

  const activateStealthMode = () => {
    // Redirect to the same page with stealth parameter
    window.location.href = `${window.location.origin}?stealth=true`
  }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const createHiddenLink = () => {
    try {
      // Create a hidden link that looks like a Google Classroom link
      const encodedUrl = btoa(window.location.origin)
      const hiddenLink = `https://classroom.google.com/u/0/?${encodedUrl}`

      // Copy to clipboard
      navigator.clipboard.writeText(hiddenLink).then(() => {
        showNotification("success", "Hidden link copied to clipboard!")
      })
    } catch (error) {
      showNotification("error", "Failed to create hidden link")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
      >
        <span className="text-purple-500">Settings</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-center max-w-2xl mx-auto mb-8"
      >
        Customize your browsing experience and stay undetected
      </motion.p>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md mx-auto mb-4 p-3 rounded-md flex items-center ${
            notification.type === "success"
              ? "bg-green-500/20 text-green-400"
              : notification.type === "error"
                ? "bg-red-500/20 text-red-400"
                : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5 mr-2" />
          ) : notification.type === "error" ? (
            <AlertTriangle className="w-5 h-5 mr-2" />
          ) : (
            <RefreshCw className="w-5 h-5 mr-2" />
          )}
          {notification.message}
        </motion.div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-black/50 p-6 rounded-lg border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">GoGuardian Bypass</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Activate stealth mode to help bypass GoGuardian and other web filters.
          </p>

          <div className="space-y-3">
            <Button onClick={activateStealthMode} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Activate Stealth Mode
            </Button>

            <Button
              onClick={createHiddenLink}
              variant="outline"
              className="w-full border-white/10 text-white hover:bg-white/5"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Create Hidden Link
            </Button>

            <p className="text-xs text-gray-500">
              Stealth mode opens the site in a way that's harder for monitoring tools to detect. The hidden link
              disguises the URL to look like Google Classroom.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 p-6 rounded-lg border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Tab Cloaking</h2>
            </div>
            <Switch checked={tabCloaking} onCheckedChange={handleTabCloaking} />
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Disguise this tab to look like another website. Changes the tab title and favicon.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Tab Title</label>
              <Input
                type="text"
                placeholder="Google Classroom"
                className="bg-black/50 border-white/10 text-white"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Favicon URL</label>
              <Input
                type="text"
                placeholder="https://example.com/favicon.ico"
                className="bg-black/50 border-white/10 text-white"
                value={customIcon}
                onChange={(e) => setCustomIcon(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/50 p-6 rounded-lg border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">About:Blank Page</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Open this site in an about:blank page to bypass web filters and history tracking.
          </p>

          <Button onClick={openInAboutBlank} className="bg-purple-600 hover:bg-purple-700 text-white">
            Open in About:Blank
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/50 p-6 rounded-lg border border-white/10"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Panic Button</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">Quickly navigate away to a safe site if someone approaches.</p>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5"
              onClick={() => window.open("https://classroom.google.com", "_self")}
            >
              Google Classroom
            </Button>
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5"
              onClick={() => window.open("https://google.com", "_self")}
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5"
              onClick={() => window.open("https://drive.google.com", "_self")}
            >
              Google Drive
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
