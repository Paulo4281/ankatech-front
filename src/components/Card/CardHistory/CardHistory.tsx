"use client"

import { Currency } from "@/components/Currency/Currency"
import { Description } from "@/components/Description/Description"
import { Table } from "@/components/Table/Table"
import { Button } from "@/components/ui/button"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"
import { ChartLine } from "lucide-react"
import Link from "next/link"

type TCardHistoryProps = {
    title: string
    versions: {
        date: string
        finalHeritage: number
        retirementDate: string
        version: string
        simulationId: string
    }[]
}

function CardHistoryComponent(
    {
        title,
        versions=[]
    }: TCardHistoryProps
) {
    const tableValues = versions.map((version) => [
        DateUtils.formatDate(version.date),
        <Currency amount={ValueUtils.centsIntToCurrency(version.finalHeritage)} amountColor="white" size="sm" showSymbol={false} />,
        DateUtils.formatDate(version.retirementDate),
        version.version,
        <Link href={`/?simulationId=${version.simulationId}`}>
            <Button key={version.simulationId} variant={"gray"}>Ver no gráfico</Button>
        </Link>
    ])

    return (
        <>
        <div
        className="
        w-full h-[240px] bg-transparent border rounded-2xl p-3.5
        "
        >
            <div>
                <div className="flex gap-1 text-white items-center">
                    <ChartLine className="w-8 h-8" />
                    <Description
                        text={title}
                        color="white"
                        size="md"
                    />
                </div>
                <div className="mt-2">
                    <Table
                    headers={["Data", "Patrimônio final", "Data de Aposentadoria", "Versão", "Ações"]}
                    values={tableValues}
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export {
    CardHistoryComponent as CardHistory
}