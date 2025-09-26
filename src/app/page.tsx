import { Button } from "@/components/ui/button"
import { Description } from "@/components/Description/Description"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Currency } from "@/components/Currency/Currency"
import { ProgressBar } from "@/components/ProgressBar/ProgressBar"
import { Badge } from "@/components/ui/badge"
import { Divider } from "@/components/Divider/Divider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  return (
    <div className="container">
      <section id="upper-section">

        <div className="
        mt-6 grid grid-cols-1
        lg:grid-cols-2
        ">

          <div className="space-y-5">
            <Select>
              <SelectTrigger className="w-[220px] rounded-3xl !text-white text-lg">
                <SelectValue placeholder="Matheus Silveira" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="x">Matheus Silveira</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <Description
                text="Patrimônio líquido total"
                color="gray"
                size="sm"
              />
              <Currency
                amount="2.679.930,00"
                amountColor="white"
                size="xl"
                symbolColor="gray"
                plusData={{
                  amount: "34,75",
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
                  amount="2.679.930,00"
                  amountColor="white"
                  size="sm"
                  symbolColor="white"
                />
                <ProgressBar
                  value={30}
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
                  amount="3.173,960,00"
                  amountColor="white"
                  size="sm"
                  symbolColor="white"
                  plusData={{
                    amount: "18,37",
                    position: "middle"
                  }}
                />
                <ProgressBar
                  value={25}
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
                  amount="2.173,960,00"
                  amountColor="white"
                  size="sm"
                  symbolColor="white"
                  plusData={{
                    amount: "10,3",
                    position: "middle"
                  }}
                />
                <ProgressBar
                  value={45}
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

      <section className="py-20" id="heritage-projection-section">
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

        <div>
          
        </div>
      </section>
    </div>
  )
};