import type React from "react"
import { BarChart3, Users } from "lucide-react"
import type { AnalysisResult } from "@/types/cattle-types"

interface StatisticsSectionProps {
  classificationHistory: AnalysisResult[]
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ classificationHistory }) => {
  const averageScore =
    classificationHistory.length > 0
      ? Math.round(
          classificationHistory.reduce((acc, record) => acc + record.atcScores.overall, 0) /
            classificationHistory.length,
        )
      : 0

  const breedDistribution = classificationHistory.reduce(
    (acc, record) => {
      acc[record.breed.name] = (acc[record.breed.name] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="mr-3 text-orange-600" />
          System Statistics
        </h2>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">Total Classifications</span>
              <span className="text-2xl font-bold text-blue-600">{classificationHistory.length}</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-medium">Average ATC Score</span>
              <span className="text-2xl font-bold text-green-600">{averageScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Users className="mr-3 text-indigo-600" />
          Breed Distribution
        </h2>

        {classificationHistory.length > 0 ? (
          <div className="space-y-3">
            {Object.entries(breedDistribution).map(([breed, count]) => (
              <div key={breed} className="flex items-center justify-between">
                <span className="text-gray-700">{breed}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(count / classificationHistory.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{count}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No data available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatisticsSection
