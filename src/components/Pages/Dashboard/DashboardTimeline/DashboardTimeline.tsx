import { TimelineHeritage } from "@/components/Timeline/TimelineHeritage/TimelineHeritage"

function DashboardTimelineComponent() {
    return (
        <>
        <section id="timeline-section" className="py-10 text-white overflow-x-hidden">
            <h1 className="text-2xl text-blue-300 mb-10">Timeline</h1>

            <div>
                <TimelineHeritage />
            </div>

        </section>
        </>
    )
}

export {
    DashboardTimelineComponent as DashboardTimeline
}