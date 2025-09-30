import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TFamilyMemberResponse } from "@/types/FamilyMember/TFamilyMember"

type TFamilyMemberStore = {
    familyMember: TFamilyMemberResponse | null
    setFamilyMember: (familyMember: TFamilyMemberResponse) => void
}

const useFamilyMemberStore = create<TFamilyMemberStore>()(
    persist(
        (set) => ({
            familyMember: null,
            setFamilyMember: (familyMember: TFamilyMemberResponse) => set({ familyMember })
        }),
        { name: "persist:family-member" }
    )
)

export {
    useFamilyMemberStore
}