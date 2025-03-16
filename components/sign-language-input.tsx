"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, VideoOff, Loader2 } from "lucide-react"

interface SignLanguageInputProps {
  onRecognition: (text: string) => void
}

export default function SignLanguageInput({ onRecognition }: SignLanguageInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const [recognizedText, setRecognizedText] = useState("")

  const startRecording = async () => {
    try {
      setIsProcessing(true)

      // In a real implementation, this would access the camera and use ML for sign language recognition
      // For this demo, we'll simulate the process

      setTimeout(() => {
        setIsRecording(true)
        setIsProcessing(false)

        // Simulate recognition after a few seconds
        setTimeout(() => {
          const simulatedTexts = [
            "Need wheelchair access at Dadar station",
            "Traffic signals need audible alerts",
            "Government office restrooms not accessible",
            "Broken sidewalk on Linking Road",
          ]

          const recognizedText = simulatedTexts[Math.floor(Math.random() * simulatedTexts.length)]
          setRecognizedText(recognizedText)
          onRecognition(recognizedText)
          setIsRecording(false)
        }, 5000)
      }, 2000)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setIsProcessing(false)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop())
      setVideoStream(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
        {isRecording ? (
          <video className="w-full h-full object-cover" autoPlay muted playsInline>
            <source src="/placeholder.svg" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-center p-4">
            <VideoOff className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Camera will activate when you start recording</p>
          </div>
        )}

        {isRecording && (
          <div className="absolute top-2 right-2">
            <div className="bg-red-500 h-3 w-3 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant={isRecording ? "destructive" : "outline"}
        size="lg"
        className={`${isRecording ? "animate-pulse" : ""}`}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isRecording ? (
          <>
            <VideoOff className="mr-2 h-4 w-4" />
            Stop Recording
          </>
        ) : (
          <>
            <Video className="mr-2 h-4 w-4" />
            Start Sign Language Input
          </>
        )}
      </Button>

      {recognizedText && (
        <div className="mt-2 p-3 bg-muted rounded-md w-full">
          <p className="text-sm font-medium mb-1">Recognized Text:</p>
          <p className="text-sm">{recognizedText}</p>
        </div>
      )}
    </div>
  )
}

