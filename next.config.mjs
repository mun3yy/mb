/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure we properly handle Node.js built-in modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to import Node.js built-in modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        http: false,
        url: false,
      }
    }
    return config
  },
}

export default nextConfig
