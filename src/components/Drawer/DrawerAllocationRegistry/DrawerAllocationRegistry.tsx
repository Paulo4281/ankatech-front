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
import type { TAllocationRegistry } from "@/types/Allocation/TAllocationRegistry"
import { zodResolver } from "@hookform/resolvers/zod"
import { AllocationRegistryValidation } from "@/validators/Allocation/AllocationRegistryValidation"
import { Calendar } from "@/components/Calendar/Calendar"
import { Label } from "@/components/ui/label"
import { InputCurrency } from "@/components/Input/InputCurrency"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"

function DrawerAllocationRegistryComponent() {
    const form = useForm<TAllocationRegistry>({
      resolver: zodResolver(AllocationRegistryValidation)
    })

    async function handleSubmit(data: TAllocationRegistry) {
      const formattedDate = DateUtils.formatDate(data.date, "YYYY-MM-DD")
    }

    return (
        <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
            <Button variant="ghost" size="sm">
                <Plus /> Adicionar novo registro
            </Button>
        </DrawerTrigger>
        <DrawerContent>
        <div className="flex justify-between">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">Adicionar Registro</DrawerTitle>
            </DrawerHeader>
            <DrawerClose asChild className="my-2 mx-2">
                <Button variant={"ghost"} size="icon"><X /></Button>
            </DrawerClose>
        </div>

          <div className="h-full w-full p-3">

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
                      <div>
                        {fieldState.error?.message}
                      </div>
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

            <DrawerFooter>
                <Button
                  type="submit"
                  variant={"default"}
                  form="form-allocation-registry"
                >Salvar</Button>
            </DrawerFooter>

          </div>
        </DrawerContent>
      </Drawer>
        </>
    )
}

export {
    DrawerAllocationRegistryComponent as DrawerAllocationRegistry
}