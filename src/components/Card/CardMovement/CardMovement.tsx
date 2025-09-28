import { Description } from "@/components/Description/Description"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { TMovementTypes, TMovementFrequencies, TMovementCategories } from "@/types/Movement/TMovement"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"
import { Currency } from "@/components/Currency/Currency"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"

type TCardMovementProps = {
    title: string
    value: number
    type: TMovementTypes
    viewMode: "original-plan" | "custom-plan"
    category: TMovementCategories
    frequency: TMovementFrequencies
    dateStart: string
    dateEnd?: string
}

const frequencyNameHandler: Record<TCardMovementProps["frequency"], string> = {
    unique: "Única",
    monthly: "Mensal",
    yearly: "Anual"
}

const categoryNameHandler: Record<TCardMovementProps["category"], string> = {
    credit: "Crédito",
    dependent: "Dependente",
    fixed: "Imobilizado"
}

function CardMovementComponent(
    {
        title,
        value,
        type,
        viewMode,
        category,
        frequency,
        dateStart,
        dateEnd
    }: TCardMovementProps
) {
    return (
        <>
        <div
            className={`h-[180px] w-full bg-gray-800 rounded-2xl p-4 border-2 ${ viewMode === "original-plan" ? "border-blue-300" : "border-green-300" }`}
        >
            <div className="flex flex-col gap-2">
                <div>
                    <Description
                        text={title}
                        color="white"
                        size="lg"
                    />
                </div>
                <div>
                    <Description
                        text={`${DateUtils.formatDate(dateStart)}${ dateEnd ? ` - ${DateUtils.formatDate(dateEnd)}` : ""}`}
                        color="white"
                        size="sm"
                    />
                </div>
                <div>
                    <Description
                        text={`Frequência: ${frequencyNameHandler[frequency]}`}
                        color="white"
                        size="sm"
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <Description
                            text={categoryNameHandler[category]}
                            color="white"
                            size="sm"
                        />
                    </div>
                    <div>
                        {
                            type === "earning"
                            ?
                            (
                                <div className="flex gap-1 text-green-500">
                                    <ChevronUp className="h-8 w-8" />
                                    <Currency
                                        amount={`${ValueUtils.centsIntToCurrency(value)}`}
                                        amountColor="green"
                                        size="md"
                                        showSymbol={false}
                                    />
                                </div>
                            )
                            :
                            (
                                <div className="flex gap-1 text-red-500">
                                    <ChevronDown className="h-8 w-8" />
                                    <Currency
                                        amount={`${ValueUtils.centsIntToCurrency(value)}`}
                                        amountColor="red"
                                        size="md"
                                        showSymbol={false}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export {
    CardMovementComponent as CardMovement
}