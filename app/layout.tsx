import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import LoadingAnimation from "@/components/loading-animation"

export const metadata: Metadata = {
  title: "$MUNNY PROXY$",
  description: "Unblocked proxy for school",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingAnimation />
          {children}
        </ThemeProvider>

        {/* Register service worker for offline access */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(
                  function(registration) {
                    console.log('Service Worker registration successful');
                  },
                  function(err) {
                    console.log('Service Worker registration failed');
                  }
                );
              });
            }
          `,
          }}
        />
      </body>
    </html>
  )
}
