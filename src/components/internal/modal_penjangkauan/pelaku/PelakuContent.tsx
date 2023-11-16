import { Laporan } from "../../../../consts/laporan"
// import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"
import { useEffect } from "react";

interface DetailPelaku {
    laporan: Laporan
}

const DetailPelaku = (props: DetailPelaku) => {
    const { laporan } = props
    useEffect(() => {
            console.log(laporan, "isi laporan")
    }, []);
    
    return (
      <>
        <span className="font-bold text-lg">Pelaku</span>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <DetailLaporanItem
              label="Nama Lengkap"
              value={laporan.pelaku?.nama_lengkap ? laporan.pelaku.nama_lengkap : "-"}
            />
            <DetailLaporanItem
              label="Hubungan"
              value={laporan.pelaku?.hubungan ? laporan.pelaku.hubungan : "-"}
            />
            <DetailLaporanItem
              label="Alamat Domisili"
              value={laporan.pelaku?.usia ? laporan.pelaku.usia.toString() : "-"}
            />
          </div>
        </div>
      </>
    );
}

export default DetailPelaku