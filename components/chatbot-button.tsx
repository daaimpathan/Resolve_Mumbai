"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MessageCircle, Send, Mic, X, Bot } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { chatbotService } from "@/lib/chatbot-service"

interface Message {
  role: "bot" | "user"
  content: string
  timestamp: Date
}

export default function ChatbotButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! I'm your Mumbai Civic Connect assistant. How can I help you today? You can ask me to:\n\n• Raise a new query\n• Track an existing query\n• Fill a report form\n• Get a link to a specific page\n• Provide AI insights on civic issues\n• Show the latest reported issues",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Process the message and get a response
    setTimeout(() => {
      const botResponse = chatbotService.handleMessage(userMessage.content)

      // Handle navigation commands
      if (botResponse.includes("https://mumbai-civic-connect.vercel.app/")) {
        const url = botResponse.match(/https:\/\/mumbai-civic-connect\.vercel\.app\/[a-z-]*/)?.[0]
        if (url) {
          const path = url.replace("https://mumbai-civic-connect.vercel.app", "")
          if (path && path !== "/") {
            // Add a note about navigation
            setMessages((prev) => [
              ...prev,
              {
                role: "bot",
                content: botResponse,
                timestamp: new Date(),
              },
            ])

            // Navigate after a short delay
            setTimeout(() => {
              router.push(path)
              setIsOpen(false)
            }, 1500)
            setIsTyping(false)
            return
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: botResponse,
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording)

    // In a real implementation, this would use the Web Speech API
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        const demoQueries = [
          "I want to report a pothole on Linking Road in Bandra",
          "Can you show me the latest issues reported?",
          "I need AI insights about water problems",
          "How do I track my existing complaint?",
          "Give me a link to the report page",
        ]
        const randomQuery = demoQueries[Math.floor(Math.random() * demoQueries.length)]
        setInputValue(randomQuery)
        setIsRecording(false)
      }, 2000)
    } else {
      // Stop recording
      setIsRecording(false)
    }
  }

  // Function to render message content with line breaks
  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  // Quick reply buttons for common actions
  const quickReplies = [
    { text: "Raise a query", action: () => setInputValue("I want to raise a new query") },
    { text: "Track my query", action: () => setInputValue("How do I track my existing query?") },
    { text: "Fill report form", action: () => setInputValue("Help me fill the report form") },
    { text: "Latest issues", action: () => setInputValue("Show me the latest issues") },
  ]

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[90%] sm:max-w-md p-0 flex flex-col h-[80vh]">
          <SheetHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                Mumbai Civic Connect Assistant
              </SheetTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{renderMessageContent(message.content)}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply buttons */}
          <div className="px-4 py-2 border-t flex gap-2 overflow-x-auto">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  reply.action()
                  // Focus on input after selecting a quick reply
                  setTimeout(() => document.getElementById("chat-input")?.focus(), 100)
                }}
                className="whitespace-nowrap"
              >
                {reply.text}
              </Button>
            ))}
          </div>

          <div className="p-4 border-t">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={isRecording ? "text-red-500 animate-pulse" : ""}
                onClick={toggleVoiceRecording}
              >
                <Mic className="h-5 w-5" />
                <span className="sr-only">{isRecording ? "Stop recording" : "Start voice input"}</span>
              </Button>
              <Input
                id="chat-input"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

