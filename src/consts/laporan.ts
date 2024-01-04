import { DetailKasus } from "../components/internal/modal_penjangkauan/detail_kasus/FormDetailKasus";
import { DetailKlien } from "./detail_klien";
import { KeluargaKlien } from "./keluarga_klien";
import { Kelurahan } from "./kelurahan";
import { KondisiKlien } from "./kondisi_klien";
import { Pelaku } from "./pelaku";
import Pendidikan from "./pendidikan";
import { SatgasPelapor } from "./satgas";
import { Status } from "./status";
import SumberPengaduan from "./sumber";
import { DokumenPendukung } from "./dokumen_pendukung";
import { LangkahBadanDaerah } from "./langkahBadanDaerah";
import { LangkahOPD } from "./langkahOPD";
import { RAKK } from "./rakk";
import { RRKK } from "./rrkk";

export interface Laporan {
  id: string;
  tanggal_jam_pengaduan: string;
  tanggal_pengaduan: Date;
  jam_pengaduan: string;
  uraian_singkat_masalah: string;
  no_telp_pelapor: string;
  no_telp_klien: string;
  nama_klien: string;
  nama_pelapor: string;
  nik_pelapor: string;
  nik_klien: string;
  validated: number;
  usia: number;
  alamat_pelapor: string;
  alamat_klien: string;
  rw: string;
  rt: string;
  token: string;
  jenis_kelamin: string;
  kategori: Kategori;
  status: Status;
  satgas_pelapor: SatgasPelapor;
  previous_satgas: SatgasPelapor;
  pendidikan: Pendidikan;
  kelurahan: Kelurahan;
  sumber_pengaduan: SumberPengaduan;
  dokumentasi_pengaduan: string[];
  langkah_telah_dilakukan: LangkahBadanDaerah[];
  lintas_opd: LangkahOPD[];
  status_langkah_telah_dilakukan: number;
  status_lintas_opd: number;
  dokumen_pendukung: DokumenPendukung;
  status_dokumen_pendukung: number;
  detail_klien?: DetailKlien;
  pelaku?: Pelaku;
  kondisi_klien?: KondisiKlien;
  penjadwalan?: Penjadwalan;
  status_detail_klien: number;
  status_pelaku: number;
  status_kondisi_klien: number;
  status_keluarga: number;
  keluarga_klien?: KeluargaKlien[];
  detail_kasus?: DetailKasus;
  penanganan_awal: Penanganan;
  RAKK: RAKK[];
  RRKK: RRKK[];
  harapan_klien_dan_keluarga: string;
  situasi_keluarga: string;
  kronologi_kejadian: string;
  status_situasi_keluarga: number;
  status_kronologi: number;
  status_rakk: number;
  status_rrkk: number;
  updated_at_keluarga: Date;
  updated_at_detail_klien: Date;
  updated_at_pelaku: Date;
  updated_at_situasi_keluarga: Date;
  updated_at_kronologi: Date;
  updated_at_kondisi_klien: Date;
  updated_at_langkah_telah_dilakukan: Date;
  updated_at_rakk: Date;
  updated_at_rrkk: Date;
  updated_at_lintas_opd: Date;
  updated_at_harapan: Date;
  updated_at_dokumen_pendukung: Date;
  updated_by_keluarga: SatgasPelapor;
  updated_by_detail_klien: SatgasPelapor;
  updated_by_pelaku: SatgasPelapor;
  updated_by_situasi_keluarga: SatgasPelapor;
  updated_by_kronologi: SatgasPelapor;
  updated_by_kondisi_klien: SatgasPelapor;
  updated_by_langkah_telah_dilakukan: SatgasPelapor;
  updated_by_rakk: SatgasPelapor;
  updated_by_rrkk: SatgasPelapor;
  updated_by_lintas_opd: SatgasPelapor;
  updated_by_harapan: SatgasPelapor;
  updated_by_dokumen_pendukung: SatgasPelapor;
  status_harapan_klien_dan_keluarga: number;
}

export interface LaporanSatgas {
  kategori_id: number;
  tanggal_jam_pengaduan: string;
  tanggal_pengaduan: Date;
  jam_pengaduan: string;
  nama_pelapor: string;
  nik_pelapor?: string;
  no_telp_pelapor: string;
  alamat_pelapor?: string;
  nama_klien: string;
  nik_klien?: string;
  no_telp_klien?: string;
  kecamatan_id: number;
  kelurahan_id: number;
  alamat_klien?: string;
  uraian_singkat_masalah: string;
  sumber_pengaduan_id: number;
  dokumentasi_pengaduan: File[];
  rt: number;
  rw: number;

  // doesn't have default value
  // satgas_pelapor_id: string
  // previous_satgas_id: string
  // sumber_pengaduan_id: number
}

export interface LaporanWarga {
  kategori_id: number;
  kecamatan_id: number;
  sumber_pengaduan_id: number;
  kelurahan_id: number;
  uraian_singkat_masalah: string;
  nama_pelapor: string;
  nama_klien: string;
  tanggal_jam_pengaduan: string;
}

export interface LaporanToken {
  nama_pelapor: string;
  token: string;
  status: Status;
  kategori: Kategori;
  created_at: string;
}

export interface LaporanCount extends Status {
  totalCase: number;
}
