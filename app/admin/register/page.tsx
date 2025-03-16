"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, ShieldAlert, Building, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    position: "",
    phone: "",
    reason: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.department ||
      !formData.position
    ) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to register the admin
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setSuccess(true)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
        <div className="w-full max-w-md">
          <Card className="w-full border-primary/20">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="p-2 rounded-full bg-green-100">
                  <ShieldAlert className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Request Submitted</CardTitle>
              <CardDescription className="text-center">
                Your admin access request has been submitted for review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-700">
                  Thank you for your request. Our team will review your application and contact you via email once a
                  decision has been made.
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please note that admin access is restricted to authorized personnel only. The verification process may
                  take 1-2 business days.
                </p>

                <Button asChild className="mt-4">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="w-full max-w-md">
        <Card className="w-full border-primary/20">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                <ShieldAlert className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Request Admin Access</CardTitle>
            <CardDescription className="text-center">
              Fill out this form to request administrative access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="pl-10"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                    required
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roads">Roads Department</SelectItem>
                      <SelectItem value="water">Water Supply Department</SelectItem>
                      <SelectItem value="sanitation">Sanitation Department</SelectItem>
                      <SelectItem value="electricity">Electricity Department</SelectItem>
                      <SelectItem value="it">IT Department</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position/Title *</Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="e.g. Department Manager"
                  value={formData.position}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Admin Access *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Please explain why you need administrative access..."
                  rows={3}
                  value={formData.reason}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 10 characters with uppercase, lowercase, number, and special character
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agree-terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                  required
                />
                <Label htmlFor="agree-terms" className="text-sm font-normal cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>{" "}
                  and understand that admin access is subject to approval
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting request..." : "Submit Admin Access Request"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mt-2">
              Already have an admin account?{" "}
              <Link href="/admin/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

