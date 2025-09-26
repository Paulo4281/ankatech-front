import { useQuery } from "@tanstack/react-query"

type TUseQueryProps = {
    queryKey: string
    queryFn: any
    enabled?: boolean
}

function useQueryHook<T>(
    {
        queryKey,
        queryFn,
        enabled
    }: TUseQueryProps
) {
    return useQuery<T>({
        queryKey: [queryKey],
        queryFn: queryFn,
        enabled: enabled ?? true
    })
}

export {
    useQueryHook
}