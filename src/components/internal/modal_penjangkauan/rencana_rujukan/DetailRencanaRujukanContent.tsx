import { Laporan } from "../../../../consts/laporan";
import { formatDateIndonesia } from "../../../../helpers/formatDate";
import { SectionTitle } from "../../../common/Typography";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailRujukanContent {
  laporan: Laporan;
}

const DetailRencanaRujukanContent = (props: DetailRujukanContent) => {
  const { laporan } = props;
  // console.log(laporan)

  return (
    <>
      <span className="font-bold text-lg">
        Detail Rencana Rujukan Kebutuhan Klien
      </span>
      <div className="flex flex-col gap-2 py-3">
        {laporan.RRKK?.length && laporan.RRKK.length >= 1
          ? laporan.RRKK?.map((pelayanan, index) => (
              <div key={index} className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>{`Pelayanan ${index + 1}`}</SectionTitle>
                <DetailLaporanItem
                  label="Kebutuhan"
                  value={pelayanan.kebutuhan ?? "-"}
                />
                <DetailLaporanItem
                  label="OPD"
                  value={pelayanan.opd ?? "-"}
                />
                <DetailLaporanItem
                  label="Layanan yang Diberikan"
                  value={pelayanan.layanan_yang_diberikan ?? "-"}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default DetailRencanaRujukanContent;