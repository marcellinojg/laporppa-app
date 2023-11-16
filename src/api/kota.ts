import { Kota } from "../consts/kota"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getKotas = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/public/kotas')
    const kotas = res.data.data as Kota[]
    return kotas
}
