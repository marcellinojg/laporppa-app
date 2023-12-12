import { Laporan } from "../../../../consts/laporan";
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface Situasi {
  situasi_keluarga:string,
  laporan: Laporan
}

const SituasiKeluargaContent = (props: Situasi) => {
    const { laporan } = props
    return (
      <>
        <span className="font-bold text-lg">Kondisi Klien</span>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Detail Situasi Keluarga</SectionTitle>
              <p className="text-sm whitespace-preline">
               {laporan.situasi_keluarga? laporan.situasi_keluarga .split('\n').map((line, index) => [line,
                 <br key={index} />,
              ])
                : '-'}</p>
          </div>
        </div>
      </>
    );
}

export default SituasiKeluargaContent