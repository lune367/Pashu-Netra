"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"

interface TabButtonProps {
  id: string
  label: string
  icon: LucideIcon
  active: boolean
  onClick: (id: string) => void
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, active, onClick }) => (
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

export default TabButton
