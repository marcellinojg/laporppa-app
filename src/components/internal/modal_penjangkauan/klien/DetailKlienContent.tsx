import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"

const DetailKlienContent = (props: ContentModal) => {
    const { } = props
    return <>
        <span className="font-bold text-lg">Detail Data Klien</span>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>Identitas Klien</SectionTitle>
                <DetailLaporanItem label="Nama Lengkap" value={'-'} />
                <DetailLaporanItem label="NIK" value={'-'} />
                <DetailLaporanItem label="Alamat Domisili" value={'-'} />
                <DetailLaporanItem label="Nomor KK" value={'-'} />
                <DetailLaporanItem label="Alamat KK" value={'-'} />
                <DetailLaporanItem label="No. Telp / Whatsapp" value={'-'} />
                <DetailLaporanItem label="Tempat, Tanggal Lahir" value={'-'} />
                <DetailLaporanItem label="Usia" value={'-'} />
                <DetailLaporanItem label="Kategori Klien" value={'-'} />
                <DetailLaporanItem label="Jenis Klien" value={'-'} />
                <DetailLaporanItem label="Jenis Kelamin" value={'-'} />
                <DetailLaporanItem label="Agama" value={'-'} />
                <DetailLaporanItem label="Pekerjaan" value={'-'} />
                <DetailLaporanItem label="Penghasilan/Bulan" value={'-'} />
                <DetailLaporanItem label="Status Perkawinan" value={'-'} />
                <DetailLaporanItem label="Kepemilikan BPJS" value={'-'} />

            </div>

            <div className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>Pendidikan Klien</SectionTitle>
                <DetailLaporanItem label="Pendidikan" value={'-'} />
                <DetailLaporanItem label="Kelas" value={'-'} />
                <DetailLaporanItem label="Nama Instansi Sekolah" value={'-'} />
                <DetailLaporanItem label="Jurusan Sekolah" value={'-'} />
                <DetailLaporanItem label="Tahun Lulus" value={'-'} />
            </div>
        </div>
    </>
}

export default DetailKlienContent