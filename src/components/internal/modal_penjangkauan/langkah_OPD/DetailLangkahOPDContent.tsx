import { Laporan } from "../../../../consts/laporan"
import { formatDateIndonesia } from "../../../../helpers/formatDate"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"




interface DetailLangkahOPDContent{
    laporan : Laporan
}

const DetailLangkahContentOPD = (props: DetailLangkahOPDContent) => {
    const { laporan } = props
    // console.log(laporan)
  
    return (
      <>
        <span className="font-bold text-lg">Detail Langkah yang Telah Dilakukan OPD</span>
        <div className="flex flex-col gap-2 py-3">
          {laporan.lintas_opd?.length && laporan.lintas_opd.length >= 1
            ? laporan.lintas_opd?.map((langkah, index) => (
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
                    label="Instansi"
                    value={langkah.instansi ?? "-"}
                  />
                  <DetailLaporanItem
                    label="Pelayanan yang Diberikan"
                    value={langkah.pelayanan_diberikan ?? "-"}
                  />
                  <DetailLaporanItem
                    label="Deskripsi Pelayanan"
                    value={langkah.deskripsi_pelayanan ?? "-"}
                  />
                </div>
              ))
            : null}
        </div>
        {/* <span className="font-bold text-lg mb-3">Detail Langkah yang Telah Dilakukan</span>
        <p className="text-sm whitespace-preline">
            {laporan.langkah_telah_dilakukan? laporan.langkah_telah_dilakukan.split('\n').map((line, index) => [
            line,
            <br key={index} />,
        ])
        : '-'}</p> */}
      </>
    );
}

export default DetailLangkahContentOPD