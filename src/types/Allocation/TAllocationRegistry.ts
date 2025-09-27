import { z } from "zod"
import { AllocationRegistryCreateValidation, AllocationRegistryUpdateValidation } from "@/validators/Allocation/AllocationRegistryValidation"

type TAllocationRegistryCreate = z.infer<typeof AllocationRegistryCreateValidation>

type TAllocationRegistryResponse = TAllocationRegistryCreate & {
    id: string
    createdAt: string
}

type TAllocationRegistryUpdate = z.infer<typeof AllocationRegistryUpdateValidation>

export type {
    TAllocationRegistryCreate,
    TAllocationRegistryResponse,
    TAllocationRegistryUpdate
}