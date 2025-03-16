import Link from "next/link"
import {
  ArrowRight,
  FileText,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Droplets,
  Zap,
  RouteIcon as Road,
  Clock,
  ThumbsUp,
  MessageSquare,
  Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import IssueMap from "@/components/issue-map"
import RecentIssues from "@/components/recent-issues"
import ChatbotButton from "@/components/chatbot-button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Making Mumbai Better, <span className="text-green-400">Together</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Connect with authorities to solve everyday problems in your neighborhood. Report issues, track progress,
                and see real change happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link href="/report">
                    Report an Issue <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                  asChild
                >
                  <Link href="/issues">View Issues</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-blue-100">1,234 Issues Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-blue-300" />
                  <span className="text-blue-100">98% Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border shadow-2xl h-[350px] bg-white">
              <IssueMap />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-600 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">1. Report an Issue</CardTitle>
                <CardDescription>Submit details about the civic problem you've encountered</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fill out a simple form with the location, category, and description of the issue. Add photos to help
                  authorities better understand the problem. Use voice input for convenience.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-amber-500 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-xl">2. Issue Verification</CardTitle>
                <CardDescription>Government officials review and assign the reported issue</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your report is verified and assigned to the appropriate department. You'll receive updates as the
                  status changes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-green-600 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">3. Resolution & Feedback</CardTitle>
                <CardDescription>Track progress and provide feedback on resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor the progress of your reported issue and provide feedback once it's resolved. Help improve
                  civic services in Mumbai.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Recently Reported Issues</h2>
              <p className="text-muted-foreground mt-2">Stay updated with the latest civic issues in your city</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Road className="mr-2 h-4 w-4" />
                Infrastructure
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <MapPin className="mr-2 h-4 w-4" />
                All Categories
              </Button>
            </div>
          </div>
          <RecentIssues />
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" className="shadow-sm" asChild>
              <Link href="/issues">
                View All Issues
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Common Issues in Mumbai</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Road className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Roads & Potholes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report damaged roads, potholes, and traffic infrastructure issues
                </p>
                <div className="mt-4 h-32 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Road with potholes"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Water Supply</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Address water shortages, contamination, and pipeline leakages
                </p>
                <div className="mt-4 h-32 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Water supply issues"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Megaphone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Garbage Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report missed collections, illegal dumping, and sanitation issues
                </p>
                <div className="mt-4 h-32 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Garbage collection issues"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Electricity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report power outages, faulty street lights, and electrical hazards
                </p>
                <div className="mt-4 h-32 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Electricity issues"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Join Our Community Efforts</h2>
              <p className="text-xl text-blue-100 mb-8">
                Together, we can make Mumbai a better place to live. Join thousands of citizens who are actively
                participating in improving our city.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2 flex items-center">
                    <ThumbsUp className="mr-2 h-5 w-5 text-green-400" />
                    <span>5,000+</span>
                  </h3>
                  <p className="text-blue-200">Active Citizens</p>
                </div>
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                    <span>1,200+</span>
                  </h3>
                  <p className="text-blue-200">Issues Resolved</p>
                </div>
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-green-400" />
                    <span>48 hrs</span>
                  </h3>
                  <p className="text-blue-200">Avg. Response Time</p>
                </div>
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2 flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-green-400" />
                    <span>10,000+</span>
                  </h3>
                  <p className="text-blue-200">Community Updates</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-800/30 p-8 rounded-xl border border-blue-700">
              <h3 className="text-2xl font-bold mb-6">Subscribe to Updates</h3>
              <p className="mb-6 text-blue-100">
                Get notified about civic issues in your area and stay updated on the progress of reported problems.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 rounded-md bg-blue-800/50 border border-blue-700 text-white placeholder:text-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-blue-100 mb-1">
                    Your Area
                  </label>
                  <select
                    id="area"
                    className="w-full px-4 py-2 rounded-md bg-blue-800/50 border border-blue-700 text-white"
                  >
                    <option value="">Select your area</option>
                    <option value="bandra">Bandra</option>
                    <option value="andheri">Andheri</option>
                    <option value="dadar">Dadar</option>
                    <option value="kurla">Kurla</option>
                  </select>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Subscribe Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Mumbai Civic Connect</h3>
              <p className="text-blue-200">
                A platform to bridge the gap between citizens and government authorities for a better Mumbai.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-blue-200 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-blue-200 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-200 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-blue-200 mb-4">
                Have questions or suggestions? Reach out to us at support@mumbaicivicconnect.org
              </p>
              <div className="flex items-center space-x-2 text-blue-200">
                <MapPin className="h-5 w-5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-300">
            <p>© {new Date().getFullYear()} Resolve मुंबई. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatbotButton />
    </div>
  )
}

