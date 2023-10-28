import { Laporan } from "../../../consts/laporan"
import Pill from "../Pill"
import DetailLaporanItem from "./DetailLaporanItem"


interface SectionPelaporanProps {
    laporan: Laporan
}

const SectionPelaporan = (props: SectionPelaporanProps) => {
    const { laporan } = props
    return <>
        <div className="flex items-center gap-3">
            <h2 className="font-bold text-xl">Detail Data Laporan <span className="text-primary">{laporan.nama_pelapor}</span></h2>
            <Pill status={laporan.status?.id!} />
        </div>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <h3 className="text-primary text-lg font-bold">Waktu Pelaporan</h3>
                <DetailLaporanItem label="Nomor Registrasi" value={laporan.id} />
                <DetailLaporanItem label="Sumber Pengaduan" value="" />
                <DetailLaporanItem label="Tanggal & Jam Pengaduan" value={laporan.created_at} />
            </div>
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <h3 className="text-primary text-lg font-bold">Identitas Pelapor</h3>
                <DetailLaporanItem label="Nama Lengkap" value={laporan.nama_pelapor} />
                <DetailLaporanItem label="NIK" value="" />
                <DetailLaporanItem label="Alamat Domisili" value="" />
                <DetailLaporanItem label="No. Telepon/Whatsapp" value={laporan.no_telp_pelapor} />
            </div>
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <h3 className="text-primary text-lg font-bold">Identitas Klien</h3>
                <DetailLaporanItem label="Nama Lengkap (Inisial)" value={laporan.nama_korban} />
                <DetailLaporanItem label="NIK" value="" />
                <DetailLaporanItem label="Alamat Domisili" value={laporan.alamat} />
                <DetailLaporanItem label="Kecamatan" value="" />
                <DetailLaporanItem label="Kelurahan" value="" />
                <DetailLaporanItem label="No. Telepon/Whatsapp" value="" />
            </div>
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <h3 className="text-primary text-lg font-bold">Permasalahan Klien</h3>
                <DetailLaporanItem label="Uraian Singkat Permasalahan" value="" />
            </div>
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <h3 className="text-primary text-lg font-bold">Dokumentasi Pengaduan</h3>
            </div>
        </div>
    </>
}

export default SectionPelaporan