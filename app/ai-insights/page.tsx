import type { Metadata } from "next"
import AIInsightsDashboard from "@/components/ai-insights-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, MapPin, BarChart2 } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Insights | Mumbai Civic Connect",
  description: "AI-powered analytics and insights for civic issues in Mumbai",
}

export default function AIInsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI-Powered Insights
          </h1>
          <p className="text-muted-foreground">Machine learning analysis of civic issues across Mumbai</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Issue Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+28%</div>
            <p className="text-sm text-muted-foreground">Predicted increase in water-related issues next month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Top Hotspot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Kurla</div>
            <p className="text-sm text-muted-foreground">42 active issues, 18% increase this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-green-500" />
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">72%</div>
            <p className="text-sm text-muted-foreground">Issues resolved within SLA timeframe</p>
          </CardContent>
        </Card>
      </div>

      <AIInsightsDashboard />

      <div className="mt-8 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">How AI Enhances Mumbai Civic Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">For Citizens</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Automatic categorization of reported issues</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Intelligent severity assessment for better prioritization</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Image verification to confirm reported problems</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Estimated resolution times based on historical data</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">For Government Authorities</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Predictive analytics to anticipate issue hotspots</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Anomaly detection to identify unusual patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Resource allocation optimization based on predicted demand</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Brain className="h-3 w-3 text-blue-700" />
                </div>
                <span>Automated response suggestions for common issues</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

