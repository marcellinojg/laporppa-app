import { Laporan } from "../../../../consts/laporan";
import { formatDateIndonesia } from "../../../../helpers/formatDate";
import { SectionTitle } from "../../../common/Typography";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailAnalisContent {
  laporan: Laporan;
}

const DetailRencanaAnalisKebutuhanContent = (
  props: DetailAnalisContent
) => {
  const { laporan } = props;
  // console.log(laporan)

  return (
    <>
      <span className="font-bold text-lg">Detail Rencana Analis Kebutuhan Klien Oleh Kelurahan</span>
      <div className="flex flex-col gap-2 py-3">
        {laporan.RAKK?.length && laporan.RAKK.length >= 1
          ? laporan.RAKK?.map((pelayanan, index) => (
              <div key={index} className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>{`Pelayanan ${index + 1}`}</SectionTitle>
                <DetailLaporanItem
                  label="Kebutuhan"
                  value={pelayanan.kebutuhan ?? "-"}
                />
                <DetailLaporanItem
                  label="Deskripsi Pelayanan"
                  value={pelayanan.deskripsi ?? "-"}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default DetailRencanaAnalisKebutuhanContent;
