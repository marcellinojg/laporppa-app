import { SatgasPelapor } from "./satgas"

export interface KondisiKlien {
    laporan_id: string
    fisik: string
    psikologis: string
    sosial: string
    spiritual: string
    satgas: SatgasPelapor
}