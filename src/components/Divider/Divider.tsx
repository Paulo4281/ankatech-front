type TDividerProps = {
  widthClass?: string
  striked?: boolean
  color?: string
  vertical?: boolean
};

function DividerComponent({
  widthClass,
  striked=false,
  color="#6B7280",
  vertical=false,
}: TDividerProps) {
  const commonStyle: React.CSSProperties = striked
    ? {
        backgroundImage: `repeating-linear-gradient(
          ${vertical ? "135deg" : "45deg"},
          ${color} 0 2px,
          transparent 2px 4px
        )`,
      }
    : { backgroundColor: color }

  return (
    <div
      className={`${
        vertical ? "w-[1px] h-full" : "h-[1px] w-full"
      } ${widthClass ? widthClass : ""} mt-4 rounded`}
      style={commonStyle}
    />
  )
}

export { DividerComponent as Divider }
