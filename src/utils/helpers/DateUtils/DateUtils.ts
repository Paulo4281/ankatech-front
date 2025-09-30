import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string = "DD/MM/YYYY"): string {
        return moment.utc(date).format(format)
    }

    static formatToUTC(date: Date): Date {
        return moment(date).utc().startOf("day").add(12, "hours").toDate()
    }

    static getYear(date: Date): number {
        return moment(date).year()
    }

    static howMuchTimeFromToXMonths(date: Date, months: number): Date {
        return moment(date).add(months, "months").toDate()
    }

    static howMuchTimeFromXInPeriod(dateStart: Date, dateEnd: Date, period: "monthly" | "yearly"): number {
        const now = dateStart

        const yearDiff = dateEnd.getFullYear() - now.getFullYear()
        const monthDiff = dateEnd.getMonth() - now.getMonth()

        const totalPeriod = yearDiff * 12 + monthDiff

        if (period === "yearly") {
            return Math.floor(totalPeriod / 12)
        }

        return totalPeriod
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