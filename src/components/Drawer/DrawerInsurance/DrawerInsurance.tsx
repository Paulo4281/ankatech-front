"use client"

import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import { useForm, Controller } from "react-hook-form"
import { InsuranceTypes, InsuranceValidation } from "@/validators/Insurance/InsuranceValidation"
import type { TInsuranceCreate } from "@/types/Insurance/TInsurance"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useSaveInsurance } from "@/services/Insurance/InsuranceService"
import { Toast } from "@/components/Toast/Toast"
import { queryClient } from "@/providers/QueryClientProvider"
import { Label } from "@/components/ui/label"
import { InputCurrency } from "@/components/Input/InputCurrency"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { InputMask } from "@/components/Input/InputMask"

function DrawerInsuranceComponent() {
    const form = useForm<TInsuranceCreate>({
        resolver: zodResolver(InsuranceValidation)
    })

    const { familyMember } = useFamilyMemberStore()

    const saveInsuranceService = useSaveInsurance({
        onSuccess: () => {
            form.reset()
            Toast.success("Seguro cadastrado com sucesso")
            queryClient.invalidateQueries()
        }
    })

    async function handleSubmit(data: TInsuranceCreate) {
        data.familyMemberId = familyMember?.id

        await saveInsuranceService.mutateAsync(data)
    }

    return (
        <>
        <Drawer
            trigger={<Button variant={"secondary"} size="icon"><Plus /></Button>}
            headerTitle="Novo Seguro"
            children={
                (
                    <form
                    id="form-insurance"
                    onSubmit={form.handleSubmit(handleSubmit)}
                    >

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="type"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="type" className="mb-2">Tipo *</Label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger id="type" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    InsuranceTypes.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <>
                                    <Label htmlFor="title" className="mb-2">Título *</Label>
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
                                name="value"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="value" className="mb-2">Valor *</Label>
                                        <InputCurrency
                                            { ...field }
                                            id="value"
                                            value={field.value ?? ""}
                                            onChangeValue={field.onChange}
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

                        <div>
                            <Controller
                                control={form.control}
                                name="duration"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="duration" className="mb-2">Duração (meses) *</Label>
                                        <Input
                                            { ...field }
                                            id="duration"
                                            type="number"
                                        />
                                    </>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="prize"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="prize" className="mb-2">Prêmio * (mensal)</Label>
                                        <InputCurrency
                                            { ...field }
                                            id="prize"
                                            value={field.value ?? ""}
                                            onChangeValue={field.onChange}
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
                        form="form-insurance"
                        disabled={saveInsuranceService.isPending}
                    >{ saveInsuranceService.isPending ? "Salvando..." : "Cadastrar"}</Button>
                )
            }
        />
        </>
    )
}

export {
    DrawerInsuranceComponent as DrawerInsurance
}