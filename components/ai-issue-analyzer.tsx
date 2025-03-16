"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Brain, AlertTriangle } from "lucide-react"
import { classifyIssueCategory, assessIssueSeverity } from "@/lib/ai-service"

interface AIIssueAnalyzerProps {
  onAnalysisComplete: (category: string, severity: string) => void
  initialDescription?: string
}

export default function AIIssueAnalyzer({ onAnalysisComplete, initialDescription = "" }: AIIssueAnalyzerProps) {
  const [description, setDescription] = useState(initialDescription)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [category, setCategory] = useState<string | null>(null)
  const [severity, setSeverity] = useState<{
    level: string
    reasoning: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!description.trim()) {
      setError("Please provide a description of the issue")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Run AI analysis in parallel
      const [categoryResult, severityResult] = await Promise.all([
        classifyIssueCategory(description),
        assessIssueSeverity(description),
      ])

      setCategory(categoryResult)
      setSeverity({
        level: severityResult.severity,
        reasoning: severityResult.reasoning,
      })

      // Pass results to parent component
      onAnalysisComplete(categoryResult, severityResult.severity)
    } catch (err) {
      console.error("Error during AI analysis:", err)
      setError("An error occurred during analysis. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Map severity to color
  const getSeverityColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Issue Analyzer
        </CardTitle>
        <CardDescription>Let AI help analyze and categorize your issue description</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe the civic issue in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mb-4"
        />

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {(category || severity) && (
          <div className="space-y-4 mt-4 p-4 bg-muted rounded-md">
            <h4 className="text-sm font-medium">AI Analysis Results:</h4>

            {category && (
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Suggested Category:</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {category}
                </Badge>
              </div>
            )}

            {severity && (
              <div>
                <span className="text-xs text-muted-foreground block mb-1">Severity Assessment:</span>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className={getSeverityColor(severity.level)}>
                    {severity.level}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{severity.reasoning}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalyze} disabled={isAnalyzing || !description.trim()} className="w-full">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Analyze with AI
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

