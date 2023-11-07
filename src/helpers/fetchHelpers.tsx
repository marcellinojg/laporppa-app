import React, { ReactNode, SetStateAction, useEffect } from "react";
import { Kecamatan } from "../consts/kecamatan";
import { Kelurahan } from "../consts/kelurahan";
import useLoader from "../hooks/useLoader";
import { getKelurahans } from "../api/kelurahan";
import { getKecamatans } from "../api/kecamatan";
import { useAlert } from "../hooks/useAlert";
import { Laporan, LaporanCount } from "../consts/laporan";
import { getLaporan, getLaporansBySearchAndStatus, getTotalLaporan } from '../api/laporan';
import PaginationData from "../consts/pagination";
import { getKategoris } from "../api/kategori";
import { SatgasPelapor } from "../consts/satgas";
import { getSatgasPelapors } from "../api/satgas";

interface FetchDataEffectsProps<T> {
    data: T,
    setData: React.Dispatch<SetStateAction<T>>,
    children: ReactNode
    page?: number,
    setPaginationData?: React.Dispatch<SetStateAction<PaginationData | null>>,
    keyword?: string
    setPage?: React.Dispatch<SetStateAction<number>>
    status?: number
    id?: string
    refetch?: boolean
    setRefetch?: React.Dispatch<SetStateAction<boolean>>

}


export const KecamatanLoader = (props: FetchDataEffectsProps<Kecamatan[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKecamatans().then((kecamatans) => setData(kecamatans)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}


export const KelurahanLoader = (props: FetchDataEffectsProps<Kelurahan[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKelurahans().then((kelurahans) => setData(kelurahans)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}


export const AllLaporanLoader = (props: FetchDataEffectsProps<Laporan[]>) => {
    const { setData, children, page = 1, keyword = "", setPaginationData, setPage, status = 0, refetch, setRefetch } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        setRefetch!(true)
    }, [keyword, status, page])

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getLaporansBySearchAndStatus(page, keyword, status)
                .then(({ laporans, paginationData }) => {
                    setData(laporans)
                    setPaginationData!(paginationData)
                })
                .catch(() => errorFetchAlert())
                .finally(() => hideLoader())
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        setRefetch!(false)

    }, [refetch])

    useEffect(() => {
        setPage!(1)
    }, [keyword, status])

    return <>
        {children}
    </>
}

export const LaporanLoader = (props: FetchDataEffectsProps<Laporan | null | undefined>) => {
    const { setData, id, children, refetch, setRefetch } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getLaporan(id!)
                .then((laporan : Laporan) => {
                    const tanggal_jam_pengaduan = new Date(laporan.tanggal_jam_pengaduan)
                    setData({
                        ...laporan,
                        tanggal_pengaduan : tanggal_jam_pengaduan,
                        jam_pengaduan: `${tanggal_jam_pengaduan.getHours()}:${tanggal_jam_pengaduan.getMinutes()}`
                    })
                })
                .catch((error) => {
                    if (error.response.status == 404)
                        setData(null)
                    else
                        errorFetchAlert()
                })
                .finally(() => hideLoader())
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        setRefetch!(false)
    }, [refetch])

    return <>
        {children}
    </>
}

export const KategoriLoader = (props: FetchDataEffectsProps<Kategori[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKategoris().then((kategoris) => setData(kategoris)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}

export const LaporanCountLoader = (props: FetchDataEffectsProps<LaporanCount[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getTotalLaporan().then((totalLaporan) => setData(totalLaporan)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}

export const SatgasPelaporLoader = (props: FetchDataEffectsProps<SatgasPelapor[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getSatgasPelapors().then((satgasPelapors) => setData(satgasPelapors)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}