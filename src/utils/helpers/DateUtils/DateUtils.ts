import moment from "moment"

export class DateUtils {
    static formatDate(date: Date | string, format: string = "DD/MM/YYYY"): string {
        return moment(date).format(format)
    }
}