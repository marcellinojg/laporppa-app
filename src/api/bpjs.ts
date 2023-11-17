import { BPJS } from "../consts/BPJS"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getBPJS = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/bpjs')
    const bpjs = res.data.data as BPJS[]
    return bpjs
}
