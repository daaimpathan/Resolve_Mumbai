"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, FileText, Clock, AlertTriangle, MapPin, ChevronRight, Calendar } from "lucide-react"

// Mock data for demonstration
const USER_COMPLAINTS = [
  {
    id: 1,
    title: "Large pothole on Linking Road",
    location: "Bandra West, Mumbai",
    category: "Roads & Potholes",
    status: "In Progress",
    reportedAt: "3 days ago",
    updatedAt: "1 day ago",
    assignedTo: "BMC Roads Department",
  },
  {
    id: 2,
    title: "Irregular garbage collection",
    location: "Andheri East, Marol",
    category: "Sanitation & Garbage",
    status: "Assigned",
    reportedAt: "1 week ago",
    updatedAt: "2 days ago",
    assignedTo: "Solid Waste Management Department",
  },
  {
    id: 3,
    title: "Street light not working",
    location: "Malad West, Marve Road",
    category: "Street Lighting",
    status: "Resolved",
    reportedAt: "2 weeks ago",
    updatedAt: "3 days ago",
    assignedTo: "Electricity Department",
  },
]

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Complaint status updated",
    description: "Your complaint #1 status changed to 'In Progress'",
    time: "1 day ago",
    read: false,
  },
  {
    id: 2,
    title: "Official response",
    description: "BMC Roads Department has responded to your complaint",
    time: "2 days ago",
    read: true,
  },
  {
    id: 3,
    title: "New civic initiative",
    description: "Mumbai launches new program for improving road infrastructure",
    time: "1 week ago",
    read: true,
  },
]

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Community Cleanliness Drive",
    date: "June 15, 2023",
    location: "Juhu Beach, Mumbai",
    description: "Join fellow citizens in cleaning up Juhu Beach",
  },
  {
    id: 2,
    title: "Public Consultation on Traffic Management",
    date: "June 22, 2023",
    location: "Municipal Corporation Hall, Mumbai",
    description: "Share your inputs on improving traffic flow in the city",
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

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState("complaints")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredComplaints = USER_COMPLAINTS.filter(
    (complaint) => filterStatus === "all" || complaint.status.toLowerCase() === filterStatus.toLowerCase(),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">Manage your complaints and track their progress</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/report">
              <FileText className="mr-2 h-4 w-4" />
              Report New Issue
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{USER_COMPLAINTS.length}</div>
            <p className="text-sm text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{USER_COMPLAINTS.filter((c) => c.status === "In Progress").length}</div>
            <p className="text-sm text-muted-foreground">Being addressed by authorities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{USER_COMPLAINTS.filter((c) => c.status === "Resolved").length}</div>
            <p className="text-sm text-muted-foreground">Successfully addressed issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{NOTIFICATIONS.filter((n) => !n.read).length}</div>
            <p className="text-sm text-muted-foreground">Unread updates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="complaints">My Complaints</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="events">Community Events</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Reported Issues</h2>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <select
                className="text-sm border rounded-md px-2 py-1"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="reported">Reported</option>
                <option value="assigned">Assigned</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {filteredComplaints.length > 0 ? (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <Card key={complaint.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={STATUS_COLORS[complaint.status as keyof typeof STATUS_COLORS]}
                          >
                            {complaint.status}
                          </Badge>
                          <Badge variant="secondary">{complaint.category}</Badge>
                        </div>
                        <h3 className="font-medium">{complaint.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{complaint.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center justify-between md:justify-end">
                          <span className="text-muted-foreground md:mr-2">Reported:</span>
                          <span>{complaint.reportedAt}</span>
                        </div>
                        <div className="flex items-center justify-between md:justify-end">
                          <span className="text-muted-foreground md:mr-2">Updated:</span>
                          <span>{complaint.updatedAt}</span>
                        </div>
                        <div className="flex items-center justify-between md:justify-end">
                          <span className="text-muted-foreground md:mr-2">Assigned to:</span>
                          <span>{complaint.assignedTo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/issues/${complaint.id}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No complaints found</h3>
              <p className="text-muted-foreground">
                {filterStatus === "all"
                  ? "You haven't reported any issues yet."
                  : `You don't have any complaints with status "${filterStatus}".`}
              </p>
              <Button className="mt-4" asChild>
                <Link href="/report">Report an Issue</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Updates about your complaints and civic initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {NOTIFICATIONS.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${notification.read ? "bg-background" : "bg-muted"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 rounded-full p-1 ${notification.read ? "bg-muted" : "bg-primary/10"}`}>
                        <Bell className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-primary"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm font-medium ${notification.read ? "" : "text-primary"}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Community Events</CardTitle>
              <CardDescription>Workshops, clean-up drives, and community events in Mumbai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {UPCOMING_EVENTS.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-2 bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium">{event.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-sm mt-2">{event.description}</p>
                        <div className="mt-3">
                          <Button variant="outline" size="sm">
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

