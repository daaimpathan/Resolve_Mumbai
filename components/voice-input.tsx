"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  isListening: boolean
  setIsListening: (isListening: boolean) => void
}

export default function VoiceInput({ onTranscript, isListening, setIsListening }: VoiceInputProps) {
  const [isSupported, setIsSupported] = useState(true)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    setIsListening(true)
    setIsProcessing(true)

    // In a real implementation, this would use the Web Speech API
    // For this demo, we'll simulate speech recognition
    setTimeout(() => {
      const simulatedTranscripts = [
        "There is a large pothole on Linking Road near the junction that's causing traffic issues",
        "The street light at the corner of our lane has been out for a week, making it unsafe at night",
        "Garbage hasn't been collected for the past 3 days in our area, causing hygiene issues",
        "Water supply has been irregular in our building for the last week",
      ]

      const randomTranscript = simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)]
      setTranscript(randomTranscript)
      onTranscript(randomTranscript)
      setIsProcessing(false)
      setIsListening(false)
    }, 3000)
  }

  const stopListening = () => {
    setIsListening(false)
    // In a real implementation, this would stop the Web Speech API recognition
  }

  if (!isSupported) {
    return <div className="text-sm text-muted-foreground italic">Voice input is not supported in your browser.</div>
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        type="button"
        variant={isListening ? "destructive" : "outline"}
        size="lg"
        className={`rounded-full h-16 w-16 ${isListening ? "animate-pulse" : ""}`}
        onClick={toggleListening}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
        <span className="sr-only">{isListening ? "Stop recording" : "Start voice input"}</span>
      </Button>
      <span className="text-sm text-center">{isListening ? "Listening..." : "Click to speak"}</span>
      {transcript && (
        <div className="mt-2 p-3 bg-muted rounded-md w-full">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  )
}

