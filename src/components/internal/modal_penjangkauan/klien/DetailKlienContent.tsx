import { Laporan } from "../../../../consts/laporan"
// import { ContentModal } from "../../../../consts/modal_penjangkauan"
import { SectionTitle } from "../../../common/Typography"
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"
import { useEffect } from "react";

interface DetailKlienContent {
    laporan: Laporan
}

const DetailKlienContent = (props: DetailKlienContent) => {
    const { laporan } = props
    useEffect(() => {
            console.log(laporan, "isi laporan")
    }, []);
    
    return (
      <>
        <span className="font-bold text-lg">Detail Data Klien</span>
        <div className="flex flex-col gap-2 py-3">
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Identitas Klien</SectionTitle>
            <DetailLaporanItem
              label="Nama Lengkap"
              value={laporan.nama_klien ? laporan.nama_klien : "-"}
            />
            <DetailLaporanItem
              label="NIK"
              value={laporan.nik_klien ? laporan.nik_klien : "-"}
            />
            <DetailLaporanItem
              label="Alamat Domisili"
              value={laporan.alamat_klien ? laporan.alamat_klien : "-"}
            />
            <DetailLaporanItem
              label="Kecamatan Domisili"
              value={
                laporan.detail_klien?.kecamatan?.nama
                  ? laporan.detail_klien.kecamatan.nama
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Nomor KK"
              value={
                laporan.detail_klien?.no_kk
                  ? laporan.detail_klien.no_kk.toString()
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Alamat KK"
              value={
                laporan.detail_klien?.alamat_kk
                  ? laporan.detail_klien.alamat_kk
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Kelurahan KK"
              value={
                laporan.detail_klien?.kelurahan_kk?.nama
                  ? laporan.detail_klien.kelurahan_kk.nama
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Kecamatan KK"
              value={
                laporan.detail_klien?.kecamatan_kk?.nama
                  ? laporan.detail_klien.kecamatan_kk.nama
                  : "-"
              }
            />
            <DetailLaporanItem
              label="No. Telp / Whatsapp"
              value={
                laporan.detail_klien?.no_wa
                  ? laporan.detail_klien.no_wa.toString()
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Tempat, Tanggal Lahir"
              value={
                laporan.detail_klien?.kota_lahir &&
                laporan.detail_klien.tanggal_lahir
                  ? laporan.detail_klien.kota_lahir.nama +
                    ", " +
                    laporan.detail_klien.tanggal_lahir
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Usia"
              value={
                laporan.detail_klien?.usia
                  ? laporan.detail_klien.usia.toString()
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Kategori Klien"
              value={
                laporan.detail_klien?.kategori_klien
                  ? laporan.detail_klien.kategori_klien
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Jenis Klien"
              value={
                laporan.detail_klien?.jenis_klien
                  ? laporan.detail_klien.jenis_klien
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Jenis Kelamin"
              value={laporan.jenis_kelamin ? laporan.jenis_kelamin : "-"}
            />
            <DetailLaporanItem
              label="Agama"
              value={
                laporan.detail_klien?.agama?.nama
                  ? laporan.detail_klien.agama.nama
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Pekerjaan"
              value={
                laporan.detail_klien?.pekerjaan?.nama
                  ? laporan.detail_klien.pekerjaan.nama
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Penghasilan/Bulan"
              value={
                laporan.detail_klien?.penghasilan_bulanan
                  ? laporan.detail_klien.penghasilan_bulanan.toString()
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Status Perkawinan"
              value={
                laporan.detail_klien?.status_perkawinan?.nama
                  ? laporan.detail_klien.status_perkawinan.nama
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Kepemilikan BPJS"
              value={
                laporan.detail_klien?.bpjs?.nama
                  ? laporan.detail_klien.bpjs.nama
                  : "-"
              }
            />
          </div>

          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Pendidikan Klien</SectionTitle>
            <DetailLaporanItem
              label="Pendidikan"
              value={laporan.pendidikan.nama ? laporan.pendidikan.nama : "-"}
            />
            <DetailLaporanItem
              label="Kelas"
              value={
                laporan.detail_klien?.pendidikan_kelas
                  ? laporan.detail_klien.pendidikan_kelas
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Nama Instansi Sekolah"
              value={
                laporan.detail_klien?.pendidikan_instansi
                  ? laporan.detail_klien.pendidikan_instansi
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Jurusan Sekolah"
              value={
                laporan.detail_klien?.pendidikan_jurusan
                  ? laporan.detail_klien.pendidikan_jurusan
                  : "-"
              }
            />
            <DetailLaporanItem
              label="Tahun Lulus"
              value={
                laporan.detail_klien?.pendidikan_thn_lulus
                  ? laporan.detail_klien.pendidikan_thn_lulus.toString()
                  : "-"
              }
            />
          </div>
        </div>
      </>
    );
}

export default DetailKlienContent