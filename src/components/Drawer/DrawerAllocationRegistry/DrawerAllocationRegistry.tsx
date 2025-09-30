import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import {  Pencil, Plus, X } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import type { TAllocationRegistryCreate } from "@/types/Allocation/TAllocationRegistry"
import { zodResolver } from "@hookform/resolvers/zod"
import { AllocationRegistryCreateValidation } from "@/validators/Allocation/AllocationRegistryValidation"
import { Calendar } from "@/components/Calendar/Calendar"
import { Label } from "@/components/ui/label"
import { InputCurrency } from "@/components/Input/InputCurrency"
import { useSaveAllocationRegistry } from "@/services/Allocation/AllocationRegistryService"
import { Toast } from "@/components/Toast/Toast"
import { queryClient } from "@/providers/QueryClientProvider"

type TDrawerAllocationRegistryProps = {
  allocationId: string
  updateBtn?: boolean
}

function DrawerAllocationRegistryComponent(
  {
    allocationId,
    updateBtn=true
  }: TDrawerAllocationRegistryProps
) {
    const form = useForm<TAllocationRegistryCreate>({
      resolver: zodResolver(AllocationRegistryCreateValidation),
      defaultValues: {
        date: new Date(),
      }
    })

    const saveAllocationRegistryService = useSaveAllocationRegistry({
      onSuccess: () => {
        form.reset()
        Toast.success("Registro cadastrado com sucesso!")
        queryClient.invalidateQueries()
      }
    })

    async function handleSubmit(data: TAllocationRegistryCreate) {
      data.allocationId = allocationId
      await saveAllocationRegistryService.mutateAsync(data)
    }

    return (
        <>
        <Drawer
          trigger={
              updateBtn
              ?
              (
                <Button variant={"orange-outline"}><Pencil /> Atualizar</Button>
              )
              :
              (
                <Button variant="ghost" size="sm">
                    <Plus /> Adicionar novo registro
                </Button>
              )
            }
          headerTitle={ updateBtn ? "Atualizar Registro" : "Adicionar Registro" }
          children={
            (
            <form
              id="form-allocation-registry"
              onSubmit={form.handleSubmit(handleSubmit)}
            >

              <div className="">
                <Controller
                  control={form.control}
                  name="date"
                  render={({ field, fieldState }) => (
                    <>
                      <Label htmlFor="" className="mb-2">Data</Label>
                      <Calendar
                        value={field.value as unknown as Date}
                        onChangeValue={field.onChange}
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
                        <Label htmlFor="allocation-registry-value" className="mb-2">Valor</Label>
                        <InputCurrency
                          { ...field }
                          id="allocation-registry-value"
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
                  form="form-allocation-registry"
                  disabled={saveAllocationRegistryService.isPending}
                >{saveAllocationRegistryService.isPending ? "Salvando..." : "Salvar"}</Button>
            )
          }
        />
        </>
    )
}

export {
    DrawerAllocationRegistryComponent as DrawerAllocationRegistry
}