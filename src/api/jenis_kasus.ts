import { JenisKasus } from "../consts/jenis_kasus"
import { useAxiosInstance } from "../hooks/useAxiosInstance"


export const getJenisKasuses = async () => {
    const instance = useAxiosInstance()
    const res = await instance.get('/jenis_kasuses')
    const jenisKasus = res.data.data as JenisKasus[]
    return jenisKasus
}