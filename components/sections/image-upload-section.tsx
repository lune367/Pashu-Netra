"use client"

import type React from "react"
import { Camera, Upload } from "lucide-react"

interface ImageUploadSectionProps {
  selectedImage: string | null
  isAnalyzing: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  selectedImage,
  isAnalyzing,
  fileInputRef,
  onImageUpload,
}) => {
  return (
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
            src={selectedImage || "/placeholder.svg"}
            alt="Selected cattle"
            className="max-h-64 mx-auto rounded-lg shadow-md w-full object-cover"
          />
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={onImageUpload} className="hidden" />

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
  )
}

export default ImageUploadSection
