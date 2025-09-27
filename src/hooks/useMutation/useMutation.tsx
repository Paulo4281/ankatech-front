import { useMutation } from "@tanstack/react-query"

type TUseMutationProps = {
    mutationFn: any
    onSuccess?: () => void
}

function useMutationHook<T, R>(
    {
        mutationFn,
        onSuccess
    }: TUseMutationProps
) {
    return useMutation<R, unknown, T>({
        mutationFn: mutationFn,
        onSuccess: () => {
            if (onSuccess) onSuccess()
        }
    })
}

export {
    useMutationHook
}