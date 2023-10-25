import { Kecamatan } from "../consts/kecamatan"
import { useAxiosInstance } from "../hooks/useAxiosInstance"


export const getKecamatans = async () => {
    const instance = useAxiosInstance()
    const res = await instance.get('/public/kecamatans')
    const kecamatans = res.data.data as Kecamatan[]
    return kecamatans
}