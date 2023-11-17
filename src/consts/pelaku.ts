import { SatgasPelapor } from "./satgas"

export interface Pelaku {
    laporan_id: string
    nama_lengkap: string
    hubungan: string
    usia: number
    satgas: SatgasPelapor
}