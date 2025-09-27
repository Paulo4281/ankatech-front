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

type THeritageChartProps = {

}

function HeritageChartComponent(
    {

    }: THeritageChartProps
) {

    const chartData = [
      { year: "2025", original: 5, current: 10, done: 10 },
      { year: "2030", original: 10, current: 12, done: 12 },
      { year: "2035", original: 15, current: 16, done: 16 },
      { year: "2040", original: 18, current: 18, },
      { year: "2045", original: 22, current: 19, },
      { year: "2050", original: 27, current: 19, },
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
                  stroke="#ffdf20"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
            </div>

            <div className="mt-4 flex gap-3 justify-center">
              <div className="relative">
                <Button variant="outline-blue" className="flex items-center gap-2">
                  <Circle /> Plano original
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log("Opção 1")}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={({}) => console.log("Opção 2")}>Criar nova versão</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Opção 3")}>Deletar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Button>
              </div>

              <div className="relative">
                <Button variant="outline-green" className="flex items-center gap-2">
                  <Circle /> Situação atual { DateUtils.formatDate(new Date()) }
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log("Opção 1")}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={({}) => console.log("Opção 2")}>Criar nova versão</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Opção 3")}>Deletar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Button>
              </div>

                <Button variant="outline-yellow" className="flex items-center gap-2">
                  Realizado
                </Button>
                <Button variant="secondary-outline" className="flex items-center gap-2">
                  <Plus /> Adicionar simulação
                </Button>
            </div>

        </>
    )
}

export {
    HeritageChartComponent as HeritageChart
}