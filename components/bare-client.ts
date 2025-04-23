// A client implementation of the Bare server protocol

export interface BareHeaders {
  [key: string]: string
}

export interface BareResponse {
  status: number
  statusText: string
  headers: BareHeaders
  body: ReadableStream<Uint8Array> | null
}

export class BareClient {
  private server: string

  constructor(server = "/ca/") {
    this.server = server.endsWith("/") ? server : server + "/"
  }

  async fetch(url: string, options: RequestInit = {}): Promise<BareResponse> {
    const headers = new Headers(options.headers || {})

    // Add required headers for Bare server
    headers.set("x-bare-url", url)
    headers.set("x-bare-host", new URL(url).hostname)

    // Create the request to the Bare server
    const bareRequest = new Request(this.server + "v1/", {
      method: options.method || "GET",
      headers,
      body: options.body,
      signal: options.signal,
      redirect: "manual", // We handle redirects ourselves
    })

    // Send the request to the Bare server
    const response = await fetch(bareRequest)

    if (!response.ok) {
      throw new Error(`Bare server error: ${response.status} ${response.statusText}`)
    }

    // Extract response data
    const responseHeaders: BareHeaders = {}
    const bareHeaders = JSON.parse(response.headers.get("x-bare-headers") || "{}")

    for (const key in bareHeaders) {
      responseHeaders[key.toLowerCase()] = bareHeaders[key]
    }

    return {
      status: Number.parseInt(response.headers.get("x-bare-status") || "200"),
      statusText: response.headers.get("x-bare-status-text") || "OK",
      headers: responseHeaders,
      body: response.body,
    }
  }

  // Helper method to create a proxy URL
  createProxyUrl(url: string): string {
    // For client-side use, we'll use our API route
    return `/api/bare-proxy?url=${encodeURIComponent(url)}`
  }
}

// Create a singleton instance
export const bareClient = new BareClient()
