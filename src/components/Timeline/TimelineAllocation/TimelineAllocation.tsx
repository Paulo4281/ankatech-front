import { Currency } from "@/components/Currency/Currency"
import { Description } from "@/components/Description/Description"
import { Divider } from "@/components/Divider/Divider"
import { DrawerAllocationRegistryUpdate } from "@/components/Drawer/DrawerAllocationRegistry/DrawerAllocationRegistryUpdate"
import { Button } from "@/components/ui/button"
import { TAllocationRegistryResponse } from "@/types/Allocation/TAllocationRegistry"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"
import { CollapsibleContent } from "@radix-ui/react-collapsible"
import { Pencil, X } from "lucide-react"

type TTimelineAllocationProps = {
    items: TAllocationRegistryResponse[]
}

function TimelineAllocationComponent(
    {
        items
    }: TTimelineAllocationProps
) {
    return (
        <>
        <div className="text-start">
            <CollapsibleContent className="mt-3">
                <div className="relative border-l border-gray-700 ml-3 pl-6 space-y-6">
                    {
                        items.length > 0 &&
                        (
                            items.map((item, index) => (
                                <div className="relative">
                                    <span className="absolute -left-3 top-1 w-3 h-3 rounded-full bg-blue-300 border-gray-800"></span>
                                    <DrawerAllocationRegistryUpdate
                                        id={item.id}
                                        key={item.id}
                                        date={item.date}
                                        value={item.value}
                                        allocationId={item.allocationId as string}
                                    />
                                    <div className="flex flex-col ms-4" key={index}>
                                        <Currency
                                            amount={ValueUtils.centsIntToCurrency(Number(item.value))}
                                            amountColor="white"
                                            size="lg"
                                            symbolColor="white"
                                            showSymbol={false}
                                        />
                                        <Description
                                            text={DateUtils.formatDate(item.date)}
                                            color="gray"
                                            size="sm"
                                        />
                                        <Divider
                                        widthClass="w-full"
                                        />
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </CollapsibleContent>
        </div>
        </>
    )
}

export {
    TimelineAllocationComponent as TimelineAllocation
}