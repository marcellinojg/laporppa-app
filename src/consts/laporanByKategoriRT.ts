export interface RtCount {
    rt: number
    count: number
}

export interface LaporanByKategoriRT {
    kategori_id: number
    kategori_nama: string
    count_total: RtCount[]
}
