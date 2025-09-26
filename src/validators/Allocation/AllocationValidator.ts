import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const AllocationTypes = [
    {
        value: "fixed",
        label: "Imobilizada"
    },
    {
        value: "financial",
        label: "Financeira"
    }
]

const AllocationCreateValidator = z.object({
    type: z.enum(AllocationTypes.map((type) => type.value), { error: DefaultFormErrors.required }),
    name: z.string().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
    
    startDate: z.string().optional(),
    installments: z.string().optional(),
    interestRate: z.string().optional(),
    entryValue: z.string().optional()
}).superRefine((data, ctx) => {
    if (data.type === "fixed") {
        if (!data.startDate) {
        ctx.addIssue({ path: ["startDate"], code: "custom", message: DefaultFormErrors.required })
        }
        if (!data.installments) {
        ctx.addIssue({ path: ["installments"], code: "custom", message: DefaultFormErrors.required })
        }
        if (!data.interestRate) {
        ctx.addIssue({ path: ["interestRate"], code: "custom", message: DefaultFormErrors.required })
        }
        if (!data.entryValue) {
        ctx.addIssue({ path: ["entryValue"], code: "custom", message: DefaultFormErrors.required })
        }
    }
})


export {
    AllocationCreateValidator,
    AllocationTypes
}