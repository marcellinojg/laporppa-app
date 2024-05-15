import { HubunganKeluarga } from "../consts/hubungan_keluarga"
import {CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"

export const getHubunganKeluargas = async () => {
    const instance = CreatePublicAxiosInstance()
    const res = await instance.get('/m-hubungan')
    const hubunganKeluargas = res.data.data as HubunganKeluarga[]
    return hubunganKeluargas
}
