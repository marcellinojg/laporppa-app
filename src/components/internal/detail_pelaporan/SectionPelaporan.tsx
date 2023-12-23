import { Laporan } from "../../../consts/laporan"
import Pill from "../Pill"
import DetailLaporanItem from "./DetailLaporanItem"
import { formatDate } from '../../../helpers/formatDate';
import { useAuthUser } from "react-auth-kit";
import { User } from "../../../consts/user";
import { ROLE } from "../../../consts/role";
import { AssignButton, EditButton, KembalikanButton, PrintButton, RujukButton, SelesaikanButton, TerimaButton, TolakButton } from "../../form/ActionButton";
import { Dispatch, SetStateAction } from "react";
import { STATUS_LAPORAN } from "../../../consts/status";
import { SectionTitle } from "../../common/Typography";


interface SectionPelaporanProps {
    laporan: Laporan
    setRefetch: Dispatch<SetStateAction<boolean>>
}

const SectionPelaporan = (props: SectionPelaporanProps) => {
    const { laporan, setRefetch } = props
    const userData = useAuthUser()() as User
    return (
      <>
        <div className="flex lg:justify-between justify-center items-center lg:flex-row flex-col gap-3">
          <div className="flex gap-3 lg:flex-row flex-col items-center justify-start">
            <h2 className="font-bold text-xl">
              Detail Data Laporan <br className="lg:hidden" />{" "}
              <span className="text-primary">{laporan.nama_pelapor}</span>
            </h2>
            <Pill status={laporan.status.id} />
          </div>
          {userData.role === ROLE.KELURAHAN &&
            laporan.status.id == STATUS_LAPORAN.MENUNGGU_VALIDASI &&
            laporan.satgas_pelapor.id == userData.id && (
              <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                <AssignButton laporan={laporan} setRefetch={setRefetch} />
                <TolakButton laporan={laporan} setRefetch={setRefetch} />
                <PrintButton setRefetch={setRefetch} laporan={laporan} />
              </div>
            )}
          {userData.role === ROLE.KELURAHAN &&
            laporan.status.id == STATUS_LAPORAN.KASUS_DIKEMBALIKAN &&
            laporan.satgas_pelapor.id == userData.id && (
              <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                <AssignButton setRefetch={setRefetch} laporan={laporan} />
                <RujukButton setRefetch={setRefetch} laporan={laporan} />
                <PrintButton setRefetch={setRefetch} laporan={laporan} />
              </div>
            )}
          {userData.role === ROLE.SATGAS &&
            laporan.status.id == STATUS_LAPORAN.SEDANG_DITANGANI &&
            laporan.satgas_pelapor.id === userData.id && (
              <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                <EditButton laporan={laporan} />
                <KembalikanButton setRefetch={setRefetch} laporan={laporan} />
                <SelesaikanButton setRefetch={setRefetch} laporan={laporan} />
                <PrintButton setRefetch={setRefetch} laporan={laporan} />
              </div>
            )}
          {userData.role === ROLE.SATGAS &&
            laporan.status.id == STATUS_LAPORAN.MENUNGGU_VALIDASI &&
            laporan.satgas_pelapor.id === userData.id && (
              <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                <TerimaButton setRefetch={setRefetch} laporan={laporan} />
                <TolakButton setRefetch={setRefetch} laporan={laporan} />
                <KembalikanButton setRefetch={setRefetch} laporan={laporan} />
                <PrintButton setRefetch={setRefetch} laporan={laporan} />
              </div>
            )}
          {userData.role === ROLE.KELURAHAN &&
            laporan.status.id == STATUS_LAPORAN.KASUS_SELESAI || laporan.status.id == STATUS_LAPORAN.SEDANG_DITANGANI &&(
              <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                <PrintButton setRefetch={setRefetch} laporan={laporan} />
              </div>
            )}
        </div>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Informasi Pelaporan</SectionTitle>
            <DetailLaporanItem label="Nomor Registrasi" value={laporan.id} />
            <DetailLaporanItem
              label="Token"
              value={laporan.token}
              badge="TOKEN"
            />
            <DetailLaporanItem label="Sumber Pengaduan" value="Masyarakat" />
            <DetailLaporanItem
              label="Kategori Pengaduan"
              value={laporan.kategori.nama}
            />
            <DetailLaporanItem
              label="Tanggal & Jam Pengaduan"
              value={formatDate(laporan.tanggal_jam_pengaduan, true)}
            />
            <DetailLaporanItem
              label="Satgas yang Menangani"
              value={laporan.satgas_pelapor.nama}
            />
            <DetailLaporanItem
              label="Satgas yang Sebelumnya Menangani"
              value={laporan.previous_satgas.nama}
            />
          </div>
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Identitas Pelapor</SectionTitle>
            <DetailLaporanItem
              label="Nama Lengkap"
              value={laporan.nama_pelapor}
            />
            <DetailLaporanItem label="NIK" value={laporan.nik_pelapor} />
            <DetailLaporanItem
              label="Alamat Domisili"
              value={laporan.alamat_pelapor}
            />
            <DetailLaporanItem
              label="No. Telepon/Whatsapp"
              value={laporan.no_telp_pelapor}
            />
          </div>
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Identitas Klien</SectionTitle>
            <DetailLaporanItem
              label="Nama Lengkap (Inisial)"
              value={laporan.nama_klien}
            />
            <DetailLaporanItem
              label="NIK"
              value={laporan.nik_klien}
              badge="NIK"
            />
            <DetailLaporanItem
              label="Alamat Domisili"
              value={laporan.alamat_klien}
            />
            <DetailLaporanItem
              label="Kecamatan"
              value={laporan.kelurahan.kecamatan?.nama}
            />
            <DetailLaporanItem
              label="Kelurahan"
              value={laporan.kelurahan.nama}
            />
            <DetailLaporanItem label="RT" value={laporan.rt} />
            <DetailLaporanItem label="RW" value={laporan.rw} />
            <DetailLaporanItem
              label="No. Telepon/Whatsapp"
              value={laporan.no_telp_klien}
            />
          </div>
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Permasalahan Klien</SectionTitle>
            <DetailLaporanItem
              label="Uraian Singkat Permasalahan"
              value={laporan.uraian_singkat_masalah}
            />
          </div>
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Dokumentasi Pengaduan</SectionTitle>
            <div className="flex flex-wrap items-center gap-4">
              {laporan.dokumentasi_pengaduan &&
                laporan.dokumentasi_pengaduan.map((url, index) => (
                  <img
                    src={url}
                    width={200}
                    alt={`dokumentasi pengaduan ${index + 1}`}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default SectionPelaporan