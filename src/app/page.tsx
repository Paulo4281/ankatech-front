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

export default function Dashboard() {
  return (
    <div className="container">
      <section>

        <div>
          <Select>
            <SelectTrigger className="w-[220px] rounded-3xl !text-white text-lg">
              <SelectValue placeholder="Matheus Silveira" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="x">Mateus Silveira</SelectItem>
              <SelectItem value="y">Luís Gonçalves</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <Description
            text="Patrimônio líquido total"
            color="gray"
            size="sm"
          />
          <Currency
            amount="2.679.930,00"
            amountColor="white"
            size="lg"
            symbolColor="gray"
            plusData={{
              amount: "34,75",
              position: "bottom"
            }}
          />
        </div>

      </section>
    </div>
  )
}