import { z } from "zod"
import { SimulationValidation } from "@/validators/Simulation/SimulationValidation"

type TSimulationCreate = z.infer<typeof SimulationValidation>

type TSimulationUpdate = TSimulationCreate

type TSimulationResponse = TSimulationCreate & {
    id: string | null
    updatedAt: string
    createdAt: string
    chartInfo?: {
        [key in "2025" | "2030" | "2035" | "2040" | "2045" | "2050" | "2055" | "2060"]: {
            original: number
            current: number
            done: number
        }
    }
}

export type {
    TSimulationCreate,
    TSimulationUpdate,
    TSimulationResponse
}