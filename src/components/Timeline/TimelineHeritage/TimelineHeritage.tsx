"use client"

import { Description } from "@/components/Description/Description"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { useFindMovement } from "@/services/Movement/MovementService"
import { useState, useEffect } from "react"
import type { TMovementResponse } from "@/types/Movement/TMovement"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"

type TWageEvent = {
  title: string
  value: number
  year: number
}

type TExpenseEvent = {
  value: number
  year: number
}

type TCustomEvent = {
  year: number
  content: React.ReactNode
}

function TimelineHeritageComponent() {

    const { familyMember } = useFamilyMemberStore()

    const { data } = useFindMovement({
      filters: {
        class: "financial,fixed",
        familyMemberId: familyMember?.id as string
      }
    })

    const [movements, setMovements] = useState<TMovementResponse[]>([])

    useEffect(() => {
      if (data) {
        setMovements(data)
      }
    }, [data])

    const startYear = 2025
    const endYear = 2060
    const startAge = 45
    const ageStep = 5

    const years = Array.from(
      { length: Math.floor((endYear - startYear) / ageStep) + 1 },
      (_, i) => startYear + i * ageStep
    )

    const ages = Array.from(
      { length: years.length },
      (_, i) => startAge + i * ageStep
    )

    function snapToClosestYear(eventYear: number, years: number[]): number {
      return years.reduce((prev, current) => Math.abs(current - eventYear) < Math.abs(prev - eventYear) ? current : prev)
    }

    const wageEvents: TWageEvent[] = movements?.filter((movement) => movement.type === "earning")
    ?.map((movement) => ({
      title: movement.title,
      value: Number(movement.value),
      year: snapToClosestYear(DateUtils.getYear(new Date(movement.dateStart)), years)
    })) ?? []

    const expenseEvents: TExpenseEvent[] = movements?.filter((movement) => movement.type === "expense")
    ?.map((movement) => ({
      value: Number(movement.value),
      year: snapToClosestYear(DateUtils.getYear(new Date(movement.dateStart)), years)
    })) ?? []

    const customEvents: TCustomEvent[] = [
        {
            year: 2045,
            content: <Description text="Aposetadoria" color="bright-gray" size="sm" />
        },
    ]

  return (
    <div className="relative p-6 overflow-x-auto">
      <div className="relative flex items-center space-x-12 mb-10">
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-300 z-0" />
        <span className="relative z-10 -mt-10 text-green-400 text-sm">Salário</span>

        {years.map((year) => {
            const eventsThisYear = wageEvents.filter((event) => event.year === year)
            return (
            <div key={year} className="relative z-10 flex flex-col items-center flex-1 space-y-1 text-center">
                {eventsThisYear.map((event) => (
                    <>
                        <Description text={`${event.title} ${ValueUtils.centsIntToCurrency(event.value || 0)}`} color="green" size="extra-sm" />
                        <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 mt-1" />
                    </>
                ))}
            </div>
            )
        })}
      </div>

      <div className="relative flex items-center space-x-12 mb-10">
        <div className="flex flex-col gap-1 mr-4">
          <span className="text-white text-sm">Ano</span>
          <span className="text-white text-sm">Idade</span>
        </div>

        <div className="relative flex-1 flex">
          <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-300 z-0" />
          {years.map((year, idx) => (
            <div
              key={year}
              id={`year-${year}`}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm text-gray-400">{year}</span>
                <span className="text-sm text-gray-400">{ages[idx]} anos</span>
              </div>
              {customEvents
                .filter((e) => e.year === year)
                .map((e, i) => (
                  <div
                    key={i}
                    className="absolute -top-10 flex flex-col items-center"
                  >
                    {e.content}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center space-x-12">
        <div className="absolute top-10 left-0 w-full h-0.5 bg-gray-300 z-0" />
        <span className="relative z-10 -mt-1 text-red-400 text-sm">Custo<br />de vida</span>

        {years.map((year) => {
            const eventsThisYear = expenseEvents.filter((event) => event.year === year)
            return (
            <div key={year} className="relative z-10 flex flex-col items-center flex-1 space-y-1">
                {eventsThisYear.map((event) => (
                    <>
                        <Description text={`${ValueUtils.centsIntToCurrency(event.value || 0)}`} color="red" size="extra-sm" />
                        <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-gray-900 mt-1" />
                    </>
                ))}
            </div>
            )
        })}
      </div>
    </div>
  )
}

export {
    TimelineHeritageComponent as TimelineHeritage
}