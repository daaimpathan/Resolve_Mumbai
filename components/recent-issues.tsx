"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, MessageSquare, ThumbsUp, ThumbsDown, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock data for demonstration
const RECENT_ISSUES = [
  {
    id: 1,
    title: "Large pothole on Linking Road",
    description:
      "There's a dangerous pothole near the junction that's causing traffic and is a hazard for two-wheelers.",
    location: "Bandra West, Linking Road",
    category: "Roads",
    status: "In Progress",
    reportedBy: "Amit S.",
    reportedAt: "2 days ago",
    comments: 8,
    upvotes: 24,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Irregular garbage collection",
    description: "Garbage hasn't been collected for the past 3 days in our area, causing hygiene issues.",
    location: "Andheri East, Marol",
    category: "Sanitation",
    status: "Reported",
    reportedBy: "Priya M.",
    reportedAt: "1 day ago",
    comments: 5,
    upvotes: 18,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Water supply disruption",
    description: "No water supply since yesterday morning. Multiple buildings in the area are affected.",
    location: "Dadar West, Shivaji Park",
    category: "Water Supply",
    status: "Assigned",
    reportedBy: "Rahul K.",
    reportedAt: "12 hours ago",
    comments: 12,
    upvotes: 32,
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Status badge colors
const STATUS_COLORS = {
  Reported: "bg-yellow-100 text-yellow-800",
  Assigned: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-800",
}

// Category icons
const CATEGORY_ICONS = {
  Roads: <MapPin className="h-4 w-4" />,
  Sanitation: <MessageSquare className="h-4 w-4" />,
  "Water Supply": <Clock className="h-4 w-4" />,
}

export default function RecentIssues() {
  // State to track user feedback
  const [feedback, setFeedback] = useState<Record<number, "up" | "down" | null>>({})

  const handleFeedback = (issueId: number, type: "up" | "down") => {
    setFeedback((prev) => {
      // If user already gave this feedback, remove it (toggle off)
      if (prev[issueId] === type) {
        const newFeedback = { ...prev }
        delete newFeedback[issueId]
        return newFeedback
      }
      // Otherwise set the new feedback
      return { ...prev, [issueId]: type }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {RECENT_ISSUES.map((issue) => (
        <Card key={issue.id} className="overflow-hidden hover:shadow-md transition-shadow">
          {issue.image && (
            <div className="h-48 overflow-hidden">
              <img
                src={issue.image || "/placeholder.svg"}
                alt={issue.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
          )}
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className={STATUS_COLORS[issue.status as keyof typeof STATUS_COLORS]}>
                {issue.status}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                {CATEGORY_ICONS[issue.category as keyof typeof CATEGORY_ICONS] || <MapPin className="h-3 w-3" />}
                {issue.category}
              </Badge>
            </div>
            <CardTitle className="mt-2 text-lg">
              <Link href={`/issues/${issue.id}`} className="hover:underline hover:text-primary transition-colors">
                {issue.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{issue.description}</p>
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{issue.location}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Reported {issue.reportedAt}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-3 border-t flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={`/placeholder.svg?height=30&width=30`} alt={issue.reportedBy} />
                <AvatarFallback>
                  {issue.reportedBy
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{issue.reportedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-auto ${feedback[issue.id] === "up" ? "text-green-600" : ""}`}
                onClick={() => handleFeedback(issue.id, "up")}
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="ml-1 text-xs">{issue.upvotes + (feedback[issue.id] === "up" ? 1 : 0)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-auto ${feedback[issue.id] === "down" ? "text-red-600" : ""}`}
                onClick={() => handleFeedback(issue.id, "down")}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

