import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const AllocationRegistryValidation = z.object({
    date: z.date().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
})

export {
    AllocationRegistryValidation
}