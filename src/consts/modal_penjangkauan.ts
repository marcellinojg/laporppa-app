import { Dispatch, SetStateAction } from "react"
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
}


export interface ContentModal {
    laporan?: Laporan
}

export interface FormModal {
    mode : 'read' | 'edit' | 'input'
    setIsModalActive : Dispatch<SetStateAction<boolean>>
    laporan : Laporan
}