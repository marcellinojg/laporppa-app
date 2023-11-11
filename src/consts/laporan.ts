import { DetailKlien } from "./detail_klien";
import { KeluargaKlien } from "./keluarga_klien";
import { Kelurahan } from "./kelurahan"
import { KondisiKlien } from "./kondisi_klien";
import { Pelaku } from "./pelaku";
import Pendidikan from "./pendidikan";
import { SatgasPelapor } from "./satgas";
import { Status } from "./status";
import SumberPengaduan from './sumber';

export interface Laporan {
    id: string,
    tanggal_jam_pengaduan: string,
    tanggal_pengaduan: Date,
    jam_pengaduan: string,
    uraian_singkat_masalah: string,
    no_telp_pelapor: string,
    no_telp_klien: string,
    nama_klien: string,
    nama_pelapor: string,
    nik_pelapor: string,
    nik_klien: string,
    validated: number,
    usia: number,
    alamat_pelapor: string,
    alamat_klien: string,
    rw: string,
    rt: string,
    token: string,
    jenis_kelamin: string,
    kategori: Kategori,
    status: Status,
    satgas_pelapor: SatgasPelapor
    previous_satgas: SatgasPelapor
    pendidikan: Pendidikan
    kelurahan: Kelurahan
    sumber_pengaduan: SumberPengaduan
    dokumentasi_pengaduan: string[]
    detail_klien?: DetailKlien
    keluarga_klien?: KeluargaKlien[]
    pelaku?: Pelaku
    kondisi_klien?: KondisiKlien
    penjadwalan?: Penjadwalan
}

export interface LaporanSatgas {
    kategori_id: number
    tanggal_jam_pengaduan: string
    tanggal_pengaduan: Date
    jam_pengaduan: string
    nama_pelapor: string
    nik_pelapor?: string
    no_telp_pelapor: string
    alamat_pelapor?: string
    nama_klien: string
    nik_klien?: string
    no_telp_klien?: string
    kecamatan_id: number
    kelurahan_id: number
    alamat_klien?: string
    uraian_singkat_masalah: string
    sumber_pengaduan_id: number
    dokumentasi_pengaduan: File[]


    // doesn't have default value
    // satgas_pelapor_id: string
    // previous_satgas_id: string
    // sumber_pengaduan_id: number
}


export interface LaporanWarga {
    kategori_id: number
    kecamatan_id: number
    sumber_pengaduan_id: number
    kelurahan_id: number
    uraian_singkat_masalah: string
    nama_pelapor: string
    nama_klien: string
    tanggal_jam_pengaduan: string
}

export interface LaporanToken {
    nama_pelapor: string
    token: string
    status: Status
    kategori: Kategori
    created_at: string
}


export interface LaporanCount extends Status {
    totalCase: number
}