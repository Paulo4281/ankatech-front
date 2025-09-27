import { Description } from "@/components/Description/Description"
import { ChevronDown, ChevronUp } from "lucide-react"

type TCardMovementProps = {
    title: string
    type: "earning" | "expense"
    viewMode: "original-plan" | "custom-plan"
    category: "credit" | "dependent" | "fixed"
    frequency: "unique" | "monthly" | "annually"
    dateStart: string
    dateEnd?: string
}

const frequencyNameHandler: Record<TCardMovementProps["frequency"], string> = {
    unique: "Única",
    monthly: "Mensal",
    annually: "Anual"
}

const categoryNameHandler: Record<TCardMovementProps["category"], string> = {
    credit: "Crédito",
    dependent: "Dependente",
    fixed: "Imobilizado"
}

function CardMovementComponent(
    {
        title,
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
                        text={`${dateStart}${ dateEnd ? ` - ${dateEnd}` : ""}`}
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
                                    <Description
                                        text={`R$ 1.000,00`}
                                        color="green"
                                        size="md"
                                    />
                                </div>
                            )
                            :
                            (
                                <div className="flex gap-1 text-red-500">
                                    <ChevronDown className="h-8 w-8" />
                                    <Description
                                        text={`R$ 1.000,00`}
                                        color="red"
                                        size="sm"
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