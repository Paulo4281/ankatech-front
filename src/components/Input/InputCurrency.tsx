"use client"

import { useState } from "react"

type TCurrencyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string | number
  onChangeValue?: (value: string) => void
}

function InputCurrencyComponent(
    {
        value = "", onChangeValue, ...props

    }:TCurrencyInputProps
) {
  const [internalValue, setInternalValue] = useState(
    typeof value === "number" ? value.toFixed(2) : value
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value
    val = val.replace(/\D/g, "")
    if (val) {
        const num = parseFloat(val) / 100
    
        const formatted = num.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
    
        setInternalValue(formatted)
        if (onChangeValue) onChangeValue(formatted)
    }
  }

  return (
    <input
      {...props}
      value={internalValue}
      onChange={handleChange}
      type="text"
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
    />
  )
}

export { InputCurrencyComponent as InputCurrency }
