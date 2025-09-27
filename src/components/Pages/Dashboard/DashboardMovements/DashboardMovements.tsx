import { CardMovement } from "@/components/Card/CardMovement/CardMovement"
import { Button } from "@/components/ui/button"

function DashboardMovementsComponent() {
    return (
        <>
        <section id="movements-section">
            <div className="flex justify-between">
            <div>
                <h1 className="text-2xl text-blue-300 py-10">Movimentações</h1>
            </div>
            <div className="flex gap-2">
                <Button variant={"outline"}>Financeiras</Button>
                <Button variant={"secondary-outline"}>Imobilizadas</Button>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
            <CardMovement
                title="Herança"
                viewMode="original-plan"
                type="earning"
                category="credit"
                dateStart="01/01/2023"
                frequency="unique"
            />
            </div>
        </section>
        </>
    )
}

export {
    DashboardMovementsComponent as DashboardMovements
}