"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, AlertCircle, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to authenticate the admin
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful login
      router.push("/admin")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="w-full max-w-md">
        <Card className="w-full border-purple-200 bg-purple-50/30">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-full bg-purple-100">
                <ShieldAlert className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-purple-900">Administrator Login</CardTitle>
            <CardDescription className="text-center">
              Secure access for Mumbai Civic Connect administrators
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
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
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
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <Label htmlFor="remember-me" className="text-sm font-normal cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login to Admin Panel"}
              </Button>
            </form>
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-700">
                  This is a restricted area for authorized administrators only. Unauthorized access attempts are
                  monitored and logged.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mt-2">
              Need an admin account?{" "}
              <Link href="/admin/register" className="text-purple-600 hover:underline">
                Request access
              </Link>
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <Link href="/login" className="text-purple-600 hover:underline">
                Return to citizen login
              </Link>
            </p>
            <Link href="/" className="text-sm text-muted-foreground mt-2 hover:underline">
              Return to main site
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

