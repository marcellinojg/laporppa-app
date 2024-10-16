import { DetailLangkah } from "../components/internal/modal_penjangkauan/langkah_dilakukan/FormLangkah"
import { DokumenPendukung } from "../consts/dokumen_pendukung"
import { DetailKasus } from "../components/internal/modal_penjangkauan/detail_kasus/FormDetailKasus"
import { DetailKlien } from "../consts/detail_klien"
import { HubunganKeluarga } from "../consts/hubungan_keluarga"
import { KeluargaKlien } from "../consts/keluarga_klien"
import { KondisiKlien } from "../consts/kondisi_klien"
import { Laporan, LaporanCount, LaporanCountSatgas, LaporanSatgas, LaporanToken } from "../consts/laporan"
import PaginationData from "../consts/pagination"
import { Pelaku } from "../consts/pelaku"
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance"
import { LaporanByKategori, LaporanByKategoriRT } from "../consts/laporanByKategori"
import { LangkahBadanDaerah, LangkahDP3A } from "../consts/langkahBadanDaerah"
import { LangkahOPD } from "../consts/langkahOPD"
import { RAKK } from "../consts/rakk"
import { RRKK } from "../consts/rrkk"
import { Rekapitulasi, Rekapitulsai } from "../consts/rekapitulasi"


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

export const getLaporanCetak = async (id: string) => {
  const instance = CreateAxiosInstance()
  const res = await instance.get(`/laporans/${id}/cetak`)
  const laporan = res.data.data
  console.log("ini", laporan)
  return laporan
}

export const getRekapKlien = async (id: string) => {
  const instance = CreateAxiosInstance()
  const res = await instance.get(`/laporans-kasus-klien/${id}/cetak`)
  const rekap = res.data.data
  console.log("ini", rekap)
  return rekap
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

export const getTotalLaporanSatgas = async (startDate?: Date, endDate?: Date, kategoriId?: number, kategoriKasusId?: number) => {
  const instance = CreateAxiosInstance()
  let res = null
  if (startDate != null && endDate != null && kategoriId != null && kategoriKasusId != null) {
    res = await instance.get(
      `/statuses/count?tanggal_start=${startDate.toISOString().slice(0, 10)}&tanggal_end=${endDate.toISOString().slice(0, 10)}&kategori_id=${kategoriId}&kategori_kasus_id=${kategoriKasusId}`
    );
  } else {
    res = await instance.get(`/statuses/count`);
  }
  const data = res.data.data as LaporanCountSatgas
  return data
}

export const getTotalLaporan = async (startDate?: Date, endDate?: Date, kategoriId?: number, kategoriKasusId?: number) => {
  const instance = CreateAxiosInstance()
  let res = null
  if (startDate != null && endDate != null && kategoriId != null && kategoriKasusId != null) {
    res = await instance.get(
      `/statuses/count?tanggal_start=${startDate.toISOString().slice(0, 10)}&tanggal_end=${endDate.toISOString().slice(0, 10)}&kategori_id=${kategoriId}&kategori_kasus_id=${kategoriKasusId}`
    );
  } else {
    res = await instance.get(`/statuses/count`);
  }
  const data = res.data.data as LaporanCount[]
  return data
}

export const getRekapitulasi = async (startDate?: Date, endDate?: Date, kategoriId?: number, kategoriKasusId?: number) => {
  const instance = CreateAxiosInstance()
  let res = null
  if (startDate != null && endDate != null && kategoriId != null && kategoriKasusId != null) {
    res = await instance.get(
      `/rekapitulasi/satgas?tanggal_start=${startDate.toISOString().slice(0, 10)}&tanggal_end=${endDate.toISOString().slice(0, 10)}&kategori_id=${kategoriId}&kategori_kasus_id=${kategoriKasusId}`
    );
  } else {
    res = await instance.get(`/rekapitulasi/satgas`);
  }
  const data = res.data.data as Rekapitulasi[]
  return data
}

export const deleteLaporan = async (id: string) => {
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
  const instance = CreatePublicAxiosInstance()
  const res = await instance.get(`/m-hubungan`);
  const data = res.data.data as HubunganKeluarga[];
  return data;
};

export const getLaporanByKategoriRT = async () => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/count-by-kategoris`);
  const data = res.data.data as LaporanByKategoriRT[];
  return data;
};

export const getlaporanByKategori = async (id: number | string, startDate?: Date, endDate?: Date) => {
  const instance = CreateAxiosInstance();
  let res = null
  if (startDate != null && endDate != null) {
    res = await instance.get(
      `laporans/count-by-kategoris?kelurahan_id=${id}&tanggal_start=${startDate.toISOString().slice(0, 10)}&tanggal_end=${endDate.toISOString().slice(0, 10)}`
    );
  } else {
    res = await instance.get(
      `/laporans/count-by-kategoris?kelurahan_id=${id}`
    );
  }
  const data = res.data.data as LaporanByKategori[];
  return data;
};

export const postPenanganan = async (penanganan: Penanganan) => {
  const instance = CreateAxiosInstance()
  const res = await instance.post('/penanganan-awals', penanganan, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  const postedPenanganan = res.data.data as Penanganan
  return postedPenanganan
}

export const patchPenanganan = async (penanganan: Penanganan) => {
  const instance = CreateAxiosInstance()
  const res = await instance.put(`/penanganan-awals/${penanganan.id}`, penanganan, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
  const patchedPenanganan = res.data.data2 as Penanganan
  return patchedPenanganan
}

export const postLangkah = async (langkah: LangkahDP3A) => {
  const instance = CreateAxiosInstance()
  const res = await instance.post('/langkah-telah-dilakukans', langkah, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  const postedLangkah = res.data.data as LangkahDP3A
  return postedLangkah
}

export const patchLangkah = async (langkah: LangkahDP3A) => {
  const instance = CreateAxiosInstance()
  const res = await instance.put(`//langkah-telah-dilakukans/${langkah.id}`, langkah, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
  const patchedLangkah = res.data.data2 as LangkahDP3A
  return patchedLangkah
}

// langkah opd

export const postLangkahOPD = async (langkah_OPD: LangkahOPD) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/lintas-o-p-ds", langkah_OPD, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedLangkahOPD = res.data.data as LangkahOPD;
  return postedLangkahOPD;
};

export const deleteLangkahOPD = async (id: number) => {
  const instance = CreateAxiosInstance();
  await instance.delete(`/lintas-o-p-ds/${id}`);
};

export const getLangkahOPD = async (id: string) => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/${id}/lintas-o-p-ds`);
  const data = res.data.data as LangkahOPD[];
  return data;
};

// langkah badan daerah

export const postLangkahBadanDaerah = async (langkah_OPD: LangkahBadanDaerah) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/langkah-telah-dilakukans", langkah_OPD, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedLangkahBadanDaerah = res.data.data as LangkahBadanDaerah;
  return postedLangkahBadanDaerah;
};

export const deleteLangkahBadanDaerah = async (id: number) => {
  const instance = CreateAxiosInstance();
  await instance.delete(`/langkah-telah-dilakukans/${id}`);
};

export const getLangkahBadanDaerah = async (id: string) => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/${id}/langkah-telah-dilakukans`);
  const data = res.data.data as LangkahBadanDaerah[];
  return data;
};

// rakk

export const postRAKK = async (
  rakk: RAKK
) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/r-a-k-ks", rakk, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedRAKK = res.data.data as RAKK;
  return postedRAKK;
};

export const deleteRAKK = async (id: number) => {
  const instance = CreateAxiosInstance();
  await instance.delete(`/r-a-k-ks/${id}`);
};

export const getRAKK = async (id: string) => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/${id}/r-a-k-ks`);
  const data = res.data.data as RAKK[];
  return data;
};

// rrkk

export const postRRKK = async (RRKK: RRKK) => {
  const instance = CreateAxiosInstance();
  const res = await instance.post("/r-r-k-ks", RRKK, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const postedRRKK = res.data.data as RRKK;
  return postedRRKK;
};

export const deleteRRKK = async (id: number) => {
  const instance = CreateAxiosInstance();
  await instance.delete(`/r-r-k-ks/${id}`);
};

export const getRRKK = async (id: string) => {
  const instance = CreateAxiosInstance();
  const res = await instance.get(`/laporans/${id}/r-r-k-ks`);
  const data = res.data.data as RRKK[];
  return data;
};