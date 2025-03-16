"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, AlertCircle, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to send a password reset email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful submission
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center">
              <Link
                href="/login"
                className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to login</span>
              </Link>
              <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            </div>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  If an account exists with the email <strong>{email}</strong>, we've sent instructions to reset your
                  password.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset instructions"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mt-2">
              Remember your password?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

