import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import GlobalSearch from "@/components/global-search"

export const metadata: Metadata = {
  title: "Resolve मुंबई - Citizen Platform",
  description: "Report and resolve civic issues in Mumbai",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
          <nav className="container mx-auto py-3 px-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-bold text-xl hover:opacity-90 transition-opacity">
                Resolve मुंबई
              </Link>

              <div className="hidden md:flex items-center space-x-1 flex-1 max-w-md mx-8">
                <GlobalSearch />
              </div>

              <div className="flex gap-2 md:gap-4 items-center">
                <div className="hidden md:flex space-x-1">
                  <Link
                    href="/dashboard"
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/report"
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    Report Issue
                  </Link>
                  <Link
                    href="/issues"
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    Issues
                  </Link>
                  <Link
                    href="/issues/vote"
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    Vote
                  </Link>
                  <Link
                    href="/ai-insights"
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    AI Insights
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="shadow-sm hover:shadow-md transition-shadow" asChild>
                    <Link href="/login">Citizen Login</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-primary-foreground text-primary shadow-sm hover:shadow-md transition-shadow hover:bg-primary-foreground/90"
                    size="sm"
                    asChild
                  >
                    <Link href="/admin/login">Admin</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile search - shown only on small screens */}
            <div className="md:hidden mt-2">
              <GlobalSearch />
            </div>
          </nav>
        </header>
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'