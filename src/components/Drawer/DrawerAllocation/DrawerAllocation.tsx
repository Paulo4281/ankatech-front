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

function DrawerAllocationComponent() {
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
    DrawerAllocationComponent as DrawerAllocation
}