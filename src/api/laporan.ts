import { DetailLangkah } from "../components/internal/modal_penjangkauan/langkah_dilakukan/FormLangkah"
import { DokumenPendukung } from "../consts/dokumen_pendukung"
import { DetailKasus } from "../components/internal/modal_penjangkauan/detail_kasus/FormDetailKasus"
import { DetailKlien } from "../consts/detail_klien"
import { HubunganKeluarga } from "../consts/hubungan_keluarga"
import { KeluargaKlien } from "../consts/keluarga_klien"
import { KondisiKlien } from "../consts/kondisi_klien"
import { Laporan, LaporanCount, LaporanSatgas, LaporanToken } from "../consts/laporan"
import PaginationData from "../consts/pagination"
import { Pelaku } from "../consts/pelaku"
import { CreateAxiosInstance } from "../helpers/createAxiosInstance"
import { LaporanByKategori, LaporanByKategoriRT } from "../consts/laporanByKategori"

export const getLaporans = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/laporans?withKecamatan=1&withKeluargaKlien=1')
    const listLaporan = res.data.data as Laporan[]
    return listLaporan
}

export const getLaporan = async (id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/laporans/${id}?withKecamatan=1&withKeluargaKlien=1`)
    const laporan = res.data.data
    return laporan
}


export const getLaporanByToken = async (token: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`/public/laporans/${token}`)
    const laporan = res.data.data as LaporanToken
    return laporan
}

export const postLaporan = async (laporan: LaporanSatgas) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/laporans', laporan, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedLaporan = res.data.data as Laporan
    return postedLaporan
}

export const patchLaporan = async (laporan: LaporanSatgas | Laporan | any, id: string) => {
    const instance = CreateAxiosInstance()
    const res = await instance.patch(`/laporans/${id}`, laporan)
    const patchedLaporan = res.data.data as Laporan
    return patchedLaporan
}

export const postLaporanPublic = async (laporan: LaporanToken) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/public/laporans', laporan)
    const postedLaporan = res.data.data
    return postedLaporan
}

export const putLaporan = async (oldLaporan: Laporan, newLaporan: Laporan) => {
    const instance = CreateAxiosInstance()
    const laporan = { ...oldLaporan, ...newLaporan }
    const res = await instance.put(`/laporans?id=${laporan.id}`, laporan)
    const updatedLaporan = res.data.data
    return updatedLaporan
}

export const getLaporansByPage = async (page: number) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`laporans?page=${page}`)
    const data = res.data.data.data as Laporan[]
    return { data }
}

export const getLaporansBySearchAndStatus = async (page: number, keyword: string, status: number) => {
    const instance = CreateAxiosInstance()
    const res = await instance.get(`laporans?page=${page}&search=${keyword}&status=${status}&withKecamatan=1`)
    const data = res.data.data
    const laporans = data.data as Laporan[]
    const paginationData = {
        currentPage: data.current_page,
        maxPage: data.last_page,
        from: data.from,
        to: data.to,
        total: data.total,
        perPage: data.per_page
    } as PaginationData

    return { laporans, paginationData }
}

export const getTotalLaporan = async () => {
    const instance = CreateAxiosInstance()
    const res = await instance.get('/statuses/count')
    const data = res.data.data as LaporanCount[]
    return data
}

export const deleteLaporan = async (id : string) => {
    const instance = CreateAxiosInstance()
    await instance.delete(`/laporans/${id}`)
}

export const postDokumenPendukung = async (dokumen_pendukung: DokumenPendukung) => {
    console.log('dokumen', dokumen_pendukung)
    const instance = CreateAxiosInstance()
    const res = await instance.post('/dokumen-pendukungs', dokumen_pendukung, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    
    const postedLaporan = res.data.data as DokumenPendukung
    console.log('postDokumenPendukung', postedLaporan)
    return postedLaporan
}

export const patchDokumenPendukung = async (dokumen_pendukung: DokumenPendukung | DokumenPendukung | any, id: string) => {
    const instance = CreateAxiosInstance()
    console.log(dokumen_pendukung)
    const res = await instance.patch(`/dokumen-pendukungs/${id}`, dokumen_pendukung)
    const patchedDokumen = res.data.data as DokumenPendukung
    console.log('patchedLaporan', patchedDokumen)
    return patchedDokumen
}


export const patchPenjadwalan = async (penjadwalan: Penjadwalan) => {
    const instance = CreateAxiosInstance()
    const res = await instance.put(`/penjadwalans/${penjadwalan.id}`, penjadwalan, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const patchedPenjadwalan = res.data.data2 as Penjadwalan
    return patchedPenjadwalan
}

export const postPenjadwalan = async (penjadwalan: Penjadwalan) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/penjadwalans', penjadwalan, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedPenjadwalan = res.data.data as Penjadwalan
    return postedPenjadwalan
}

export const patchDetailKlien = async (detail_klien: DetailKlien) => {
    const instance = CreateAxiosInstance()
    const res = await instance.put(`/detail-kliens/${detail_klien.id}`, detail_klien, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const patchedDetailKlien = res.data.data2 as DetailKlien
    return patchedDetailKlien
}

export const postDetailKlien = async (detail_klien: DetailKlien) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/detail-kliens', detail_klien, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedDetailKlien = res.data.data as DetailKlien
    return postedDetailKlien
}

export const postDetailKlienStatus = async (detail_klien: DetailKlien, jenis: string, status: number) => {
  const instance = CreateAxiosInstance();
    const res = await instance.post(`/laporans/${detail_klien.laporan_id}/status-penjangkauan/`, { 'jenis': jenis, 'status': status }, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedDetailKlienStatus = res.data.data;
  return postedDetailKlienStatus;
};

export const patchPelaku = async (pelaku: Pelaku) => {
  const instance = CreateAxiosInstance();
  const res = await instance.put(
    `/pelakus/${pelaku.id}`,
    pelaku,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const patchedPelaku = res.data.data2 as Pelaku;
  return patchedPelaku;
};

export const postPelaku = async (pelaku: Pelaku) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/pelakus", pelaku, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedPelaku = res.data.data as Pelaku;
  return postedPelaku;
};

export const postPelakuStatus = async (
  pelaku: Pelaku,
  jenis: string,
  status: number
) => {
  const instance = CreateAxiosInstance();
  const res = await instance.put(
    `/laporans/${pelaku.laporan_id}/status-penjangkauan/`,
    { jenis: jenis, status: status },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const postedPelaku = res.data.data;
  return postedPelaku;
};

export const patchKondisiKlien = async (kondisi: KondisiKlien) => {
  const instance = CreateAxiosInstance();
  const res = await instance.put(`/kondisi-kliens/${kondisi.id}`, kondisi, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const patchedKondisiKlien = res.data.data2 as KondisiKlien;
  return patchedKondisiKlien;
};

export const postKondisiKlien = async (kondisi: KondisiKlien) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/kondisi-kliens", kondisi, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedKondisiKlien = res.data.data as KondisiKlien;
  return postedKondisiKlien;
};

export const postKondisiStatus = async (
  kondisi: KondisiKlien,
  jenis: string,
  status: number
) => {
  const instance = CreateAxiosInstance();
  const res = await instance.put(
    `/laporans/${kondisi.laporan_id}/status-penjangkauan/`,
    { jenis: jenis, status: status },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const postedKondisiKlien = res.data.data;
  return postedKondisiKlien;
};

export const patchDetailKasus = async (detailKasus: DetailKasus) => {
    const instance = CreateAxiosInstance()
    const res = await instance.put(`/detail-kasuses/${detailKasus.id}`, detailKasus, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    const patchedDetailKasus = res.data.data2 as DetailKasus
    return patchedDetailKasus
}

export const postDetailKasus = async (detailKasus: DetailKasus) => {
    const instance = CreateAxiosInstance()
    const res = await instance.post('/detail-kasuses', detailKasus, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const postedDetailKasus = res.data.data as DetailKasus
    return postedDetailKasus
}


export const postKeluarga = async (keluarga_klien: KeluargaKlien) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/keluarga-kliens", keluarga_klien, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedKeluargaKlien = res.data.data as KeluargaKlien;
  return postedKeluargaKlien;
};

export const deleteKeluarga = async (id: number) => {
  const instance = CreateAxiosInstance();
  await instance.delete(`/keluarga-kliens/${id}`);
};

export const getKeluargaKlien = async (id: string) => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/${id}/keluarga-kliens`);
  const data = res.data.data as KeluargaKlien[];
  return data;
};

export const postKeluargaKlienStatus = async (
  laporan_id: string,
  jenis: string,
  status: number
) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post(
    `/laporans/${laporan_id}/status-penjangkauan/`,
    { jenis: jenis, status: status },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const postedKeluargaKlienStatus = res.data.data;
  return postedKeluargaKlienStatus;
};

export const getHubunganKeluarga = async () => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/hubungan-keluarga-kliens`);
  const data = res.data.data as HubunganKeluarga[];
  return data;
};

export const getLaporanByKategoriRT = async () => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/count-by-kategoris`);
  const data = res.data.data as LaporanByKategoriRT[];
  return data;
};

export const getlaporanByKategori = async (id: number | string) => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/count-by-kategoris?kelurahan_id=${id}`);
  const data = res.data.data as LaporanByKategori[];
  return data;
};
