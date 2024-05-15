import { Opd } from "./opd";

export interface RRKK {
  id: number;
  laporan_id: string;
  kebutuhan: string;
  opd: Opd;
  layanan_yang_diberikan: string;
  dokumen_pendukung: File;
}
