export default function Loading() {
  return (
    <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg">Loading Google Proxy...</p>
      </div>
    </div>
  )
}
