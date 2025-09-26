import { z } from "zod"
import { AllocationCreateValidator } from "@/validators/Allocation/AllocationValidator"

type TAllocation = z.infer<typeof AllocationCreateValidator>

type TAllocationResponse = TAllocation & {
    id: string
    updatedAt: string
    createdAt: string
}

type TAllocationFindParams = {
    allocationTypeId: string
}

export type {
    TAllocation,
    TAllocationResponse,
    TAllocationFindParams
}