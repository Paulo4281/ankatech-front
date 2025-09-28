import { z } from "zod"
import { InsuranceValidation } from "@/validators/Insurance/InsuranceValidation"

type TInsuranceCreate = z.infer<typeof InsuranceValidation>

type TInsuranceResponse = TInsuranceCreate & {
    id: string
    createdAt: string
}

export type {
    TInsuranceCreate,
    TInsuranceResponse
}