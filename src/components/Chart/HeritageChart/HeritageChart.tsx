import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Circle } from "lucide-react"

type THeritageChartProps = {

}

function HeritageChartComponent(
    {

    }: THeritageChartProps
) {
    return (
        <>
        <div>
          <RadioGroup defaultValue="dead" className="flex justify-center">
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
            <div
                className="
                h-[500px]
                w-[1200px]
                bg-gray-500
                mt-6
                rounded-2xl
                "
                >
                <h1 className="text-7xl">Gráfico</h1>
            </div>
            <div className="mt-4 flex gap-3 justify-center">
                <Button variant={"outline-gray"} className="border-2 border-blue-300"><Circle /> Plano original</Button>
                <Button variant={"outline-gray"} className="border-2 border-green-300"><Circle /> Situação atual 27/09/2025</Button>
                <Button variant={"outline-gray"} className="border-2 border-orange-300">Realizado</Button>
            </div>
        </>
    )
}

export {
    HeritageChartComponent as HeritageChart
}