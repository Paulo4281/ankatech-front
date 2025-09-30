import React from "react"

type TProgressBarProps = {
  value: number
  max?: number
  striked?: boolean
  className?: string
  segments?: number
  height?: "extra-small" | "sm" | "md"
  color?: "cyan-blue" | "orange"
  nonFilledColor?: "gray" | "white"
}

const heightHandler: Record<NonNullable<TProgressBarProps["height"]>, string> = {
  "extra-small": "h-2.5",
  sm: "h-4",
  md: "h-12"
}

const nonFilledColorHandler: Record<NonNullable<TProgressBarProps["nonFilledColor"]>, string> = {
  gray: "bg-gray-700",
  white: "bg-white"
}

const colorHandler: Record<NonNullable<TProgressBarProps["color"]>, string> = {
  "cyan-blue": "bg-gradient-to-r from-cyan-500 to-blue-500",
  orange: "bg-orange-500"
}

export function ProgressBar({
  value,
  max=100,
  striked=false,
  color="cyan-blue",
  nonFilledColor="gray",
  className="",
  segments=30,
  height="md"
}: TProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  if (striked) {
    const filledSegments = Math.round((percentage / 100) * segments)
    const segmentElements = Array.from({ length: segments }, (_, i) => (
      <div
        key={i}
        className={`${i < filledSegments ? colorHandler[color] : `${nonFilledColorHandler[nonFilledColor]}`} h-full flex-1 rounded-2xl`}
        style={{ marginRight: i < segments - 1 ? "2px" : 0 }}
      />
    ))

    return (
      <div className={`w-full ${heightHandler[height]} flex overflow-hidden ${className}`}>
        {segmentElements}
      </div>
    )
  }

  return (
    <div className={`w-full ${heightHandler[height]} ${nonFilledColorHandler[nonFilledColor]} rounded ${className} overflow-hidden relative`}>
      <div className={`${colorHandler[color]} h-full`} style={{ width: `${percentage}%` }} />
    </div>
  )
}
