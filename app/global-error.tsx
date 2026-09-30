"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Fatal root layout error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center font-sans">
        <div className="text-2xl font-bold">Application Error</div>
        <p className="max-w-md text-sm text-gray-500">
          {error.message || "A critical error occurred in the root layout."}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          Reload Application
        </button>
      </body>
    </html>
  )
}
