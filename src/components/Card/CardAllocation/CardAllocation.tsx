"use client"

import { Currency } from "@/components/Currency/Currency"
import { Description } from "@/components/Description/Description"
import { ProgressBar } from "@/components/ProgressBar/ProgressBar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, EllipsisVertical, Eye } from "lucide-react"
import { JSX } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DrawerAllocationRegistry } from "@/components/Drawer/DrawerAllocationRegistry/DrawerAllocationRegistry"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { TimelineAllocation } from "@/components/Timeline/TimelineAllocation/TimelineAllocation"
import { useState } from "react"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"
import type { TAllocationRegistryResponse } from "@/types/Allocation/TAllocationRegistry"

type AvailableTypes = "Financeira Manual" | "Imobilizada" | "Financeira"

type TCardAllocationProps = {
    id: string
    title: string
    dateStart: string
    amount: string
    types?: AvailableTypes[]
    dateEnd?: string
    canUpdate?: boolean
    lastUpdate?: string
    totalAmount?: string
    timelineItems?: TAllocationRegistryResponse[]
    progressData?: {
        installments: number
        totalInstallments: number
    }
}

const badgeHandler: Record<NonNullable<TCardAllocationProps["types"]>[number], () => JSX.Element> = {
    "Financeira Manual": () => {
        return <Badge variant={"success"}>Financeira Manual</Badge>
    },
    Financeira: () => {
        return <Badge variant={"white"}><DollarSign /> Financiado</Badge>
    },
    Imobilizada: () => {
        return <Badge variant={"orange"}>Imobilizada</Badge>
    }
}

function CardAllocationComponent(
    {
        id,
        title,
        dateStart,
        amount,
        types=[],
        dateEnd="",
        canUpdate=false,
        lastUpdate="",
        totalAmount="",
        progressData={ installments: 0, totalInstallments: 0 },
        timelineItems=[]
    }: TCardAllocationProps
) {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
        <>
        <Collapsible>
                <div
                    className="
                    w-full rounded-2xl bg-zinc-800 mt-4 p-3 border
                    "
                >
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2">
                                <Description 
                                    text={title}
                                    color="white"
                                    size="sm"
                                />
                                {
                                    types.length > 0 &&
                                    (
                                        types.map((type, index) => (
                                            <div key={index}>
                                                {badgeHandler[type]()}
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                            <div>
                                {
                                    dateStart && dateEnd
                                    ?
                                    (
                                        <Description 
                                            text={`${DateUtils.formatDate(dateStart)} - ${DateUtils.formatDate(dateEnd)}`}
                                            color="white"
                                            size="extra-sm"
                                        />
                                    )
                                    :
                                    (
                                        <Description 
                                            text={`Início: ${DateUtils.formatDate(dateStart)}`}
                                            color="white"
                                            size="extra-sm"
                                        />
                                    )
                                }
                                {
                                    progressData.totalInstallments > 0
                                    &&
                                    (
                                        <div className="mt-2">
                                            <Description
                                                text={`Progresso: ${progressData.installments}/${progressData.totalInstallments} parcelas`}
                                                color="gray"
                                                size="extra-sm"
                                            />
                                            <ProgressBar
                                                value={progressData.installments}
                                                max={progressData.totalInstallments}
                                                color="orange"
                                                nonFilledColor="white"
                                                segments={progressData.totalInstallments}
                                                height="extra-small"
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            {
                                canUpdate &&
                                (
                                    <DrawerAllocationRegistry
                                        allocationId={id}
                                    />
                                )
                            }
                            <div className="flex flex-col">
                                <Currency
                                    amount={ValueUtils.centsIntToCurrency(Number(amount))}
                                    amountColor="white"
                                    size="lg"
                                    showSymbol={false}                                    
                                />
                                {
                                    lastUpdate &&
                                    (
                                        <Description
                                            text={`Última atualização: ${lastUpdate}`}
                                            color="white"
                                            size="extra-sm"
                                        />
                                    )
                                }
                            </div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary-outline" size="icon">
                                            <EllipsisVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <CollapsibleTrigger asChild onClick={() => setCollapsed(!collapsed)}>
                                                <Button variant={"ghost"} size="sm">
                                                        {
                                                            collapsed
                                                            ?
                                                            (
                                                                <span className="flex items-center gap-1"><Eye /> Esconder Registros</span>
                                                            )
                                                            :
                                                            (
                                                                <span className="flex items-center gap-1"><Eye /> Visualizar Registros</span>
                                                            )
                                                        }
                                                </Button>
                                            </CollapsibleTrigger>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <DrawerAllocationRegistry
                                                allocationId={id}
                                                updateBtn={false}
                                            />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                    <div className="text-start">
                        <CollapsibleContent className="mt-4">
                            {
                                timelineItems.length > 0 &&
                                (
                                    <TimelineAllocation
                                        items={timelineItems}
                                    />
                                )
                            }
                        </CollapsibleContent>
                    </div>
                </div>
        </Collapsible>
        </>
    )
}

export {
    CardAllocationComponent as CardAllocation
}