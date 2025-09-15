import type { AnalysisResult, Breed } from "@/types/cattle-types"

export const analyzeImage = async (imageFile: File, bodyParams: any): Promise<AnalysisResult> => {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Simulated analysis results based on common Indian cattle/buffalo breeds
  const breeds: Breed[] = [
    { name: "Murrah Buffalo", type: "Buffalo" },
    { name: "Gir Cattle", type: "Cattle" },
    { name: "Sahiwal Cattle", type: "Cattle" },
    { name: "Mehsana Buffalo", type: "Buffalo" },
    { name: "Red Sindhi Cattle", type: "Cattle" },
  ]

  const randomBreed = breeds[Math.floor(Math.random() * breeds.length)]

  const result: AnalysisResult = {
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    breed: randomBreed,
    bodyParameters: bodyParams,
    atcScores: {
      overall: Math.round(70 + Math.random() * 25),
      bodyCapacity: Math.round(75 + Math.random() * 20),
      dairyCharacter: Math.round(65 + Math.random() * 30),
      feet_legs: Math.round(70 + Math.random() * 25),
      udder: randomBreed.type === "Buffalo" ? Math.round(80 + Math.random() * 15) : Math.round(75 + Math.random() * 20),
    },
    healthIndicators: {
      bodyCondition: Math.round(3 + Math.random() * 2), // 1-5 scale
      skinQuality: ["Excellent", "Good", "Fair"][Math.floor(Math.random() * 3)],
      eyeClarity: ["Clear", "Slightly cloudy"][Math.floor(Math.random() * 2)],
    },
  }

  return result
}
