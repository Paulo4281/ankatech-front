import { z } from "zod"
import { AllocationCreateValidator } from "@/validators/Allocation/AllocationValidator"

type TAllocation = z.infer<typeof AllocationCreateValidator>

type TAllocationFind = TAllocation & {
    id: string
    updatedAt: string
    createdAt: string
}

export type {
    TAllocation,
    TAllocationFind
}