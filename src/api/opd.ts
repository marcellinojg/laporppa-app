import { HubunganKeluarga } from "../consts/hubungan_keluarga"
import { Opd } from "../consts/opd"
import {CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getOpdes = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-opd')
    const opdes = res.data.data as Opd[]
    return opdes
}
