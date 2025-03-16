"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Clock, ThumbsUp, Share2, AlertTriangle, CheckCircle, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { predictResolutionTime, generateResponseSuggestion } from "@/lib/ai-service"

// Mock data for demonstration
const ISSUE = {
  id: 1,
  title: "Large pothole on Linking Road",
  description:
    "There's a dangerous pothole near the junction that's causing traffic and is a hazard for two-wheelers. It's approximately 2 feet wide and 8 inches deep. Several accidents have already occurred due to this. The pothole is located near the traffic signal at the intersection of Linking Road and Turner Road.",
  location: "Bandra West, Linking Road near Turner Road junction",
  category: "Roads",
  status: "In Progress",
  reportedBy: "Amit S.",
  reportedAt: "2 days ago",
  assignedTo: "Roads Department, BMC",
  assignedAt: "1 day ago",
  updatedAt: "6 hours ago",
  comments: [
    {
      id: 1,
      user: "Amit S.",
      text: "I've seen multiple two-wheelers struggle with this pothole. It's especially dangerous at night.",
      time: "2 days ago",
      isAuthor: true,
    },
    {
      id: 2,
      user: "Priya M.",
      text: "I can confirm this issue. Almost had an accident yesterday. Please fix this urgently!",
      time: "1 day ago",
      isAuthor: false,
    },
    {
      id: 3,
      user: "BMC Roads Dept",
      text: "Thank you for reporting. We have inspected the site and scheduled repairs for tomorrow.",
      time: "6 hours ago",
      isAuthor: false,
      isOfficial: true,
    },
  ],
  updates: [
    {
      id: 1,
      status: "Reported",
      time: "2 days ago",
      description: "Issue reported by citizen",
    },
    {
      id: 2,
      status: "Assigned",
      time: "1 day ago",
      description: "Assigned to Roads Department, BMC",
    },
    {
      id: 3,
      status: "In Progress",
      time: "6 hours ago",
      description: "Site inspection completed. Repairs scheduled.",
    },
  ],
  images: ["/placeholder.svg?height=400&width=600"],
  upvotes: 24,
}

// Status badge colors
const STATUS_COLORS = {
  Reported: "bg-yellow-100 text-yellow-800",
  Assigned: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-800",
}

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiPrediction, setAiPrediction] = useState<{
    estimatedDays: number
    confidence: number
  } | null>(null)
  const [aiResponseSuggestion, setAiResponseSuggestion] = useState<string | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  useEffect(() => {
    // Get AI prediction on component mount
    const getAIPrediction = async () => {
      setIsLoadingAI(true)
      try {
        const prediction = await predictResolutionTime(ISSUE.category, ISSUE.status, ISSUE.location)
        setAiPrediction(prediction)
      } catch (error) {
        console.error("Error getting AI prediction:", error)
      } finally {
        setIsLoadingAI(false)
      }
    }

    getAIPrediction()
  }, [])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setNewComment("")
      // In a real app, you would add the comment to the list
    }, 1000)
  }

  const handleGenerateResponse = async () => {
    setIsLoadingAI(true)
    try {
      const suggestion = await generateResponseSuggestion(ISSUE.description)
      setAiResponseSuggestion(suggestion)
    } catch (error) {
      console.error("Error generating response suggestion:", error)
    } finally {
      setIsLoadingAI(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Issues
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={STATUS_COLORS[ISSUE.status as keyof typeof STATUS_COLORS]}>
                {ISSUE.status}
              </Badge>
              <Badge variant="secondary">{ISSUE.category}</Badge>
            </div>
            <h1 className="text-2xl font-bold">{ISSUE.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{ISSUE.location}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>Upvote ({ISSUE.upvotes})</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{ISSUE.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {ISSUE.images.map((image, index) => (
                    <div key={index} className="rounded-md overflow-hidden border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Issue image ${index + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Reported By</h3>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={ISSUE.reportedBy} />
                    <AvatarFallback>
                      {ISSUE.reportedBy
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{ISSUE.reportedBy}</p>
                    <p className="text-xs text-muted-foreground">Reported {ISSUE.reportedAt}</p>
                  </div>
                </div>
              </div>

              {ISSUE.assignedTo && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Assigned To</h3>
                  <p className="text-sm">{ISSUE.assignedTo}</p>
                  <p className="text-xs text-muted-foreground">Assigned {ISSUE.assignedAt}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates & Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="updates">
                <TabsList className="mb-4">
                  <TabsTrigger value="updates">Status Updates</TabsTrigger>
                  <TabsTrigger value="comments">Comments ({ISSUE.comments.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="updates">
                  <div className="space-y-4">
                    {ISSUE.updates.map((update) => (
                      <div key={update.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              update.status === "Reported"
                                ? "bg-yellow-100"
                                : update.status === "Assigned"
                                  ? "bg-blue-100"
                                  : update.status === "In Progress"
                                    ? "bg-purple-100"
                                    : update.status === "Resolved"
                                      ? "bg-green-100"
                                      : "bg-gray-100"
                            }`}
                          >
                            {update.status === "Reported" ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-800" />
                            ) : update.status === "Assigned" ? (
                              <MapPin className="h-4 w-4 text-blue-800" />
                            ) : update.status === "In Progress" ? (
                              <Clock className="h-4 w-4 text-purple-800" />
                            ) : update.status === "Resolved" ? (
                              <CheckCircle className="h-4 w-4 text-green-800" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-gray-800" />
                            )}
                          </div>
                          {update.id !== ISSUE.updates.length && <div className="w-0.5 h-full bg-muted mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{update.status}</h4>
                            <span className="text-xs text-muted-foreground">{update.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comments">
                  <div className="space-y-4">
                    {ISSUE.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-4 rounded-lg ${
                          comment.isOfficial
                            ? "bg-blue-50 border border-blue-100"
                            : comment.isAuthor
                              ? "bg-muted"
                              : "bg-muted/50 border border-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=30&width=30`} alt={comment.user} />
                              <AvatarFallback>
                                {comment.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {comment.user}
                              {comment.isAuthor && (
                                <span className="text-xs ml-2 text-muted-foreground">(Reporter)</span>
                              )}
                              {comment.isOfficial && <span className="text-xs ml-2 text-blue-600">(Official)</span>}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}

                    <form onSubmit={handleSubmitComment} className="mt-6">
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                        />

                        {aiResponseSuggestion && (
                          <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-700">AI Response Suggestion</span>
                            </div>
                            <p className="text-sm text-blue-700">{aiResponseSuggestion}</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2 text-blue-700 border-blue-200 hover:bg-blue-100"
                              onClick={() => setNewComment(aiResponseSuggestion)}
                            >
                              Use This Response
                            </Button>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGenerateResponse}
                            disabled={isLoadingAI}
                            className="flex items-center gap-1"
                          >
                            <Brain className="h-4 w-4" />
                            {isLoadingAI ? "Generating..." : "Suggest Response"}
                          </Button>

                          <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
                            {isSubmitting ? "Posting..." : "Post Comment"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
              <CardDescription>Machine learning analysis for this issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingAI ? (
                <div className="flex items-center justify-center py-6">
                  <p className="text-sm text-muted-foreground">Loading AI insights...</p>
                </div>
              ) : (
                <>
                  {aiPrediction && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Estimated Resolution Time</h3>
                      <div className="p-3 bg-muted rounded-md">
                        <div className="text-2xl font-bold">{aiPrediction.estimatedDays} days</div>
                        <p className="text-xs text-muted-foreground">
                          Based on historical data for similar {ISSUE.category.toLowerCase()} issues
                          {aiPrediction.confidence > 0.7
                            ? " (High confidence)"
                            : aiPrediction.confidence > 0.4
                              ? " (Medium confidence)"
                              : " (Low confidence)"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium mb-2">Similar Issues Nearby</h3>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">3 similar {ISSUE.category.toLowerCase()} issues reported within 1km</p>
                      <Button variant="link" size="sm" className="px-0 text-xs">
                        View on map
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Priority Assessment</h3>
                    <div className="p-3 bg-muted rounded-md flex items-center justify-between">
                      <span className="text-sm">Issue Priority</span>
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
                        High
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on safety risk, location, and citizen impact
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <h4 className="text-sm font-medium">Road resurfacing needed on Linking Road</h4>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      In Progress
                    </Badge>
                    <span className="text-xs text-muted-foreground">500m away</span>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-md">
                  <h4 className="text-sm font-medium">Damaged footpath near Turner Road</h4>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Reported
                    </Badge>
                    <span className="text-xs text-muted-foreground">350m away</span>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-md">
                  <h4 className="text-sm font-medium">Street light not working</h4>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Resolved
                    </Badge>
                    <span className="text-xs text-muted-foreground">200m away</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issue Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ISSUE.updates.map((update) => (
                  <div key={update.id} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        update.status === "Reported"
                          ? "bg-yellow-500"
                          : update.status === "Assigned"
                            ? "bg-blue-500"
                            : update.status === "In Progress"
                              ? "bg-purple-500"
                              : update.status === "Resolved"
                                ? "bg-green-500"
                                : "bg-gray-500"
                      }`}
                    ></div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm">{update.status}</span>
                      <span className="text-xs text-muted-foreground">{update.time}</span>
                    </div>
                  </div>
                ))}

                {aiPrediction && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 border-2 border-dotted border-green-300"></div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Estimated Resolution</span>
                      <span className="text-xs text-muted-foreground">in {aiPrediction.estimatedDays} days</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

