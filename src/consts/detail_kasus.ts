import { JenisKasus } from "./jenis_kasus"

export interface Detailkasus {
    id: number
    laporan_id: string
    kategori_kasus: Kategori
    jenis_kasus: JenisKasus
    lokasi_kasus: string
    tanggal_jam_kejadian: Date
}