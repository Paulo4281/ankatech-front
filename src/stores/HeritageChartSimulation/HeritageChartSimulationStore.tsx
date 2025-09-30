import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TSimulationResponse } from "@/types/Simulation/TSimulation"
import type { TPlanTypes } from "@/components/Chart/HeritageChart/HeritageChart"

type THeritageChartSimulationDataProps = {
    selected: TPlanTypes
}

type THeritageChartSimulation = {
    simulation: TSimulationResponse & Partial<THeritageChartSimulationDataProps> | null
    setSimulation: (simulation: TSimulationResponse & Partial<THeritageChartSimulationDataProps> | null) => void
}

const useHeritageChartSimulationStore = create<THeritageChartSimulation>()(
    persist(
        (set) => ({
            simulation: null,
            setSimulation: (simulation: TSimulationResponse & Partial<THeritageChartSimulationDataProps> | null) => set({ simulation })
        }),
        { name: "persist:heritage-chart" }
    )
)

export {
    useHeritageChartSimulationStore
}