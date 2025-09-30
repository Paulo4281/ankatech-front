"use client"

import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import { useForm, Controller } from "react-hook-form"
import { SimulationValidation } from "@/validators/Simulation/SimulationValidation"
import type { TSimulationCreate } from "@/types/Simulation/TSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useSaveSimulation } from "@/services/Simulation/SimulationService"
import { useHeritageChartSimulationStore } from "@/stores/HeritageChartSimulation/HeritageChartSimulationStore"
import { Toast } from "@/components/Toast/Toast"
import { queryClient } from "@/providers/QueryClientProvider"
import { Label } from "@/components/ui/label"
import { InputMask } from "@/components/Input/InputMask"
import { Input } from "@/components/ui/input"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { Plus } from "lucide-react"

function DrawerPlanAddBtnComponent() {
    const { simulation } = useHeritageChartSimulationStore()
    const { familyMember } = useFamilyMemberStore()

    const form = useForm<TSimulationCreate>({
        resolver: zodResolver(SimulationValidation),
        defaultValues: {
            name: simulation?.name || "",
            dateStart: DateUtils.formatDate(simulation?.dateStart as string) || "",
            rate: simulation?.rate || 0
        }
    })

    const saveSimulationService = useSaveSimulation({
        onSuccess: () => {
            Toast.success("Simulação cadastrada com sucesso!")
        }
    })

    async function handleSubmit(data: TSimulationCreate) {
        data.id = simulation?.id || null
        data.familyMemberId = familyMember?.id

        await saveSimulationService.mutateAsync(data)
        queryClient.invalidateQueries()
    }

    return (
        <>
        <Drawer
            trigger={<Button variant="secondary-outline" className="flex items-center gap-2"><Plus /> Adicionar simulação</Button>}
            headerTitle="Adicionar Simulação"
            children={
                (
                    <form
                        id="form-simulation-add"
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
                        form="form-simulation-add"
                        disabled={saveSimulationService.isPending}
                    >{ saveSimulationService.isPending ? "Salvando..." : "Salvar"}</Button>
                )
            }
        />
        </>
    )
}

export {
    DrawerPlanAddBtnComponent as DrawerPlanAddBtn
}