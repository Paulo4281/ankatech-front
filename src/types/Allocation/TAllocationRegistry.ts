import { z } from "zod"
import { AllocationRegistryValidation } from "@/validators/Allocation/AllocationRegistryValidation"

type TAllocationRegistry = z.infer<typeof AllocationRegistryValidation>

type TAllocationRegistryFind = TAllocationRegistry & {
    id: string
    createdAt: string
}

export type {
    TAllocationRegistry,
    TAllocationRegistryFind
}