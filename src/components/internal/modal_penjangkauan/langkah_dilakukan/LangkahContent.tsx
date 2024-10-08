import { Laporan } from "../../../../consts/laporan"
import { formatDateIndonesia } from "../../../../helpers/formatDate"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"

interface DetailLangkahContent{
    laporan : Laporan
}

const DetailLangkahContent = (props: DetailLangkahContent) => {
    const { laporan } = props
    // console.log(laporan)
  
    return (
      <>
        <span className="font-bold text-lg">Detail Langkah yang Telah Dilakukan Kelurahan</span>
        <div className="flex flex-col gap-2 py-3">
          {laporan.langkah_telah_dilakukan?.length &&
          laporan.langkah_telah_dilakukan.length >= 1
            ? laporan.langkah_telah_dilakukan?.map((langkah, index) => (
                <div
                  key={index}
                  className="border-b-2 flex flex-col gap-3 py-3"
                >
                  <SectionTitle>{`Langkah ${index + 1}`}</SectionTitle>
                  <DetailLaporanItem
                    label="Tanggal Langkah Dilakukan"
                    value={
                      formatDateIndonesia(langkah.tanggal_pelayanan) ?? "-"
                    }
                  />
                  <DetailLaporanItem
                    label="Pelayanan yang Diberikan"
                    value={langkah.pelayanan_yang_diberikan ?? "-"}
                  />
                  <DetailLaporanItem
                    label="Deskripsi Pelayanan"
                    value={langkah.deskripsi ?? "-"}
                  />
                  {/* <DetailLaporanItem
                    label="Dokumentasi Pelayanan"
                    value={langkah.dokumentasi ? langkah.dokumentasi : '-'}
                /> */}
                </div>
              ))
            : null}
        </div>
      </>
    );
}

export default DetailLangkahContent