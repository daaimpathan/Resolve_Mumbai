"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  initialRating?: number
  totalStars?: number
  size?: "sm" | "md" | "lg"
  onChange?: (rating: number) => void
  readOnly?: boolean
}

export default function StarRating({
  initialRating = 0,
  totalStars = 5,
  size = "md",
  onChange,
  readOnly = false,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (index: number) => {
    if (readOnly) return

    const newRating = index + 1
    setRating(newRating)
    if (onChange) {
      onChange(newRating)
    }
  }

  const starSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size]

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const isActive = (hoverRating || rating) > index

        return (
          <button
            key={index}
            type="button"
            className={`${
              isActive ? "text-yellow-400" : "text-gray-300"
            } ${!readOnly && "hover:scale-110"} transition-all duration-100`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHoverRating(index + 1)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            disabled={readOnly}
          >
            <Star className={`${starSize} ${isActive ? "fill-current" : "fill-none"}`} />
            <span className="sr-only">{index + 1} stars</span>
          </button>
        )
      })}
    </div>
  )
}

