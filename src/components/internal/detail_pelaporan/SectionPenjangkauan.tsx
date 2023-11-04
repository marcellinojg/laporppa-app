import { Dispatch, SetStateAction } from "react"
import { Laporan } from "../../../consts/laporan"
import Pill from "../Pill"
import DetailPenjangkauanItem from "./DetailPenjangkauanItem"
import { formatDate } from "../../../helpers/formatDate"

interface SectionPenjangkauanProps {
    laporan: Laporan
    setRefetch: Dispatch<SetStateAction<boolean>>
}


const SectionPenjangkauan = (props: SectionPenjangkauanProps) => {
    const { laporan } = props

    return <>
        <div className="flex gap-3 lg:flex-row flex-col items-center justify-start">
            <h2 className="font-bold text-xl">Detail Penjangkauan <br className="lg:hidden" /> <span className="text-primary">{laporan.nama_pelapor}</span></h2>
            <Pill status={laporan.status.id} />
        </div>
        <div className="flex flex-col gap-2 py-3">
            <h3 className="text-primary text-lg font-bold">Hasil Penjangkauan</h3>
            <span className="text-sm text-gray-500 -mt-2">Berikut ini merupakan hasil penjangkauan ke klien</span>
            <div className="flex flex-col mt-5">
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Data Klien"
                    help_text="Masukkan informasi detail identitas klien hingga alamat."
                    is_done={true}
                    last_edit_by={laporan.satgas_pelapor.nama}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Data Keluarga Klien"
                    help_text="Masukkan informasi detail identitas keluarga klien terkait ayah, ibu dan saudara-saudara."
                    is_done={true}
                    last_edit_by={laporan.satgas_pelapor.nama}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Situasi Keluarga"
                    help_text="Deskripsikan kondisi situasi keluarga pada saat kejadian dan saat ini."
                    is_done={true}
                    last_edit_by={laporan.satgas_pelapor.nama}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Kronologi Kejadian"
                    help_text="Deskripsikan kronologis kejadian secara lengkap."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Harapan Klien dan Keluarga"
                    help_text="Deskripsikan harapan yang diinginkan oleh klien dan keluarga dari kejadian ini."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Kondisi Klien"
                    help_text="Masukkan informasi detail kondisi klien terkait kondisi fisik, psikologis dst."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Rencana Analis Kebutuhan Klien Oleh DP3KAPPKB"
                    help_text="Masukkan detail rencana rujukan yang akan diberikan kepada klien."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Rencana Rujukan Kebutuhan Klien"
                    help_text="Masukkan detail rencana rujukan yang akan diberikan kepada klien."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Langkah yang Telah Dilakukan"
                    help_text="Masukkan informasi pelayanan yang telah diberikan dari instansi terkait."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
                <DetailPenjangkauanItem
                    laporan={laporan}
                    title="Dokumen Pendukung"
                    help_text="Unggah dokumen pendukung antara lain foto klien, KK, KTP, tempat tinggal dsb."
                    is_done={false}
                    updated_at={formatDate(new Date().toString(), true)}
                />
            </div>
        </div>
    </>
}

export default SectionPenjangkauan