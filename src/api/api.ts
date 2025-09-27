import { Toast } from "@/components/Toast/Toast"
import axios, { AxiosError, AxiosResponse } from "axios"

type TPrefixes =
    "/allocation" |
    "/allocation-registry" |
    "/family-member" |
    "history"

type TApiParams = {
    prefix: TPrefixes
    url: string
    data?: object
}

type TAPIError = {
    message: string
    statusCode: number
}

export class API {
    static async POST(params: TApiParams): Promise<AxiosResponse<any, any, {}> | undefined> {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${params.prefix}${params.url}`,
                params.data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            return response
        } catch(error) {
            this.HandleError(error as AxiosError)
        }
    }

    static async GET(params: TApiParams): Promise<AxiosResponse<any, any, {}> | undefined> {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}${params.prefix}${params.url}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            return response
        } catch(error) {
            this.HandleError(error as AxiosError)
        }
    }

    static async PUT(params: TApiParams): Promise<AxiosResponse<any, any, {}> | undefined> {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}${params.prefix}${params.url}`,
                params.data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            return response
        } catch(error) {
            this.HandleError(error as AxiosError)
        }
    }

    static async PATCH(params: TApiParams): Promise<AxiosResponse<any, any, {}> | undefined> {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}${params.prefix}${params.url}`,
                params.data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            return response
        } catch(error) {
            this.HandleError(error as AxiosError)
        }
    }

    static async DELETE(params: TApiParams): Promise<AxiosResponse<any, any, {}> | undefined> {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}${params.prefix}${params.url}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            return response
        } catch(error) {
            this.HandleError(error as AxiosError)
        }
    }

    static HandleSuccess() {
        Toast.success("Operação realizada com sucesso")
    }

    static HandleError(error: AxiosError) {
        const errorData = error.response?.data as TAPIError
        
        if (errorData?.message) {
            Toast.error(errorData.message)
        } else {
            Toast.error("Ocorreu um erro ao realizar a operação")
        }

    }
}