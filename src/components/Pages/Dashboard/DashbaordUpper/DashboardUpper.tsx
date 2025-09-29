"use client"

import { Currency } from "@/components/Currency/Currency"
import { Description } from "@/components/Description/Description"
import { Divider } from "@/components/Divider/Divider"
import { ProgressBar } from "@/components/ProgressBar/ProgressBar"
import { Badge } from "@/components/ui/badge"
import { useFindFamilyMember } from "@/services/FamilyMember/FamilyMemberService"
import type { TFamilyMemberResponse } from "@/types/FamilyMember/TFamilyMember"
import { useState, useEffect } from "react"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useFindMovement } from "@/services/Movement/MovementService"
import type { TMovementResponse } from "@/types/Movement/TMovement"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { useHeritageChartSimulationStore } from "@/stores/HeritageChartSimulation/HeritageChartSimulationStore"
import { SelectFamilyMember } from "@/components/Select/SelectFamilyMember"

type TMovementHandler = {
  type: "earning" | "expense",
  frequency: "unique" | "monthly" | "yearly",
  dateEnd: string | null
  value: number
}

function DashboardUpperComponent() {
    const { familyMember } = useFamilyMemberStore()

    const { simulation } = useHeritageChartSimulationStore()
    
    const [movements, setMovements] = useState<TMovementResponse[]>([])

    const [movementsUntil, setMovementsUntil] = useState<{ [key: string]: Partial<TMovementHandler>[] }>({})

    const { data: movementData } = useFindMovement({
      filters: {
        familyMemberId: familyMember?.id as string,
        class: "financial,fixed"
      }
    })

    useEffect(() => {
      if (movementData) {
        setMovements(movementData)
        let allMovements: { [key: string]: Partial<TMovementHandler>[] } = {}

        movementData.forEach((movement) => {

          const movementDateStart = DateUtils.formatDate(movement.dateStart)

          if (!allMovements[movementDateStart]) {
            allMovements[movementDateStart] = []
          }

          allMovements[movementDateStart].push({
              type: movement.type,
              frequency: movement.frequency,
              dateEnd: movement.dateEnd ? DateUtils.formatDate(movement.dateEnd) : null,
              value: Number(movement.value)
          })
        })

        setMovementsUntil(allMovements)
      }
    }, [movementData])

    let totalInUniqueMovements = 0
    let totalMonthlyAndYearlyUntil2035 = 0
    let totalMonthlyAndYearlyUntil2045 = 0

    let totalInMonthlyAndYearlyEarnings = 0
    let totalInMonthlyAndYearlyExpenses = 0

    Object.keys(movementsUntil).forEach((key) => {
      movementsUntil[key].forEach((movement) => {

        if (movement.frequency === "unique") {
          if (movement.type === "earning") {
            totalInUniqueMovements += Number(movement.value)
          } else if (movement.type === "expense") {
            totalInUniqueMovements -= Number(movement.value)
          }
        } else {

          if (movement.dateEnd) {
            const yearsFromDatestart = DateUtils.howMuchTimeFromXInPeriod(new Date(key), new Date(movement.dateEnd), "yearly")

            if (yearsFromDatestart <= 10) {
              if (movement.frequency === "monthly") {
                const monthsFromDatestart = DateUtils.howMuchTimeFromXInPeriod(new Date(key), new Date(movement.dateEnd), "monthly")

                if (movement.type === "earning") {
                  totalMonthlyAndYearlyUntil2035 += (Number(movement.value) * monthsFromDatestart) + totalInUniqueMovements
                } else if (movement.type === "expense") {
                  totalMonthlyAndYearlyUntil2035 -= Number(movement.value) * monthsFromDatestart
                }
              } else if (movement.frequency === "yearly") {
                if (movement.type === "earning") {
                  totalMonthlyAndYearlyUntil2035 += (Number(movement.value) * yearsFromDatestart) + totalInUniqueMovements
                } else if (movement.type === "expense") {
                  totalMonthlyAndYearlyUntil2035 -= Number(movement.value) * yearsFromDatestart
                }
              }
            }

            if (yearsFromDatestart > 0) {
              if (movement.frequency === "monthly") {
                const monthsFromDatestart = DateUtils.howMuchTimeFromXInPeriod(new Date(key), new Date(movement.dateEnd), "monthly")

                if (movement.type === "earning") {
                  totalMonthlyAndYearlyUntil2045 += (Number(movement.value) * monthsFromDatestart) + totalInUniqueMovements
                  totalInMonthlyAndYearlyEarnings += Number(movement.value)
                } else if (movement.type === "expense") {
                  totalMonthlyAndYearlyUntil2045 -= Number(movement.value) * monthsFromDatestart
                  totalInMonthlyAndYearlyExpenses += Number(movement.value)
                }
              } else if (movement.frequency === "yearly") {
                if (movement.type === "earning") {
                  totalMonthlyAndYearlyUntil2045 += (Number(movement.value) * yearsFromDatestart) + totalInUniqueMovements
                  totalInMonthlyAndYearlyEarnings += Number(movement.value) / 12
                } else if (movement.type === "expense") {
                  totalMonthlyAndYearlyUntil2045 -= Number(movement.value) * yearsFromDatestart
                  totalInMonthlyAndYearlyExpenses += Number(movement.value) / 12
                }
                }
              }
          }

        }

      })
    })

    totalMonthlyAndYearlyUntil2035 += totalInUniqueMovements
    totalMonthlyAndYearlyUntil2045 += totalInUniqueMovements

    const currentAgeAchieved = ValueUtils.calculatePlanProgress((simulation?.chartInfo?.[2030]?.original! / 5) as number, totalInUniqueMovements)
    const age55Expectation = ValueUtils.calculatePlanProgress(simulation?.chartInfo?.[2035]?.original as number, (totalMonthlyAndYearlyUntil2035 + totalInUniqueMovements))
    const age65Expectation = ValueUtils.calculatePlanProgress(simulation?.chartInfo?.[2045]?.original as number, (totalMonthlyAndYearlyUntil2045 + totalInUniqueMovements))

    const totalMonthlyEarningVsExpense = totalInMonthlyAndYearlyEarnings - totalInMonthlyAndYearlyExpenses
    const monthlyPercentageGaining = ValueUtils.howMuchPercentage(totalMonthlyEarningVsExpense, 5000)

    let percentageGainedFromNowUntilAge55 = ValueUtils.calculatePercentageGained(totalInUniqueMovements, (totalMonthlyAndYearlyUntil2035 + totalInUniqueMovements))
    let percentageGainedFromNowUntilAge65 = ValueUtils.calculatePercentageGained(totalInUniqueMovements, (totalMonthlyAndYearlyUntil2045 + totalInUniqueMovements))

    if (percentageGainedFromNowUntilAge55 < 0) percentageGainedFromNowUntilAge55 = 0
    if (percentageGainedFromNowUntilAge65 < 0) percentageGainedFromNowUntilAge65 = 0

    return (
        <>
        <section id="upper-section">

          <div className="
          mt-6 grid grid-cols-1
          lg:grid-cols-2
          ">

            <div className="space-y-5">
              
              <SelectFamilyMember />

              <div>
                <Description
                  text="Patrimônio líquido total"
                  color="gray"
                  size="sm"
                />
                <Currency
                  amount={ValueUtils.centsIntToCurrency(totalInUniqueMovements)}
                  amountColor="white"
                  size="xl"
                  symbolColor="gray"
                  showSymbol={false}
                  plusData={{
                    amount: monthlyPercentageGaining.toString(),
                    position: "bottom"
                  }}
                />
              </div>
            </div>

            <div className="
            grid grid-cols-1 gap-4 mt-6
            lg:grid-cols-3 lg:mt-0
            ">
              <div className="flex space-x-2 space-y-1">
                <Divider
                  vertical={true}
                  widthClass="h-full"
                />
                <div className="flex w-full flex-col">
                  <Currency
                    amount={ValueUtils.centsIntToCurrency(totalInUniqueMovements)}
                    amountColor="white"
                    size="sm"
                    symbolColor="white"
                    showSymbol={false}
                  />
                  <ProgressBar
                    value={currentAgeAchieved.achieved}
                    striked={false}
                  />
                  <Divider
                    widthClass="w-full"
                  />
                  <div className="flex flex-col mt-8">
                    <div className="flex gap-1">
                      <Description
                        text="2025"
                        color="gray"
                        size="sm"
                      />
                      <Badge className="!bg-gray-800 text-blue-400 !p-0.5">Hoje</Badge>
                    </div>
                    <Description
                        text="45 anos"
                        color="blue"
                        size="md"
                      />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 space-y-1">
                <Divider
                  vertical={true}
                  widthClass="h-full"
                />
                <div className="flex flex-col w-full">
                  <Currency
                    amount={ValueUtils.centsIntToCurrency(totalMonthlyAndYearlyUntil2035)}
                    amountColor="white"
                    size="sm"
                    symbolColor="white"
                    showSymbol={false}
                    plusData={{
                      amount: `${percentageGainedFromNowUntilAge55.toFixed(2)}`,
                      position: "middle"
                    }}
                  />
                  <ProgressBar
                    value={age55Expectation.achieved}
                    striked={true}
                  />
                  <Divider
                    widthClass="w-full"
                    striked={true}
                  />
                  <div className="flex flex-col mt-8">
                    <div className="flex gap-1">
                      <Description
                        text="2035"
                        color="gray"
                        size="sm"
                      />
                    </div>
                    <Description
                        text="55 anos"
                        color="white"
                        size="md"
                      />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 space-y-1">
                <Divider
                  vertical={true}
                  widthClass="h-full"
                />
                <div className="flex flex-col w-full">
                  <Currency
                    amount={ValueUtils.centsIntToCurrency(totalMonthlyAndYearlyUntil2045)}
                    amountColor="white"
                    size="sm"
                    symbolColor="white"
                    showSymbol={false}
                    plusData={{
                      amount: `${percentageGainedFromNowUntilAge65.toFixed(2)}`,
                      position: "middle"
                    }}
                  />
                  <ProgressBar
                    value={age65Expectation.achieved}
                    striked={true}
                  />
                  <Divider
                    widthClass="w-full"
                    striked={true}
                  />
                  <div className="flex flex-col mt-8">
                    <div className="flex gap-1">
                      <Description
                        text="2045"
                        color="gray"
                        size="sm"
                      />
                    </div>
                    <Description
                        text="65 anos"
                        color="white"
                        size="md"
                      />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>
        </>
    )
}

export {
    DashboardUpperComponent as DashboardUpper
}