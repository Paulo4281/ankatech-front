export class ValueUtils {
    static centsIntToCurrency(value: number): string {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value)
    }

    static howMuchPercentage(value: number, total: number): number {
        return Number(((value / total) * 100).toFixed(2))
    }

    static calculatePlanProgress(target: number, current: number): { achieved: number, lack: number } {
        if (target <= 0) {
            return { achieved: 0, lack: 0 }
        }

        const achieved = (current / target) * 100
        const lack = 100 - achieved

        return {
            achieved: Number(Math.min(Math.max(achieved, 0), 100).toFixed(2)),
            lack: Number(Math.min(Math.max(lack, 0), 100).toFixed(2))
        }
    }

    static calculatePercentageGained(current: number, future: number): number {
        if (current <= 0) return 0
        return ((future - current) / current) * 100
    }
}