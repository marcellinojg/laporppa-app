import { ContentModal } from "../../../../consts/modal_penjangkauan"
import Uploader from "../../../form/Uploader"
// import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"

const DetailDokumenContent = (props: ContentModal) => {
    const { } = props
    return <>
        <span className="font-bold text-lg">Dokumen Pendukung</span>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <DetailLaporanItem label="Foto Klien" value={'-'} />
                <DetailLaporanItem label="Foto Tempat Tinggal Klien" value={'-'} />
                <DetailLaporanItem label="Foto Pendampingan Awal" value={'-'} />
                <DetailLaporanItem label="Foto Pendampingan Lanjutan" value={'-'} />
                <DetailLaporanItem label="Foto Identitas Klien (KK)" value={'-'} />
                <DetailLaporanItem label="Dokumen Pendukung" value={'-'} />
            </div>
        </div>
    </>
}

export default DetailDokumenContent