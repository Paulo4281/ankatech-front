import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const AllocationRegistryCreateValidation = z.object({
    date: z.date().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
    allocationId: z.string().optional()
})

const AllocationRegistryUpdateValidation = z.object({
    date: z.date().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
    id: z.string().optional(),
    allocationId: z.string().optional()
})

export {
    AllocationRegistryCreateValidation,
    AllocationRegistryUpdateValidation
}