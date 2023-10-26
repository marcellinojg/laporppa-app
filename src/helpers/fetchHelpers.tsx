import React, { ReactNode, SetStateAction, useEffect } from "react";
import { Kecamatan } from "../consts/kecamatan";
import { Kelurahan } from "../consts/kelurahan";
import useLoader from "../hooks/useLoader";
import { getKelurahans } from "../api/kelurahan";
import { getKecamatans } from "../api/kecamatan";
import { useAlert } from "../hooks/useAlert";
import { Laporan } from "../consts/laporan";
import { getLaporans } from "../api/laporan";

interface FetchDataEffectsProps<T> {
    data: T,
    setData: React.Dispatch<SetStateAction<T>>,
    children: ReactNode
    setMaxPage?: React.Dispatch<SetStateAction<number>>

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
    const { setData, children, setMaxPage } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getLaporans().then((laporans) => setData(laporans)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}
