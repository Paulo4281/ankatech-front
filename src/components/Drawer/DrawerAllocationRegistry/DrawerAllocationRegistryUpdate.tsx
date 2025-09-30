import { Button } from "@/components/ui/button"
import { Drawer } from "../Drawer"
import {  Pencil, X } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import type { TAllocationRegistryUpdate } from "@/types/Allocation/TAllocationRegistry"
import { zodResolver } from "@hookform/resolvers/zod"
import { AllocationRegistryUpdateValidation } from "@/validators/Allocation/AllocationRegistryValidation"
import { useUpdateAllocationRegistry } from "@/services/Allocation/AllocationRegistryService"
import { Toast } from "@/components/Toast/Toast"
import { queryClient } from "@/providers/QueryClientProvider"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/Calendar/Calendar"
import { InputCurrency } from "@/components/Input/InputCurrency"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"

type TDrawerAllocationRegistryUpdateProps = {
  id: string
  date: Date
  value: string
  allocationId: string
}

function DrawerAllocationRegistryUpdateComponent(
  {
    id,
    date,
    value,
    allocationId
  }: TDrawerAllocationRegistryUpdateProps
) {
    const form = useForm<TAllocationRegistryUpdate>({
      resolver: zodResolver(AllocationRegistryUpdateValidation),
      defaultValues: {
        date: DateUtils.formatToUTC(date),
        value: value
      }
    })

    const updateAllocationRegistryService = useUpdateAllocationRegistry({
      onSuccess: () => {
        form.reset()
        Toast.success("Registro atualizado com sucesso!")
        queryClient.invalidateQueries()
      }
    })

    async function handleSubmit(data: TAllocationRegistryUpdate) {
      data.id = id
      data.allocationId = allocationId
      
      await updateAllocationRegistryService.mutateAsync(data)
    }

    return (
        <>
        <Drawer
          trigger={<Button variant={"orange"} size="icon" className="absolute right-0"><Pencil /></Button>}
          headerTitle="Editar Registro"
          children={
            (
            <form
              id="form-allocation-registry-update"
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
                        value={DateUtils.formatToUTC(date)}
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
                          value={value}
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
                  form="form-allocation-registry-update"
                  disabled={updateAllocationRegistryService.isPending}
                >{updateAllocationRegistryService.isPending ? "Salvando..." : "Salvar"}</Button>
            )
          }
        />
        </>
    )
}

export {
    DrawerAllocationRegistryUpdateComponent as DrawerAllocationRegistryUpdate
}