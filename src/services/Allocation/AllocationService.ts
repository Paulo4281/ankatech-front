import { API } from "@/api/api"
import { useMutationHook } from "@/hooks/useMutation/useMutation"
import { useQueryHook } from "@/hooks/useQuery/useQuery"
import { TAllocation, TAllocationFindParams, TAllocationResponse } from "@/types/Allocation/TAllocation"
import { objectToQueryString } from "@/utils/helpers/ObjToQueryString/ObjToQueryString"
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

function useSaveAllocation() {
    return useMutationHook<TAllocation, TAllocationResponse>({
        mutationFn: (data: TAllocation) => AllocationService.saveAllocationRoute(data)
    })
}

function useFindAllocation(filters?: TAllocationFindParams) {
    return useQueryHook<TAllocationResponse[]>({
        queryKey: "allocation",
        queryParams: filters,
        queryFn: () => AllocationService.findAllocationRoute(filters)
    })
}

export {
    useSaveAllocation,
    useFindAllocation
}