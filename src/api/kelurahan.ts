import { Kelurahan } from "../consts/kelurahan"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getKelurahans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/public/kelurahans')
    const kelurahans = res.data.data as Kelurahan[]
    return kelurahans
}
