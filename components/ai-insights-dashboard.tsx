"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { TrendingUp, AlertTriangle, MapPin, Clock, BarChartIcon, LineChartIcon } from "lucide-react"

// Mock data for demonstration
const CATEGORY_DATA = [
  { name: "Roads", count: 42, color: "#3b82f6" },
  { name: "Water Supply", count: 28, color: "#06b6d4" },
  { name: "Electricity", count: 19, color: "#f59e0b" },
  { name: "Sanitation", count: 35, color: "#10b981" },
  { name: "Drainage", count: 23, color: "#8b5cf6" },
  { name: "Traffic", count: 17, color: "#ef4444" },
  { name: "Parks", count: 12, color: "#84cc16" },
  { name: "Noise", count: 8, color: "#f97316" },
]

const TREND_DATA = [
  { month: "Jan", issues: 65 },
  { month: "Feb", issues: 59 },
  { month: "Mar", issues: 80 },
  { month: "Apr", issues: 81 },
  { month: "May", issues: 56 },
  { month: "Jun", issues: 55 },
  { month: "Jul", issues: 40 },
  { month: "Aug", issues: 70 },
  { month: "Sep", issues: 90 },
  { month: "Oct", issues: 75 },
  { month: "Nov", issues: 60 },
  { month: "Dec", issues: 45 },
]

const RESOLUTION_DATA = [
  { name: "< 3 days", count: 120, color: "#10b981" },
  { name: "3-7 days", count: 85, color: "#f59e0b" },
  { name: "7-14 days", count: 45, color: "#f97316" },
  { name: "14+ days", count: 25, color: "#ef4444" },
]

const HOTSPOT_DATA = [
  { area: "Bandra West", issues: 42, change: "+12%" },
  { area: "Andheri East", issues: 38, change: "+5%" },
  { area: "Dadar", issues: 35, change: "-3%" },
  { area: "Kurla", issues: 32, change: "+18%" },
  { area: "Powai", issues: 28, change: "+7%" },
]

const PREDICTION_DATA = [
  { month: "Jan", actual: 65, predicted: 62 },
  { month: "Feb", actual: 59, predicted: 60 },
  { month: "Mar", actual: 80, predicted: 75 },
  { month: "Apr", actual: 81, predicted: 78 },
  { month: "May", actual: 56, predicted: 60 },
  { month: "Jun", actual: 55, predicted: 58 },
  { month: "Jul", actual: 40, predicted: 45 },
  { month: "Aug", actual: 70, predicted: 65 },
  { month: "Sep", actual: null, predicted: 85 },
  { month: "Oct", actual: null, predicted: 70 },
  { month: "Nov", actual: null, predicted: 65 },
  { month: "Dec", actual: null, predicted: 50 },
]

export default function AIInsightsDashboard() {
  const [activeTab, setActiveTab] = useState("trends")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          AI-Powered Insights
        </CardTitle>
        <CardDescription>Machine learning analysis of civic issues across Mumbai</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="trends" className="flex items-center gap-1">
              <BarChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="hotspots" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Hotspots</span>
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Predictions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Issue Categories Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CATEGORY_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Number of Issues">
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Monthly Issue Trends</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREND_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="issues"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      name="Reported Issues"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Resolution Time Analysis</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RESOLUTION_DATA}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {RESOLUTION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hotspots">
            <div>
              <h3 className="text-sm font-medium mb-3">Issue Hotspots in Mumbai</h3>
              <div className="space-y-3">
                {HOTSPOT_DATA.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{index + 1}.</span>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{area.area}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {area.issues} issues
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          area.change.startsWith("+") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                        }
                      >
                        {area.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Anomaly Detected</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    Unusual increase in drainage issues in Kurla area (+18%). Potential infrastructure problem detected.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions">
            <div>
              <h3 className="text-sm font-medium mb-3">Issue Volume Prediction (Next 4 Months)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PREDICTION_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                      name="Actual Issues"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      name="Predicted Issues"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Seasonal Prediction
                  </h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Based on historical patterns, we predict a 35% increase in drainage and flooding issues during the
                    upcoming monsoon season (June-September).
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <h4 className="text-sm font-medium text-green-800 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Maintenance Recommendation
                  </h4>
                  <p className="text-xs text-green-700 mt-1">
                    Preventive maintenance of drainage systems in Kurla and Andheri East is recommended before May to
                    avoid potential flooding issues during monsoon.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

