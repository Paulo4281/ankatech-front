"use client"

import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import { Plus } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import type { TAllocationCreate } from "@/types/Allocation/TAllocation"
import { AllocationCreateValidation, AllocationTypes } from "@/validators/Allocation/AllocationValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputMask } from "@/components/Input/InputMask"
import { InputCurrency } from "@/components/Input/InputCurrency"
import { useSaveAllocation } from "@/services/Allocation/AllocationService"
import { queryClient } from "@/providers/QueryClientProvider"
import { Toast } from "@/components/Toast/Toast"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"

function DrawerAllocationComponent() {
    const form = useForm<TAllocationCreate>({
        resolver: zodResolver(AllocationCreateValidation)
    })

    const { familyMember } = useFamilyMemberStore()

    const saveAllocationService = useSaveAllocation({
        onSuccess: () => {
            form.reset()
            Toast.success("Alocação cadastrada com sucesso")
            queryClient.invalidateQueries({ queryKey: ["allocation"] })
        }
    })

    async function handleSubmit(data: TAllocationCreate) {
        data.familyMemberId = familyMember?.id
        await saveAllocationService.mutateAsync(data)
    }

    const selectedTypes = form.watch("types")

    return (
        <>
        <Drawer
            trigger={<Button variant={"secondary"}><Plus /> Adicionar</Button>}
            headerTitle="Adicionar Alocação"
            children={
                (
                <form
                    id="form-allocation"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >

                <div className="mt-2">
                    <Controller
                        control={form.control}
                        name="types"
                        render={({ field }) => (
                            <>
                            <Label className="mb-2">Tipo *</Label>
                            <Select>
                                <SelectTrigger className="w-full rounded-3xl">
                                <SelectValue placeholder="Selecione os tipos" />
                                </SelectTrigger>
                                <SelectContent>
                                {AllocationTypes.map(option => {
                                    const checked = field.value?.includes(option.value) || false
                                    return (
                                    <div
                                        key={option.value}
                                        className="flex items-center px-2 py-1 cursor-pointer"
                                        onClick={() => {
                                        const newValue = checked
                                            ? field.value.filter((v: string) => v !== option.value)
                                            : [...(field.value ?? []), option.value]
                                        field.onChange(newValue)
                                        }}
                                    >
                                        <input type="checkbox" checked={checked} readOnly className="mr-2" />
                                        {option.label}
                                    </div>
                                    )
                                })}
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
                                <Label htmlFor="allocation-title" className="mb-2">Nome *</Label>
                                <Input
                                    { ...field }
                                    id="allocation-title"
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
                                <Label htmlFor="allocation-value" className="mb-2">Valor *</Label>
                                <InputCurrency
                                    { ...field }
                                    id="allocation-value"
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
                                <Label htmlFor="allocation-fixed-dateend" className="mb-2">Data de início *</Label>
                                <InputMask
                                    { ...field }
                                    id="allocation-fixed-dateend"
                                    placeholder="00/00/0000"
                                    mask="00/00/0000"
                                    inputMode="numeric"
                                />
                            </>
                        )}
                    />
                </div>

                {
                    selectedTypes?.includes("f8248cb3-0cb2-43ca-bd59-f803de603d1c") &&
                    (
                    <div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="dateEnd"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="" className="mb-2">Data de fim *</Label>
                                        <InputMask
                                            { ...field }
                                            id="allocation-fixed-dateend"
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
                                name="installments"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="allocation-fixed-installments" className="mb-2">Quantidade de parcelas *</Label>
                                        <Input
                                            { ...field }
                                            id="allocation-fixed-installments"
                                            type="number"
                                        />
                                    </>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="interestRate"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="allocation-fixed-interestrate" className="mb-2">Taxa de juros (%) *</Label>
                                        <Input
                                            { ...field }
                                            id="allocation-fixed-interestrate"
                                            type="number"
                                        />
                                    </>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="entryValue"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="allocation-fixed-entryvalue" className="mb-2">Entrada *</Label>
                                        <InputCurrency
                                            { ...field }
                                            id="allocation-fixed-entryvalue"
                                            onChangeValue={field.onChange}
                                        />
                                    </>
                                )}
                            />
                        </div>

                    </div>
                    )
                }

                </form>
                )
            }
            footerChildren={
                (
                    <Button
                        type="submit"
                        variant={"default"}
                        form="form-allocation"
                        disabled={saveAllocationService.isPending}
                    >{ saveAllocationService.isPending ? "Salvando..." : "Salvar" }</Button>
                )
            }
        />
        </>
    )
}

export {
    DrawerAllocationComponent as DrawerAllocation
}