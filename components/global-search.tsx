"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mock search results - in a real app, this would be an API call
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate API call with timeout
      const timer = setTimeout(() => {
        const mockResults = [
          { id: 1, title: "Pothole on Linking Road", type: "issue", path: "/issues/1" },
          { id: 2, title: "Water supply disruption in Dadar", type: "issue", path: "/issues/2" },
          { id: 3, title: "Report a new issue", type: "page", path: "/report" },
          { id: 4, title: "AI Insights Dashboard", type: "page", path: "/ai-insights" },
        ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

        setSearchResults(mockResults)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  const handleResultClick = (path: string) => {
    router.push(path)
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
        <Input
          placeholder="Search issues, locations..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsSearchOpen(true)
          }}
          onClick={() => setIsSearchOpen(true)}
          className="pl-10 pr-10 bg-primary-foreground/10 border-primary-foreground/20 focus:bg-primary-foreground/20 transition-colors text-white placeholder:text-white/70"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => {
              setSearchQuery("")
              setSearchResults([])
            }}
          >
            <X className="h-4 w-4 text-white/70" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>

      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border z-50 text-foreground">
          <ul className="py-2">
            {searchResults.map((result) => (
              <li key={`${result.type}-${result.id}`}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-muted flex items-center"
                  onClick={() => handleResultClick(result.path)}
                >
                  <span className="flex-1">{result.title}</span>
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
                    {result.type === "issue" ? "Issue" : "Page"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-primary" onClick={handleSearch}>
              View all results for "{searchQuery}"
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

