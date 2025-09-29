"use client"

import { Button } from "@/components/ui/button"
import { ChartTooltipContent, ChartContainer, ChartConfig } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Circle, EllipsisVertical, Plus } from "lucide-react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useFindSimulation } from "@/services/Simulation/SimulationService"
import { TSimulationResponse } from "@/types/Simulation/TSimulation"
import { useHeritageChartSimulationStore } from "@/stores/HeritageChartSimulation/HeritageChartSimulationStore"
import { DrawerPlanDuplicate } from "@/components/Drawer/DrawerPlan/DrawerPlan"
import { DrawerPlanUpdate } from "@/components/Drawer/DrawerPlan/DrawerPlanUpdate"
import { ModalConfirmation } from "@/components/Modal/ModalConfirmation/ModalConfirmation"

type TPlanTypes = "original" | "current" | "done"

type TStatusTypes = "alive" | "dead"

function HeritageChartComponent() {

    const [selectedStatus, setSelectedStatus] = useState<TStatusTypes>("alive")

    const { simulation, setSimulation } = useHeritageChartSimulationStore()

    const [selectedPlan, setSelectedPlan] = useState<TPlanTypes>("original")
    const [simulationData, setSimulationData] = useState<TSimulationResponse>({} as TSimulationResponse)

    const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false)

    const { familyMember } = useFamilyMemberStore()

    const { data: simulationDataResponse } = useFindSimulation({
      filters: {
        id: simulation?.id as string,
        familyMemberId: familyMember?.id as string,
        status: selectedStatus
      },
      enabled: simulation?.id ? true : false
    })


    useEffect(() => {
      if (simulation) {
        setSimulation({ ...simulation, selected: selectedPlan })
      }
    }, [selectedPlan])

    useEffect(() => {
      if (simulationDataResponse) {
        setSimulationData(simulationDataResponse)
        setSimulation({ ...simulationDataResponse, selected: selectedPlan })
      }
    }, [simulationDataResponse])

    const chartData = [
      { year: "2025", original: simulation?.chartInfo?.[2025]?.original, current: simulation?.chartInfo?.[2025]?.current, done: simulation?.chartInfo?.[2025]?.done },
      { year: "2030", original: simulation?.chartInfo?.[2030]?.original, current: simulation?.chartInfo?.[2030]?.current, done: simulation?.chartInfo?.[2030]?.done },
      { year: "2035", original: simulation?.chartInfo?.[2035]?.original, current: simulation?.chartInfo?.[2035]?.current, },
      { year: "2040", original: simulation?.chartInfo?.[2040]?.original, current: simulation?.chartInfo?.[2040]?.current, },
      { year: "2045", original: simulation?.chartInfo?.[2045]?.original, current: simulation?.chartInfo?.[2045]?.current, },
      { year: "2050", original: simulation?.chartInfo?.[2050]?.original, current: simulation?.chartInfo?.[2050]?.current, },
      { year: "2055", original: simulation?.chartInfo?.[2055]?.original, current: simulation?.chartInfo?.[2055]?.current, },
      { year: "2060", original: simulation?.chartInfo?.[2060]?.original, current: simulation?.chartInfo?.[2060]?.current, }
    ]
    const chartConfig = {
      original: {
        label: "Plano original",
        color: "var(--chart-1)",
      },
      current: {
        label: "Situação atual",
        color: "var(--chart-2)",
      },
      done: {
        label: "Realizado",
        color: "var(--chart-3)"
      }
    } satisfies ChartConfig

    return (
        <>
        <div>
          <RadioGroup defaultValue="dead" className="flex justify-center mb-10">
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="p-3  data-[state=checked]:bg-blue-300 data-[state=checked]:border-blue-300" value="dead" id="dead" />
              <Label className="text-white text-lg" htmlFor="dead">Morto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="p-3 data-[state=checked]:bg-blue-300 data-[state=checked]:border-blue-300" value="invalid" id="invalid" />
              <Label className="text-white text-lg" htmlFor="invalid">Inválido</Label>
            </div>
          </RadioGroup>
        </div>

            <div>
            <ChartContainer config={chartConfig}>
              <LineChart
                data={chartData}
                margin={{ left: -20, right: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />

                <Line
                  type="monotone"
                  dataKey="original"
                  stroke="#8ec5ff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#7bf1a8"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="done"
                  stroke="#ffb86a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
            </div>

            <div className="mt-4 flex gap-3 justify-center">
              <div className="relative">
                <Button variant="outline-blue" onClick={() => setSelectedPlan("original")} className="flex items-center gap-2">
                  <Circle className={`${ selectedPlan === "original" ? "text-blue-300 fill-blue-300" : "" }`} /> Plano original
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary-outline" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                    <div className="flex flex-col items-center">
                      <DropdownMenuItem asChild>
                        <DrawerPlanUpdate />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DrawerPlanDuplicate />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Button variant={"ghost"} onClick={() => setOpenedDeleteModal(true)}>Deletar</Button>
                      </DropdownMenuItem>
                    </div>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </Button>
              </div>

              <div className="relative">
                <Button variant="outline-green" onClick={() => setSelectedPlan("current")} className="flex items-center gap-2">
                  <Circle className={`${ selectedPlan === "current" ? "text-green-300 fill-green-300" : "" }`} /> Situação atual { DateUtils.formatDate(new Date()) }
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary-outline" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div className="p-2 text-sm">
                        Não é possível realizar alterações nesta situação
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Button>
              </div>

                <Button variant={`${ selectedPlan === "done" ? "yellow" : "outline-yellow" }`} onClick={() => setSelectedPlan("done")} className="flex items-center gap-2">
                  Realizado
                </Button>
                <Button variant="secondary-outline" className="flex items-center gap-2">
                  <Plus /> Adicionar simulação
                </Button>
            </div>

            <ModalConfirmation
              onAccept={() => console.log("accepted!")}
              opened={openedDeleteModal}
              onOpenChange={setOpenedDeleteModal}
            />
        </>
    )
}

export {
    HeritageChartComponent as HeritageChart
}

export type {
  TPlanTypes
}