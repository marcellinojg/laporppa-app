import { DetailKlien } from "../consts/detail_klien"
import { Laporan, LaporanCount, LaporanSatgas, LaporanToken } from "../consts/laporan"
import PaginationData from "../consts/pagination"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"

export const getLaporans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/laporans?withKecamatan=1')
    const listLaporan = res.data.data as Laporan[]
    return listLaporan
}

export const getLaporan = async (id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/laporans/${id}?withKecamatan=1`)
    const laporan = res.data.data as Laporan
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

export const patchPenjadwalan = async (penjadwalan: Penjadwalan) => {
    const instance = CreateAxiosInstance()
    const res = await instance.put(`/penjadwalans/${penjadwalan.id}`, penjadwalan, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const patchedPenjadwalan = res.data.data2 as Penjadwalan
    return patchedPenjadwalan
}

export const postPenjadwalan = async (penjadwalan: Penjadwalan) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/penjadwalans', penjadwalan, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedPenjadwalan = res.data.data as Penjadwalan
    return postedPenjadwalan
}

export const patchDetailKlien = async (detail_klien: DetailKlien) => {
    const instance = CreateAxiosInstance()
    const res = await instance.put(`/detail-kliens/${detail_klien.id}`, detail_klien, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const patchedDetailKlien = res.data.data2 as DetailKlien
    return patchedDetailKlien
}

export const postDetailKlien = async (detail_klien: DetailKlien) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/detail-kliens', detail_klien, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedDetailKlien = res.data.data as DetailKlien
    return postedDetailKlien
}