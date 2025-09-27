import { Currency } from "@/components/Currency/Currency"
import { ValueUtils } from "@/utils/helpers/ValueUtils/ValueUtils"

type TWageEvent = {
    title: string
    amount: number
}

type TExpenseEvent = {
    amount: number
}

function TimelineHeritageComponent() {
    const wageEvents: TWageEvent[] = [
        {
            title: "Janeiro",
            amount: 1000
        },
        {
            title: "Fevereiro",
            amount: 2000
        }
    ]

    const expenseEvents: TExpenseEvent[] = [
        {
            amount: 500
        }
    ]

    return (
        <>
        <div>


        <div className="relative flex items-center space-x-12">
            <div className="absolute top-6 left-0 ms-14 w-full h-0.5 bg-gray-300 z-0"></div>

            <span className="relative z-10 -mt-1 text-green-400 text-sm">Salário</span>

            {
                wageEvents.length > 0 &&
                (
                    wageEvents.map((wageEvent) => (
                        <div className="relative z-10 flex flex-col items-center">
                            <p className="text-green-400 text-center mb-6 -mt-1.5 text-sm">{wageEvent.title} {ValueUtils.centsIntToCurrency(wageEvent.amount)}</p>
                            <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900 mt-3.5 absolute"></div>
                            <div className="flex flex-col items-center space-y-1"></div>
                        </div>
                    ))
                )
            }
            
        </div>

        <div className="relative flex items-center space-x-12">
            <div className="flex flex-col gap-1">
                <span className="relative z-10 -mt-1 text-white text-sm">Ano</span>
                <span className="relative z-10 -mt-1 text-white text-sm">Idade</span>
            </div>
            <div className="absolute top-6 left-0 w-full h-0 bg-gray-300 z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-sm text-gray-400">2025</span>
                    <span className="text-sm text-gray-400">18 anos</span>
                </div>
            </div>
        </div>

        <div className="relative flex items-center space-x-12">
            <div className="absolute top-6 left-0 ms-14 w-full h-0.5 bg-gray-300 z-0"></div>

            <span className="relative z-10 -mt-1 text-red-400 text-sm">Custo<br />de vida</span>

            {
                expenseEvents.length > 0 &&
                (
                    expenseEvents.map((exepnseEvent) => (
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-6 h-6 bg-red-400 rounded-full border-2 border-gray-900 mt-2 absolute"></div>
                            <p className="text-red-400 text-center mt-8 text-sm">
                                {
                                    <Currency
                                        amount={ValueUtils.centsIntToCurrency(exepnseEvent.amount)}
                                        amountColor="red"
                                        size="extra-sm"
                                        showSymbol={false}
                                    />
                                }
                            </p>
                            <div className="flex flex-col items-center space-y-1"></div>
                        </div>
                    ))
                )
            }

        </div>


        </div>
        </>
    )
}

export {
    TimelineHeritageComponent as TimelineHeritage
}