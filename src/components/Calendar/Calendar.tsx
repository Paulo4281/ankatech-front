import { Calendar} from "@/components/ui/calendar"
import { useState } from "react"

type TCalendarProps = {
    value?: Date
    onChangeValue?: (value: Date) => void
}

function CalendarComponent(
    {
        value=new Date(),
        onChangeValue
    }: TCalendarProps
) {
    const [date, setDate] = useState<Date | undefined>(value)

    return (
        <>
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            onDayClick={(day) => onChangeValue && onChangeValue(day)}
            className="rounded-lg border"
        />
        </>
    )
}

export {
    CalendarComponent as Calendar
}