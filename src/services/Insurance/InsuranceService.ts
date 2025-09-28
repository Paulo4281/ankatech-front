import { API } from "@/api/api"
import { useMutationHook } from "@/hooks/useMutation/useMutation"
import { useQueryHook } from "@/hooks/useQuery/useQuery"
import type { TInsuranceCreate, TInsuranceResponse } from "@/types/Insurance/TInsurance"
import type { TServiceProps } from "../TService"
import { objectToQueryString } from "@/utils/helpers/ObjToQueryString/ObjToQueryString"

class InsuranceService {
    public static async saveInsuranceRoute(data: TInsuranceCreate) {
        return (await API.POST({
            prefix: "/insurance",
            url: "",
            data: data
        }))?.data
    }

    public static async findInsuranceRoute(query?: Record<string, string>) {
        const parsedQuery = objectToQueryString(query)

        return (await API.GET({
            prefix: "/insurance",
            url: `${parsedQuery}`
        }))?.data
    }
}

function useSaveInsurance(params?: TServiceProps) {
    return useMutationHook<TInsuranceCreate, TInsuranceResponse>({
        mutationFn: (data: TInsuranceCreate) => InsuranceService.saveInsuranceRoute(data),
        onSuccess: params?.onSuccess
    })
}

function useFindInsurance(params?: TServiceProps) {
    return useQueryHook<TInsuranceResponse[]>({
        queryKey: "insurance",
        queryParams: params?.filters,
        queryFn: () => InsuranceService.findInsuranceRoute(params?.filters)
    })
}

export {
    useSaveInsurance,
    useFindInsurance
}