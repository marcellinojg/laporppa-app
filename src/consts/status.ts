

export const STATUS_LAPORAN = {
    MENUNGGU_VALIDASI: 1,
    SEDANG_DITANGANI: 2,
    KASUS_DITOLAK: 3,
    KASUS_SELESAI: 4,
    KASUS_DIKEMBALIKAN: 5,
    KASUS_DITERUSKAN: 6,
    SEMUA_KASUS: 0,
}

export interface Status {
    id: number,
    nama: string,
}