export interface DokumenPendukung{
    // foto_klien: File[]
    // foto_tempat_tinggal: File[]
    // foto_pendampingan_awal: File[]
    // foto_pendampingan_lanjutan: File[]
    // foto_pendampingan_monitoring: File[]
    // foto_kk: File[]
    // dokumen_pendukung: File[]
    id?: number;
    dokumen_pendukung: {
        foto_klien: File[]
        foto_tempat_tinggal: File[]
        foto_pendampingan_awal: File[]
        foto_pendampingan_lanjutan: File[]
        foto_pendampingan_monitoring: File[]
        foto_kk: File[]
        dokumen_pendukung: File[]
    }
    laporan_id: string
}