"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  UserPlus,
  Shield,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const USERS = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    role: "Citizen",
    status: "Active",
    issuesReported: 12,
    lastActive: "2 hours ago",
    joinedDate: "Jan 15, 2023",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya.mehta@example.com",
    role: "Citizen",
    status: "Active",
    issuesReported: 8,
    lastActive: "1 day ago",
    joinedDate: "Feb 3, 2023",
    verified: true,
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    role: "Government Official",
    department: "Roads Department",
    status: "Active",
    issuesResolved: 45,
    lastActive: "3 hours ago",
    joinedDate: "Nov 10, 2022",
    verified: true,
  },
  {
    id: 4,
    name: "Neha Patel",
    email: "neha.patel@example.com",
    role: "Citizen",
    status: "Inactive",
    issuesReported: 3,
    lastActive: "2 months ago",
    joinedDate: "Mar 22, 2023",
    verified: true,
  },
  {
    id: 5,
    name: "Vikram Thapar",
    email: "vikram.thapar@example.com",
    role: "Government Official",
    department: "Water Supply Department",
    status: "Active",
    issuesResolved: 28,
    lastActive: "5 hours ago",
    joinedDate: "Dec 5, 2022",
    verified: true,
  },
  {
    id: 6,
    name: "Sanjay Malhotra",
    email: "sanjay.malhotra@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "1 hour ago",
    joinedDate: "Oct 1, 2022",
    verified: true,
  },
  {
    id: 7,
    name: "Ananya Singh",
    email: "ananya.singh@example.com",
    role: "Citizen",
    status: "Pending",
    issuesReported: 0,
    lastActive: "Never",
    joinedDate: "May 10, 2023",
    verified: false,
  },
]

export default function ManageUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all-users")

  // Filter users based on search query and filters
  const filteredUsers = USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleEditUser = (user: any) => {
    setCurrentUser(user)
    setIsEditDialogOpen(true)
  }

  const handleSaveUser = () => {
    // In a real app, this would save the user data to the backend
    setIsEditDialogOpen(false)
    // Reset current user
    setCurrentUser(null)
  }

  const handleSendVerificationEmail = (userId: number) => {
    // In a real app, this would send a verification email
    console.log(`Sending verification email to user ${userId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/users/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="citizens">Citizens</TabsTrigger>
          <TabsTrigger value="government">Government Officials</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users of Mumbai Civic Connect</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="citizen">Citizens</SelectItem>
                      <SelectItem value="government official">Government Officials</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Activity</th>
                      <th className="text-left py-3 px-4 font-medium">Joined</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleSelectUser(user.id)}
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-1">
                                {user.name}
                                {!user.verified && (
                                  <Badge variant="outline" className="ml-2 text-amber-600 bg-amber-50">
                                    Unverified
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              user.role === "Admin"
                                ? "bg-purple-50 text-purple-700"
                                : user.role === "Government Official"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-green-50 text-green-700"
                            }
                          >
                            <div className="flex items-center gap-1">
                              {user.role === "Admin" && <ShieldAlert className="h-3 w-3 mr-1" />}
                              {user.role === "Government Official" && <Shield className="h-3 w-3 mr-1" />}
                              {user.role}
                            </div>
                          </Badge>
                          {user.department && (
                            <div className="text-xs text-muted-foreground mt-1">{user.department}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              user.status === "Active"
                                ? "outline"
                                : user.status === "Inactive"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              user.status === "Active"
                                ? "bg-green-50 text-green-700"
                                : user.status === "Inactive"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-amber-50 text-amber-700"
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="text-sm">Last active: {user.lastActive}</div>
                            {user.role === "Citizen" && (
                              <div className="text-xs text-muted-foreground">{user.issuesReported} issues reported</div>
                            )}
                            {user.role === "Government Official" && user.issuesResolved && (
                              <div className="text-xs text-muted-foreground">{user.issuesResolved} issues resolved</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">{user.joinedDate}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit user
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Change role
                                </DropdownMenuItem>
                                {!user.verified && (
                                  <DropdownMenuItem onClick={() => handleSendVerificationEmail(user.id)}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send verification email
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete user
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedUsers.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-medium">{selectedUsers.length} users selected</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Selected
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button variant="outline" size="sm">
                      <XCircle className="h-4 w-4 mr-2" />
                      Deactivate
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citizens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Citizen Users</CardTitle>
              <CardDescription>Manage citizen accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                This tab would display only citizen users with specific citizen-related actions and metrics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="government" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government Officials</CardTitle>
              <CardDescription>Manage government department accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                This tab would display only government official accounts with department-specific information.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Manage admin accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                This tab would display only administrator accounts with permission management options.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Make changes to the user account. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={currentUser.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" defaultValue={currentUser.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select defaultValue={currentUser.role.toLowerCase()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Citizen</SelectItem>
                    <SelectItem value="government official">Government Official</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={currentUser.status.toLowerCase()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

