import { type NextRequest, NextResponse } from "next/server"

// Helper function to modify HTML content to fix relative URLs
function rewriteHtml(html: string, baseUrl: string): string {
  // Get the domain from the URL
  const url = new URL(baseUrl)
  const domain = url.origin

  // Replace relative URLs with absolute ones
  return html
    .replace(/href=["']\/([^"']+)["']/g, `href="${domain}/$1"`)
    .replace(/src=["']\/([^"']+)["']/g, `src="${domain}/$1"`)
    .replace(/<base.*?>/g, `<base href="${domain}/">`)
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  const method = request.nextUrl.searchParams.get("method") || "corsproxy"

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    let proxyUrl = url

    // Format URL if needed
    if (!proxyUrl.startsWith("http://") && !proxyUrl.startsWith("https://")) {
      proxyUrl = "https://" + proxyUrl
    }

    // Apply different proxy methods
    if (method === "corsproxy") {
      proxyUrl = `https://corsproxy.io/?${encodeURIComponent(proxyUrl)}`
    } else if (method === "alloy") {
      proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(proxyUrl)}`
    } else if (method === "duckduckgo") {
      proxyUrl = `https://proxy.duckduckgo.com/proxy.html?url=${encodeURIComponent(proxyUrl)}`
    }

    // Fetch the content through the proxy
    const response = await fetch(proxyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    // Get content type
    const contentType = response.headers.get("Content-Type") || ""

    // Process the response based on content type
    if (contentType.includes("text/html")) {
      const html = await response.text()
      const modifiedHtml = rewriteHtml(html, url)

      return new NextResponse(modifiedHtml, {
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
        },
      })
    } else {
      // For non-HTML content, just pass through
      const data = await response.arrayBuffer()

      return new NextResponse(data, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
        },
      })
    }
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch the requested URL" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  const method = request.nextUrl.searchParams.get("method") || "corsproxy"

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    let proxyUrl = url

    // Format URL if needed
    if (!proxyUrl.startsWith("http://") && !proxyUrl.startsWith("https://")) {
      proxyUrl = "https://" + proxyUrl
    }

    // Apply different proxy methods
    if (method === "corsproxy") {
      proxyUrl = `https://corsproxy.io/?${encodeURIComponent(proxyUrl)}`
    } else if (method === "alloy") {
      proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(proxyUrl)}`
    }

    const body = await request.text()

    // Forward the request to the target URL
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      body,
    })

    const contentType = response.headers.get("Content-Type") || ""
    const data = await response.arrayBuffer()

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch the requested URL" }, { status: 500 })
  }
}
