import { z } from "zod"
import { MovementValidation } from "@/validators/Movement/MovementValidation"
import { MovementClasses, MovementTypes, MovementCategories, MovementFrequencies } from "@/validators/Movement/MovementValidation"

type TMovementCreate = z.infer<typeof MovementValidation>

type TMovementResponse = Required<TMovementCreate> & {
    id: string
    createdAt: string
}

type TMovementClasses = typeof MovementClasses[number]["value"]

type TMovementTypes = typeof MovementTypes[number]["value"]

type TMovementCategories = typeof MovementCategories[number]["value"]

type TMovementFrequencies = typeof MovementFrequencies[number]["value"]

export type {
    TMovementCreate,
    TMovementResponse,
    TMovementClasses,
    TMovementTypes,
    TMovementCategories,
    TMovementFrequencies
}