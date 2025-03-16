"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, AlertTriangle, Droplets, Zap, AlertCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const MOCK_ISSUES = [
  {
    id: 1,
    lat: 19.076,
    lng: 72.877,
    title: "Pothole",
    category: "Roads",
    status: "In Progress",
    severity: "High",
    reportedAt: "2 days ago",
  },
  {
    id: 2,
    lat: 19.089,
    lng: 72.869,
    title: "Garbage Collection",
    category: "Sanitation",
    status: "Reported",
    severity: "Medium",
    reportedAt: "1 day ago",
  },
  {
    id: 3,
    lat: 19.065,
    lng: 72.889,
    title: "Street Light Not Working",
    category: "Electricity",
    status: "Resolved",
    severity: "Low",
    reportedAt: "5 days ago",
  },
  {
    id: 4,
    lat: 19.082,
    lng: 72.857,
    title: "Water Leakage",
    category: "Water Supply",
    status: "Assigned",
    severity: "Medium",
    reportedAt: "3 days ago",
  },
  {
    id: 5,
    lat: 19.071,
    lng: 72.883,
    title: "Fallen Tree",
    category: "Environment",
    status: "Resolved",
    severity: "High",
    reportedAt: "1 week ago",
  },
  {
    id: 6,
    lat: 19.055,
    lng: 72.865,
    title: "Broken Sidewalk",
    category: "Roads",
    status: "Reported",
    severity: "Medium",
    reportedAt: "4 days ago",
  },
  {
    id: 7,
    lat: 19.095,
    lng: 72.885,
    title: "Sewage Overflow",
    category: "Sanitation",
    status: "In Progress",
    severity: "High",
    reportedAt: "2 days ago",
  },
]

// Status colors for map markers
const STATUS_COLORS = {
  Reported: "#f59e0b", // Amber
  Assigned: "#3b82f6", // Blue
  "In Progress": "#8b5cf6", // Purple
  Resolved: "#10b981", // Green
  Closed: "#6b7280", // Gray
}

// Category icons
const CATEGORY_ICONS = {
  Roads: <MapPin className="h-4 w-4" />,
  Sanitation: <AlertCircle className="h-4 w-4" />,
  Electricity: <Zap className="h-4 w-4" />,
  "Water Supply": <Droplets className="h-4 w-4" />,
  Environment: <AlertTriangle className="h-4 w-4" />,
}

interface IssueMapProps {
  height?: string
  interactive?: boolean
  showFilters?: boolean
}

export default function IssueMap({ height = "100%", interactive = true, showFilters = false }: IssueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
  const [mapView, setMapView] = useState<"all" | "resolved" | "unresolved">("all")
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter issues based on map view
  const filteredIssues = MOCK_ISSUES.filter((issue) => {
    if (mapView === "all") return true
    if (mapView === "resolved") return issue.status === "Resolved" || issue.status === "Closed"
    if (mapView === "unresolved") return issue.status !== "Resolved" && issue.status !== "Closed"
    return true
  })

  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      const googleMapsScript = document.createElement("script")
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      googleMapsScript.async = true
      googleMapsScript.defer = true
      googleMapsScript.onload = initializeMap
      document.head.appendChild(googleMapsScript)
    }

    // Initialize map once API is loaded
    const initializeMap = () => {
      if (!mapRef.current) return

      // Create map centered on Mumbai
      const mumbaiCenter = { lat: 19.076, lng: 72.877 }
      const mapOptions: google.maps.MapOptions = {
        center: mumbaiCenter,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }

      const newMap = new (window as any).google.maps.Map(mapRef.current, mapOptions)
      setMap(newMap)
      setMapLoaded(true)
      setIsLoading(false)
    }

    // If Google Maps API is not already loaded, load it
    if (!(window as any).google?.maps) {
      setIsLoading(true)
      loadGoogleMapsAPI()
    } else {
      initializeMap()
    }

    // Cleanup function
    return () => {
      if (markers.length) {
        markers.forEach((marker) => marker.setMap(null))
      }
    }
  }, [])

  // Add markers for issues
  useEffect(() => {
    if (!map || !mapLoaded) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))
    const newMarkers: google.maps.Marker[] = []

    // Create info window for markers
    const infoWindow = new (window as any).google.maps.InfoWindow()

    // Add markers for filtered issues
    filteredIssues.forEach((issue) => {
      // Determine if issue is resolved
      const isResolved = issue.status === "Resolved" || issue.status === "Closed"

      // Create custom marker icon
      const markerIcon = {
        path: (window as any).google.maps.SymbolPath.CIRCLE,
        fillColor: STATUS_COLORS[issue.status as keyof typeof STATUS_COLORS],
        fillOpacity: 1,
        strokeWeight: isResolved ? 2 : 0,
        strokeColor: "#ffffff",
        scale: 10,
      }

      // Create marker
      const marker = new (window as any).google.maps.Marker({
        position: { lat: issue.lat, lng: issue.lng },
        map: map,
        title: issue.title,
        icon: markerIcon,
        animation: (window as any).google.maps.Animation.DROP,
        zIndex: isResolved ? 1 : 2,
      })

      // Create info window content
      const contentString = `
        <div class="p-2">
          <h3 class="font-bold">${issue.title}</h3>
          <div class="text-sm mt-1">
            <p><strong>Category:</strong> ${issue.category}</p>
            <p><strong>Status:</strong> ${issue.status}</p>
            <p><strong>Reported:</strong> ${issue.reportedAt}</p>
          </div>
        </div>
      `

      // Add click listener to show info window
      marker.addListener("click", () => {
        infoWindow.setContent(contentString)
        infoWindow.open(map, marker)
        setSelectedIssue(issue.id)
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
  }, [map, mapLoaded, filteredIssues, mapView])

  return (
    <div className="flex flex-col h-full">
      {showFilters && (
        <div className="p-2 bg-background border-b">
          <Tabs defaultValue="all" value={mapView} onValueChange={(value) => setMapView(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Issues</TabsTrigger>
              <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      <div ref={mapRef} className="w-full flex-1 relative overflow-hidden" style={{ height: height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-primary font-medium">Loading map...</p>
            </div>
          </div>
        )}

        {/* Map legend */}
        <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-xs z-10">
          <div className="font-medium mb-1">Map Legend</div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS["Reported"] }}></div>
            <span>Reported</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS["In Progress"] }}></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: STATUS_COLORS["Resolved"] }}
            ></div>
            <span>Resolved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

