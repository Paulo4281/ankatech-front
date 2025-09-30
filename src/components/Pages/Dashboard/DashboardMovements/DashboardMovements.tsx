"use client"

import { CardMovement } from "@/components/Card/CardMovement/CardMovement"
import { DrawerMovement } from "@/components/Drawer/DrawerMovement/DrawerMovement"
import { Button } from "@/components/ui/button"
import { useFindMovement } from "@/services/Movement/MovementService"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useState, useEffect } from "react"
import type { TMovementResponse, TMovementClasses } from "@/types/Movement/TMovement"
import { queryClient } from "@/providers/QueryClientProvider"
import { useHeritageChartSimulationStore } from "@/stores/HeritageChartSimulation/HeritageChartSimulationStore"

function DashboardMovementsComponent() {
    const { familyMember } = useFamilyMemberStore()
    const { simulation } = useHeritageChartSimulationStore()

    const [movements, setMovements] = useState<TMovementResponse[]>([])
    const [selectedClass, setSelectedClass] = useState<TMovementClasses>("financial")

    const { data, isLoading, isError } = useFindMovement({
        filters: {
            familyMemberId: familyMember?.id as string,
            class: selectedClass
        }
    })

    useEffect(() => {
        if (data) {
            setMovements(data)
        }
    }, [data])

    function handleClassChange(value: TMovementClasses) {
        setSelectedClass(value)
        queryClient.invalidateQueries()
    }

    return (
        <>
        <section id="movements-section">
            <div className="flex justify-between">
            <div>
                <h1 className="text-2xl text-blue-300 py-10">Movimentações</h1>
            </div>
            <div className="flex gap-2">
                <Button variant={`${ selectedClass === "financial" ? "secondary" : "secondary-outline"}`} onClick={() => handleClassChange("financial")}>Financeiras</Button>
                <Button variant={`${ selectedClass === "fixed" ? "secondary" : "secondary-outline"}`} onClick={() => handleClassChange("fixed")}>Imobilizadas</Button>
                <DrawerMovement />
            </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {
                    movements?.length > 0
                    ?
                    (
                        movements.map((movement) => (
                            <CardMovement
                                key={movement.id}
                                title={movement.title}
                                value={Number(movement.value)}
                                dateStart={movement.dateStart}
                                dateEnd={movement.dateEnd}
                                viewMode={simulation?.selected || "original"}
                                type={movement.type}
                                category={movement.category}
                                frequency={movement.frequency}
                            />
                        ))
                    )
                    :
                    (
                        <h1 className="text-2xl text-white">Sem movimentações</h1>
                    )
                }
            </div>
        </section>
        </>
    )
}

export {
    DashboardMovementsComponent as DashboardMovements
}