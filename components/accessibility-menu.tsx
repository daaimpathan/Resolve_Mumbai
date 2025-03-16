"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accessibility, ZoomIn, VolumeIcon as VolumeUp, Moon } from "lucide-react"

export default function AccessibilityMenu() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [screenReader, setScreenReader] = useState(false)

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    // In a real implementation, this would add/remove a class to the document body
    if (!highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const toggleLargeText = () => {
    setLargeText(!largeText)
    // In a real implementation, this would add/remove a class to the document body
    if (!largeText) {
      document.documentElement.classList.add("large-text")
    } else {
      document.documentElement.classList.remove("large-text")
    }
  }

  const toggleScreenReader = () => {
    setScreenReader(!screenReader)
    // In a real implementation, this would enable/disable screen reader compatibility
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-primary-foreground">
          <Accessibility className="h-4 w-4" />
          <span className="sr-only">Accessibility options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleHighContrast}>
          <Moon className="mr-2 h-4 w-4" />
          <span>{highContrast ? "Disable" : "Enable"} High Contrast</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleLargeText}>
          <ZoomIn className="mr-2 h-4 w-4" />
          <span>{largeText ? "Disable" : "Enable"} Large Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleScreenReader}>
          <VolumeUp className="mr-2 h-4 w-4" />
          <span>{screenReader ? "Disable" : "Enable"} Screen Reader</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/accessibility" className="cursor-pointer">
            Accessibility Statement
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

