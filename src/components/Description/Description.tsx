type TDescriptionProps = {
    text: string
    color: "white" | "blue" | "gray" | "bright-gray" | "green" | "red" | "purple"
    size: "extra-sm" | "sm" | "md" | "lg" | "xl"
}

const colorHandler: Record<TDescriptionProps["color"], string> = {
    white: "text-white",
    blue: "text-blue-300",
    gray: "text-gray-500",
    "bright-gray": "text-gray-300",
    green: "text-green-500",
    red: "text-red-500",
    purple: "text-purple-500"
}

const sizeHandler: Record<TDescriptionProps["size"], string> = {
    "extra-sm": "text-sm",
    sm: "text-md",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-4xl"
}

function DescriptionComponent(
    {
        text,
        size,
        color
    }: TDescriptionProps
) {
    return (
        <>
            <p
                className={`${colorHandler[color]} ${sizeHandler[size]} font-semibold`}
            >
                {text}
            </p>
        </>
    )
}

export {
    DescriptionComponent as Description,
    sizeHandler
}

export type {
    TDescriptionProps
}