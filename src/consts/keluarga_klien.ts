import { HubunganKeluarga } from "./hubungan_keluarga";
import { SatgasPelapor } from "./satgas";

export interface KeluargaKlien {
  id: number;
  hubungan: HubunganKeluarga;
  nama_lengkap: string;
  no_telp: number;
  laporan_id: string;
  satgas: SatgasPelapor;
}
