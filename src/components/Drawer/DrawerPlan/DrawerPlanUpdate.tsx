"use client"

import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import { useForm, Controller } from "react-hook-form"
import { SimulationValidation } from "@/validators/Simulation/SimulationValidation"
import type { TSimulationUpdate } from "@/types/Simulation/TSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useUpdateSimulation } from "@/services/Simulation/SimulationService"
import { useHeritageChartSimulationStore } from "@/stores/HeritageChartSimulation/HeritageChartSimulationStore"
import { Toast } from "@/components/Toast/Toast"
import { queryClient } from "@/providers/QueryClientProvider"
import { Label } from "@/components/ui/label"
import { InputMask } from "@/components/Input/InputMask"
import { Input } from "@/components/ui/input"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"

function DrawerPlanUpdateComponent() {
    const { familyMember } = useFamilyMemberStore()
    const { setSimulation, simulation } = useHeritageChartSimulationStore()

    const form = useForm<TSimulationUpdate>({
        resolver: zodResolver(SimulationValidation),
        defaultValues: {
            name: simulation?.name || "",
            dateStart: DateUtils.formatDate(simulation?.dateStart as string) || "",
            rate: simulation?.rate || 0
        }
    })

    const updateSimulationService = useUpdateSimulation({
        onSuccess: () => {
            Toast.success("Simulação atualizada com sucesso")
        }
    })

    async function handleSubmit(data: TSimulationUpdate) {
        data.id = simulation?.id || null
        data.familyMemberId = familyMember?.id

        const simulationResponse = await updateSimulationService.mutateAsync(data)
        setSimulation(simulationResponse)
        queryClient.invalidateQueries()
    }

    return (
        <>
        <Drawer
            trigger={<Button variant={"ghost"}>Editar</Button>}
            headerTitle="Editar Simulação"
            children={
                (
                    <form
                        id="form-simulation-update"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <>
                                    <Label htmlFor="name" className="mb-2">Nome *</Label>
                                    <Input
                                        { ...field }
                                        id="title"
                                        type="text"
                                    />
                                    </>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="dateStart"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="dateStart" className="mb-2">Data de início *</Label>
                                        <InputMask
                                            { ...field }
                                            id="dateStart"
                                            placeholder="00/00/0000"
                                            mask="00/00/0000"
                                            inputMode="numeric"
                                        />
                                    </>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="rate"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="rate" className="mb-2">Taxa * (4% padrão)</Label>
                                        <Input
                                            { ...field }
                                            id="rate"
                                            type="number"
                                            inputMode="numeric"
                                        />
                                    </>
                                )}
                            />
                        </div>

                    </form>
                )
            }
            footerChildren={
                (
                    <Button
                        type="submit"
                        variant={"default"}
                        form="form-simulation-update"
                        disabled={updateSimulationService.isPending}
                    >{ updateSimulationService.isPending ? "Salvando..." : "Atualizar"}</Button>
                )
            }
        />
        </>
    )
}

export {
    DrawerPlanUpdateComponent as DrawerPlanUpdate
}