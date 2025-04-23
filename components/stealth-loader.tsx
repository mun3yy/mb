"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Eye } from "lucide-react"

export default function StealthLoader() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const openInAboutBlank = () => {
    try {
      setLoading(true)
      const newWindow = window.open("about:blank", "_blank")

      if (!newWindow) {
        setError("Pop-up blocked. Please allow pop-ups for this site.")
        setLoading(false)
        return
      }

      // Get the current URL without the stealth parameter
      const currentUrl = window.location.href.split("?")[0]

      // Write the iframe to the new window
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Google Classroom</title>
            <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png">
            <style>
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                overflow: hidden;
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }
            </style>
          </head>
          <body>
            <iframe src="${currentUrl}" allowfullscreen></iframe>
            <script>
              // Store the site in localStorage for offline access
              localStorage.setItem('stealthSite', '${encodeURIComponent(currentUrl)}');
              
              // Hide the site from history
              history.pushState(null, '', 'https://classroom.google.com');
              
              // Detect when GoGuardian might be scanning
              document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'hidden') {
                  document.title = 'Google Classroom';
                }
              });
            </script>
          </body>
        </html>
      `)

      newWindow.document.close()

      // Close the original tab after a short delay
      setTimeout(() => {
        window.close()
      }, 1000)
    } catch (error) {
      console.error("Error opening about:blank:", error)
      setError("Failed to open in stealth mode. Try again or check browser settings.")
      setLoading(false)
    }
  }

  const createBookmarklet = () => {
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-black/[0.96] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-purple-500" />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">Stealth Mode Activation</h1>

        {step === 1 && (
          <>
            <p className="text-gray-400 text-center mb-6">
              This will load $MUNNY PROXY$ in a way that helps bypass GoGuardian and other web filters.
            </p>

            <div className="space-y-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setStep(2)}>
                <Eye className="mr-2 h-4 w-4" />
                Continue to Stealth Options
              </Button>

              <div className="text-xs text-gray-500 text-center">
                This creates a hidden environment that's harder for monitoring tools to detect
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-gray-400 text-center mb-6">Choose how you want to load the site in stealth mode:</p>

            <div className="space-y-4">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={openInAboutBlank}
                disabled={loading}
              >
                {loading ? "Loading..." : "Open in about:blank"}
              </Button>

              <Button
                className="w-full bg-black hover:bg-gray-900 border border-purple-500/50"
                onClick={createBookmarklet}
              >
                Create Stealth Bookmarklet
              </Button>

              {error && <div className="text-red-400 text-sm text-center mt-2">{error}</div>}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-gray-400 text-center mb-6">Create a bookmarklet to access this site anytime:</p>

            <div className="space-y-4">
              <div className="bg-black/50 border border-white/10 p-3 rounded-md">
                <p className="text-sm text-gray-300 mb-2">1. Create a new bookmark in your browser</p>
                <p className="text-sm text-gray-300 mb-2">2. Name it something innocent like "Google Classroom"</p>
                <p className="text-sm text-gray-300 mb-2">3. Copy the code below as the URL:</p>

                <div className="bg-gray-900 p-2 rounded text-xs text-purple-300 overflow-x-auto">
                  {`javascript:(function(){var w=window.open('about:blank','_blank');w.document.write('<iframe src="${window.location.origin}" style="position:fixed;top:0;left:0;width:100%;height:100%;border:none;"></iframe>');w.document.title='Google Classroom';var link=w.document.createElement('link');link.rel='icon';link.href='https://ssl.gstatic.com/classroom/favicon.png';w.document.head.appendChild(link);})();`}
                </div>
              </div>

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => (window.location.href = window.location.origin)}
              >
                Return to Main Site
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
