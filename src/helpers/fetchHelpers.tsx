import React, { ReactNode, SetStateAction, useEffect } from "react";
import { Kecamatan } from "../consts/kecamatan";
import { Kelurahan } from "../consts/kelurahan";
import useLoader from "../hooks/useLoader";
import { getKelurahans } from "../api/kelurahan";
import { getKecamatans } from "../api/kecamatan";
import { useAlert } from "../hooks/useAlert";
import { Laporan } from "../consts/laporan";
import { getLaporansBySearchAndStatus } from '../api/laporan';
import PaginationData from "../consts/pagination";

interface FetchDataEffectsProps<T> {
    data: T,
    setData: React.Dispatch<SetStateAction<T>>,
    children: ReactNode
    page?: number,
    setPaginationData?: React.Dispatch<SetStateAction<PaginationData | null>>,
    keyword?: string
    setPage?: React.Dispatch<SetStateAction<number>>
    status?: number

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


export const LaporanLoader = (props: FetchDataEffectsProps<Laporan[]>) => {
    const { setData, children, page = 1, keyword = "", setPaginationData, setPage, status = 0 } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getLaporansBySearchAndStatus(page, keyword, status)
            .then(({ laporans, paginationData }) => {
                setData(laporans)
                setPaginationData!(paginationData)
            })
            .catch(() => errorFetchAlert())
            .finally(() => hideLoader())
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [keyword, page, status])

    useEffect(() => {
        setPage!(1)
    }, [keyword, status])

    return <>
        {children}
    </>
}
