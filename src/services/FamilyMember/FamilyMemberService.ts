import { API } from "@/api/api"
import { useQueryHook } from "@/hooks/useQuery/useQuery"
import type { TServiceProps } from "../TService"
import type { TFamilyMemberResponse } from "@/types/FamilyMember/TFamilyMember"
import { objectToQueryString } from "@/utils/helpers/ObjToQueryString/ObjToQueryString"

class FamilyMemberService {
    public static async findFamilyMemberRoute(query?: Record<string, string>) {
        const parsedQuery = objectToQueryString(query)

        return (await API.GET({
            prefix: "/family-member",
            url: `${parsedQuery}`
        }))?.data
    }
}

function useFindFamilyMember(params?: TServiceProps) {
    return useQueryHook<TFamilyMemberResponse[]>({
        queryKey: "family-member",
        queryParams: params?.filters,
        queryFn: () => FamilyMemberService.findFamilyMemberRoute(params?.filters)
    })
}

export {
    useFindFamilyMember
}