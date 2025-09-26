"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {  Plus, X } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import type { TAllocation } from "@/types/Allocation/TAllocation"
import { AllocationCreateValidator, AllocationTypes } from "@/validators/Allocation/AllocationValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IMaskInput } from "react-imask"
import { InputMask } from "@/components/Input/InputMask"
import { InputCurrency } from "@/components/Input/InputCurrency"

function DrawerAllocationComponent() {
    const form = useForm<TAllocation>({
        resolver: zodResolver(AllocationCreateValidator)
    })

    async function handleSubmit(data: TAllocation) {
        console.log(data)
    }

    const selectedType = form.watch("type")

    return (
        <>
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant={"orange"}><Plus /> Adicionar</Button>
            </DrawerTrigger>
            <DrawerContent>
            <div className="flex justify-between">
                <DrawerHeader>
                <DrawerTitle className="text-2xl">Adicionar Alocação</DrawerTitle>
                </DrawerHeader>
                <DrawerClose asChild className="my-2 mx-2">
                    <Button variant={"ghost"} size="icon"><X /></Button>
                </DrawerClose>
            </div>

            <div className="h-full w-full p-3">

                <form
                    id="form-allocation"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >

                <div className="mt-2">
                    <Controller
                        control={form.control}
                        name="type"
                        render={({ field, fieldState }) => (
                            <>
                                <Label htmlFor="allocation-type" className="mb-2">Tipo</Label>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger id="allocation-type" className="w-full rounded-3xl">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AllocationTypes.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </>
                        )}
                    />
                </div>

                <div className="mt-2">
                    <Controller
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <>
                                <Label htmlFor="allocation-name" className="mb-2">Nome</Label>
                                <Input
                                    { ...field }
                                    id="allocation-name"
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
                                <Label htmlFor="allocation-value" className="mb-2">Valor</Label>
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

                {
                    selectedType === "fixed" &&
                    (
                    <div className="mt-2">

                        <div>
                            <Controller
                                control={form.control}
                                name="startDate"
                                render={({ field, fieldState }) => (
                                    <>
                                        <Label htmlFor="allocation-fixed-startdate" className="mb-2">Data de início</Label>
                                        <InputMask
                                            { ...field }
                                            id="allocation-fixed-startdate"
                                            placeholder="00/00/0000"
                                            mask="00/00/0000"
                                            inputMode="numeric"
                                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                                        <Label htmlFor="allocation-fixed-installments" className="mb-2">Quantidade de parcelas</Label>
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
                                        <Label htmlFor="allocation-fixed-interestrate" className="mb-2">Taxa de juros (%)</Label>
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
                                        <Label htmlFor="allocation-fixed-entryvalue" className="mb-2">Entrada</Label>
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

                <DrawerFooter>
                    <Button
                        type="submit"
                        variant={"default"}
                        form="form-allocation"
                    >Salvar</Button>
                </DrawerFooter>

            </div>
            </DrawerContent>
        </Drawer>
        </>
    )
}

export {
    DrawerAllocationComponent as DrawerAllocation
}