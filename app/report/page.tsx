"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Camera, MapPin, Upload, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import VoiceInput from "@/components/voice-input"

const ISSUE_CATEGORIES = [
  { value: "roads", label: "Roads & Potholes" },
  { value: "water", label: "Water Supply" },
  { value: "electricity", label: "Electricity" },
  { value: "sanitation", label: "Sanitation & Garbage" },
  { value: "drainage", label: "Drainage & Flooding" },
  { value: "traffic", label: "Traffic & Transportation" },
  { value: "parks", label: "Parks & Public Spaces" },
  { value: "noise", label: "Noise Pollution" },
  { value: "street-lights", label: "Street Lighting" },
  { value: "public-transport", label: "Public Transport" },
  { value: "sidewalks", label: "Sidewalks & Footpaths" },
  { value: "encroachment", label: "Illegal Encroachment" },
  { value: "stray-animals", label: "Stray Animals" },
  { value: "public-toilets", label: "Public Toilets" },
  { value: "other", label: "Other" },
]

const ISSUE_SEVERITY = [
  { value: "low", label: "Low - Minor inconvenience" },
  { value: "medium", label: "Medium - Affects daily activities" },
  { value: "high", label: "High - Safety concern" },
  { value: "critical", label: "Critical - Immediate danger" },
]

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  severity: z.string({
    required_error: "Please select a severity level.",
  }),
  affectedPeople: z.string().optional(),
  isEmergency: z.boolean().default(false),
  hasTriedReporting: z.boolean().default(false),
  contactInfo: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  allowPublic: z.boolean().default(true),
  notifyUpdates: z.boolean().default(true),
})

export default function ReportIssuePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [isVoiceListening, setIsVoiceListening] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      severity: "",
      affectedPeople: "",
      isEmergency: false,
      hasTriedReporting: false,
      contactInfo: "",
      agreeToTerms: false,
      allowPublic: true,
      notifyUpdates: true,
    },
  })

  const handleVoiceTranscript = (text: string) => {
    form.setValue("description", text, { shouldValidate: true })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      const newImageUrls = newImages.map((file) => URL.createObjectURL(file))

      setImages((prev) => [...prev, ...newImages].slice(0, 5)) // Limit to 5 images
      setPreviewUrls((prev) => [...prev, ...newImageUrls].slice(0, 5))
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    const newPreviewUrls = [...previewUrls]

    newImages.splice(index, 1)
    newPreviewUrls.splice(index, 1)

    setImages(newImages)
    setPreviewUrls(newPreviewUrls)
  }

  const handleUseCurrentLocation = () => {
    // In a real app, this would use the browser's geolocation API
    form.setValue("location", "Bandra West, Mumbai", { shouldValidate: true })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setSubmitted(true)

      // Redirect after showing success message
      setTimeout(() => {
        router.push("/issues")
      }, 3000)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Issue reported successfully!</AlertTitle>
          <AlertDescription className="text-green-700">
            Thank you for reporting this issue. Your report has been submitted and will be reviewed by the authorities.
            You will be redirected to the issues page shortly.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Report Form</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines & Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Report a Civic Issue</CardTitle>
              <CardDescription>
                Fill out the form below to report a problem in your area. Your report will be sent to the relevant
                authorities for resolution.
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Briefly describe the issue" {...field} />
                          </FormControl>
                          <FormDescription>Keep it short and descriptive</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="p-2 text-sm font-medium text-muted-foreground">Common Issues</div>
                              {ISSUE_CATEGORIES.slice(0, 8).map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                              <div className="p-2 text-sm font-medium text-muted-foreground">Other Issues</div>
                              {ISSUE_CATEGORIES.slice(8).map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="severity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select severity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ISSUE_SEVERITY.map((severity) => (
                                <SelectItem key={severity.value} value={severity.value}>
                                  {severity.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Issue Details</h3>

                    <div className="space-y-2">
                      <Label>Input Method</Label>
                      <Tabs defaultValue="text" className="w-full">
                        <TabsList className="grid grid-cols-2 mb-4">
                          <TabsTrigger value="text">Text Input</TabsTrigger>
                          <TabsTrigger value="voice">Voice Input</TabsTrigger>
                        </TabsList>

                        <TabsContent value="text" className="space-y-4">
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Detailed Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe the issue in detail"
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Include relevant details like when you noticed the issue, its impact, etc.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        <TabsContent value="voice" className="space-y-4">
                          <div className="flex flex-col items-center py-4">
                            <VoiceInput
                              onTranscript={handleVoiceTranscript}
                              isListening={isVoiceListening}
                              setIsListening={setIsVoiceListening}
                            />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Enter the address or area" className="pl-10 w-full" {...field} />
                              </div>
                            </FormControl>
                            <Button type="button" variant="outline" onClick={handleUseCurrentLocation}>
                              <MapPin className="h-4 w-4 mr-2" />
                              Use Current
                            </Button>
                          </div>
                          <FormDescription>
                            Be as specific as possible to help authorities locate the issue
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="affectedPeople"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of People Affected (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an estimate" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="few">Few (1-10 people)</SelectItem>
                              <SelectItem value="some">Some (10-50 people)</SelectItem>
                              <SelectItem value="many">Many (50-200 people)</SelectItem>
                              <SelectItem value="large">Large community (200+ people)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>This helps prioritize issues affecting more people</FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Evidence</h3>

                    <div className="space-y-2">
                      <Label htmlFor="images">Upload Images (Optional)</Label>
                      <div className="grid grid-cols-5 gap-4 mb-4">
                        {previewUrls.length > 0 ? (
                          previewUrls.map((url, index) => (
                            <div
                              key={index}
                              className="aspect-square rounded-md bg-muted flex items-center justify-center relative overflow-hidden border"
                            >
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Uploaded image ${index + 1}`}
                                className="object-cover w-full h-full"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <AlertCircle className="h-3 w-3" />
                                <span className="sr-only">Remove image</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="aspect-square rounded-md bg-muted flex items-center justify-center col-span-5 border">
                            <Camera className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-center mt-4">
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                        >
                          <Upload className="h-4 w-4" />
                          {previewUrls.length === 0
                            ? "Upload photos of the issue"
                            : previewUrls.length >= 5
                              ? "Maximum 5 images"
                              : "Add more images"}
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={previewUrls.length >= 5}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Additional Information</h3>

                    <FormField
                      control={form.control}
                      name="isEmergency"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Emergency Situation</FormLabel>
                            <FormDescription>Mark if this issue requires immediate attention</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasTriedReporting"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I have already tried reporting this issue through other channels</FormLabel>
                            <FormDescription>
                              Check this if you've already contacted relevant authorities
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email (Optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            For authorities to contact you if they need more information
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>

                    <FormField
                      control={form.control}
                      name="allowPublic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Public Visibility</FormLabel>
                            <FormDescription>Allow your report to be visible to other citizens</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notifyUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Receive Updates</FormLabel>
                            <FormDescription>Get notified about status changes to your report</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I agree to the terms and conditions</FormLabel>
                            <FormDescription>
                              By submitting this report, you confirm that the information provided is accurate to the
                              best of your knowledge
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.push("/")}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={form.watch("isEmergency") ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : form.watch("isEmergency")
                        ? "Submit as Emergency"
                        : "Submit Report"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>Reporting Guidelines</CardTitle>
              <CardDescription>Tips to help you submit an effective issue report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">What makes a good report?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Be specific about the location (exact address, nearby landmarks)</li>
                  <li>Include clear photos showing the issue from multiple angles</li>
                  <li>Provide details about when the issue started and its impact</li>
                  <li>Mention if it's a recurring problem</li>
                  <li>Be objective and factual in your description</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">What happens after you report?</h3>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Your report is reviewed by our team</li>
                  <li>It gets assigned to the relevant department</li>
                  <li>Officials assess the issue and plan action</li>
                  <li>Updates are posted as work progresses</li>
                  <li>You can track status and add comments</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Emergency situations</h3>
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    For immediate emergencies like fires, medical emergencies, crimes in progress, or dangerous
                    structural failures, please call emergency services at 112 directly.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Before you submit</h3>
                <p className="text-muted-foreground">
                  Check if someone has already reported the same issue by searching the existing reports. This helps
                  avoid duplicates and allows you to add your vote to existing issues instead.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("form")} className="w-full">
                Return to Report Form
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

