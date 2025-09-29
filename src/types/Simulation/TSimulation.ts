import { z } from "zod"
import { SimulationValidation } from "@/validators/Simulation/SimulationValidation"

type TSimulationCreate = z.infer<typeof SimulationValidation>

type TSimulationUpdate = TSimulationCreate

type TSimulationResponse = TSimulationCreate & {
    id: string
    updatedAt: string
    createdAt: string
}

export type {
    TSimulationCreate,
    TSimulationUpdate,
    TSimulationResponse
}