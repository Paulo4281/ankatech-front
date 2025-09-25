import React from "react"

type ProgressBarProps = {
  value: number
  max?: number
  striked?: boolean
  color?: string
  className?: string
  segments?: number
}

export function ProgressBar({
  value,
  max=100,
  striked=false,
  color="bg-gradient-to-r from-cyan-500 to-blue-500",
  className="",
  segments=30,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  if (striked) {
    const filledSegments = Math.round((percentage / 100) * segments)
    const segmentElements = Array.from({ length: segments }, (_, i) => (
      <div
        key={i}
        className={`${i < filledSegments ? color : "bg-gray-700"} h-full flex-1 rounded-2xl`}
        style={{ marginRight: i < segments - 1 ? "2px" : 0 }}
      />
    ))

    return (
      <div className={`w-full h-12 flex overflow-hidden ${className}`}>
        {segmentElements}
      </div>
    )
  }

  return (
    <div className={`w-full h-12 bg-gray-800 rounded ${className} overflow-hidden relative`}>
      <div className={`${color} h-full`} style={{ width: `${percentage}%` }} />
    </div>
  )
}
