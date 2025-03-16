"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
]

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    // In a real implementation, this would update the app's language context
    // and potentially store the preference in localStorage or cookies
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary-foreground">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">
            {LANGUAGES.find((lang) => lang.code === currentLanguage)?.name.split(" ")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? "bg-muted" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

