import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getKategoris = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/public/kategoris')
    const kategoris = res.data.data as Kategori[]
    return kategoris
}