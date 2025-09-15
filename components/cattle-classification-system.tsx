"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Camera, BarChart3, Database } from "lucide-react"
import ImageUploadSection from "./sections/image-upload-section"
import AnalysisResultsSection from "./sections/analysis-results-section"
import HistorySection from "./sections/history-section"
import StatisticsSection from "./sections/statistics-section"
import TabButton from "./ui/tab-button"
import { analyzeImage } from "@/lib/analysis-utils"
import type { AnalysisResult, BodyParameters } from "@/types/cattle-types"

const CattleClassificationSystem = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [classificationHistory, setClassificationHistory] = useState<AnalysisResult[]>([])
  const [activeTab, setActiveTab] = useState("upload")
  const [bodyParams, setBodyParams] = useState<BodyParameters>({
    bodyLength: 140,
    heightAtWithers: 125,
    chestWidth: 42,
    rumpAngle: 20,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const adjustParameter = (param: keyof BodyParameters, increment: number) => {
    setBodyParams((prev) => ({
      ...prev,
      [param]: Math.max(0, prev[param] + increment),
    }))

    if (analysisResult) {
      setAnalysisResult((prev) =>
        prev
          ? {
              ...prev,
              bodyParameters: {
                ...prev.bodyParameters,
                [param]: Math.max(0, prev.bodyParameters[param] + increment),
              },
            }
          : null,
      )
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string
        setSelectedImage(imageUrl)
        setIsAnalyzing(true)

        const result = await analyzeImage(file, bodyParams)
        setAnalysisResult(result)
        setClassificationHistory((prev) => [result, ...prev.slice(0, 9)])
        setIsAnalyzing(false)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-teal-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">Pashu Netra</h1>
          <p className="text-lg text-gray-600">Identify cattle and buffalo breeds using advanced AI technology</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-lg">
            <TabButton
              id="upload"
              label="Upload & Analyze"
              icon={Camera}
              active={activeTab === "upload"}
              onClick={setActiveTab}
            />
            <TabButton
              id="history"
              label="History"
              icon={Database}
              active={activeTab === "history"}
              onClick={setActiveTab}
            />
            <TabButton
              id="stats"
              label="Statistics"
              icon={BarChart3}
              active={activeTab === "stats"}
              onClick={setActiveTab}
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "upload" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <ImageUploadSection
              selectedImage={selectedImage}
              isAnalyzing={isAnalyzing}
              fileInputRef={fileInputRef}
              onImageUpload={handleImageUpload}
            />
            <AnalysisResultsSection analysisResult={analysisResult} onParameterAdjust={adjustParameter} />
          </div>
        )}

        {activeTab === "history" && <HistorySection classificationHistory={classificationHistory} />}

        {activeTab === "stats" && <StatisticsSection classificationHistory={classificationHistory} />}
      </div>
    </div>
  )
}

export default CattleClassificationSystem
