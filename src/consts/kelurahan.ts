import { Kecamatan } from "./kecamatan"

export interface Kelurahan {
    id: number
    kecamatan: Kecamatan
    nama: string
    is_active?: boolean
}
