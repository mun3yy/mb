// Utility functions for proxy operations

// Encode a URL for Ultraviolet proxy
export function encodeUVUrl(url: string): string {
  return Buffer.from(url).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

// Decode a URL from Ultraviolet proxy
export function decodeUVUrl(encoded: string): string {
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/")
  // Add padding if needed
  while (encoded.length % 4) {
    encoded += "="
  }
  return Buffer.from(encoded, "base64").toString()
}

// Obfuscate URL to avoid detection
export function obfuscateUrl(url: string): string {
  // Simple XOR obfuscation with a key
  const key = "MUNNYPROXY"
  let result = ""
  for (let i = 0; i < url.length; i++) {
    result += String.fromCharCode(url.charCodeAt(i) ^ key.charCodeAt(i % key.length))
  }
  return Buffer.from(result).toString("base64")
}

// Deobfuscate URL
export function deobfuscateUrl(obfuscated: string): string {
  const key = "MUNNYPROXY"
  const decoded = Buffer.from(obfuscated, "base64").toString()
  let result = ""
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length))
  }
  return result
}

// Create a URL that looks innocent but contains hidden data
export function createStealthUrl(url: string): string {
  const obfuscated = obfuscateUrl(url)
  return `https://classroom.google.com/u/0/?stealth=${obfuscated}`
}
