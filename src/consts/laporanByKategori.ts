export interface RWCount {
    rw: number
    count: number
}

export interface LaporanByKategori {
    kategori_id: number
    kategori_nama: string
    count_total: RWCount[]
}
