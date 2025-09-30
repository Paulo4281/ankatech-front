import { z } from "zod"
import { AllocationCreateValidation } from "@/validators/Allocation/AllocationValidation"
import { TAllocationType } from "./TAllocationType"
import { TAllocationRegistryResponse } from "./TAllocationRegistry"

type TAllocationCreate = z.infer<typeof AllocationCreateValidation>

type TAllocationResponse = Required<TAllocationCreate> & {
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
    TAllocationCreate,
    TAllocationResponse,
    TAllocationFindParams,
}