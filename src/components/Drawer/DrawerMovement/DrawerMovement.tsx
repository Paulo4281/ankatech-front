"use client"

import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import { Plus } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { MovementValidation } from "@/validators/Movement/MovementValidation"
import type { TMovementCreate } from "@/types/Movement/TMovement"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useSaveMovement } from "@/services/Movement/MovementService"
import { Toast } from "@/components/Toast/Toast"
import { queryClient } from "@/providers/QueryClientProvider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MovementTypes, MovementCategories, MovementClasses, MovementFrequencies } from "@/validators/Movement/MovementValidation"
import { InputCurrency } from "@/components/Input/InputCurrency"
import { InputMask } from "@/components/Input/InputMask"
import { Input } from "@/components/ui/input"

function DrawerMovementComponent() {
    const form = useForm<TMovementCreate>({
        resolver: zodResolver(MovementValidation),
        defaultValues: {
            dateEnd: ""
        }
    })

    const { familyMember } = useFamilyMemberStore()

    const saveMovementService = useSaveMovement({
        onSuccess: () => {
            form.reset()
            Toast.success("Movimento cadastrado com sucesso")
            queryClient.invalidateQueries()
        }
    })

    async function handleSubmit(data: TMovementCreate) {
        data.familyMemberId = familyMember?.id
        
        await saveMovementService.mutateAsync(data)
    }

    return (
        <>
        <Drawer
            trigger={<Button variant={"secondary"} size="icon"><Plus /></Button>}
            headerTitle="Novo Movimento"
            children={
                (
                    <form
                        id="form-movement"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >

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

                        <div className="mt-2">
                            <Controller
                                control={form.control}
                                name="dateEnd"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="dateEnd" className="mb-2">Data de fim</Label>
                                        <InputMask
                                            { ...field }
                                            id="dateEnd"
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
                                                    MovementTypes.map((type) => (
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
                                name="class"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="class" className="mb-2">Classe *</Label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger id="class" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    MovementClasses.map((type) => (
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
                                name="category"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="category" className="mb-2">Categoria *</Label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger id="category" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    MovementCategories.map((type) => (
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
                                name="frequency"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="frequency" className="mb-2">Frequência *</Label>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger id="frequency" className="w-full">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    MovementFrequencies.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
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
                        form="form-movement"
                        disabled={saveMovementService.isPending}
                    >{ saveMovementService.isPending ? "Salvando..." : "Cadastrar"}</Button>
                )
            }
        />
        </>
    )
}

export {
    DrawerMovementComponent as DrawerMovement
}