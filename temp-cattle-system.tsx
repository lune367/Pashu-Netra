"use client"

import { useState, useRef } from "react"
import { Camera, Upload, Eye, FileText, BarChart3, Users, Calendar, Database } from "lucide-react"

const CattleClassificationSystem = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [classificationHistory, setClassificationHistory] = useState([])
  const [activeTab, setActiveTab] = useState("upload")
  const [bodyParams, setBodyParams] = useState({
    bodyLength: 140,
    heightAtWithers: 125,
    chestWidth: 42,
    rumpAngle: 20,
  })
  const fileInputRef = useRef(null)

  const adjustParameter = (param, increment) => {
    setBodyParams((prev) => ({
      ...prev,
      [param]: Math.max(0, prev[param] + increment),
    }))

    // Update analysis result if it exists
    if (analysisResult) {
      setAnalysisResult((prev) => ({
        ...prev,
        bodyParameters: {
          ...prev.bodyParameters,
          [param]: Math.max(0, prev.bodyParameters[param] + increment),
        },
      }))
    }
  }

  // Simulated AI analysis function
  const analyzeImage = async (imageFile) => {
    setIsAnalyzing(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulated analysis results based on common Indian cattle/buffalo breeds
    const breeds = [
      { name: "Murrah Buffalo", type: "Buffalo" },
      { name: "Gir Cattle", type: "Cattle" },
      { name: "Sahiwal Cattle", type: "Cattle" },
      { name: "Mehsana Buffalo", type: "Buffalo" },
      { name: "Red Sindhi Cattle", type: "Cattle" },
    ]

    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)]

    const result = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      breed: randomBreed,
      bodyParameters: bodyParams,
      atcScores: {
        overall: Math.round(70 + Math.random() * 25),
        bodyCapacity: Math.round(75 + Math.random() * 20),
        dairyCharacter: Math.round(65 + Math.random() * 30),
        feet_legs: Math.round(70 + Math.random() * 25),
        udder:
          randomBreed.type === "Buffalo" ? Math.round(80 + Math.random() * 15) : Math.round(75 + Math.random() * 20),
      },
      healthIndicators: {
        bodyCondition: Math.round(3 + Math.random() * 2), // 1-5 scale
        skinQuality: ["Excellent", "Good", "Fair"][Math.floor(Math.random() * 3)],
        eyeClarity: ["Clear", "Slightly cloudy"][Math.floor(Math.random() * 2)],
      },
    }

    setAnalysisResult(result)
    setClassificationHistory((prev) => [result, ...prev.slice(0, 9)]) // Keep last 10 results
    setIsAnalyzing(false)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        analyzeImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600 bg-green-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        active ? "bg-teal-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  )

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

        {/* Upload & Analysis Tab */}
        {activeTab === "upload" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Upload className="mr-3 text-teal-600" />
                Capture or Upload Image
              </h2>

              <p className="text-gray-600 mb-6 text-center">
                Take a photo or upload an image of cattle or buffalo for classification
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  className="bg-teal-700 text-white py-4 px-6 rounded-lg font-medium hover:bg-teal-800 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={20} />
                  <span>Open Camera</span>
                </button>
                <button
                  className="bg-teal-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={20} />
                  <span>Upload Image</span>
                </button>
              </div>

              {selectedImage && (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Selected cattle"
                    className="max-h-64 mx-auto rounded-lg shadow-md w-full object-cover"
                  />
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

              {isAnalyzing && (
                <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-teal-600 border-t-transparent"></div>
                    <span className="text-teal-700 font-medium">Analyzing image...</span>
                  </div>
                  <div className="mt-2 text-sm text-teal-600">Processing body structure and breed characteristics</div>
                </div>
              )}
            </div>

            {/* Results Section */}
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
                      {Object.entries(analysisResult.bodyParameters).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between bg-white p-3 rounded">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => adjustParameter(key, -1)}
                              className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                            >
                              -
                            </button>
                            <span className="font-medium w-16 text-center">
                              {value} {key === "rumpAngle" ? "°" : "cm"}
                            </span>
                            <button
                              onClick={() => adjustParameter(key, 1)}
                              className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
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
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(score)}`}>
                            {score}/100
                          </span>
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
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
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
        )}

        {/* Statistics Tab */}
        {activeTab === "stats" && (
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
                    <span className="text-2xl font-bold text-green-600">
                      {classificationHistory.length > 0
                        ? Math.round(
                            classificationHistory.reduce((acc, record) => acc + record.atcScores.overall, 0) /
                              classificationHistory.length,
                          )
                        : 0}
                      /100
                    </span>
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
                  {Object.entries(
                    classificationHistory.reduce((acc, record) => {
                      acc[record.breed.name] = (acc[record.breed.name] || 0) + 1
                      return acc
                    }, {}),
                  ).map(([breed, count]) => (
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
        )}
      </div>
    </div>
  )
}

export default CattleClassificationSystem
