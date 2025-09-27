import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string = "DD/MM/YYYY"): string {
        return moment.utc(date).format(format)
    }

    static formatToUTC(date: Date): Date {
        return moment(date).utc().startOf("day").add(12, "hours").toDate()
    }
}