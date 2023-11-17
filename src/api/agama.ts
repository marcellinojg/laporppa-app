import { Agama } from "../consts/agama"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"


export const getAgamas = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/agamas')
    const agamas = res.data.data as Agama[]
    return agamas
}