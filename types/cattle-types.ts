export interface Breed {
  name: string
  type: "Cattle" | "Buffalo"
}

export interface BodyParameters {
  bodyLength: number
  heightAtWithers: number
  chestWidth: number
  rumpAngle: number
}

export interface ATCScores {
  overall: number
  bodyCapacity: number
  dairyCharacter: number
  feet_legs: number
  udder: number
}

export interface HealthIndicators {
  bodyCondition: number
  skinQuality: string
  eyeClarity: string
}

export interface AnalysisResult {
  id: number
  timestamp: string
  breed: Breed
  bodyParameters: BodyParameters
  atcScores: ATCScores
  healthIndicators: HealthIndicators
}
