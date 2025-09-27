import { Currency } from "@/components/Currency/Currency"
import { Description } from "@/components/Description/Description"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"

type TCardInsuranceProps = {
    title: string
    type: "life" | "disability"
    viewMode: "original-plan" | "custom-plan"
    duration: string
    value: number
    prize: number
}

function CardInsuranceComponent(
    {
        title,
        type,
        viewMode,
        duration,
        value,
        prize
    }: TCardInsuranceProps
) {
    return (
        <>
        <div
            className={`h-[145px] w-full bg-gray-800 rounded-2xl p-4 border-2 ${ viewMode === "original-plan" ? "border-blue-300" : "border-green-300" }`}
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
                        text={`Duração: ${duration} anos`}
                        color="white"
                        size="sm"
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <Description
                            text={`Premio: ${ValueUtils.centsIntToCurrency(prize)}/mês`}
                            color="white"
                            size="sm"
                        />
                    </div>
                    <div>
                        <Currency
                            amount={ValueUtils.centsIntToCurrency(value)}
                            size="sm"
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