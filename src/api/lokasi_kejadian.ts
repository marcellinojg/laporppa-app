import { LookasiKejadian } from "../consts/lokasi_kejadian"
import {CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getLokasiKejadians = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-lokasi-kejadian')
    const lokasiKejadian = res.data.data as LookasiKejadian[]
    return lokasiKejadian
}
