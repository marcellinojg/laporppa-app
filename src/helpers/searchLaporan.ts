import { Laporan } from "../consts/laporan";


export const searchLaporan = (laporans: Laporan[], keyword: string) => {
    return laporans

    return laporans.filter(laporan =>
        laporan.nama_pelapor?.toLowerCase().includes(keyword.toLowerCase()) ||
        laporan.nama_klien?.toLowerCase().includes(keyword.toLowerCase()) ||
        laporan.alamat_klien?.toLowerCase().includes(keyword.toLowerCase())
    )

}