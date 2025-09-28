import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const InsuranceTypes = [
    {
        value: "life",
        label: "Seguro de Vida"
    },
    {
        value: "disability",
        label: "Seguro de Invalidez"
    }
] as const

const InsuranceValidation = z.object({
    type: z.enum(InsuranceTypes.map((type) => type.value), { error: DefaultFormErrors.required }),
    title: z.string().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
    dateStart: z.string().min(1, { error: DefaultFormErrors.required }),
    duration: z.string().min(1, { error: DefaultFormErrors.required }),
    prize: z.string().min(1, { error: DefaultFormErrors.required }),

    familyMemberId: z.string().optional()
})

export {
    InsuranceValidation,
    InsuranceTypes
}