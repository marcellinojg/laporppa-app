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
    LANGKAH_OPD: 'LANGKAH_OPD',
    DOKUMEN_PENDUKUNG : 'DOKUMEN_PENDUKUNG',
    PENJADWALAN: 'PENJADWALAN',
    DETAIL_KASUS: 'DETAIL_KASUS',
    RENCANA_ANALIS_KEBUTUHAN: 'RENCANA_ANALIS_KEBUTUHAN',
    RENCANA_RUJUKAN: 'RENCANA_RUJUKAN'
}

export const MODAL_PENANGANAN_AWAL = {
    WAKTU_PENANGANAN: 'WAKTU_PENANGANAN',
    DOKUMEN_PENDUKUNG: 'DOKUMEN_PENDUKUNG'
}

export interface ContentModal {
    laporan : Laporan
    setRefetch?: Dispatch<SetStateAction<boolean>>
    setIsModalActive: Dispatch<SetStateAction<boolean>>
   
}

export interface FormModal {
    mode : 'read' | 'edit' | 'input'
    setIsModalActive: Dispatch<SetStateAction<boolean>>
    setRefetch?: Dispatch<SetStateAction<boolean>> | undefined
    laporan: Laporan
}