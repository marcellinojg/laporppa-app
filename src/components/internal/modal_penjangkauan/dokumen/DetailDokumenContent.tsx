import { Laporan } from "../../../../consts/laporan"
import { ContentModal } from "../../../../consts/modal_penjangkauan"
import Uploader from "../../../form/Uploader"
// import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"
import { DokumenPendukung } from "../../../../consts/dokumen_pendukung"


interface DetailDokumenContent{
    laporan: Laporan
}

const DetailDokumenContent = (props: DetailDokumenContent) => {
    const {laporan } = props
    console.log(laporan.dokumen_pendukung.dokumen_pendukung.dokumen_pendukung)
    return <>
        <span className="font-bold text-lg">Dokumen Pendukung</span>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
            <div>
      
    </div>
                <DetailLaporanItem label="Foto Klien" value={laporan.dokumen_pendukung.dokumen_pendukung.foto_klien ?? '-'} />
                <DetailLaporanItem label="Foto Tempat Tinggal Klien" value={laporan.dokumen_pendukung.dokumen_pendukung.foto_tempat_tinggal ?? '-'} />
                <DetailLaporanItem label="Foto Pendampingan Awal" value={laporan.dokumen_pendukung.dokumen_pendukung.foto_pendampingan_awal ?? '-'} />
                <DetailLaporanItem label="Foto Pendampingan Lanjutan" value={laporan.dokumen_pendukung.dokumen_pendukung.foto_pendampingan_lanjutan ?? '-'} />
                <DetailLaporanItem label="Foto Identitas Klien (KK)" value={laporan.dokumen_pendukung.dokumen_pendukung.foto_kk ?? '-'} />
                <DetailLaporanItem label="Dokumen Pendukung" value={laporan.dokumen_pendukung.dokumen_pendukung.dokumen_pendukung ?? '-'} />
            </div>
        </div>
    </>
}

export default DetailDokumenContent