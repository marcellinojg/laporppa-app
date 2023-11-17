import { Pekerjaan } from "../consts/pekerjaan"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getPekerjaans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/pekerjaans')
    const pekerjaans = res.data.data as Pekerjaan[]
    return pekerjaans
}
