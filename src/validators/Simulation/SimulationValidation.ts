import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const SimulationValidation = z.object({
    name: z.string().min(1, { error: DefaultFormErrors.required }),
    dateStart: z.string().min(1, { error: DefaultFormErrors.required }),
    rate: z.union([
        z.string().min(1, { error: DefaultFormErrors.required }),
        z.number().min(1, { error: DefaultFormErrors.required })
    ]),

    id: z.string().optional().nullable(),
    familyMemberId: z.string().optional()

})

export {
    SimulationValidation
}