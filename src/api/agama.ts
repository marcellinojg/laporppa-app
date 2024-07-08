import { Agama } from "../consts/agama"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"


export const getAgamas = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-agama')
    const agamas = res.data.data as Agama[]
    return agamas
}