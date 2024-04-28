import { Pekerjaan } from "../consts/pekerjaan"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getPekerjaans = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-pekerjaan')
    const pekerjaans = res.data.data as Pekerjaan[]
    return pekerjaans
}
