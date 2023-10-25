import React, { ReactNode, SetStateAction, useEffect } from "react";
import { Kecamatan } from "../consts/kecamatan";
import { Kelurahan } from "../consts/kelurahan";
import useLoader from "../hooks/useLoader";
import { getKelurahans } from "../api/kelurahan";
import { getKecamatans } from "../api/kecamatan";
import { useAlert } from "../hooks/useAlert";

interface FetchDataEffectsProps<T> {
    data: T,
    setData: React.Dispatch<SetStateAction<T>>,
    children: ReactNode

}


export const KecamatanLoader = (props: FetchDataEffectsProps<Kecamatan[]>) => {
    const { data, setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKecamatans().then((kecamatans) => setData(kecamatans)).catch((error) => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}


export const KelurahanLoader = (props: FetchDataEffectsProps<Kelurahan[]>) => {
    const { data, setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKelurahans().then((kelurahans) => setData(kelurahans)).catch((error) => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}

