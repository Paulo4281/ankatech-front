import { useQuery } from "@tanstack/react-query"

type TUseQueryProps = {
    queryKey: string
    queryParams?: Record<string, string | null>
    queryFn: any
    enabled?: boolean
}

function useQueryHook<T>(
    {
        queryKey,
        queryParams,
        queryFn,
        enabled
    }: TUseQueryProps
) {
    return useQuery<T>({
        queryKey: [queryKey, queryParams ?? ""],
        queryFn: queryFn,
        enabled: enabled ?? true
    })
}

export {
    useQueryHook
}