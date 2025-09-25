type TDescriptionProps = {
    text: string
    color: "white" | "blue" | "gray"
    size: "sm" | "md" | "lg"
}

const colorHandler: Record<TDescriptionProps["color"], string> = {
    white: "text-white",
    blue: "text-blue-300",
    gray: "text-gray-500"
}

const sizeHandler: Record<TDescriptionProps["size"], string> = {
    sm: "text-md",
    md: "text-lg",
    lg: "text-3xl"
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
                className={`${colorHandler[color]} ${sizeHandler[size]}`}
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