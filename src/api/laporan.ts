import { Laporan } from "../consts/laporan"
import PaginationData from "../consts/pagination"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getLaporans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/laporans')
    const listLaporan = res.data.data as Laporan[]
    return listLaporan
}

export const getLaporan = async (id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/laporans?id=${id}`)
    const laporan = res.data.data
    return laporan
}

export const getLaporanByToken = async (token: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/public/laporans/${token}`)
    const laporan = res.data.data as Laporan
    return laporan
}

export const postLaporan = async (laporan: Laporan) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/laporans', laporan)
    const postedLaporan = res.data.data
    return postedLaporan
}

export const putLaporan = async (oldLaporan: Laporan, newLaporan: Laporan) => {
    const instance = CreateAxiosInstance()
    const laporan = { ...oldLaporan, ...newLaporan }
    const res = await instance.put(`/laporans?id=${laporan.id}`, laporan)
    const updatedLaporan = res.data.data
    return updatedLaporan
}

export const getLaporansByPage = async (page: number) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`laporans?page=${page}`)
    const data = res.data.data.data as Laporan[]
    return { data }
}

export const getLaporansBySearch = async (page: number, keyword: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`laporans?page=${page}&search=${keyword}`)
    const data = res.data.data
    const laporans = data.data as Laporan[]
    const paginationData = {
        currentPage: data.current_page,
        maxPage: data.last_page,
        from: data.from,
        to: data.to,
        total: data.total,
        perPage: data.per_page
    } as PaginationData

    return { laporans, paginationData }
}