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

function DrawerAllocationRegistryUpdateComponent() {
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
                <Button size="icon"><X /></Button>
            </DrawerClose>
        </div>

          <div className="h-full w-full">


            <DrawerFooter>

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