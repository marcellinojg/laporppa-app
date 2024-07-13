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
//   keluargaRekap: {
//     tigaBulan: `${BASE_URL}/keluarga-rekap?periode_tanggal=3bulan`,
//     satuTahun: `${BASE_URL}/keluarga-rekap?periode_tanggal=1tahun`,
//     semua: `${BASE_URL}/keluarga-rekap?periode_tanggal=semua`
//   }
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

    // Append optional parameters
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
  }
};

export default apiService;
