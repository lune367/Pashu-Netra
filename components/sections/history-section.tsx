import type React from "react"
import { Database, Calendar } from "lucide-react"
import type { AnalysisResult } from "@/types/cattle-types"
import { getScoreColor } from "@/lib/utils"

interface HistorySectionProps {
  classificationHistory: AnalysisResult[]
}

const HistorySection: React.FC<HistorySectionProps> = ({ classificationHistory }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Database className="mr-3 text-purple-600" />
        Classification History
      </h2>

      {classificationHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Timestamp</th>
                <th className="px-4 py-3 text-left">Breed</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Overall ATC Score</th>
                <th className="px-4 py-3 text-left">Body Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {classificationHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{record.timestamp}</td>
                  <td className="px-4 py-3 font-medium">{record.breed.name}</td>
                  <td className="px-4 py-3">{record.breed.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${getScoreColor(record.atcScores.overall)}`}>
                      {record.atcScores.overall}/100
                    </span>
                  </td>
                  <td className="px-4 py-3">{record.bodyParameters.bodyLength} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No classification history available</p>
          <p className="text-sm mt-2">Upload and analyze images to build your history</p>
        </div>
      )}
    </div>
  )
}

export default HistorySection
