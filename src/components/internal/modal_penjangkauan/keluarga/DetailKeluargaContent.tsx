import { useEffect } from "react"
import { Laporan } from "../../../../consts/laporan"
// import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"

interface DetailKeluargaContent{
    laporan : Laporan
}

const DetailKeluargaContent = (props: DetailKeluargaContent) => {
    const { laporan } = props

    console.log(laporan)
    return <>
        <span className="font-bold text-lg">Detail Data Keluarga</span>
        <div className="flex flex-col gap-2 py-3">
        {laporan.keluarga_klien?.length > 1 ? ( laporan.keluarga_klien?.map((keluarga, index) => (
        <div key={index} className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>{`Keluarga ${index + 1}`}</SectionTitle>
            <DetailLaporanItem label="Hubungan dengan Klien" value={keluarga.hubungan.hubungan ?? '-'} />
            <DetailLaporanItem label="Nama Lengkap" value={keluarga.nama_lengkap ?? '-'} />
            <DetailLaporanItem label="No. Telepon/Whatsapp" value={keluarga.no_telp.toString() ?? '-'} />
      </div>
    ))
  ) : (
    <div className="border-b-2 flex flex-col gap-3 py-3">
      <SectionTitle>Data Keluarga</SectionTitle>
      <DetailLaporanItem label="Hubungan dengan Klien" value={laporan.keluarga_klien?.[0]?.hubungan.hubungan ?? '-'} />
      <DetailLaporanItem label="Nama Lengkap" value={laporan.keluarga_klien?.[0]?.nama_lengkap ?? '-'} />
      <DetailLaporanItem label="No. Telepon/Whatsapp" value={laporan.keluarga_klien?.[0]?.no_telp.toString() ?? '-'} />
    </div>
  )}
        </div>
    </>
}

export default DetailKeluargaContent