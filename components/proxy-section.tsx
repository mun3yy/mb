"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe, ExternalLink, Shield, Laptop } from "lucide-react"
import Link from "next/link"
import EmbeddedBrowser from "@/components/embedded-browser"

export default function ProxySection() {
  const [showFullBrowser, setShowFullBrowser] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
      >
        Web <span className="text-purple-500">Proxy</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-center max-w-2xl mx-auto mb-8"
      >
        Browse the web securely and anonymously without leaving this site
      </motion.p>

      {!showFullBrowser ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto bg-black/50 p-6 rounded-lg border border-white/10 mb-8"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Laptop className="w-8 h-8 text-purple-400" />
            </div>

            <h2 className="text-xl font-semibold text-white text-center">Embedded Web Browser</h2>

            <p className="text-gray-400 text-center">
              Our embedded browser lets you browse any website without leaving this page. GoGuardian won't detect your
              searches because they're routed through our secure proxy.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setShowFullBrowser(true)}>
                <Globe className="mr-2 h-4 w-4" />
                Open Browser
              </Button>

              <Link href="/browser">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Full Screen Mode
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <ProxyFeature icon={Shield} text="Bypasses GoGuardian" />
              <ProxyFeature icon={ExternalLink} text="Multiple Proxy Methods" />
              <ProxyFeature icon={Globe} text="Browse Any Website" />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full rounded-lg overflow-hidden">
          <div className="bg-gray-900 p-2 flex justify-between items-center">
            <h2 className="text-white font-medium">Embedded Browser</h2>
            <Button variant="ghost" size="sm" className="text-gray-300" onClick={() => setShowFullBrowser(false)}>
              Minimize
            </Button>
          </div>
          <div className="h-[70vh]">
            <EmbeddedBrowser />
          </div>
        </motion.div>
      )}
    </div>
  )
}

function ProxyFeature({ icon: Icon, text }) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400 bg-black/30 px-3 py-1 rounded-full">
      <Icon className="w-4 h-4 text-purple-400" />
      <span>{text}</span>
    </div>
  )
}
