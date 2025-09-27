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
        queryClient.invalidateQueries({ queryKey: ["allocation"] })
      }
    })

    async function handleSubmit(data: TAllocationRegistryUpdate) {
      data.id = id
      data.allocationId = allocationId
      
      await updateAllocationRegistryService.mutateAsync(data)
    }

    return (
        <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
            <Button variant={"orange"} size="icon" className="absolute right-0"><Pencil /></Button>
        </DrawerTrigger>
        <DrawerContent>
        <div className="flex justify-between">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">Editar Registro</DrawerTitle>
            </DrawerHeader>
            <DrawerClose asChild className="my-2 mx-2">
                <Button variant={"ghost"} size="icon"><X /></Button>
            </DrawerClose>
        </div>

          <div className="h-full w-full p-3">

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

            <DrawerFooter>
                <Button
                  type="submit"
                  variant={"default"}
                  form="form-allocation-registry-update"
                  disabled={updateAllocationRegistryService.isPending}
                >{updateAllocationRegistryService.isPending ? "Salvando..." : "Salvar"}</Button>
            </DrawerFooter>

          </div>
        </DrawerContent>
      </Drawer>
        </>
    )
}

export {
    DrawerAllocationRegistryUpdateComponent as DrawerAllocationRegistryUpdate
}