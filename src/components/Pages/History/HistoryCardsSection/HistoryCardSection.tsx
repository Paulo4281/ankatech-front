import { CardHistory } from "@/components/Card/CardHistory/CardHistory"
import { Description } from "@/components/Description/Description"
import { Divider } from "@/components/Divider/Divider"

function HistoryCardSectionComponent() {
    return (
        <>
        <section id="history-section">

            <div className="mt-16">
                <Description
                    text="Histórico de simulações"
                    color="white"
                    size="xl"
                />
                <Divider />
            </div>

            <div className="mt-5">
                <CardHistory
                    title="Aposentadoria na praia"
                    versions={[
                        {
                            date: "2023-01-01",
                            finalHeritage: 50000,
                            retirementDate: "2024-01-01",
                            version: "1",
                            simulationId: "1"
                        }
                    ]}
                />
            </div>
        </section>
        </>
    )
}

export {
    HistoryCardSectionComponent as HistoryCardSection
}