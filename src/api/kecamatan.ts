import { Kecamatan } from "../consts/kecamatan"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"


export const getKecamatans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/public/kecamatans')
    const kecamatans = res.data.data as Kecamatan[]
    return kecamatans
}