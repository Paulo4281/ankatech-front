import { API } from "@/api/api"
import { useMutationHook } from "@/hooks/useMutation/useMutation"
import { useQueryHook } from "@/hooks/useQuery/useQuery"
import type { TMovementCreate, TMovementResponse } from "@/types/Movement/TMovement"
import type { TServiceProps } from "../TService"
import { objectToQueryString } from "@/utils/helpers/ObjToQueryString/ObjToQueryString"

class MovementService {
    public static async saveMovementRoute(data: TMovementCreate) {
        return (await API.POST({
            prefix: "/movement",
            url: "",
            data: data
        }))?.data
    }

    public static async findMovementRoute(query?: Record<string, string | null>) {
        const parsedQuery = objectToQueryString(query)

        return (await API.GET({
            prefix: "/movement",
            url: `${parsedQuery}`
        }))?.data
    }
}

function useSaveMovement(params?: TServiceProps) {
    return useMutationHook<TMovementCreate, TMovementResponse>({
        mutationFn: (data: TMovementCreate) => MovementService.saveMovementRoute(data),
        onSuccess: params?.onSuccess
    })
}

function useFindMovement(params?: TServiceProps) {
    return useQueryHook<TMovementResponse[]>({
        queryKey: "movement",
        queryParams: params?.filters,
        queryFn: () => MovementService.findMovementRoute(params?.filters)
    })
}

export {
    useSaveMovement,
    useFindMovement
}