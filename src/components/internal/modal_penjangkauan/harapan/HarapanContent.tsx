import { Laporan } from "../../../../consts/laporan";
import { SectionTitle } from "../../../common/Typography";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailKondisi {
  laporan: Laporan;
}

const DetailHarapanContent = (props: DetailKondisi) => {
  const { laporan } = props;
  return (
    <>
      <span className="font-bold text-lg">Detail Harapan Klien dan Keluarga</span>
      <div className="flex flex-col gap-2 py-3">
        <div className="border-b-2 flex flex-col gap-3 py-3">
          <SectionTitle>Detail Harapan Klien dan Keluarga</SectionTitle>
          <p className="text-sm whitespace-preline">
               {laporan.harapan_klien_dan_keluarga? laporan.harapan_klien_dan_keluarga .split('\n').map((line, index) => [line,
                 <br key={index} />,
              ])
                : '-'}</p>
        </div>
      </div>
    </>
  );
};

export default DetailHarapanContent;
