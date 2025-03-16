"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  ThumbsUp,
  MessageSquare,
  Filter,
  ArrowRight,
  AlertTriangle,
  Check,
  Loader2,
  Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for demonstration
const SIMILAR_ISSUES = [
  {
    id: 1,
    title: "Large pothole on Linking Road near Turner Road junction",
    description:
      "There's a dangerous pothole near the junction that's causing traffic and is a hazard for two-wheelers.",
    location: "Bandra West, Linking Road",
    category: "Roads & Potholes",
    status: "In Progress",
    reportedBy: "Amit S.",
    reportedAt: "2 days ago",
    upvotes: 24,
    comments: 8,
    distance: "0.2 km away",
  },
  {
    id: 2,
    title: "Multiple potholes on Linking Road causing traffic jams",
    description: "Several potholes have appeared after recent rains, causing traffic congestion during peak hours.",
    location: "Bandra West, Linking Road near Elco Market",
    category: "Roads & Potholes",
    status: "Reported",
    reportedBy: "Priya M.",
    reportedAt: "1 day ago",
    upvotes: 18,
    comments: 5,
    distance: "0.5 km away",
  },
  {
    id: 3,
    title: "Damaged road surface on Linking Road",
    description: "The road surface is damaged and uneven, causing problems for vehicles.",
    location: "Bandra West, Linking Road near Shoppers Stop",
    category: "Roads & Potholes",
    status: "Assigned",
    reportedBy: "Rahul K.",
    reportedAt: "3 days ago",
    upvotes: 12,
    comments: 3,
    distance: "0.8 km away",
  },
  {
    id: 4,
    title: "Water logging due to blocked drain on Linking Road",
    description: "Water accumulates on the road after rain due to blocked drainage, causing traffic issues.",
    location: "Bandra West, Linking Road",
    category: "Drainage & Flooding",
    status: "In Progress",
    reportedBy: "Neha P.",
    reportedAt: "4 days ago",
    upvotes: 15,
    comments: 6,
    distance: "0.3 km away",
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

export default function VoteOnIssuesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationInput, setLocationInput] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("list")
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [votedIssues, setVotedIssues] = useState<number[]>([])

  // Filter issues based on search query and filters
  const filteredIssues = SIMILAR_ISSUES.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      categoryFilter === "all" || issue.category.toLowerCase().includes(categoryFilter.toLowerCase())

    return matchesSearch && matchesCategory
  })

  const handleSearch = () => {
    setIsSearching(true)

    // In a real app, this would call an API to search for issues
    setTimeout(() => {
      setIsSearching(false)
    }, 1000)
  }

  const handleUseCurrentLocation = () => {
    // In a real app, this would use the browser's geolocation API
    setLocationInput("Bandra West, Mumbai")
  }

  const handleVoteOnIssue = (issueId: number) => {
    setSelectedIssue(issueId)
  }

  const handleSubmitVote = () => {
    if (!selectedIssue) return

    setIsSubmitting(true)

    // In a real app, this would call an API to submit the vote
    setTimeout(() => {
      setIsSubmitting(false)
      setVotedIssues([...votedIssues, selectedIssue])
      setShowSuccess(true)
      setComment("")

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Find & Vote on Similar Issues</h1>
          <p className="text-muted-foreground">
            Search for existing issues similar to yours and add your vote instead of creating duplicates
          </p>
        </div>
        <Button asChild>
          <Link href="/report">
            Report New Issue <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Vote submitted successfully!</AlertTitle>
          <AlertDescription className="text-green-700">
            Thank you for your contribution. Your vote helps prioritize this issue.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Issues</CardTitle>
          <CardDescription>Enter keywords, location, or select a category to find similar issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by keywords..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter location..."
                className="pl-10"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={handleUseCurrentLocation}
              >
                Use Current
              </Button>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="roads">Roads & Potholes</SelectItem>
                <SelectItem value="water">Water Supply</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="sanitation">Sanitation & Garbage</SelectItem>
                <SelectItem value="drainage">Drainage & Flooding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search for Similar Issues
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="space-y-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <Card key={issue.id} className={selectedIssue === issue.id ? "border-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={STATUS_COLORS[issue.status as keyof typeof STATUS_COLORS]}
                          >
                            {issue.status}
                          </Badge>
                          <Badge variant="secondary">{issue.category}</Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {issue.distance}
                          </Badge>
                        </div>

                        <h3 className="text-lg font-medium mb-2">{issue.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>

                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{issue.location}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1 text-primary" />
                            <span>{issue.upvotes} upvotes</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{issue.comments} comments</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 justify-center items-center md:items-end">
                        <Button
                          variant={selectedIssue === issue.id ? "default" : "outline"}
                          className={votedIssues.includes(issue.id) ? "bg-green-600 hover:bg-green-700" : ""}
                          onClick={() => handleVoteOnIssue(issue.id)}
                          disabled={votedIssues.includes(issue.id)}
                        >
                          {votedIssues.includes(issue.id) ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Voted
                            </>
                          ) : (
                            <>
                              <ThumbsUp className="mr-2 h-4 w-4" />
                              {selectedIssue === issue.id ? "Selected" : "This is my issue too"}
                            </>
                          )}
                        </Button>

                        <Button variant="link" size="sm" asChild>
                          <Link href={`/issues/${issue.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>

                    {selectedIssue === issue.id && !votedIssues.includes(issue.id) && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="comment" className="text-sm font-medium">
                              Add a comment (optional)
                            </Label>
                            <Textarea
                              id="comment"
                              placeholder="Add any additional details about this issue..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="mt-1"
                            />
                          </div>

                          <div className="flex justify-end">
                            <Button onClick={handleSubmitVote} disabled={isSubmitting}>
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <ThumbsUp className="mr-2 h-4 w-4" />
                                  Confirm Vote
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No similar issues found</h3>
                <p className="text-muted-foreground mb-4">We couldn't find any issues matching your search criteria.</p>
                <Button asChild>
                  <Link href="/report">Report a New Issue</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="p-6">
              <div className="bg-muted rounded-lg overflow-hidden h-[500px] flex items-center justify-center relative">
                <Map className="h-12 w-12 text-muted-foreground mb-2" />
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Map view would display all issues geographically</p>
                  <p className="text-xs text-muted-foreground">This is a placeholder for an interactive map</p>
                </div>

                {/* Simulated issue markers */}
                <div className="absolute left-[30%] top-[40%] w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                    3
                  </div>
                </div>

                <div className="absolute left-[45%] top-[35%] w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    1
                  </div>
                </div>

                <div className="absolute left-[60%] top-[50%] w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    2
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

