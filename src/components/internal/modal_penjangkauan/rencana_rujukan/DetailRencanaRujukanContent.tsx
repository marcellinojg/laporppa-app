import { useEffect } from "react";
import { Laporan } from "../../../../consts/laporan";
// import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailKeluargaContent {
  laporan: Laporan;
}

const DetailRencanaRujukanContent = (props: DetailKeluargaContent) => {
  const { laporan } = props;

  // useEffect(() => console.log(laporan), [])

  // console.log(laporan);
  return (
    <>
      <span className="font-bold text-lg">
        Detail Rencana Rujukan Kebutuhan Klien
      </span>
      <div className="flex flex-col gap-2 py-3">
        {laporan.keluarga_klien?.length && laporan.keluarga_klien.length > 1 ? (
          laporan.keluarga_klien?.map((keluarga, index) => (
            <div key={index} className="border-b-2 flex flex-col gap-3 py-3">
              <SectionTitle>{`Pelayanan ${index + 1}`}</SectionTitle>
              <DetailLaporanItem
                label="Kebutuhan"
                value={keluarga.hubungan.hubungan ?? "-"}
              />
              <DetailLaporanItem
                label="OPD"
                value={keluarga.nama_lengkap ?? "-"}
              />
              <DetailLaporanItem
                label="Pelayanan yang Diberikan"
                value={keluarga.no_telp.toString() ?? "-"}
              />
            </div>
          ))
        ) : (
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>
              Pelayanan 1
            </SectionTitle>
            <DetailLaporanItem
              label="Kebutuhan"
              value={laporan.keluarga_klien?.[0]?.hubungan.hubungan ?? "-"}
            />
            <DetailLaporanItem
              label="OPD"
              value={laporan.keluarga_klien?.[0]?.nama_lengkap ?? "-"}
            />
            <DetailLaporanItem
              label="Pelayanan yang Diberikan"
              value={laporan.keluarga_klien?.[0]?.no_telp.toString() ?? "-"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailRencanaRujukanContent;