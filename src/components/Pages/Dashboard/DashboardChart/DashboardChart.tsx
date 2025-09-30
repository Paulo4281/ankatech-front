"use client"
import { Suspense } from "react"
import { HeritageChart } from "@/components/Chart/HeritageChart/HeritageChart"
import { useSearchParams } from "next/navigation"

function HeritageChartWithParams() {
    const searchParams = useSearchParams()
    const simulationIdFromParams = searchParams.get("simulationId")

    return <HeritageChart simulationIdFromParams={simulationIdFromParams || ""} />
}

function DashboardChartComponent() {
    return (
        <>
        <section className="py-20 " id="heritage-projection-section">
            <div>
                <Suspense fallback={null}>
                    <HeritageChartWithParams />
                </Suspense>
            </div>
        </section>
        </>
    )
}

export {
    DashboardChartComponent as DashboardChart
}