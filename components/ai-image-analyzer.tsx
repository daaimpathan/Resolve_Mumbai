"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ImageIcon, CheckCircle, XCircle } from "lucide-react"
import { analyzeIssueImage } from "@/lib/ai-service"

interface AIImageAnalyzerProps {
  imageUrl: string
  issueCategory: string
  onAnalysisComplete?: (result: { verified: boolean; confidence: number; details: string }) => void
}

export default function AIImageAnalyzer({ imageUrl, issueCategory, onAnalysisComplete }: AIImageAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    verified: boolean
    confidence: number
    details: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!imageUrl) {
      setError("No image available for analysis")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const analysisResult = await analyzeIssueImage(imageUrl, issueCategory)
      setResult(analysisResult)

      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult)
      }
    } catch (err) {
      console.error("Error during image analysis:", err)
      setError("An error occurred during image analysis. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Format confidence as percentage
  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          AI Image Analysis
        </CardTitle>
        <CardDescription>Verify if the image shows evidence of the reported issue</CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-4 rounded-md overflow-hidden border">
            <img src={imageUrl || "/placeholder.svg"} alt="Issue image" className="w-full h-auto object-cover" />
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
        )}

        {result && (
          <div className="space-y-3 mt-2 p-4 bg-muted rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Image Verification:</span>
              <Badge
                variant="outline"
                className={result.verified ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
              >
                {result.verified ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    Not Verified
                  </span>
                )}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Confidence:</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {formatConfidence(result.confidence)}
              </Badge>
            </div>

            <div>
              <span className="text-sm font-medium block mb-1">Analysis:</span>
              <p className="text-xs text-muted-foreground">{result.details}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalyze} disabled={isAnalyzing || !imageUrl} className="w-full">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Analyze Image
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

