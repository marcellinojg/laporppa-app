import { Kelurahan } from "../consts/kelurahan"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getKelurahans = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-kelurahan')
    const kelurahans = res.data.data as Kelurahan[]
    return kelurahans
}
