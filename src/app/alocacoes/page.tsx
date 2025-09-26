"use client"

import { Description } from "@/components/Description/Description"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardAllocation } from "@/components/Card/CardAllocation/CardAllocation"
import { DrawerAllocation } from "@/components/Drawer/DrawerAllocation/DrawerAllocation"
import { useState, useEffect } from "react"
import { useFindAllocation } from "@/services/Allocation/AllocationService"
import type { TAllocationResponse } from "@/types/Allocation/TAllocation"
import { useSearchParams } from "next/navigation"

export default function Alocacoes() {
    const searchParams = useSearchParams()

    const allocationTypes = searchParams.get("allocationTypeId") as string

    const { data, isLoading, isError } = useFindAllocation({
        allocationTypeId: allocationTypes
    })


    const [allocations, setAllocations] = useState<TAllocationResponse[]>([])

    useEffect(() => {
        setAllocations(data as TAllocationResponse[])
        console.log(allocations)
    }, [data])

    return (
        <>
        <div className="container">
            <section className="flex items-center justify-center max-h-screen">

                <div
                className="
                    h-full
                    w-[1200px]
                    bg-zinc-800
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
                                <Label htmlFor="alocacoes" className="text-white">Alocações:</Label>
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
                                <DrawerAllocation />
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            allocations?.length > 0 &&
                            (
                                allocations.map((allocation, index) => (
                                    <CardAllocation
                                        key={allocation.id}
                                        title={allocation.title}
                                        dateStart={allocation.createdAt || ""}
                                        dateEnd={""}
                                        amount={allocation.value}
                                        types={allocation.types.map((type) => (type as any)?.allocationType?.name)}
                                        canUpdate={true}
                                        lastUpdate={allocation.updatedAt || ""}
                                    />
                                ))
                            )
                        }
                    </div>

                </div>

            </section>
        </div>
        </>
    )
}