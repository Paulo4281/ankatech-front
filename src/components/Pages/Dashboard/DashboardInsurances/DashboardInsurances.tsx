"use client"

import { CardInsurance } from "@/components/Card/CardInsurance/CardInsurance"
import { useFindInsurance } from "@/services/Insurance/InsuranceService"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useState, useEffect } from "react"
import type { TInsuranceCreate, TInsuranceResponse } from "@/types/Insurance/TInsurance"
import { queryClient } from "@/providers/QueryClientProvider"
import { DrawerInsurance } from "@/components/Drawer/DrawerInsurance/DrawerInsurance"

function DashboardInsurancesComponent() {
    const { familyMember } = useFamilyMemberStore()

    const [insurances, setInsurances] = useState<TInsuranceResponse[]>([])

    const { data, isLoading, isError } = useFindInsurance({
        filters: {
            familyMemberId: familyMember?.id as string
        }
    })

    useEffect(() => {
        if (data) {
            setInsurances(data)
        }
    }, [data])

    return (
        <>
        <section className="py-10" id="insurances-section">

            <div className="flex justify-between">
                <div>
                <h1 className="text-2xl text-blue-300 mb-10">Seguros</h1>
                </div>
                <div className="flex gap-2">
                    <DrawerInsurance />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {
                    insurances?.length > 0
                    ?
                    (
                        insurances.map((insurance) => (
                            <CardInsurance
                                key={insurance.id}
                                title={insurance.title}
                                viewMode="original-plan"
                                type={insurance.type}
                                dateStart={new Date(insurance.dateStart)}
                                duration={Number(insurance.duration)}
                                prize={Number(insurance.prize)}
                                value={Number(insurance.value)}
                            />
                        ))
                    )
                    :
                    (
                        <h1 className="text-2xl text-white mb-10">Nenhum seguro cadastrado</h1>
                    )
                }
            </div>
        </section>
        </>
    )
}

export {
    DashboardInsurancesComponent as DashboardInsurances
}