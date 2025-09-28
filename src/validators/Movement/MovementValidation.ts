import { z } from "zod"
import { DefaultFormErrors } from "@/utils/errors/DefaultFormErrors"

const MovementTypes = [
    {
        value: "earning",
        label: "Rendimento"
    },
    {
        value: "expense",
        label: "Despesa"
    }
] as const

const MovementClasses = [
    {
        value: "financial",
        label: "Financeira"
    },
    {
        value: "fixed",
        label: "Imobilizada"
    }
] as const

const MovementFrequencies = [
    {
        value: "unique",
        label: "Única"
    },
    {
        value: "monthly",
        label: "Mensal"
    },
    {
        value: "yearly",
        label: "Anual"
    }
] as const

const MovementCategories = [
    {
        value: "credit",
        label: "Crédito"
    },
    {
        value: "dependent",
        label: "Dependente"
    },
    {
        value: "fixed",
        label: "Imobilizado"
    }
] as const

const MovementValidation = z.object({
    title: z.string().min(1, { error: DefaultFormErrors.required }),
    value: z.string().min(1, { error: DefaultFormErrors.required }),
    dateStart: z.string().min(1, { error: DefaultFormErrors.required }),
    type: z.enum(MovementTypes.map((type) => type.value), { error: DefaultFormErrors.required }),
    class: z.enum(MovementClasses.map((type) => type.value), { error: DefaultFormErrors.required }),
    category: z.enum(MovementCategories.map((category) => category.value), { error: DefaultFormErrors.required }),
    frequency: z.enum(MovementFrequencies.map((frequency) => frequency.value), { error: DefaultFormErrors.required }),

    dateEnd: z.string().optional(),
    familyMemberId: z.string().optional()
})

export {
    MovementValidation,
    MovementCategories,
    MovementClasses,
    MovementFrequencies,
    MovementTypes
}