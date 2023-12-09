import { Laporan } from "../../../../consts/laporan";
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailKondisi {
  laporan: Laporan;
}

const SituasiKeluargaContent = (props: DetailKondisi) => {
    const { laporan } = props
    return (
      <>
        <span className="font-bold text-lg">Kondisi Klien</span>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Situasi Keluarga</SectionTitle>
            <DetailLaporanItem
              label="Situasi Keluarga"
              value={
                laporan.kondisi_klien?.fisik ? laporan.kondisi_klien?.fisik : ""
              }
            />
          </div>
        </div>
      </>
    );
}

export default SituasiKeluargaContent