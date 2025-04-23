import { type NextRequest, NextResponse } from "next/server"
import mime from "mime"

// Cache for assets
const cache = new Map()
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000 // Cache for 30 Days

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const path = `/e/${params.path.join("/")}`

    // Check cache
    if (cache.has(path)) {
      const { data, contentType, timestamp } = cache.get(path)
      if (Date.now() - timestamp > CACHE_TTL) {
        cache.delete(path)
      } else {
        return new NextResponse(data, {
          headers: { "Content-Type": contentType },
        })
      }
    }

    // Define base URLs for different paths
    const baseUrls: Record<string, string> = {
      "/e/1/": "https://raw.githubusercontent.com/qrs/x/fixy/",
      "/e/2/": "https://raw.githubusercontent.com/3v1/V5-Assets/main/",
      "/e/3/": "https://raw.githubusercontent.com/3v1/V5-Retro/master/",
    }

    // Find the matching base URL
    let reqTarget
    for (const [prefix, baseUrl] of Object.entries(baseUrls)) {
      if (path.startsWith(prefix)) {
        reqTarget = baseUrl + path.slice(prefix.length)
        break
      }
    }

    if (!reqTarget) {
      return NextResponse.json({ error: "Invalid path" }, { status: 404 })
    }

    // Fetch the asset
    const asset = await fetch(reqTarget)
    if (!asset.ok) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 })
    }

    const data = Buffer.from(await asset.arrayBuffer())
    const ext = reqTarget.split(".").pop() || ""
    const no = [".unityweb"]
    const contentType = no.includes(`.${ext}`)
      ? "application/octet-stream"
      : mime.getType(ext) || "application/octet-stream"

    // Cache the asset
    cache.set(path, { data, contentType, timestamp: Date.now() })

    return new NextResponse(data, {
      headers: { "Content-Type": contentType },
    })
  } catch (error) {
    console.error("Error fetching asset:", error)
    return NextResponse.json({ error: "Error fetching the asset" }, { status: 500 })
  }
}
