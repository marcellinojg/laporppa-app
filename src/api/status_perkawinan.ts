import { StatusPerkawinan } from "../consts/status_perkawinan"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getStatusPerkawinans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/status-perkawinans')
    const status_perkawinans = res.data.data as StatusPerkawinan[]
    return status_perkawinans
}
