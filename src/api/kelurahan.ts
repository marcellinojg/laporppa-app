import { Kelurahan } from "../consts/kelurahan"
import { useAxiosInstance } from "../hooks/useAxiosInstance"

export const getKelurahans = async () => {
    const instance = useAxiosInstance()
    const res = await instance.get('/public/kelurahans')
    const kelurahans = res.data.data as Kelurahan[]
    return kelurahans
}
