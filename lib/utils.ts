import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getScoreColor = (score: number): string => {
  if (score >= 85) return "text-green-600 bg-green-50"
  if (score >= 70) return "text-yellow-600 bg-yellow-50"
  return "text-red-600 bg-red-50"
}
