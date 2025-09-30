"use client"

import { CardAllocation } from "@/components/Card/CardAllocation/CardAllocation"
import { Description } from "@/components/Description/Description"
import { DrawerAllocation } from "@/components/Drawer/DrawerAllocation/DrawerAllocation"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFindAllocation } from "@/services/Allocation/AllocationService"
import { TAllocationResponse } from "@/types/Allocation/TAllocation"
import { AllocationTypes } from "@/validators/Allocation/AllocationValidation"
import { useEffect, useState } from "react"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"

function AllocationsCardsSectionComponent() {
    const [selectedAllocationTypeId, setSelectedAllocationTypeId] = useState<string>("75679762-aaf6-4393-8113-03a9309f0add,f8248cb3-0cb2-43ca-bd59-f803de603d1c,983b8fee-1957-47a4-8785-8d4e1819137d")

    const { familyMember } = useFamilyMemberStore()

    const { data } = useFindAllocation({
        filters: {
            allocationTypeId: selectedAllocationTypeId,
            familyMemberId: familyMember?.id as string
        }
    })

    const [allocations, setAllocations] = useState<TAllocationResponse[]>([])

    useEffect(() => {
        setAllocations(data as TAllocationResponse[])
    }, [data])

    return (
        <>
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
                                <Select onValueChange={(value) => setSelectedAllocationTypeId(value)}>
                                    <SelectTrigger
                                        id="alocacoes"
                                        className="w-[220px] rounded-3xl !text-white text-lg"
                                    >
                                        <SelectValue placeholder="Todos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="75679762-aaf6-4393-8113-03a9309f0add,f8248cb3-0cb2-43ca-bd59-f803de603d1c,983b8fee-1957-47a4-8785-8d4e1819137d">Todos</SelectItem>
                                        {
                                            AllocationTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                            ))
                                        }
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
                            allocations?.length > 0
                            ?
                            (
                                allocations.map((allocation, index) => (
                                    <CardAllocation
                                        id={allocation.id}
                                        key={allocation.id}
                                        title={allocation.title}
                                        dateStart={allocation.createdAt || ""}
                                        dateEnd={allocation.dateEnd || ""}
                                        amount={allocation.value}
                                        entryValue={allocation.entryValue}
                                        totalInstallments={allocation.installments}
                                        types={allocation.types.map((type) => (type as any).allocationType?.name)}
                                        canUpdate={true}
                                        lastUpdate={allocation.updatedAt || ""}
                                        timelineItems={allocation.registries}
                                        registries={allocation.registries}
                                    />
                                ))
                            )
                            :
                            (
                                <div className="mt-6 text-center">
                                    <Description
                                        text="Nenhuma alocação encontrada"
                                        color="white"
                                        size="md"
                                    />
                                </div>
                            )
                        }
                    </div>

                </div>

            </section>
        </>
    )
}

export {
    AllocationsCardsSectionComponent as AllocationsCardSection
}