import { Dispatch, SetStateAction, useState } from "react"
import { Laporan } from "../../../consts/laporan"
import Pill from "../Pill"
import DetailPenjangkauanItem from "./DetailPenjangkauanItem"
import { formatDate } from "../../../helpers/formatDate"
import { MODAL_PENJANGKAUAN } from "../../../consts/modal_penjangkauan"
import DetailLaporanItem from "./DetailLaporanItem"
import { SectionTitle } from "../../common/Typography"
import ModalPenjangkauan from "../modal_penjangkauan/ModalPenjangkauan"
import { useAuthUser } from "react-auth-kit"
import { User } from "../../../consts/user"
import { ROLE } from "../../../consts/role"
import {FaFilePdf} from "react-icons/fa"

interface SectionPenjangkauanProps {
    laporan: Laporan
    setRefetch: Dispatch<SetStateAction<boolean>>
}


const SectionPenjangkauan = (props: SectionPenjangkauanProps) => {
  
  const { laporan, setRefetch } = props
  const userData = useAuthUser()() as User;
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  console.log(laporan)
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isModalActiveDetailKasus, setIsModalActiveDetailKasus] = useState<boolean>(false);
  const [isModalActivePenjadwalan, setIsModalActivePenjadwalan] = useState<boolean>(false);

    return (
      <>
        <div className="flex gap-3 lg:flex-row flex-col items-center justify-start">
          <h2 className="font-bold text-xl">
            Detail Penjangkauan <br className="lg:hidden" />{" "}
            <span className="text-primary">{laporan.nama_pelapor}</span>
          </h2>
          <Pill status={laporan.status.id} />
        </div>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3 mb-4">
            <div className="flex items-center justify-between">
              <SectionTitle>Penjadwalan</SectionTitle>
              {userData.role === ROLE.SATGAS &&
                laporan.satgas_pelapor.id === userData.id &&
                laporan.status.id === 2 && (
                  <button
                    onClick={() => setIsModalActivePenjadwalan(true)}
                    type="button"
                    className="text-[12px] bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition duration-300"
                  >
                    Tambahkan/Edit Penjadwalan
                  </button>
                )}
            </div>
            <DetailLaporanItem
              label="Hari, Tanggal, Jam"
              value={
                laporan.penjadwalan?.tanggal_jam
                  ? days[
                      new Date(
                        laporan.penjadwalan.tanggal_jam.toString()
                      ).getDay()
                    ] +
                    ", " +
                    formatDate(laporan.penjadwalan.tanggal_jam.toString(), true)
                  : ""
              }
            />
            <DetailLaporanItem
              label="Tempat"
              value={
                laporan.penjadwalan?.tempat ? laporan.penjadwalan?.tempat : ""
              }
            />
            <DetailLaporanItem
              label="Alamat"
              value={
                laporan.penjadwalan?.alamat ? laporan.penjadwalan?.alamat : ""
              }
            />
          </div>
          <div className="border-b-2 flex flex-col gap-3 py-3 mb-4">
            <div className="flex items-center justify-between">
              <SectionTitle>Detail Kasus Klien</SectionTitle>
              {userData.role === ROLE.SATGAS &&
                laporan.satgas_pelapor.id === userData.id &&
                laporan.status.id === 2 && (
                  <button
                    onClick={() => setIsModalActiveDetailKasus(true)}
                    type="button"
                    className="text-[12px] bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition duration-300"
                  >
                    Tambahkan/Edit Detail Kasus
                  </button>
                )}
            </div>
            <DetailLaporanItem
              label="Kategori Kasus"
              value={
                laporan.detail_kasus?.kategori_kasus.nama
                  ? laporan.detail_kasus.kategori_kasus.nama
                  : ""
              }
            />
            <DetailLaporanItem
              label="Jenis Kasus"
              value={
                laporan.detail_kasus?.jenis_kasus.nama
                  ? laporan.detail_kasus.jenis_kasus.nama
                  : ""
              }
            />
            <DetailLaporanItem
              label="Lokasi Kasus"
              value={
                laporan.detail_kasus?.lokasi_kasus
                  ? laporan.detail_kasus.lokasi_kasus
                  : ""
              }
            />
            <DetailLaporanItem
              label="Tanggal Jam Kejadian"
              value={
                laporan.detail_kasus?.tanggal_jam_kejadian
                  ? formatDate(
                      laporan.detail_kasus.tanggal_jam_kejadian.toString(),
                      true
                    )
                  : ""
              }
            />
          </div>
          <SectionTitle>Hasil Penjangkauan</SectionTitle>
          <span className="text-sm text-gray-500 -mt-2">
            Berikut ini merupakan hasil penjangkauan ke klien
          </span>
          <div className="flex flex-col mt-5">
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Data Klien"
              help_text="Masukkan informasi detail identitas klien hingga alamat."
              is_done={Number(laporan.status_detail_klien)}
              last_edit_by={laporan.updated_by_detail_klien?.nama ? laporan.updated_by_detail_klien.nama : "-"}
              updated_at={laporan.updated_at_detail_klien ? formatDate(laporan.updated_at_detail_klien.toString(), true) : "-"}
              modalType={MODAL_PENJANGKAUAN.KLIEN}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Data Pelaku"
              help_text="Masukkan informasi detail identitas pelaku hingga alamat."
              is_done={Number(laporan.status_pelaku)}
              last_edit_by={laporan.updated_by_pelaku?.nama ? laporan.updated_by_pelaku.nama : "-"}
              updated_at={laporan.updated_at_pelaku ? formatDate(laporan.updated_at_pelaku.toString(), true) : "-"}
              modalType={MODAL_PENJANGKAUAN.PELAKU}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Data Keluarga Klien"
              help_text="Masukkan informasi detail identitas keluarga klien terkait ayah, ibu dan saudara-saudara."
              is_done={Number(laporan.status_keluarga)}
              last_edit_by={laporan.updated_by_keluarga?.nama ? laporan.updated_by_keluarga.nama : "-"}
              updated_at={laporan.updated_at_keluarga ? formatDate(laporan.updated_at_keluarga.toString(), true) : "-"}
              modalType={MODAL_PENJANGKAUAN.KELUARGA}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Situasi Keluarga"
              help_text="Deskripsikan kondisi situasi keluarga pada saat kejadian dan saat ini."
              is_done={laporan.status_situasi_keluarga}
              last_edit_by={laporan.updated_by_situasi_keluarga?.nama ? laporan.updated_by_situasi_keluarga.nama : "-"}
              updated_at={laporan.updated_at_situasi_keluarga ? formatDate(laporan.updated_at_situasi_keluarga.toString(), true) : "-"}
              modalType={MODAL_PENJANGKAUAN.SITUASI}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Kronologi Kejadian"
              help_text="Deskripsikan kronologis kejadian secara lengkap."
              is_done={laporan.status_kronologi}
              last_edit_by={laporan.updated_by_kronologi?.nama ? laporan.updated_by_kronologi.nama : "-"}
              updated_at={laporan.updated_at_kronologi ? formatDate(laporan.updated_at_kronologi.toString(), true) : "-"}
              modalType={MODAL_PENJANGKAUAN.KRONOLOGI}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Harapan Klien dan Keluarga"
              help_text="Deskripsikan harapan yang diinginkan oleh klien dan keluarga dari kejadian ini."
              is_done={laporan.status_harapan_klien_dan_keluarga}
              last_edit_by={laporan.updated_by_harapan?.nama ? laporan.updated_by_harapan.nama : "-"}
              updated_at={laporan.updated_at_harapan ? formatDate(laporan.updated_at_harapan.toString(), true) : "-"}
              modalType={MODAL_PENJANGKAUAN.HARAPAN}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Kondisi Klien"
              help_text="Masukkan informasi detail kondisi klien terkait kondisi fisik, psikologis dst."
              is_done={laporan.status_kondisi_klien}
              last_edit_by={laporan.updated_by_kondisi_klien?.nama ? laporan.updated_by_kondisi_klien.nama : "-"}
              updated_at={laporan.updated_at_kondisi_klien ? formatDate(laporan.updated_at_kondisi_klien.toString(), true) : "-"}

              modalType={MODAL_PENJANGKAUAN.KONDISI}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Rencana Analis Kebutuhan Klien Oleh Kelurahan"
              help_text="Masukkan detail rencana analisis kebutuhan."
              is_done={laporan.status_rakk}
              last_edit_by={laporan.updated_by_rakk?.nama ? laporan.updated_by_rakk.nama : "-"}
              updated_at={laporan.updated_at_rakk ? formatDate(laporan.updated_at_rakk.toString(), true) : "-"}

              modalType={MODAL_PENJANGKAUAN.RENCANA_ANALIS_KEBUTUHAN}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Rencana Rujukan Kebutuhan Klien"
              help_text="Masukkan detail rencana rujukan yang akan diberikan kepada klien."
              is_done={laporan.status_rrkk}
              last_edit_by={laporan.updated_by_rrkk?.nama ? laporan.updated_by_rrkk.nama : "-"}
              updated_at={laporan.updated_at_rrkk ? formatDate(laporan.updated_at_rrkk.toString(), true) : "-"}

              modalType={MODAL_PENJANGKAUAN.RENCANA_RUJUKAN}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Langkah yang Telah Dilakukan Kelurahan"
              help_text="Masukkan informasi pelayanan yang telah diberikan dari instansi terkait."
              is_done={laporan.status_langkah_telah_dilakukan}
              last_edit_by={laporan.updated_by_langkah_telah_dilakukan?.nama ? laporan.updated_by_langkah_telah_dilakukan.nama : "-"}
              updated_at={laporan.updated_at_langkah_telah_dilakukan ? formatDate(laporan.updated_at_langkah_telah_dilakukan.toString(), true) : "-"}

              modalType={MODAL_PENJANGKAUAN.LANGKAH_DILAKUKAN}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Langkah yang Telah Dilakukan OPD"
              help_text="Masukkan informasi pelayanan yang telah diberikan dari instansi terkait."
              is_done={laporan.status_lintas_opd}
              last_edit_by={laporan.updated_by_lintas_opd?.nama ? laporan.updated_by_lintas_opd.nama : "-"}
              updated_at={laporan.updated_at_lintas_opd ? formatDate(laporan.updated_at_lintas_opd.toString(), true) : "-"}

              modalType={MODAL_PENJANGKAUAN.LANGKAH_OPD}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
            <DetailPenjangkauanItem
              laporan={laporan}
              title="Dokumen Pendukung"
              help_text="Unggah dokumen pendukung antara lain foto klien, KK, KTP, tempat tinggal dsb."
              is_done={laporan.status_dokumen_pendukung}
              last_edit_by={laporan.updated_by_dokumen_pendukung?.nama ? laporan.updated_by_dokumen_pendukung.nama : "-"}
              updated_at={laporan.updated_at_dokumen_pendukung ? formatDate(laporan.updated_at_dokumen_pendukung.toString(), true) : "-"}

              modalType={MODAL_PENJANGKAUAN.DOKUMEN_PENDUKUNG}
              setRefetch={setRefetch}
              setIsModalActive={setIsModalActive}
            />
          </div>
        </div>
        {isModalActivePenjadwalan === true && (
          <ModalPenjangkauan
            mode={"input"}
            setIsModalActive={setIsModalActivePenjadwalan}
            modalType={MODAL_PENJANGKAUAN.PENJADWALAN}
            laporan={laporan}
            setRefetch={setRefetch}
          />
        )}
        {isModalActiveDetailKasus === true && (
          <ModalPenjangkauan
            mode={"input"}
            setIsModalActive={setIsModalActiveDetailKasus}
            modalType={MODAL_PENJANGKAUAN.DETAIL_KASUS}
            laporan={laporan}
            setRefetch={setRefetch}
          />
        )}
    </>
    );
}

export default SectionPenjangkauan