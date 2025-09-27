import { DashboardUpper } from "@/components/Pages/Dashboard/DashbaordUpper/DashboardUpper"
import { DashboardChart } from "@/components/Pages/Dashboard/DashboardChart/DashboardChart"
import { DashboardTimeline } from "@/components/Pages/Dashboard/DashboardTimeline/DashboardTimeline"
import { DashboardMovements } from "@/components/Pages/Dashboard/DashboardMovements/DashboardMovements"
import { DashboardInsurances } from "@/components/Pages/Dashboard/DashboardInsurances/DashboardInsurances"

export default function Dashboard() {
  return (
    <div className="container">
      <DashboardUpper />

      <DashboardChart />

      <DashboardTimeline />

      <DashboardMovements />

      <DashboardInsurances />
    </div>
  )
};