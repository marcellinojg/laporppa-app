import FormDetailHarapan from '../components/internal/modal_penjangkauan/harapan/FormHarapan';
import DetailHarapanContent from '../components/internal/modal_penjangkauan/harapan/HarapanContent';
import DetailKlienContent from '../components/internal/modal_penjangkauan/klien/DetailKlienContent';
import DetailKronologiContent from '../components/internal/modal_penjangkauan/kronologi/KronologiContent';
import FormDetailKlien from '../components/internal/modal_penjangkauan/klien/FormDetailKlien';
import FormDetailKronologi from '../components/internal/modal_penjangkauan/kronologi/FormKronologi';
import DetailSituasiContent from '../components/internal/modal_penjangkauan/situasi/DetailSituasiContent';
import FormDetailSituasi from '../components/internal/modal_penjangkauan/situasi/FormDetailSituasi';
import { MODAL_PENJANGKAUAN } from '../consts/modal_penjangkauan';
import DetailKondisiContent from '../components/internal/modal_penjangkauan/kondisi/KondisiContent';
import FormDetailKondisi from '../components/internal/modal_penjangkauan/kondisi/FormKondisi';
import PenjadwalanContent from '../components/internal/modal_penjangkauan/penjadwalan/PenjadwalanContent';
import FormPenjadwalan from '../components/internal/modal_penjangkauan/penjadwalan/FormPenjadwalan';

const modalPenjangkauanMapper = (type: string) => {
    switch (type) {
        case MODAL_PENJANGKAUAN.PENJADWALAN:
            return [PenjadwalanContent, FormPenjadwalan]
        case MODAL_PENJANGKAUAN.KLIEN:
            return [DetailKlienContent, FormDetailKlien]
        case MODAL_PENJANGKAUAN.KELUARGA:
            return [DetailKlienContent, FormDetailKlien]
        case MODAL_PENJANGKAUAN.HARAPAN:
            return [DetailHarapanContent, FormDetailHarapan]
        case MODAL_PENJANGKAUAN.KONDISI:
            return [DetailKondisiContent, FormDetailKondisi]
        case MODAL_PENJANGKAUAN.KRONOLOGI:
            return [DetailKronologiContent, FormDetailKronologi]
        case MODAL_PENJANGKAUAN.LANGKAH_DILAKUKAN:
            return [DetailKlienContent, FormDetailKlien]
        case MODAL_PENJANGKAUAN.SITUASI:
            return [DetailSituasiContent, FormDetailSituasi]
        default:
            console.warn('MODAL TYPE NOT FOUND')
            return []
    }
}


export default modalPenjangkauanMapper