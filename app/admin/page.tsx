"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Users, CheckCircle, AlertTriangle, BarChart2, PieChart, MapPin } from "lucide-react"
import AIInsightsDashboard from "@/components/ai-insights-dashboard"

// Mock data for demonstration
const COMPLAINTS = [
  {
    id: 1,
    title: "No wheelchair ramp at Dadar station entrance",
    location: "Dadar West, Mumbai",
    category: "Ramp Access",
    status: "In Progress",
    reportedAt: "3 days ago",
    reportedBy: "Amit S.",
    priority: "High",
    assignedTo: "BMC Accessibility Department",
  },
  {
    id: 2,
    title: "Broken tactile paving on sidewalk",
    location: "Linking Road, Bandra West",
    category: "Sidewalk Issues",
    status: "Assigned",
    reportedAt: "1 week ago",
    reportedBy: "Priya M.",
    priority: "Medium",
    assignedTo: "Roads Department",
  },
  {
    id: 3,
    title: "No accessible restroom at government office",
    location: "Collector's Office, Andheri East",
    category: "Accessible Restrooms",
    status: "Resolved",
    reportedAt: "2 weeks ago",
    reportedBy: "Rahul K.",
    priority: "High",
    assignedTo: "PWD Department",
  },
  {
    id: 4,
    title: "Traffic signal without audible alerts",
    location: "Juhu Circle, Mumbai",
    category: "Traffic Signal Accessibility",
    status: "Reported",
    reportedAt: "4 days ago",
    reportedBy: "Neha P.",
    priority: "Medium",
    assignedTo: "Traffic Department",
  },
  {
    id: 5,
    title: "Inaccessible public transport bus stop",
    location: "Andheri Station East, Mumbai",
    category: "Public Transport Accessibility",
    status: "In Progress",
    reportedAt: "5 days ago",
    reportedBy: "Vikram T.",
    priority: "High",
    assignedTo: "BEST Transport Department",
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

// Priority badge colors
const PRIORITY_COLORS = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("complaints")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Filter complaints based on search query and filters
  const filteredComplaints = COMPLAINTS.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.reportedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      categoryFilter === "all" || complaint.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority =
      priorityFilter === "all" || complaint.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage complaints and monitor accessibility initiatives</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{COMPLAINTS.length}</div>
            <p className="text-sm text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {COMPLAINTS.filter((c) => c.status !== "Resolved" && c.status !== "Closed").length}
            </div>
            <p className="text-sm text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {COMPLAINTS.filter((c) => c.priority === "High").length}
            </div>
            <p className="text-sm text-muted-foreground">Urgent issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Math.round((COMPLAINTS.filter((c) => c.status === "Resolved").length / COMPLAINTS.length) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">Issues successfully resolved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="complaints">Complaint Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Complaints</CardTitle>
              <CardDescription>View and manage all reported accessibility issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, location, or reporter..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="ramp access">Ramp Access</SelectItem>
                      <SelectItem value="sidewalk issues">Sidewalk Issues</SelectItem>
                      <SelectItem value="accessible restrooms">Accessible Restrooms</SelectItem>
                      <SelectItem value="traffic signal accessibility">Traffic Signals</SelectItem>
                      <SelectItem value="public transport accessibility">Public Transport</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="reported">Reported</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Title</th>
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Priority</th>
                      <th className="text-left py-3 px-4 font-medium">Reported</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">#{complaint.id}</td>
                        <td className="py-3 px-4">{complaint.title}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{complaint.category}</Badge>
                        </td>
                        <td className="py-3 px-4">{complaint.location}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={STATUS_COLORS[complaint.status as keyof typeof STATUS_COLORS]}
                          >
                            {complaint.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={PRIORITY_COLORS[complaint.priority as keyof typeof PRIORITY_COLORS]}
                          >
                            {complaint.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="text-sm">{complaint.reportedAt}</div>
                            <div className="text-xs text-muted-foreground">{complaint.reportedBy}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/complaints/${complaint.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Assign
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredComplaints.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No complaints found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("all")
                      setStatusFilter("all")
                      setPriorityFilter("all")
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <AIInsightsDashboard />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Complaint Categories
                  </CardTitle>
                  <CardDescription>Distribution of accessibility issues by category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">[Category Distribution Chart]</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Geographic Distribution
                  </CardTitle>
                  <CardDescription>Heatmap of reported issues across Mumbai</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">[Geographic Heatmap]</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Resolution Time Analysis
                  </CardTitle>
                  <CardDescription>Average time to resolve issues by category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">[Resolution Time Chart]</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Satisfaction Metrics
                  </CardTitle>
                  <CardDescription>Citizen feedback on issue resolution</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">[Satisfaction Metrics Chart]</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage citizens, government officials, and admin accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">User Management Module</h3>
                <p className="text-muted-foreground">
                  This section allows administrators to manage user accounts, roles, and permissions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

