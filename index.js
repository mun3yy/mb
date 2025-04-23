import express from "express"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createBareServer } from "@nebula-services/bare-server-node"
import cors from "cors"
import chalk from "chalk"
import config from "./config.js"
import basicAuth from "express-basic-auth"
import cookieParser from "cookie-parser"
import mime from "mime"

// Check if Masqr.js exists and import it if it does
let setupMasqr
try {
  const masqrModule = await import("./Masqr.js")
  setupMasqr = masqrModule.setupMasqr
  console.log(chalk.green("Masqr.js found, setting up Masqr..."))
} catch (err) {
  console.log(chalk.yellow("Masqr.js not found, skipping..."))
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const bareServer = createBareServer("/ca/")

app.use(cookieParser())
app.use(cors())
app.use(express.json())

// Basic authentication if challenge is enabled
if (config.challenge) {
  console.log(chalk.blue("Password protection is enabled."))
  app.use(
    basicAuth({
      users: config.users,
      challenge: true,
    }),
  )
}

// Setup Masqr if available
if (setupMasqr) {
  setupMasqr(app)
}

// Bare Server
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

// Static files
app.use(express.static(path.join(__dirname, "static")))

// Handle asset routes
app.get("/e/*", async (req, res) => {
  try {
    const reqTarget = req.path

    // Define base URLs for different paths
    const baseUrls = {
      "/e/1/": "https://raw.githubusercontent.com/qrs/x/fixy/",
      "/e/2/": "https://raw.githubusercontent.com/3v1/V5-Assets/main/",
      "/e/3/": "https://raw.githubusercontent.com/3v1/V5-Retro/master/",
    }

    // Find the matching base URL
    let assetUrl
    for (const [prefix, baseUrl] of Object.entries(baseUrls)) {
      if (reqTarget.startsWith(prefix)) {
        assetUrl = baseUrl + reqTarget.slice(prefix.length)
        break
      }
    }

    if (!assetUrl) {
      return res.status(404).send("Asset not found")
    }

    // Fetch the asset
    const asset = await fetch(assetUrl)
    if (!asset.ok) {
      return res.status(404).send("Asset not found")
    }

    const data = Buffer.from(await asset.arrayBuffer())
    const ext = assetUrl.split(".").pop() || ""
    const no = [".unityweb"]
    const contentType = no.includes(`.${ext}`)
      ? "application/octet-stream"
      : mime.getType(ext) || "application/octet-stream"

    res.setHeader("Content-Type", contentType)
    res.send(data)
  } catch (error) {
    console.error("Error fetching asset:", error)
    res.status(500).send("Error fetching the asset")
  }
})

// All other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"))
})

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(chalk.green("Bare Server is running..."))
})
