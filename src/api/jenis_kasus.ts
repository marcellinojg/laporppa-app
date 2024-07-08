import { JenisKasus } from "../consts/jenis_kasus"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"


export const getJenisKasuses = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-jenis-kasus')
    const jenisKasus = res.data.data as JenisKasus[]
    return jenisKasus
}