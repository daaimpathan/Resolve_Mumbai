import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Issue classification using AI
export async function classifyIssueCategory(description: string): Promise<string> {
  const prompt = `
    Classify the following civic issue into one of these categories:
    - Roads & Potholes
    - Water Supply
    - Electricity
    - Sanitation & Garbage
    - Drainage & Flooding
    - Traffic & Transportation
    - Parks & Public Spaces
    - Noise Pollution
    - Other

    Issue description: ${description}
    
    Return only the category name without any additional text.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return text.trim()
  } catch (error) {
    console.error("Error classifying issue:", error)
    return "Other" // Default fallback category
  }
}

// Severity assessment using AI
export async function assessIssueSeverity(description: string): Promise<{
  severity: "Low" | "Medium" | "High" | "Critical"
  reasoning: string
}> {
  const prompt = `
    Assess the severity of the following civic issue on a scale of Low, Medium, High, or Critical.
    Consider factors like public safety, impact on daily life, number of people affected, and urgency.
    
    Issue description: ${description}
    
    Provide your assessment in JSON format with two fields:
    - severity: one of "Low", "Medium", "High", or "Critical"
    - reasoning: a brief explanation for this assessment (max 100 characters)
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return JSON.parse(text.trim())
  } catch (error) {
    console.error("Error assessing issue severity:", error)
    return {
      severity: "Medium",
      reasoning: "Default assessment due to processing error",
    }
  }
}

// Generate response suggestions for government officials
export async function generateResponseSuggestion(issueDescription: string): Promise<string> {
  const prompt = `
    Generate a professional, empathetic response from a government official to a citizen who reported the following civic issue:
    
    "${issueDescription}"
    
    The response should:
    1. Acknowledge the issue
    2. Express appreciation for reporting
    3. Outline general next steps
    4. Be concise (max 150 words)
    5. Be formal but friendly
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating response suggestion:", error)
    return "Thank you for reporting this issue. We have received your report and will investigate promptly."
  }
}

// Analyze image to verify issue
export async function analyzeIssueImage(
  imageUrl: string,
  issueCategory: string,
): Promise<{
  verified: boolean
  confidence: number
  details: string
}> {
  const prompt = `
    Analyze this image of a reported civic issue in the category "${issueCategory}".
    The image URL is: ${imageUrl}
    
    Determine if the image shows evidence of the reported issue type.
    
    Provide your analysis in JSON format with three fields:
    - verified: boolean indicating if the image shows evidence of the reported issue type
    - confidence: number between 0 and 1 indicating confidence level
    - details: brief description of what you see in the image (max 100 characters)
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return JSON.parse(text.trim())
  } catch (error) {
    console.error("Error analyzing issue image:", error)
    return {
      verified: true,
      confidence: 0.5,
      details: "Image analysis unavailable",
    }
  }
}

// Predict resolution time based on historical data
export async function predictResolutionTime(
  category: string,
  severity: string,
  location: string,
): Promise<{
  estimatedDays: number
  confidence: number
}> {
  // In a real implementation, this would use a trained ML model
  // For now, we'll use a simple rule-based approach with the AI
  const prompt = `
    Based on historical civic issue resolution data, predict how many days it might take to resolve an issue with these characteristics:
    - Category: ${category}
    - Severity: ${severity}
    - Location: ${location}
    
    Provide your prediction in JSON format with two fields:
    - estimatedDays: number of days (integer between 1 and 30)
    - confidence: confidence level (number between 0 and 1)
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return JSON.parse(text.trim())
  } catch (error) {
    console.error("Error predicting resolution time:", error)
    return {
      estimatedDays: 7,
      confidence: 0.5,
    }
  }
}

