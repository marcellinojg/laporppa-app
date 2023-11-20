import { DetailLangkah } from "../components/internal/modal_penjangkauan/langkah_dilakukan/FormLangkah"
import { Laporan, LaporanCount, LaporanSatgas, LaporanToken } from "../consts/laporan"
import PaginationData from "../consts/pagination"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getLaporans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/laporans?withKecamatan=1&withKeluargaKlien=1')
    const listLaporan = res.data.data as Laporan[]
    return listLaporan
}

export const getLaporan = async (id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/laporans/${id}?withKecamatan=1&withKeluargaKlien=1`)
    const laporan = res.data.data
    return laporan
}

export const getLaporanByToken = async (token: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/public/laporans/${token}`)
    const laporan = res.data.data as LaporanToken
    return laporan
}

export const postLaporan = async (laporan: LaporanSatgas) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/laporans', laporan, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedLaporan = res.data.data as Laporan
    return postedLaporan
}

export const patchLaporan = async (laporan: LaporanSatgas | Laporan | any, id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.patch(`/laporans/${id}`, laporan)
    const patchedLaporan = res.data.data as Laporan
    return patchedLaporan
}
export const postLaporanPublic = async (laporan: LaporanToken) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/public/laporans', laporan)
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

export const getLaporansBySearchAndStatus = async (page: number, keyword: string, status: number) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`laporans?page=${page}&search=${keyword}&status=${status}&withKecamatan=1`)
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

export const getTotalLaporan = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/statuses/count')
    const data = res.data.data as LaporanCount[]
    return data
}

export const deleteLaporan = async (id : string) => {
    const instance = CreateAxiosInstance()
    await instance.delete(`/laporans/${id}`)
}

export const postDokumenPendukung = async (laporan: LaporanSatgas) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/dokumen-pendukungs', laporan, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedLaporan = res.data.data as Laporan
    return postedLaporan
}

export const patchDokumenPendukung = async (laporan: LaporanSatgas | Laporan | any, id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.patch(`/laporans/${id}/dokumen-pendukungs`, laporan)
    const patchedLaporan = res.data.data as Laporan
    return patchedLaporan
}
