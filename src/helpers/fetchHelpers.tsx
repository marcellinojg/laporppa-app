import React, { ReactNode, SetStateAction, useEffect } from "react";
import { Kecamatan } from "../consts/kecamatan";
import { Kelurahan } from "../consts/kelurahan";
import useLoader from "../hooks/useLoader";
import { getKelurahans } from "../api/kelurahan";
import { getKecamatans } from "../api/kecamatan";
import { useAlert } from "../hooks/useAlert";
import { Laporan, LaporanCount, LaporanCountSatgas } from "../consts/laporan";
import { getHubunganKeluarga, getKeluargaKlien, getLangkahBadanDaerah, getLangkahOPD, getLaporan, getLaporans, getLaporansBySearchAndStatus, getRAKK, getRRKK, getRekapitulasi, getTotalLaporan, getTotalLaporanSatgas, getlaporanByKategori } from '../api/laporan';
import PaginationData from "../consts/pagination";
import { getKategoriKasuses, getKategoris } from "../api/kategori";
import { SatgasPelapor } from "../consts/satgas";
import { getSatgasPelapors } from "../api/satgas";
import { Kota } from "../consts/kota";
import { getKotas } from "../api/kota";
import { Agama } from "../consts/agama";
import { getAgamas } from "../api/agama";
import { Pekerjaan } from "../consts/pekerjaan";
import { getPekerjaans } from "../api/pekerjaan";
import { StatusPerkawinan } from "../consts/status_perkawinan";
import { getStatusPerkawinans } from "../api/status_perkawinan";
import { getBPJS } from "../api/bpjs";
import { BPJS } from "../consts/BPJS";
import { JenisKasus } from "../consts/jenis_kasus";
import { getJenisKasuses } from "../api/jenis_kasus";
import { HubunganKeluarga } from "../consts/hubungan_keluarga";
import { KeluargaKlien } from "../consts/keluarga_klien";
import { LaporanByKategori } from "../consts/laporanByKategori";
import Pendidikan from "../consts/pendidikan";
import { getPendidikans } from "../api/pendidikan";
import { LangkahOPD } from "../consts/langkahOPD";
import { LangkahBadanDaerah } from "../consts/langkahBadanDaerah";
import { RAKK } from "../consts/rakk";
import { RRKK } from "../consts/rrkk";
import { UserAccount } from "../consts/user";
import { getRoles, getUser, getUsers } from "../api/user";
import { Role } from "../consts/role";
import { LookasiKejadian } from "../consts/lokasi_kejadian";
import { getLokasiKejadians } from "../api/lokasi_kejadian";
import { getOpdes } from "../api/opd";
import { Opd } from "../consts/opd";
import { Rekapitulasi, Rekapitulsai } from "../consts/rekapitulasi";
import { id } from "date-fns/locale";

interface FetchDataEffectsProps<T> {
    data: T,
    setData: React.Dispatch<SetStateAction<T>>,
    children: ReactNode
    page?: number,
    setPaginationData?: React.Dispatch<SetStateAction<PaginationData | null>>,
    keyword?: string
    setPage?: React.Dispatch<SetStateAction<number>>
    status?: number
    id?: string
    refetch?: boolean
    setRefetch?: React.Dispatch<SetStateAction<boolean>>
    startDate?: Date | null
    endDate?: Date | null
    kategoriId?: number | null
    kategoriKasusId?: number | null
}


export const KecamatanLoader = (props: FetchDataEffectsProps<Kecamatan[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKecamatans().then((kecamatans) => setData(kecamatans)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}


export const KelurahanLoader = (props: FetchDataEffectsProps<Kelurahan[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKelurahans().then((kelurahans) => setData(kelurahans)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}

export const KotaLoader = (props: FetchDataEffectsProps<Kota[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getKotas()
            .then((kotas) => setData(kotas))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};


export const AllLaporanLoader = (props: FetchDataEffectsProps<Laporan[]>) => {
    const { setData, children, page = 1, keyword = "", setPaginationData, setPage, status = 0, refetch, setRefetch } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        setRefetch!(true)
    }, [keyword, status, page])

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getLaporansBySearchAndStatus(page, keyword, status)
                .then(({ laporans, paginationData }) => {
                    setData(laporans)
                    setPaginationData!(paginationData)
                })
                .catch(() => errorFetchAlert())
                .finally(() => hideLoader())
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        setRefetch!(false)

    }, [refetch])

    useEffect(() => {
        setPage!(1)
    }, [keyword, status])

    return <>
        {children}
    </>
}

export const LaporanLoader = (props: FetchDataEffectsProps<Laporan | null | undefined>) => {
    const { setData, id, children, refetch, setRefetch } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getLaporan(id!)
                .then((laporan: Laporan) => {
                    const tanggal_jam_pengaduan = new Date(laporan.tanggal_jam_pengaduan)
                    setData({
                        ...laporan,
                        tanggal_pengaduan: tanggal_jam_pengaduan,
                        jam_pengaduan: `${tanggal_jam_pengaduan.getHours()}:${tanggal_jam_pengaduan.getMinutes()}`
                    })
                })
                .catch((error) => {
                    if (error.response.status == 404)
                        setData(null)
                    else
                        errorFetchAlert()
                })
                .finally(() => hideLoader())
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        setRefetch!(false)
    }, [refetch])

    return <>
        {children}
    </>
}

export const KategoriLoader = (props: FetchDataEffectsProps<Kategori[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKategoris().then((kategoris) => setData(kategoris)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}

export const LaporanCountLoader = (props: FetchDataEffectsProps<LaporanCount[]>) => {
    const { setData, children, refetch, setRefetch, startDate, endDate, kategoriId, kategoriKasusId } = props;
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        setRefetch!(true)
    }, [startDate, endDate, kategoriId, kategoriKasusId])

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getTotalLaporan(startDate!, endDate!, kategoriId!, kategoriKasusId!)
                .then((totalLaporan) => setData(totalLaporan))
                .catch(() => errorFetchAlert())
                .finally(() => hideLoader())
        }

        setRefetch!(false);
    }, [refetch])

    return <>
        {children}
    </>
}

export const LaporanCountSatgasLoader = (props: FetchDataEffectsProps<LaporanCountSatgas | undefined>) => {
    const { setData, children, refetch, setRefetch, startDate, endDate, kategoriId, kategoriKasusId } = props;
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        setRefetch!(true)
    }, [startDate, endDate, kategoriId, kategoriKasusId])

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getTotalLaporanSatgas(startDate!, endDate!, kategoriId!, kategoriKasusId!)
                .then((totalLaporan) => setData(totalLaporan))
                .catch(() => errorFetchAlert())
                .finally(() => hideLoader())
        }

        setRefetch!(false);
    }, [refetch])

    return <>
        {children}
    </>
}

export const RekapitulasiLoader = (props: FetchDataEffectsProps<Rekapitulasi[]>) => {
    const { setData, children, refetch, setRefetch, startDate, endDate, kategoriId, kategoriKasusId } = props;
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        setRefetch!(true)
    }, [startDate, endDate, kategoriId, kategoriKasusId])

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getRekapitulasi(startDate!, endDate!, kategoriId!, kategoriKasusId!)
                .then((rekapitulasi) => setData(rekapitulasi))
                .catch(() => errorFetchAlert())
                .finally(() => hideLoader())
        }

        setRefetch!(false);
    }, [refetch])

    return <>
        {children}
    </>
}

export const SatgasPelaporLoader = (props: FetchDataEffectsProps<SatgasPelapor[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getSatgasPelapors().then((satgasPelapors) => setData(satgasPelapors)).catch(() => errorFetchAlert()).then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}

export const JenisKasusesLoader = (props: FetchDataEffectsProps<JenisKasus[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getJenisKasuses()
            .then((jenisKasuses) => setData(jenisKasuses))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const AgamaLoader = (props: FetchDataEffectsProps<Agama[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getAgamas()
            .then((agamas) => setData(agamas))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader())
    }, [])

    return <>
        {children}
    </>
}



export const PekerjaanLoader = (props: FetchDataEffectsProps<Pekerjaan[]>) => {

    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getPekerjaans()
            .then((pekerjaans) => setData(pekerjaans))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const StatusPekawinanLoader = (props: FetchDataEffectsProps<StatusPerkawinan[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getStatusPerkawinans()
            .then((status_perkawinans) => setData(status_perkawinans))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const BPJSLoader = (
    props: FetchDataEffectsProps<BPJS[]>
) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getBPJS()
            .then((bpjs) => setData(bpjs))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};


export const KategoriKasusesLoader = (props: FetchDataEffectsProps<Kategori[]>) => {
    const { setData, children } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader()
        getKategoriKasuses()
            .then((kategoriKasues) => setData(kategoriKasues))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, [])

    return <>
        {children}
    </>
}

export const KeluargaLoader = (props: FetchDataEffectsProps<KeluargaKlien[]>) => {
    const { setData, children, id } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader();
        getKeluargaKlien(id!)
            .then((keluarga: KeluargaKlien[]) => {
                setData(keluarga);
            })
            .catch((error) => {
                if (error.response.status == 404) setData([]);
                else errorFetchAlert();
            })
            .finally(() => hideLoader());
    }, [])
    return <>
        {children}
    </>
}

export const HubunganKeluargaLoader = (props: FetchDataEffectsProps<HubunganKeluarga[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getHubunganKeluarga()
            .then((hubungans) => setData(hubungans))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const LaporansLoader = (props: FetchDataEffectsProps<Laporan[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getLaporans()
            .then((laporans) => setData(laporans))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const LaporanByKategoriLoader = (props: FetchDataEffectsProps<LaporanByKategori[]>) => {
    const {
        setData,
        children,
        refetch,
        setRefetch,
        id,
        startDate,
        endDate
    } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        setRefetch!(true);
    }, [id, startDate, endDate]);

    useEffect(() => {
        if (refetch === true) {
            showLoader();
            getlaporanByKategori(id!, startDate!, endDate!)
                .then((laporan: LaporanByKategori[]) => {
                    setData(laporan);
                })
                .catch((error) => {
                    if (error.response.status == 404) setData([]);
                    else errorFetchAlert();
                })
                .finally(() => hideLoader());
        }

        setRefetch!(false);
    }, [refetch]);

    return <>{children}</>;
};

export const PendidikanLoader = (props: FetchDataEffectsProps<Pendidikan[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getPendidikans()
            .then((pendidikans) => setData(pendidikans))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const LangkahOPDLoader = (props: FetchDataEffectsProps<LangkahOPD[]>) => {
    const { setData, children, id } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader();
        getLangkahOPD(id!)
            .then((langkahOPD: LangkahOPD[]) => {
                setData(langkahOPD);
            })
            .catch((error) => {
                if (error.response.status == 404) setData([]);
                else errorFetchAlert();
            })
            .finally(() => hideLoader());
    }, [])
    return <>
        {children}
    </>
}

export const LangkahBadanDaerahLoader = (props: FetchDataEffectsProps<LangkahBadanDaerah[]>) => {
    const { setRefetch, setData, children, id } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()



    useEffect(() => {
        showLoader();
        getLangkahBadanDaerah(id!)
            .then((langkahBadanDaerah: LangkahBadanDaerah[]) => {
                setData(langkahBadanDaerah);
            })
            .catch((error) => {
                if (error.response.status == 404) setData([]);
                else errorFetchAlert();
            })
            .finally(() => {
                hideLoader(),
                    setRefetch!(true);
            });
    }, []);

    return <>
        {children}
    </>
}

export const RAKKLoader = (props: FetchDataEffectsProps<RAKK[]>) => {
    const { setData, children, id } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader();
        getRAKK(id!)
            .then((rakk: RAKK[]) => {
                setData(rakk);
            })
            .catch((error) => {
                if (error.response.status == 404) setData([]);
                else errorFetchAlert();
            })
            .finally(() => hideLoader());
    }, [])
    return <>
        {children}
    </>
}

export const RRKKLoader = (props: FetchDataEffectsProps<RRKK[]>) => {
    const { setData, children, id } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    useEffect(() => {
        showLoader();
        getRRKK(id!)
            .then((rrkk: RRKK[]) => {
                setData(rrkk);
            })
            .catch((error) => {
                if (error.response.status == 404) setData([]);
                else errorFetchAlert();
            })
            .finally(() => hideLoader());
    }, [])
    return <>
        {children}
    </>
}

export const UsersLoader = (props: FetchDataEffectsProps<UserAccount>) => {
    const { setData, children, refetch, setRefetch, data } = props
    const { showLoader, hideLoader } = useLoader()
    const { errorFetchAlert } = useAlert()

    // useEffect(() => {
    //     setRefetch!(true)
    // }, [data])

    useEffect(() => {
        if (refetch === true) {
            showLoader()
            getUsers()
                .then((users: UserAccount[]) => {
                    setData(users)
                })
                .catch(() => errorFetchAlert())
                .finally(() => hideLoader())
            // window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        setRefetch!(false)

    }, [refetch])

    useEffect(() => {
        showLoader();
        getUsers()
            .then((users: UserAccount[]) => setData(users))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>
        {children}
    </>
}

export const RoleLoader = (props: FetchDataEffectsProps<Role[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getRoles()
            .then((roles) => setData(roles))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const LokasiKejadianLoader = (props: FetchDataEffectsProps<LookasiKejadian[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getLokasiKejadians()
            .then((roles) => setData(roles))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const OPDLoader = (props: FetchDataEffectsProps<Opd[]>) => {
    const { setData, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getOpdes()
            .then((roles) => setData(roles))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
};

export const UserLoader = (props: FetchDataEffectsProps<UserAccount | undefined>) => {

    const { setData, id, children } = props;
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert } = useAlert();

    useEffect(() => {
        showLoader();
        getUser(id!)
            .then((user) => setData(user))
            .catch(() => errorFetchAlert())
            .then(() => hideLoader());
    }, []);

    return <>{children}</>;
}