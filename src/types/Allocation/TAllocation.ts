import { z } from "zod"
import { AllocationCreateValidator } from "@/validators/Allocation/AllocationValidator"
import { TAllocationType } from "./TAllocationType"
import { TAllocationRegistryResponse } from "./TAllocationRegistry"

type TAllocation = z.infer<typeof AllocationCreateValidator>

type TAllocationResponse = TAllocation & {
    id: string
    updatedAt: string
    createdAt: string
    types: TAllocationType[]
    registries: TAllocationRegistryResponse[]
}

type TAllocationFindParams = {
    allocationTypeId: string
}

export type {
    TAllocation,
    TAllocationResponse,
    TAllocationFindParams,
}