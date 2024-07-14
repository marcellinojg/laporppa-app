import { BASE_URL } from "../consts/api";
import { CreateAxiosInstance } from "./createAxiosInstance";


const endpoints = {
  laporanKasusKlien: {
    semua: `${BASE_URL}/laporans-kasus-klien?periode_tanggal=semua`,
    tanggal: (tglAwal: string, tglAkhir: string) =>
      `${BASE_URL}/laporans-kasus-klien?periode_tanggal=tanggal&tgl_awal=${tglAwal}&tgl_akhir=${tglAkhir}`,
    bulanIni: `${BASE_URL}/laporans-kasus-klien?periode_tanggal=bulanini`,
    satuTahun: `${BASE_URL}/laporans-kasus-klien?periode_tanggal=1tahun`,
    tigaBulan: `${BASE_URL}/laporans-kasus-klien?periode_tanggal=3bulan`
  },
  rekapBulanan: (bulanAwal: number, tahunAwal: number, bulanAkhir: number, tahunAkhir: number) =>
    `${BASE_URL}/laporans-rekap-bulanan?bulan_awal=${bulanAwal}&tahun_awal=${tahunAwal}&bulan_akhir=${bulanAkhir}&tahun_akhir=${tahunAkhir}`,
  rekapTahunan: (tahunAwal: number, tahunAkhir: number) =>
    `${BASE_URL}/laporans-rekap?thn_awal=${tahunAwal}&thn_akhir=${tahunAkhir}`
};

const instance = CreateAxiosInstance()

const apiService = {
  getRekap: async (
    periodeTipe: string,
    tglAwal?: string,
    tglAkhir?: string,
    kategoriKlien?: string,
    kategoriKasusKlienId?: string,
    kecamatanId?: string,
    kategoriId?: string
  ) => {
    let endpoint = '';

    switch (periodeTipe) {
      case 'tanggal':
        if (tglAwal && tglAkhir) {
          endpoint = endpoints.laporanKasusKlien.tanggal(tglAwal, tglAkhir);
        } else {
          throw new Error('Missing required date parameters for "tanggal" periode type.');
        }
        break;
      case 'bulanini':
        endpoint = endpoints.laporanKasusKlien.bulanIni;
        break;
      case '3bulan':
        endpoint = endpoints.laporanKasusKlien.tigaBulan;
        break;
      case '1tahun':
        endpoint = endpoints.laporanKasusKlien.satuTahun;
        break;
      case 'semua':
        endpoint = endpoints.laporanKasusKlien.semua;
        break;
      default:
        throw new Error('Invalid periodeTipe value.');
    }

    if (kategoriKlien) endpoint += `&kategori_klien=${kategoriKlien}`;
    if (kategoriKasusKlienId) endpoint += `&kategori_kasus_klien_id=${kategoriKasusKlienId}`;
    if (kecamatanId) endpoint += `&kecamatan_id=${kecamatanId}`;
    if (kategoriId) endpoint += `&kategori_id=${kategoriId}`;

    try {
        const response = await instance.get(endpoint);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
  },

  getRekapBulanan: async (
    bulanAwal: number,
    tahunAwal: number,
    bulanAkhir: number,
    tahunAkhir: number,
    kategoriKasus?: string,
    kategoriId?: string
  ) => {
    let endpoint = endpoints.rekapBulanan(bulanAwal, tahunAwal, bulanAkhir, tahunAkhir);

    if (kategoriKasus) endpoint += `&kategori_kasus=${kategoriKasus}`;
    if (kategoriId) endpoint += `&kategori_id=${kategoriId}`;

    try {
      const response = await instance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching Rekap Bulanan data:', error);
      throw error;
    }
  },

  getRekapTahunan: async (
    tahunAwal: number,
    tahunAkhir: number,
    kategoriKasus?: string,
    kategoriId?: string
  ) => {
    let endpoint = endpoints.rekapTahunan(tahunAwal, tahunAkhir);

    if (kategoriKasus) endpoint += `&kategori_kasus=${kategoriKasus}`;
    if (kategoriId) endpoint += `&kategori_id=${kategoriId}`;

    try {
      const response = await instance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching Rekap Tahunan data:', error);
      throw error;
    }
  }
};

export default apiService;
