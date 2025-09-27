import { HeritageChart } from "@/components/Chart/HeritageChart/HeritageChart"

function DashboardChartComponent() {
    return (
        <>
        <section className="py-20 " id="heritage-projection-section">
            <div>
                <HeritageChart />
            </div>
        </section>
        </>
    )
}

export {
    DashboardChartComponent as DashboardChart
}