import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string = "DD/MM/YYYY"): string {
        return moment.utc(date).format(format)
    }

    static formatToUTC(date: Date): Date {
        return moment(date).utc().startOf("day").add(12, "hours").toDate()
    }

    static howMuchTimeFromToXMonths(date: Date, months: number): Date {
        return moment(date).add(months, "months").toDate()
    }

    static formatDuration(months: number): string {
        if (months < 12) {
            return `${months} ${months === 1 ? "mês" : "meses"}`
        }

        const years = Math.floor(months / 12)
        const restMonths = months % 12

        if (restMonths === 0) {
            return `${years} ${years === 1 ? "ano" : "anos"}`
        }

        return `${years} ${years === 1 ? "ano" : "anos"} e ${restMonths} ${restMonths === 1 ? "mês" : "meses"}`
    }

}