import { Currency } from "@/components/Currency/Currency"
import { Description } from "@/components/Description/Description"
import { DateUtils } from "@/utils/helpers/DateUtils/DateUtils"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"

type TCardInsuranceProps = {
    title: string
    type: "life" | "disability"
    viewMode: "original-plan" | "custom-plan"
    dateStart: Date
    duration: number
    value: number
    prize: number
}

const typeNameHandler: Record<TCardInsuranceProps["type"], string> = {
    life: "Seguro de Vida",
    disability: "Seguro de Invalidez"
}

function CardInsuranceComponent(
    {
        title,
        type,
        viewMode,
        dateStart,
        duration,
        value,
        prize
    }: TCardInsuranceProps
) {
    return (
        <>
        <div
            className={`h-[200px] w-full bg-gray-800 rounded-2xl p-4 border-2 ${ viewMode === "original-plan" ? "border-blue-300" : "border-green-300" }`}
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
                        text={typeNameHandler[type]}
                        color="bright-gray"
                        size="sm"
                    />
                </div>
                <div>
                    <Description
                        text={`Data de início: ${DateUtils.formatDate(dateStart)}`}
                        color="bright-gray"
                        size="sm"
                    />
                </div>
                <div>
                    <Description
                        text={`Duração: ${ DateUtils.formatDuration(duration) }`}
                        color="bright-gray"
                        size="sm"
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <Description
                            text={`Premio: ${ValueUtils.centsIntToCurrency(prize)}/mês`}
                            color="bright-gray"
                            size="sm"
                        />
                    </div>
                    <div>
                        <Currency
                            amount={ValueUtils.centsIntToCurrency(value)}
                            size="md"
                            amountColor="purple"
                            showSymbol={false}
                        />
                    </div>
                </div>
            </div>
            
        </div>
        
        </>
    )
}

export {
    CardInsuranceComponent as CardInsurance
}