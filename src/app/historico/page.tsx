import { HistoryCardSection } from "@/components/Pages/History/HistoryCardsSection/HistoryCardSection"
import { HistoryUpper } from "@/components/Pages/History/HistoryUpper/HistoryUpper"

export default function Historico() {
    return (
        <div className="container">
            <HistoryUpper />

            <HistoryCardSection />
        </div>
    )
}