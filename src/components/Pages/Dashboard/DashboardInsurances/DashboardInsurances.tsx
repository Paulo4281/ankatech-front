import { CardInsurance } from "@/components/Card/CardInsurance/CardInsurance"

function DashboardInsurancesComponent() {
    return (
        <>
        <section className="py-10" id="insurances-section">
            <div>
            <h1 className="text-2xl text-blue-300 mb-10">Seguros</h1>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <CardInsurance
                title="Seguro de vida familiar"
                viewMode="original-plan"
                type="life"
                duration="5"
                prize={100}
                value={20000}
                />
            </div>
        </section>
        </>
    )
}

export {
    DashboardInsurancesComponent as DashboardInsurances
}