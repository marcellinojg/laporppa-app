import { Dispatch, SetStateAction } from "react"
import { Laporan } from "./laporan"
import { Laporan } from "./laporan"


export const MODAL_PENJANGKAUAN = {
    KLIEN : 'KLIEN',
    KELUARGA: 'KELUARGA',
    PELAKU: 'PELAKU',
    SITUASI: 'SITUASI',
    KRONOLOGI: 'KRONOLOGI',
    HARAPAN : 'HARAPAN',
    KONDISI: 'KONDISI',
    LANGKAH_DILAKUKAN: 'LANGKAH_DILAKUKAN',
    PENJADWALAN: 'PENJADWALAN',
    DETAIL_KASUS: 'DETAIL_KASUS'
}


export interface ContentModal {
    laporan?: Laporan
    setRefetch?: Dispatch<SetStateAction<boolean>> | undefined
    setIsModalActive: Dispatch<SetStateAction<boolean>>
}

export interface FormModal {
    mode : 'read' | 'edit' | 'input'
    setIsModalActive: Dispatch<SetStateAction<boolean>>
    setRefetch?: Dispatch<SetStateAction<boolean>> | undefined
    laporan: Laporan
}