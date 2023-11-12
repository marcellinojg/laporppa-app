import { Laporan } from "../../../../consts/laporan"
import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"


interface DetailLangkahContent{
    laporan : Laporan
}

const DetailLangkahContent = (props: DetailLangkahContent) => {
    const { laporan } = props
    console.log(laporan)
    return <>
        <span className="font-bold text-lg">Detail Langkah yang Telah Dilakukan</span>
        {laporan.langkah?.length > 1 ? (laporan.langkah?.map((langkah, index) => (
         <div key={index} className="border-b-2 flex flex-col gap-3 py-3">
        <SectionTitle>{`Langkah ${index + 1}`}</SectionTitle>
  
        <p className="text-sm whitespace-preline">{langkah.langkah ?? '-'}</p>
      </div>
    ))
  ) : (
    <div className="border-b-2 flex flex-col gap-3 py-3">
    <SectionTitle>Langkah</SectionTitle>
    {laporan.langkah && laporan.langkah.length === 0 ? (
      <p>Belum ada langkah yang diinputkan</p>
    ) : (
      <>
        <p className="text-sm whitespace-preline">{laporan.langkah ?? '-'}</p>
      </>
    )}
  </div>
  )}
    </>
}

export default DetailLangkahContent