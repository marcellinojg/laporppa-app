import FormPenangananAwal from "../components/internal/modal_penanganan_awal/waktu_penanganan/FormPenangananAwal";
import PenangananAwalContent from "../components/internal/modal_penanganan_awal/waktu_penanganan/PenangananAwalContent";
import { MODAL_PENANGANAN_AWAL } from "../consts/modal_penjangkauan";
import FormDokumenPenanganan from "../components/internal/modal_penanganan_awal/dokumen_penanganan/FormDokumenPenanganan";

const modalPenangananAwalMapper = (type: string) => {
  switch (type) {
    case MODAL_PENANGANAN_AWAL.WAKTU_PENANGANAN:
      return [PenangananAwalContent, FormPenangananAwal];
    case MODAL_PENANGANAN_AWAL.DOKUMEN_PENDUKUNG:
      return [PenangananAwalContent, FormDokumenPenanganan]
    default:
      console.warn("MODAL TYPE NOT FOUND");
      return [];
  }
};

export default modalPenangananAwalMapper;