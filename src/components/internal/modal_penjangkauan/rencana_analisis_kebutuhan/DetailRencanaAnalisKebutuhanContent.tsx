import { useEffect } from "react";
import { Laporan } from "../../../../consts/laporan";
// import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailKeluargaContent {
  laporan: Laporan;
}

const DetailRencanaAnalisKebutuhanContent = (props: DetailKeluargaContent) => {
  const { laporan } = props;

  // useEffect(() => console.log(laporan), [])

  // console.log(laporan);
  return (
    <>
      <span className="font-bold text-lg">
        Detail Rencana Analis Kebutuhan Klien Oleh DP3KAPPKB
      </span>
      <div className="flex flex-col gap-2 py-3">
        {laporan.RAKK?.length && laporan.RAKK.length > 1 ? (
          laporan.RAKK?.map((rencana, index) => (
            <div key={index} className="border-b-2 flex flex-col gap-3 py-3">
              <SectionTitle>{`Pelayanan ${index + 1}`}</SectionTitle>
              <DetailLaporanItem
                label="Kebutuhan"
                value={rencana.pend_hukum ?? "-"}
              />
              <DetailLaporanItem
                label="Deskripsi Layanan yang Diberikan"
                value={keluarga.nama_lengkap ?? "-"}
              />
              <DetailLaporanItem
                label="Dokumen Pendukung"
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
              label="Deskripsi Layanan yang Diberikan"
              value={laporan.keluarga_klien?.[0]?.nama_lengkap ?? "-"}
            />
            <DetailLaporanItem
              label="Dokumen Pendukung"
              value={laporan.keluarga_klien?.[0]?.no_telp.toString() ?? "-"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailRencanaAnalisKebutuhanContent;