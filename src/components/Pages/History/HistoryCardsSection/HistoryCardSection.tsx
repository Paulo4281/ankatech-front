"use client"

import { CardHistory } from "@/components/Card/CardHistory/CardHistory"
import { Description } from "@/components/Description/Description"
import { Divider } from "@/components/Divider/Divider"
import { useListHistorySimulation } from "@/services/Simulation/SimulationService"
import { useState, useEffect } from "react"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import type { TSimulationResponse } from "@/types/Simulation/TSimulation"
import { fetchFindSimulation } from "@/services/Simulation/SimulationService"

function HistoryCardSectionComponent() {
    const { familyMember } = useFamilyMemberStore()

    const { data } = useListHistorySimulation({
        filters: {
            familyMemberId: familyMember?.id as string
        }
    })

    const [historySimulations, setHistorySimulations] = useState<TSimulationResponse[]>([])

    useEffect(() => {
        async function handleResponse() {
            if (data) {
                const parsedData = await Promise.all(
                    data.map(async (simulation) => {
                        const simulationChartInfo = await fetchFindSimulation({                            
                            id: simulation.id as string,
                            familyMemberId: familyMember?.id as string,
                            status: "dead,invalid"
                        })

                        console.log(simulationChartInfo)

                        return {
                            ...simulation,
                            finalPrize: simulationChartInfo?.chartInfo?.[2060]?.original
                        }
                    })
                )

                setHistorySimulations(parsedData)
            }
        }

        handleResponse()
    }, [data])

    return (
        <>
        <section id="history-section">

            <div className="mt-16">
                <Description
                    text="Histórico de simulações"
                    color="white"
                    size="xl"
                />
                <Divider />
            </div>

            <div className="mt-5 space-y-2">
                {
                    historySimulations.length > 0
                    ?
                    (
                        historySimulations.map((simulation) => (
                            <CardHistory
                                key={simulation.id}
                                title={simulation.name}
                                versions={[
                                    {
                                        date: simulation.dateStart,
                                        finalHeritage: simulation.finalPrize as number || 0,
                                        retirementDate: "01/01/2045",
                                        simulationId: simulation.id as string,
                                        version: "1"
                                    }
                                ]}
                            />
                        ))
                    )
                    :
                    (
                        <Description
                            text="Nenhuma simulação encontrada"
                            color="white"
                            size="md"
                        />
                    )
                }
            </div>
        </section>
        </>
    )
}

export {
    HistoryCardSectionComponent as HistoryCardSection
}