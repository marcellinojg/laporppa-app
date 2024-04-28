import { StatusPerkawinan } from "../consts/status_perkawinan"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getStatusPerkawinans = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-status-pernikahan')
    const status_perkawinans = res.data.data as StatusPerkawinan[]
    return status_perkawinans
}
