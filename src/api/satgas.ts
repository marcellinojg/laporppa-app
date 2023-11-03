import { SatgasPelapor } from "../consts/satgas"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"


export const getSatgasPelapors = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/users')
    const listLaporan = res.data.data as SatgasPelapor[]
    return listLaporan
}