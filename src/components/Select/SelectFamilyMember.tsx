"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TFamilyMemberResponse } from "@/types/FamilyMember/TFamilyMember"
import { useState, useEffect } from "react"
import { useFamilyMemberStore } from "@/stores/FamilyMember/FamilyMemberStore"
import { useFindFamilyMember } from "@/services/FamilyMember/FamilyMemberService"
import { useHeritageChartSimulationStore } from "@/stores/HeritageChartSimulation/HeritageChartSimulationStore"

function SelectFamilyMemberComponent() {
    const { data: familyMembersData } = useFindFamilyMember({
      filters: {
        familyId: "86ca4305-e9a2-47a8-8d4c-d0d2c17dc112"
      }
    })

    const { simulation, setSimulation } = useHeritageChartSimulationStore()

    const { familyMember, setFamilyMember } = useFamilyMemberStore()

    const [familyMembers, setFamilyMembers] = useState<TFamilyMemberResponse[]>([])

    function handleFamilyMemberChange(value: string) {
        setFamilyMember(familyMembers.find((familyMember) => familyMember.id === value) as TFamilyMemberResponse)
        if (simulation?.familyMemberId !== value)
        setSimulation({ ...simulation!, id: null, familyMemberId: value })
    }

    useEffect(() => {
        if (familyMembersData) {
        setFamilyMembers(familyMembersData as TFamilyMemberResponse[])
        }
    }, [familyMembersData])

    return (
        <>
        <Select onValueChange={(value) => handleFamilyMemberChange(value)}>
            <SelectTrigger className="w-[220px] rounded-3xl !text-white text-lg">
                <SelectValue placeholder={familyMember?.name || "Selecione"} />
            </SelectTrigger>
            <SelectContent>
                {
                familyMembers.length > 0 &&
                (
                    familyMembers.map((familyMember) => (
                    <SelectItem value={familyMember.id} key={familyMember.id}>{familyMember.name}</SelectItem>
                    ))
                )
                }
            </SelectContent>
        </Select>
        </>
    )
}

export {
    SelectFamilyMemberComponent as SelectFamilyMember
}