import { Dispatch, SetStateAction } from "react"


export const MODAL_PENJANGKAUAN = {
    KLIEN : 'KLIEN',
    KELUARGA: 'KELUARGA',
    SITUASI: 'SITUASI',
    KRONOLOGI: 'KRONOLOGI',
    HARAPAN : 'HARAPAN',
    KONDISI: 'KONDISI',
    LANGKAH_DILAKUKAN: 'LANGKAH_DILAKUKAN',
}


export interface ContentModal {

}

export interface FormModal {
    mode : 'read' | 'edit' | 'input'
    setIsModalActive : Dispatch<SetStateAction<boolean>>
}