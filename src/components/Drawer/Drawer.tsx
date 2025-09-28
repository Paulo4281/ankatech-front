import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { X } from "lucide-react"

type TDrawerProps = {
    trigger: React.ReactNode
    headerTitle: string
    children: React.ReactNode
    footerChildren?: React.ReactNode
}

function DrawerComponent(
    {
        trigger,
        headerTitle,
        children,
        footerChildren
    }: TDrawerProps
) {
    return (
        <>
        <Drawer direction="right">
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent>
            <div className="flex justify-between">
                <DrawerHeader>
                <DrawerTitle className="text-2xl">{headerTitle}</DrawerTitle>
                </DrawerHeader>
                <DrawerClose asChild className="my-2 mx-2">
                    <Button variant={"ghost"} size="icon"><X /></Button>
                </DrawerClose>
            </div>

            <div className="h-full w-full p-3">

                {children}

                <DrawerFooter>
                    {footerChildren}
                </DrawerFooter>
                
            </div>


            </DrawerContent>
        </Drawer>
        </>
    )
}

export {
    DrawerComponent as Drawer
}