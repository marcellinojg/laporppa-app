import { BPJS } from "./BPJS"
import { Agama } from "./agama"
import { Kecamatan } from "./kecamatan"
import { Kelurahan } from "./kelurahan"
import { Kota } from "./kota"
import { Pekerjaan } from "./pekerjaan"
import { SatgasPelapor } from "./satgas"
import { StatusPerkawinan } from "./status_perkawinan"

export interface DetailKlien {
    laporan_id: string
    warga_surabaya: number
    kota: Kota
    kecamatan: Kecamatan
    no_kk: number
    no_wa: number
    alamat_kk: string
    kecamatan_kk: Kecamatan
    kelurahan_kk: Kelurahan
    kota_lahir: Kota
    tanggal_lahir: Date
    agama: Agama
    usia: number
    kategori_klien: string
    jenis_klien: string
    pekerjaan: Pekerjaan
    penghasilan_bulanan: number
    status_perkawinan: StatusPerkawinan
    bpjs: BPJS
    pendidikan_kelas: string
    pendidikan_instansi: string
    pendidikan_jurusan: string
    pendidikan_thn_lulus: number
    satgas: SatgasPelapor
}