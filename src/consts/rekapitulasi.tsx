export interface Rekapitulasi {
    id: string;
    nama: string;
    menunggu_validasi: number;
    sedang_ditangani: number;
    total_selesai: number;
    total: number;
}