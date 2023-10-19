import { Laporan } from "../consts/laporan"
import { useAxiosInstance } from "../hooks/useAxiosInstance"

export const getLaporans = async () => {
    const instance = useAxiosInstance()
    const res = await instance.get('/laporans')
    const listLaporan = res.data.data as Laporan[]
    return listLaporan
}

export const getLaporan = async (id: string) => {
    const instance = useAxiosInstance()
    const res = await instance.get(`/laporans?id=${id}`)
    const laporan = res.data.data
    return laporan
}

export const postLaporan = async (laporan: Laporan) => {
    const instance = useAxiosInstance()
    const res = await instance.post('/laporans', laporan)
    const postedLaporan = res.data.data
    return postedLaporan
}

export const putLaporan = async (oldLaporan: Laporan, newLaporan: Laporan) => {
    const instance = useAxiosInstance()
    const laporan = { ...oldLaporan, ...newLaporan }
    const res = await instance.put(`/laporans?id=${laporan.id}`, laporan)
    const updatedLaporan = res.data.data
    return updatedLaporan
}