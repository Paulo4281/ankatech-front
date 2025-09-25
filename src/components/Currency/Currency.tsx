import { Description } from "../Description/Description"
import type { TDescriptionProps } from "../Description/Description"
import { sizeHandler } from "../Description/Description"

type TCurrencyProps = {
    amount: string
    amountColor: TDescriptionProps["color"]
    size: TDescriptionProps["size"]
    symbolColor: "gray" | "white"
    plusData?: {
        amount: string
        position: "bottom" | "middle"
    }
}

const symbolColorHandler: Record<TCurrencyProps["symbolColor"], string> = {
    white: "text-white",
    gray: "text-gray-500"
}

const plusDataPositionHandler: Record<NonNullable<TCurrencyProps["plusData"]>["position"], string> = {
    middle: "flex items-center",
    bottom: "flex items-end mt-5"
}

function CurrencyComponent(
    {
        amount,
        amountColor,
        size,
        symbolColor,
        plusData={ amount: "", position: "bottom" }
    }: TCurrencyProps
) {
    return (
        <>
        <div className="flex gap-2 font-semibold">
            <span className={`${symbolColorHandler[symbolColor]} ${sizeHandler[size]}`}>R$</span>
            <Description
                text={`${amount}`}
                color={amountColor}
                size={size}
            />
            {
                plusData?.amount &&
                (
                    <>
                        <span
                            className={`text-sm text-blue-300 ${plusDataPositionHandler[plusData.position]}`}
                        >
                            +{plusData?.amount}%
                        </span>
                    </>
                )
            }
        </div>
        </>
    )
}

export {
    CurrencyComponent as Currency
}