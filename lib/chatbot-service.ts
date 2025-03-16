// Chatbot service to handle message processing and responses
export class ChatbotService {
  private intents: Record<string, (params?: any) => string>

  constructor() {
    this.intents = {
      raise_query: this.raiseQuery,
      track_query: this.trackQuery,
      fill_report_form: this.fillReportForm,
      generate_link: this.generateLink,
      ai_insights: this.aiInsights,
      latest_issues: this.latestIssues,
      greeting: this.greeting,
      help: this.help,
    }
  }

  public handleMessage(message: string): string {
    const intent = this.detectIntent(message.toLowerCase())

    if (intent === "generate_link") {
      const pageName = this.extractPageName(message)
      return this.generateLink(pageName)
    } else if (intent === "ai_insights") {
      return this.aiInsights(message)
    } else if (intent in this.intents) {
      return this.intents[intent]()
    } else {
      return "I'm sorry, I didn't understand that. Would you like to raise a query, track an existing query, or fill a report form?"
    }
  }

  private raiseQuery(): string {
    return "I can help you raise a new query. Please provide the following details:\n\n1. Issue type (e.g., water, electricity, roads)\n2. Location\n3. Brief description of the problem\n\nOr I can help you fill the report form directly. Would you like to do that?"
  }

  private trackQuery(): string {
    return "To track your existing query, please provide your query ID (e.g., MCC-2023-12345). If you don't have it, I can help you find it with your registered email address."
  }

  private fillReportForm(): string {
    return "I can help you fill the report form. Let's start with the basic information:\n\n1. What type of issue are you reporting? (e.g., pothole, water supply, electricity)\n2. Where is this issue located?\n3. How severe is the issue?\n\nYou can also visit the report page directly: https://mumbai-civic-connect.vercel.app/report"
  }

  private generateLink(pageName: string): string {
    const links: Record<string, string> = {
      home: "https://mumbai-civic-connect.vercel.app/",
      about: "https://mumbai-civic-connect.vercel.app/about",
      report: "https://mumbai-civic-connect.vercel.app/report",
      issues: "https://mumbai-civic-connect.vercel.app/issues",
      dashboard: "https://mumbai-civic-connect.vercel.app/dashboard",
      login: "https://mumbai-civic-connect.vercel.app/login",
      register: "https://mumbai-civic-connect.vercel.app/register",
      admin: "https://mumbai-civic-connect.vercel.app/admin",
      vote: "https://mumbai-civic-connect.vercel.app/issues/vote",
      "ai insights": "https://mumbai-civic-connect.vercel.app/ai-insights",
    }

    return links[pageName]
      ? `Here's the link to the ${pageName} page: ${links[pageName]}`
      : `I couldn't find a link for "${pageName}". Available pages are: home, about, report, issues, dashboard, login, register, admin, vote, and ai insights.`
  }

  private aiInsights(query: string): string {
    // In a real implementation, this would call an AI service
    const insights = {
      water: "Water-related issues have increased by 15% in the last month, primarily in Andheri and Bandra areas.",
      electricity:
        "Power outages have decreased by 20% since last quarter. Most reports now come from older neighborhoods.",
      roads:
        "Road and pothole complaints peak during monsoon season. Bandra West currently has the highest number of active road issues.",
      garbage:
        "Garbage collection issues are most reported on Mondays and Tuesdays, with Kurla having the highest concentration.",
      drainage:
        "Drainage problems are predicted to increase by 30% in the coming monsoon season based on historical data.",
    }

    for (const [key, value] of Object.entries(insights)) {
      if (query.includes(key)) {
        return `AI Insights: ${value}`
      }
    }

    return "I can provide AI insights on water, electricity, roads, garbage, and drainage issues. Please specify which area you're interested in."
  }

  private latestIssues(): string {
    // In a real implementation, this would fetch from an API
    return "The latest issues reported in Mumbai are:\n\n1. Water supply disruption in Dadar West (2 hours ago)\n2. Multiple potholes on Linking Road, Bandra (5 hours ago)\n3. Street light malfunction in Andheri East (yesterday)\n4. Garbage collection missed in Kurla West (yesterday)\n5. Drainage blockage causing waterlogging in Sion (2 days ago)"
  }

  private greeting(): string {
    return "Hello! I'm your Mumbai Civic Connect assistant. How can I help you today? You can ask me to:\n\n• Raise a new query\n• Track an existing query\n• Fill a report form\n• Get a link to a specific page\n• Provide AI insights on civic issues\n• Show the latest reported issues"
  }

  private help(): string {
    return "I can help you with the following:\n\n• Raise a new query about civic issues\n• Track the status of your existing queries\n• Fill the report form to submit a new issue\n• Generate links to specific pages\n• Provide AI insights on civic issues\n• Show the latest reported issues\n\nWhat would you like to do?"
  }

  private detectIntent(message: string): string {
    if (message.includes("hello") || message.includes("hi ") || message.includes("hey")) {
      return "greeting"
    } else if (message.includes("help") || message.includes("what can you do")) {
      return "help"
    } else if (
      message.includes("raise") ||
      message.includes("new query") ||
      message.includes("new issue") ||
      message.includes("report problem")
    ) {
      return "raise_query"
    } else if (
      message.includes("track") ||
      message.includes("status") ||
      message.includes("existing") ||
      message.includes("follow up")
    ) {
      return "track_query"
    } else if (message.includes("fill") || message.includes("form") || message.includes("submit report")) {
      return "fill_report_form"
    } else if (
      message.includes("link") ||
      message.includes("page") ||
      message.includes("website") ||
      message.includes("url")
    ) {
      return "generate_link"
    } else if (
      message.includes("insight") ||
      message.includes("analytics") ||
      message.includes("statistics") ||
      message.includes("data")
    ) {
      return "ai_insights"
    } else if (message.includes("latest") || message.includes("recent") || message.includes("new issues")) {
      return "latest_issues"
    }

    return "unknown"
  }

  private extractPageName(message: string): string {
    const pageKeywords = [
      "home",
      "about",
      "report",
      "issues",
      "dashboard",
      "login",
      "register",
      "admin",
      "vote",
      "ai insights",
    ]

    for (const page of pageKeywords) {
      if (message.includes(page)) {
        return page
      }
    }

    return "home" // Default to home if no page is found
  }
}

// Create a singleton instance
export const chatbotService = new ChatbotService()

