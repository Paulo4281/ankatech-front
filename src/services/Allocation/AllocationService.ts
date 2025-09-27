import { API } from "@/api/api"
import { useMutationHook } from "@/hooks/useMutation/useMutation"
import { useQueryHook } from "@/hooks/useQuery/useQuery"
import type { TAllocation, TAllocationFindParams, TAllocationResponse } from "@/types/Allocation/TAllocation"
import { objectToQueryString } from "@/utils/helpers/ObjToQueryString/ObjToQueryString"
import type { TServiceProps } from "../TService"
class AllocationService {
    public static async saveAllocationRoute(data: TAllocation) {
        return (await API.POST({
            prefix: "/allocation",
            url: "",
            data: data
        }))?.data
    }

    public static async findAllocationRoute(query?: Record<string, string>) {
        const parsedQuery = objectToQueryString(query)

        return (await API.GET({
            prefix: "/allocation",
            url: `${parsedQuery}`
        }))?.data
    }
}

function useSaveAllocation(params?: TServiceProps) {
    return useMutationHook<TAllocation, TAllocationResponse>({
        mutationFn: (data: TAllocation) => AllocationService.saveAllocationRoute(data),
        onSuccess: params?.onSuccess
    })
}

function useFindAllocation(params?: TServiceProps) {
    return useQueryHook<TAllocationResponse[]>({
        queryKey: "allocation",
        queryParams: params?.filters,
        queryFn: () => AllocationService.findAllocationRoute(params?.filters)
    })
}

export {
    useSaveAllocation,
    useFindAllocation
}