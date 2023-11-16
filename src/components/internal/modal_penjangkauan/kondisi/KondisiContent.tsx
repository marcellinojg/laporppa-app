import { Laporan } from "../../../../consts/laporan";
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";

interface DetailKondisi {
  laporan: Laporan;
}

const DetailKondisiContent = (props: DetailKondisi) => {
    const { laporan } = props
    return (
      <>
        <span className="font-bold text-lg">Kondisi Klien</span>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Kondisi Klien</SectionTitle>
            <DetailLaporanItem
              label="Kondisi Fisik Klien"
              value={
                laporan.kondisi_klien?.fisik ? laporan.kondisi_klien?.fisik : ""
              }
            />
            <DetailLaporanItem
              label="Kondisi Psikologis Klien"
              value={
                laporan.kondisi_klien?.psikologis ? laporan.kondisi_klien?.psikologis : ""
              }
            />
            <DetailLaporanItem
              label="Kondisi Sosial Klien"
              value={
                laporan.kondisi_klien?.sosial ? laporan.kondisi_klien?.sosial : ""
              }
            />
            <DetailLaporanItem
              label="Kondisi Spiritual Klien"
              value={
                laporan.kondisi_klien?.spiritual ? laporan.kondisi_klien?.spiritual : ""
              }
            />
          </div>
        </div>
      </>
    );
}

export default DetailKondisiContent