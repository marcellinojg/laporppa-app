import { Laporan } from "../consts/laporan"

export const filterLaporanByStatus = (laporans: Laporan[], status_id: number) => {
    if (status_id == 0) return laporans
    else return laporans.filter(laporan => laporan.status!.id === status_id)
}