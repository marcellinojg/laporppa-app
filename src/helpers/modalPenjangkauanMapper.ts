import { HarapanModal, KeluargaModal, KlienModal, KondisiModal, KronologiModal, LangkahDilakukanModal, SituasiModal } from '../components/internal/modal_penjangkauan/ModalPenjangkauan';
import MODAL_PENJANGKAUAN from '../consts/modal_penjangkauan';


const modalPenjangkauanMapper = (type : string) => {
    switch(type){
        case MODAL_PENJANGKAUAN.KLIEN :
            return KlienModal
        case MODAL_PENJANGKAUAN.KELUARGA:
            return KeluargaModal
        case MODAL_PENJANGKAUAN.HARAPAN:
            return HarapanModal
        case MODAL_PENJANGKAUAN.KONDISI:
            return KondisiModal
        case MODAL_PENJANGKAUAN.KRONOLOGI:
            return KronologiModal
        case MODAL_PENJANGKAUAN.LANGKAH_DILAKUKAN:
            return LangkahDilakukanModal
        case MODAL_PENJANGKAUAN.SITUASI:
            return SituasiModal
        default:
            console.warn('MODAL TYPE NOT FOUND')
            return
    }
}


export default modalPenjangkauanMapper