"use client"

import type React from "react"
import { Eye, FileText } from "lucide-react"
import type { AnalysisResult, BodyParameters } from "@/types/cattle-types"
import { getScoreColor } from "@/lib/utils"

interface AnalysisResultsSectionProps {
  analysisResult: AnalysisResult | null
  onParameterAdjust: (param: keyof BodyParameters, increment: number) => void
}

const AnalysisResultsSection: React.FC<AnalysisResultsSectionProps> = ({ analysisResult, onParameterAdjust }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Eye className="mr-3 text-teal-600" />
        Analysis Results
      </h2>

      {analysisResult ? (
        <div className="space-y-6">
          {/* Breed Classification */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Breed Classification</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-teal-600">{analysisResult.breed.name}</p>
                <p className="text-sm text-gray-600">{analysisResult.breed.type}</p>
              </div>
            </div>
          </div>

          {/* Body Parameters */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Body Structure Parameters</h3>
            <div className="space-y-3">
              {(Object.entries(analysisResult.bodyParameters) as [keyof BodyParameters, number][]).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-white p-3 rounded">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onParameterAdjust(key, -1)}
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-medium w-16 text-center">
                        {value} {key === "rumpAngle" ? "°" : "cm"}
                      </span>
                      <button
                        onClick={() => onParameterAdjust(key, 1)}
                        className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ATC Scores */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">ATC Classification Scores</h3>
            <div className="space-y-2">
              {Object.entries(analysisResult.atcScores).map(([key, score]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize text-gray-700">
                    {key.replace(/([A-Z])/g, " $1").replace("_", " & ")}:
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(score)}`}>{score}/100</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health Indicators */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Health Indicators</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Body Condition Score:</span>
                <span className="font-medium">{analysisResult.healthIndicators.bodyCondition}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Skin Quality:</span>
                <span className="font-medium">{analysisResult.healthIndicators.skinQuality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Eye Clarity:</span>
                <span className="font-medium">{analysisResult.healthIndicators.eyeClarity}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Upload an image to see analysis results</p>
        </div>
      )}
    </div>
  )
}

export default AnalysisResultsSection
