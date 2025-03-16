"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  Calendar,
  Filter,
  BarChart2,
  PieChart,
  Table,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Eye,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Mock data for demonstration
const REPORT_TYPES = [
  { id: "issues-summary", name: "Issues Summary", description: "Overview of all reported issues" },
  { id: "resolution-time", name: "Resolution Time Analysis", description: "Analysis of issue resolution times" },
  { id: "user-activity", name: "User Activity", description: "User registration and engagement metrics" },
  { id: "category-distribution", name: "Category Distribution", description: "Distribution of issues by category" },
  { id: "location-heatmap", name: "Location Heatmap", description: "Geographic distribution of issues" },
  {
    id: "department-performance",
    name: "Department Performance",
    description: "Response and resolution metrics by department",
  },
]

const CATEGORIES = [
  { value: "roads", label: "Roads & Potholes" },
  { value: "water", label: "Water Supply" },
  { value: "electricity", label: "Electricity" },
  { value: "sanitation", label: "Sanitation & Garbage" },
  { value: "drainage", label: "Drainage & Flooding" },
  { value: "traffic", label: "Traffic & Transportation" },
  { value: "parks", label: "Parks & Public Spaces" },
  { value: "noise", label: "Noise Pollution" },
]

const LOCATIONS = [
  { value: "all", label: "All Mumbai" },
  { value: "andheri", label: "Andheri" },
  { value: "bandra", label: "Bandra" },
  { value: "dadar", label: "Dadar" },
  { value: "kurla", label: "Kurla" },
  { value: "powai", label: "Powai" },
  { value: "worli", label: "Worli" },
]

export default function ExportReportsPage() {
  const [activeTab, setActiveTab] = useState("generate")
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState("last-30-days")
  const [fileFormat, setFileFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeRawData, setIncludeRawData] = useState(true)

  const handleGenerateReport = () => {
    if (!selectedReportType) return

    setIsGenerating(true)

    // In a real app, this would call an API to generate the report
    setTimeout(() => {
      setIsGenerating(false)
      // Simulate download by creating a fake anchor element
      const link = document.createElement("a")
      link.href = "#"
      link.download = `${selectedReportType}-report.${fileFormat}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 2000)
  }

  const handlePreviewReport = () => {
    if (!selectedReportType) return

    setIsPreviewLoading(true)

    // In a real app, this would call an API to generate a preview
    setTimeout(() => {
      setIsPreviewLoading(false)
      setShowPreview(true)
    }, 1500)
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Export Reports</h1>
          <p className="text-muted-foreground">Generate and download reports for analysis</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Configuration</CardTitle>
                  <CardDescription>Select the type of report you want to generate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Report Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {REPORT_TYPES.map((report) => (
                        <div
                          key={report.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedReportType === report.id ? "border-primary bg-primary/5" : "hover:bg-muted"
                          }`}
                          onClick={() => setSelectedReportType(report.id)}
                        >
                          <div className="flex items-start gap-2">
                            {report.id === "issues-summary" && <FileText className="h-5 w-5 text-primary" />}
                            {report.id === "resolution-time" && <Calendar className="h-5 w-5 text-primary" />}
                            {report.id === "user-activity" && <BarChart2 className="h-5 w-5 text-primary" />}
                            {report.id === "category-distribution" && <PieChart className="h-5 w-5 text-primary" />}
                            {report.id === "location-heatmap" && <Filter className="h-5 w-5 text-primary" />}
                            {report.id === "department-performance" && <Table className="h-5 w-5 text-primary" />}
                            <div>
                              <h3 className="font-medium">{report.name}</h3>
                              <p className="text-sm text-muted-foreground">{report.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Date Range</Label>
                    <RadioGroup defaultValue="last-30-days" value={dateRange} onValueChange={setDateRange}>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="last-7-days" id="last-7-days" />
                          <Label htmlFor="last-7-days">Last 7 days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="last-30-days" id="last-30-days" />
                          <Label htmlFor="last-30-days">Last 30 days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="last-90-days" id="last-90-days" />
                          <Label htmlFor="last-90-days">Last 90 days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom">Custom date range</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Filters</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm mb-2 block">Categories</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              {selectedCategories.length > 0
                                ? `${selectedCategories.length} selected`
                                : "Select categories"}
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search categories..." />
                              <CommandList>
                                <CommandEmpty>No categories found.</CommandEmpty>
                                <CommandGroup>
                                  {CATEGORIES.map((category) => (
                                    <CommandItem key={category.value} onSelect={() => toggleCategory(category.value)}>
                                      <div className="flex items-center gap-2">
                                        <Checkbox
                                          checked={selectedCategories.includes(category.value)}
                                          onCheckedChange={() => toggleCategory(category.value)}
                                        />
                                        {category.label}
                                      </div>
                                      {selectedCategories.includes(category.value) && (
                                        <Check className="ml-auto h-4 w-4" />
                                      )}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {LOCATIONS.map((location) => (
                              <SelectItem key={location.value} value={location.value}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Report Content</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="include-charts"
                          checked={includeCharts}
                          onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                        />
                        <Label htmlFor="include-charts">Include charts and visualizations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="include-raw-data"
                          checked={includeRawData}
                          onCheckedChange={(checked) => setIncludeRawData(!!checked)}
                        />
                        <Label htmlFor="include-raw-data">Include raw data tables</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>File Format</Label>
                    <RadioGroup defaultValue="pdf" value={fileFormat} onValueChange={setFileFormat}>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pdf" id="pdf" />
                          <Label htmlFor="pdf" className="flex items-center gap-2">
                            <FilePdf className="h-4 w-4 text-red-500" />
                            PDF Document
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="xlsx" id="xlsx" />
                          <Label htmlFor="xlsx" className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-green-600" />
                            Excel Spreadsheet
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="csv" id="csv" />
                          <Label htmlFor="csv" className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            CSV File
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePreviewReport}
                    disabled={!selectedReportType || isPreviewLoading}
                  >
                    {isPreviewLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading preview...
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview Report
                      </>
                    )}
                  </Button>
                  <Button onClick={handleGenerateReport} disabled={!selectedReportType || isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Generate & Download
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Report Summary</CardTitle>
                  <CardDescription>Your current report configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Report Type</h3>
                    <p className="font-medium">
                      {selectedReportType
                        ? REPORT_TYPES.find((r) => r.id === selectedReportType)?.name
                        : "Not selected"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date Range</h3>
                    <p className="font-medium">
                      {dateRange === "last-7-days" && "Last 7 days"}
                      {dateRange === "last-30-days" && "Last 30 days"}
                      {dateRange === "last-90-days" && "Last 90 days"}
                      {dateRange === "custom" && "Custom date range"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCategories.length > 0 ? (
                        selectedCategories.map((cat) => (
                          <Badge key={cat} variant="outline">
                            {CATEGORIES.find((c) => c.value === cat)?.label}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">All categories</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                    <p className="font-medium">{LOCATIONS.find((l) => l.value === selectedLocation)?.label}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">File Format</h3>
                    <p className="font-medium flex items-center gap-2">
                      {fileFormat === "pdf" && <FilePdf className="h-4 w-4 text-red-500" />}
                      {fileFormat === "xlsx" && <FileSpreadsheet className="h-4 w-4 text-green-600" />}
                      {fileFormat === "csv" && <FileText className="h-4 w-4 text-blue-500" />}
                      {fileFormat.toUpperCase()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {showPreview && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Report Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[300px]">
                      <p className="text-center text-muted-foreground">
                        Preview would be displayed here in a real application
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Set up automated report generation and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                This section would allow setting up recurring reports to be generated and emailed automatically.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>View and download previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-12 text-muted-foreground">
                This section would display a history of all reports generated, with options to download or share them.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

