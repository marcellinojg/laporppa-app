import { Laporan } from "../../../../consts/laporan";
import { SectionTitle } from "../../../common/Typography";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailKronologi {
  laporan: Laporan;
}

const DetailKronologiContent = (props: DetailKronologi) => {
  const { laporan } = props;
  return (
    <>
      <span className="font-bold text-lg">Detail Kronologi Kejadian</span>
      <div className="flex flex-col gap-2 py-3">
        <div className="border-b-2 flex flex-col gap-3 py-3">
          <SectionTitle>Detail Kronologi Kejadian</SectionTitle>
                      <p className="text-sm whitespace-preline">
               {laporan.kronologi_kejadian? laporan.kronologi_kejadian .split('\n').map((line, index) => [line,
                 <br key={index} />,
              ])
                : '-'}</p>
        </div>
      </div>
    </>
  );
};

export default DetailKronologiContent;