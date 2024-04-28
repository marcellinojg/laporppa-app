interface Tipe {
    id?: number
    name?: string
    is_active?: boolean
    butuh_pelaku?: boolean
}

interface Kategori {
    id?: number
    id_tipe_permasalahan?: number
    name?: string
    is_active?: boolean
}