import { API } from "@/api/api"
import { useMutationHook } from "@/hooks/useMutation/useMutation"
import type { TAllocationRegistryCreate, TAllocationRegistryUpdate } from "@/types/Allocation/TAllocationRegistry"
import type { TServiceProps } from "../TService"

class AllocationRegistryService {
    public static async saveAllocationRegistryRoute(data: TAllocationRegistryCreate) {
        return (await API.POST({
            prefix: "/allocation-registry",
            url: "",
            data: data
        }))?.data
    }

    public static async updateAllocationRegistryRoute(data: TAllocationRegistryUpdate) {
        return (await API.PUT({
            prefix: "/allocation-registry",
            url: "",
            data: data
        }))?.data
    }
}

function useSaveAllocationRegistry(params?: TServiceProps) {
    return useMutationHook<TAllocationRegistryCreate, void>({
        mutationFn: (data: TAllocationRegistryCreate) => AllocationRegistryService.saveAllocationRegistryRoute(data),
        onSuccess: params?.onSuccess
    })
}

function useUpdateAllocationRegistry(params?: TServiceProps) {
    return useMutationHook<TAllocationRegistryUpdate, void>({
        mutationFn: (data: TAllocationRegistryUpdate) => AllocationRegistryService.updateAllocationRegistryRoute(data),
        onSuccess: params?.onSuccess
    })
}

export {
    useSaveAllocationRegistry,
    useUpdateAllocationRegistry
}