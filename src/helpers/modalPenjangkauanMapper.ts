import FormDetailHarapan from '../components/internal/modal_penjangkauan/harapan/FormHarapan';
import DetailHarapanContent from '../components/internal/modal_penjangkauan/harapan/HarapanContent';
import DetailKeluargaContent from '../components/internal/modal_penjangkauan/keluarga/DetailKeluargaContent';
import DetailKlienContent from '../components/internal/modal_penjangkauan/klien/DetailKlienContent';
import DetailKronologiContent from '../components/internal/modal_penjangkauan/kronologi/KronologiContent';
import FormDetailKlien from '../components/internal/modal_penjangkauan/klien/FormDetailKlien';
import FormDetailKronologi from '../components/internal/modal_penjangkauan/kronologi/FormKronologi';
import DetailSituasiContent from '../components/internal/modal_penjangkauan/situasi/DetailSituasiContent';
import FormDetailSituasi from '../components/internal/modal_penjangkauan/situasi/FormDetailSituasi';
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
import FormKeluargaKlien from '../components/internal/modal_penjangkauan/keluarga/FormDetailKeluarga';

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
        case MODAL_PENJANGKAUAN.SITUASI:
            return [DetailSituasiContent, FormDetailSituasi]
        case MODAL_PENJANGKAUAN.DOKUMEN_PENDUKUNG:
            return [DetailDokumenContent, FormDetailDokumen]
        default:
            console.warn('MODAL TYPE NOT FOUND')
            return []
    }
}


export default modalPenjangkauanMapper