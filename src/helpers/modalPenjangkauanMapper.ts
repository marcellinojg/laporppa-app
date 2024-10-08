import FormDetailHarapan from '../components/internal/modal_penjangkauan/harapan/FormHarapan';
import DetailHarapanContent from '../components/internal/modal_penjangkauan/harapan/HarapanContent';
import DetailKlienContent from '../components/internal/modal_penjangkauan/klien/DetailKlienContent';
import DetailKronologiContent from '../components/internal/modal_penjangkauan/kronologi/KronologiContent';
import FormDetailKlien from '../components/internal/modal_penjangkauan/klien/FormDetailKlien';
import FormDetailKronologi from '../components/internal/modal_penjangkauan/kronologi/FormKronologi';
import { MODAL_PENJANGKAUAN } from '../consts/modal_penjangkauan';
import DetailKondisiContent from '../components/internal/modal_penjangkauan/kondisi/KondisiContent';
import FormDetailKondisi from '../components/internal/modal_penjangkauan/kondisi/FormKondisi';
import DetailLangkahContent from '../components/internal/modal_penjangkauan/langkah_dilakukan/LangkahContent';
import FormDetailLangkah from '../components/internal/modal_penjangkauan/langkah_dilakukan/FormLangkah';
import DetailDokumenContent from '../components/internal/modal_penjangkauan/dokumen/DetailDokumenContent';
import FormDetailDokumen from '../components/internal/modal_penjangkauan/dokumen/FormDetailDokumen';
import PenjadwalanContent from '../components/internal/modal_penjangkauan/penjadwalan/PenjadwalanContent';
import FormPenjadwalan from '../components/internal/modal_penjangkauan/penjadwalan/FormPenjadwalan';
import FormPelaku from '../components/internal/modal_penjangkauan/pelaku/FormPelaku';
import DetailPelaku from '../components/internal/modal_penjangkauan/pelaku/PelakuContent';
import DetailKasusContent from '../components/internal/modal_penjangkauan/detail_kasus/DetailKasusContent';
import FormDetailKasus from '../components/internal/modal_penjangkauan/detail_kasus/FormDetailKasus';
import SituasiKeluargaContent from '../components/internal/modal_penjangkauan/situasi_keluarga/SituasiKeluargaContent';
import FormSituasiKeluarga from '../components/internal/modal_penjangkauan/situasi_keluarga/FormSituasiKeluarga';
import DetailKeluargaContent from '../components/internal/modal_penjangkauan/keluarga/DetailKeluargaContent';
import FormKeluargaKlien from '../components/internal/modal_penjangkauan/keluarga/FormDetailKeluarga';
import DetailRencanaAnalisKebutuhanContent from '../components/internal/modal_penjangkauan/rencana_analisis_kebutuhan/DetailRencanaAnalisKebutuhanContent';
import FormRencanaAnalisKebutuhan from '../components/internal/modal_penjangkauan/rencana_analisis_kebutuhan/FormRencanaAnalisKebutuhan';
import DetailRencanaRujukanContent from '../components/internal/modal_penjangkauan/rencana_rujukan/DetailRencanaRujukanContent';
import FormRencanaRujukan from '../components/internal/modal_penjangkauan/rencana_rujukan/FormRencanaRujukan';
import DetailLangkahContentOPD from '../components/internal/modal_penjangkauan/langkah_OPD/DetailLangkahOPDContent';
import FormDetailLangkahOPD from '../components/internal/modal_penjangkauan/langkah_OPD/FormDetailLangkahOPD';

const modalPenjangkauanMapper = (type: string) => {
    switch (type) {
        case MODAL_PENJANGKAUAN.DETAIL_KASUS:
            return [DetailKasusContent, FormDetailKasus]
        case MODAL_PENJANGKAUAN.PENJADWALAN:
            return [PenjadwalanContent, FormPenjadwalan]
        case MODAL_PENJANGKAUAN.KLIEN:
            return [DetailKlienContent, FormDetailKlien]
        case MODAL_PENJANGKAUAN.KELUARGA:
            return [DetailKeluargaContent, FormKeluargaKlien]
        case MODAL_PENJANGKAUAN.PELAKU:
            return [DetailPelaku, FormPelaku]
        case MODAL_PENJANGKAUAN.HARAPAN:
            return [DetailHarapanContent, FormDetailHarapan]
        case MODAL_PENJANGKAUAN.KONDISI:
            return [DetailKondisiContent, FormDetailKondisi]
        case MODAL_PENJANGKAUAN.KRONOLOGI:
            return [DetailKronologiContent, FormDetailKronologi]
        case MODAL_PENJANGKAUAN.LANGKAH_DILAKUKAN:
            return [DetailLangkahContent, FormDetailLangkah]
        case MODAL_PENJANGKAUAN.LANGKAH_OPD:
            return [DetailLangkahContentOPD, FormDetailLangkahOPD]
        case MODAL_PENJANGKAUAN.SITUASI:
            return [SituasiKeluargaContent, FormSituasiKeluarga]
        case MODAL_PENJANGKAUAN.DOKUMEN_PENDUKUNG:
            return [DetailDokumenContent, FormDetailDokumen]
        case MODAL_PENJANGKAUAN.RENCANA_ANALIS_KEBUTUHAN:
            return [DetailRencanaAnalisKebutuhanContent, FormRencanaAnalisKebutuhan]
        case MODAL_PENJANGKAUAN.RENCANA_RUJUKAN:
            return [DetailRencanaRujukanContent, FormRencanaRujukan]
        default:
            console.warn('MODAL TYPE NOT FOUND')
            return []
    }
}


export default modalPenjangkauanMapper