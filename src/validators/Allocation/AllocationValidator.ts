import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const AllocationTypes = [
    {
        value: "75679762-aaf6-4393-8113-03a9309f0add",
        label: "Imobilizada"
    },
    {
        value: "f8248cb3-0cb2-43ca-bd59-f803de603d1c",
        label: "Financiado"
    },
    {
        value: "983b8fee-1957-47a4-8785-8d4e1819137d",
        label: "Financeira Manual"
    }
]

const AllocationCreateValidator = z.object({
    types: z.array(
        z.enum(
            AllocationTypes.map((type) => type.value)
        )
    ).nonempty({ error: DefaultFormErrors.required }),
    title: z.string().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
    dateStart: z.string(),
    
    familyMemberId: z.string().optional(),
    dateEnd: z.string().optional(),
    installments: z.string().optional(),
    interestRate: z.string().optional(),
    entryValue: z.string().optional()
}).superRefine((data, ctx) => {
    if (data.types.includes("f8248cb3-0cb2-43ca-bd59-f803de603d1c")) {
        if (!data.dateEnd) {
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