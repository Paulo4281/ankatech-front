import { Description } from "@/components/Description/Description"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { CardAllocation } from "@/components/Card/CardAllocation/CardAllocation"

export default function Alocacoes() {
    return (
        <>
        <div className="container">
            <section className="flex items-center justify-center max-h-screen">

                <div
                className="
                    h-full
                    w-[1200px]
                    bg-gray-500
                    rounded-2xl
                    p-5
                "
                >
                    <div className="flex justify-between">
                        <div>
                            <Description
                                text="Timeline de alocações manuais"
                                color="white"
                                size="sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex gap-2">
                                <Label htmlFor="alocacoes">Alocações:</Label>
                                <Select>
                                    <SelectTrigger id="alocacoes" className="w-[220px] rounded-3xl !text-white text-lg">
                                        <SelectValue placeholder="Todos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todos</SelectItem>
                                        <SelectItem value="imobilizado">Imobilizado</SelectItem>
                                        <SelectItem value="financeira">Financeira Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Button variant={"orange"}><Plus /> Adicionar</Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <CardAllocation
                            title="CDB Banco Itaú"
                            dateStart="20/06/2024"
                            dateEnd="29/06/2024"
                            amount="1.000.000"
                            types={["financed", "manual-financial", "fixed"]}
                            canUpdate={true}
                            lastUpdate="20/06/2024"
                            progressData={{
                                installments: 20,
                                totalInstallments: 80
                            }}
                        />
                    </div>

                </div>

            </section>
        </div>
        </>
    )
}