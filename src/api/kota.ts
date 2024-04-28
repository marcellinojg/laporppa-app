import { Kota } from "../consts/kota"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getKotas = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-kabupaten')
    const kotas = res.data.data as Kota[]
    return kotas
}
