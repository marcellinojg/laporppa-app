import { SatgasPelapor } from "./satgas"

export interface KondisiKlien {
    id: number
    laporan_id: string
    fisik: string
    psikologis: string
    sosial: string
    spiritual: string
    satgas: SatgasPelapor
}