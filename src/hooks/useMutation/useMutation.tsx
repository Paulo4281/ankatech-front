import { useMutation } from "@tanstack/react-query"

type TUseMutationProps = {
    mutationFn: any
}

function useMutationHook<T, U>(
    {
        mutationFn
    }: TUseMutationProps
) {
    return useMutation<U, unknown, T>({
        mutationFn: mutationFn
    })
}

export {
    useMutationHook
}