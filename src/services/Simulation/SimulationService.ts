import { API } from "@/api/api"
import { useMutationHook } from "@/hooks/useMutation/useMutation"
import { useQueryHook } from "@/hooks/useQuery/useQuery"
import type { TSimulationCreate, TSimulationResponse, TSimulationUpdate } from "@/types/Simulation/TSimulation"
import type { TServiceProps } from "../TService"
import { objectToQueryString } from "@/utils/helpers/ObjToQueryString/ObjToQueryString"

class SimulationService {
    public static async saveSimulationRoute(data: TSimulationCreate) {
        return (await API.POST({
            prefix: "/simulation",
            url: "",
            data: data
        }))?.data
    }

    public static async findSimulationRoute(query?: Record<string, string>) {
        const parsedQuery = objectToQueryString(query)

        return (await API.GET({
            prefix: "/simulation",
            url: `${parsedQuery}`
        }))?.data
    }

    public static async updateSimulationRoute(data: TSimulationUpdate) {
        return (await API.PUT({
            prefix: "/simulation",
            url: "",
            data: data
        }))?.data
    }
}

function useSaveSimulation(params?: TServiceProps) {
    return useMutationHook<TSimulationCreate, TSimulationResponse>({
        mutationFn: (data: TSimulationCreate) => SimulationService.saveSimulationRoute(data),
        onSuccess: params?.onSuccess
    })
}

function useFindSimulation(params?: TServiceProps) {
    return useQueryHook<TSimulationResponse>({
        queryKey: "simulation",
        queryParams: params?.filters,
        enabled: params?.enabled,
        queryFn: () => SimulationService.findSimulationRoute(params?.filters)
    })
}

function useUpdateSimulation(params?: TServiceProps) {
    return useMutationHook<TSimulationUpdate, TSimulationResponse>({
        mutationFn: (data: TSimulationUpdate) => SimulationService.updateSimulationRoute(data),
        onSuccess: params?.onSuccess
    })
}

export {
    useSaveSimulation,
    useFindSimulation,
    useUpdateSimulation
}