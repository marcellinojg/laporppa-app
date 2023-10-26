import { JenisKasus } from "../consts/jenis_kasus"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"


export const getJenisKasuses = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/jenis_kasuses')
    const jenisKasus = res.data.data as JenisKasus[]
    return jenisKasus
}