import { FaHome, FaUserNurse } from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";
import { useAuthUser } from "react-auth-kit";
import { User, UserAccount } from "../../consts/user";
import { Panel, BarChartPanel, FilterPanel, TablePanel } from "../../components/internal/Panel";
import { JenisKasusesLoader, KategoriKasusesLoader, KategoriLoader, KecamatanLoader, KelurahanLoader, LaporanByKategoriLoader, LaporanByKategoriRTLoader, LaporanCountLoader, LaporanCountSatgasLoader, LaporanLoader, LaporansLoader, RekapitulasiLoader, UserLoader } from "../../helpers/fetchHelpers";
import React, { useEffect, useState } from "react";
import { Laporan, LaporanCount, LaporanCountSatgas } from "../../consts/laporan";
import { STATUS_LAPORAN } from "../../consts/status";
import { useParams } from "react-router-dom";
import { LaporanByKategori } from "../../consts/laporanByKategori";
import { Kelurahan } from "../../consts/kelurahan";
import { Select } from "../../components/form/Dropdown";
import { Kecamatan } from "../../consts/kecamatan";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoader from "../../hooks/useLoader";
import { useAlert } from "../../hooks/useAlert";
import Datepicker from "../../components/form/Datepicker";
import { JenisKasus } from "../../consts/jenis_kasus";
import { PrimaryButton, SecondaryButton } from "../../components/form/Button";
import { set } from "date-fns";
import { ALERT_TYPE } from "../../consts/alert";
import { Rekapitulasi } from "../../consts/rekapitulasi";
import axios from "axios";
import { CreateAxiosInstance } from "../../helpers/createAxiosInstance";



interface DropdownOptionProps {
  text: string;
  value: string | number;
}

interface FormFilter {
  kelurahan_id?: number;
  satgas_id?: number
  start_date: Date;
  end_date: Date;
  status_id: number;
  kategori_id: number;
  kategori_kasus_id: number;
  jenis_kasus_id: number
}

const Dashboard = () => {
  const userData = useAuthUser()() as User;
  const [userAccount, setUserAccount] = useState<UserAccount>();
  const [laporanCount, setLaporanCount] = useState<LaporanCount[]>([]);
  const [laporanCountSatgas, setLaporanCountSatgas] = useState<LaporanCountSatgas>();
  const [kelurahans, setKelurahans] = useState<Kelurahan[]>([]);

  // chart variabel
  const [selectedKelurahans, setSelectedKelurahans] = useState<number>(1);
  const [kecamatans, setKecamatans] = useState<Kecamatan[]>([])
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert,clearAlert } = useAlert();
  const form = useForm<FormFilter>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [error, setError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // rekapitulasi
  const [rekapitulasi, setRekapitulasi] = useState<Rekapitulsai[]>([]);

  // dashboard filter
  const [kategoris, setKategoris] = useState<Kategori[]>([]);
  const [kategoriKasues, setKategoriKasues] = useState<Kategori[]>([]);
  const [refetch, setRefetch] = React.useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selectedKategoriDropDown, setSelectedKategoriDropDown] = useState<number | null>(null);
  const [selectedKategori, setSelectedKategori] = useState<number | null>(null);
  const [selectedKategoriKasus, setSelectedKategoriKasus] = useState<number | null>(null)
  const [isKategoriKasusDisabled, setIsKategoriKasusDisabled] = useState<boolean>(true)  

  const onSubmitFilter: SubmitHandler<FormFilter> = async (data: FormFilter) => {
    try {
      if (data.start_date >= data.end_date || data.start_date == null || data.end_date == null) {
        setError(true);
      } else {
        setIsLoading(true);
        showLoader();
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setSelectedStatus(data.status_id);
        setSelectedKategori(data.kategori_id);
        setSelectedKategoriKasus(data.kategori_kasus_id);
        setError(false);
      }
    } catch {
      errorFetchAlert();
    } finally {
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const resetFilter = () => {
    reset();

    setStartDate(null);
    setEndDate(null);
    setSelectedStatus(null);
    setSelectedKategori(null);
    setSelectedKategoriKasus(null);
    setError(false);
  };
 
const instance = CreateAxiosInstance();

useEffect(() => {
  const fetchStatusCounts = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    try {
      const response = await instance.get(`statuses/count?tanggal_end=${currentDate}`);

      const count = response.data.data
      console.log(count)

      if (userAccount?.role.id == 2) {
       setTimeout(() => {
          clearAlert();
        }, 50);

        setTimeout(() => {
          const message = count
            .filter((status: StatusCount) => 
              status.id === 1 || 
              status.id === 2 ||
              status.id === 7
            )
            .map((status: StatusCount) => 
              `${status.nama}: ${status.totalCase}`
            ).join(', ');

          console.log(message);

          addAlert({
            type: ALERT_TYPE.INFO,
            title: "Notifikasi Jumlah Kasus",
            message: message,
          }, "top");
        }, 1000);

       
      }
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  };

  fetchStatusCounts();
}, [userAccount?.role.id]);



  // useEffect(() => {
    
  // }, [userAccount, kasusCount, clearAlert, addAlert]);
  useEffect(() => {
  
    const kategoriId = form.watch("kategori_id");
    setSelectedKategoriDropDown(kategoriId || null);
    setIsKategoriKasusDisabled(!kategoriId);
   
  }, [form.watch("kategori_id")]);


  return (
    <AdminLayout>
      <UserLoader data={userAccount} setData={setUserAccount} id={userData.id}>
        <LaporanCountLoader data={laporanCount} setData={setLaporanCount} refetch={refetch} setRefetch={setRefetch} startDate={startDate} endDate={endDate} kategoriId={selectedKategori} kategoriKasusId={selectedKategoriKasus}>
          <LaporanCountSatgasLoader data={laporanCountSatgas} setData={setLaporanCountSatgas} refetch={refetch} setRefetch={setRefetch} startDate={startDate} endDate={endDate} kategoriId={selectedKategori} kategoriKasusId={selectedKategoriKasus}>
            <RekapitulasiLoader data={rekapitulasi} setData={setRekapitulasi} refetch={refetch} setRefetch={setRefetch} startDate={startDate} endDate={endDate} kategoriId={selectedKategori} kategoriKasusId={selectedKategoriKasus}>
              <div className="lg:w-10/12 w-11/12 p-4 bg-white floating-shadow-md mx-auto mt-12 rounded-lg">
                <h1 className="font-bold text-2xl text-primary mb-2">
                  Selamat Datang di Dashboard !
                </h1>
                <div className="flex gap-3 items-center text-lg">
                  <FaHome />
                  <h2 className="font-bold">Kelurahan {userAccount?.kelurahan?.nama}</h2>
                </div>
                <div className="flex gap-3 items-center text-lg">
                  <FaUserNurse />
                  <h2 className="font-bold">{userData?.name}</h2>
                </div>
              </div>

              <div className="grid xl:grid-cols-5 md:grid-2 lg:w-10/12 w-11/12 mx-auto gap-4 mt-8">
                {/* filter */}
                <KategoriKasusesLoader data={kategoriKasues} setData={setKategoriKasues}>
                  <KategoriLoader data={kategoris} setData={setKategoris}>
                    <div className="xl:col-span-1 col-span-1 p-8 bg-white floating-shadow-md rounded-lg">
                      <div className="flex flex-col gap-4">
                        <span className="text-primary font-bold text-xl">Filter</span>
                        <form action="" onSubmit={handleSubmit(onSubmitFilter)}>
                          <div className="flex flex-col gap-4 h-full">
                            <Datepicker
                              name="start_date"
                              control={control}
                              defaultValue={startDate}
                              placeholder="Masukkan tanggal awal"
                              label="Tanggal Awal"
                              type="date"
                              isRequired
                              limitToToday
                            />
                            <Datepicker
                              name="end_date"
                              control={control}
                              defaultValue={endDate}
                              placeholder="Masukkan tanggal akhir"
                              label="Tanggal Akhir"
                              type="date"
                              isRequired
                              limitToToday
                            />
                            <span className="text-red-500 mt-[-15px]">
                              {error == true ? "Tanggal Akhir tidak valid!" : ""}
                            </span>
                            {/* {userAccount?.role.id === 2 &&
                            <>
                              <Select
                                name="status_id"
                                control={control}
                                placeholder="Pilih status"
                                label="Status"
                                errors={errors}
                                errorLabel="Status"
                                options={[
                                  { label: 'Menunggu Verifikasi', value: 1 },
                                  { label: 'Sedang Ditangani', value: 2 },
                                  { label: 'Kasus Dikembalikan', value: 3 },
                                  { label: 'Kasus Selesai', value: 4 },
                                  { label: 'Kasus Dirujuk', value: 5 },
                                ]}
                                isRequired
                              />
                            </>
                          } */}
                            <Select
                              name="kategori_id"
                              control={control}
                              placeholder="Pilih Kategori Pelaporan"
                              label="Kategori Pelaporan"
                              errors={errors}
                              errorLabel="Kategori Pelaporan"
                              options={kategoris
                                .filter((k) => k.is_active === true)
                                .map((k) => ({
                                  label: k.name,
                                  value: k.id,
                                }))}
                              isRequired
                            />
                            <Select
                              name="kategori_kasus_id"
                              control={control}
                              placeholder="Pilih Kategori Kasus"
                              label="Kategori Kasus"
                              errors={errors}
                              errorLabel="Kategori Kasus"
                              options={kategoriKasues
                                .filter((k) => k.is_active === true && k.id_tipe_permasalahan === selectedKategoriDropDown)
                                .map((k) => ({
                                  label: k.name,
                                  value: k.id,
                                }))}
                              isDisabled={isKategoriKasusDisabled}
                              isRequired
                            />
                            <div className="border-t-2 border-slate-400 pt-5 grid grid-cols-1 gap-4">
                              <SecondaryButton
                                className="py-2"
                                onClick={() => resetFilter()}
                              >
                                Reset
                              </SecondaryButton>
                              <PrimaryButton
                                className="py-2"
                                isLoading={isLoading}
                                isDisabled={isLoading}
                                isSubmit
                              >
                                Filter
                              </PrimaryButton>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </KategoriLoader>
                </KategoriKasusesLoader>
                {/* dashboard */}
                <div className="xl:col-span-4 col-span-1 p-8 bg-white floating-shadow-md rounded-lg">
                  {
                    userAccount?.role?.id && userAccount?.role?.id === 1 &&
                    <>
                      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                        <Panel
                          title="Total Kasus Masuk"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={laporanCountSatgas?.totalCase ?? 0}
                        />
                        <Panel
                          title="Total Kasus Menunggu Validasi"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCountSatgas?.totalCaseMenunggu ?? 0
                          }
                        />
                        <Panel
                          title="Total Kasus Ditangani"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={laporanCountSatgas?.totalCaseDiterima ?? 0}
                        />
                        <Panel
                          title="Total Kasus Selesai"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={laporanCountSatgas?.totalCaseSelesai ?? 0}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        {userAccount?.kelurahan?.id && (
                          <div className="xl:col-span-3">
                            <BarChartPanel
                              title={"Diagram Jumlah Kasus Kelurahan " + userAccount.kelurahan.nama}
                              date={endDate ? endDate.toISOString() : new Date().toISOString()}
                              selectedKelurahans={userAccount.kelurahan.id}
                              startDate={startDate}
                              endDate={endDate}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  }
                  {
                    userAccount?.role?.id && userAccount?.role?.id === 2 &&
                    <>
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        <Panel
                          title="Total Kasus Masuk"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCount.find(
                              (val) => val.id === STATUS_LAPORAN.SEMUA_KASUS
                            )?.totalCase ?? 0
                          }
                        />
                        <Panel
                          title="Total Kasus Belum Diassign"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCount.find(
                              (val) => val.id === STATUS_LAPORAN.KASUS_BELUM_DIASSIGN
                            )?.totalCase ?? 0
                          }
                        />
                        <Panel
                          title="Total Kasus Menunggu Validasi"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCount.find(
                              (val) => val.id === STATUS_LAPORAN.MENUNGGU_VALIDASI
                            )?.totalCase ?? 0
                          }
                        />
                        <Panel
                          title="Total Kasus Ditangani"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCount.find(
                              (val) => val.id === STATUS_LAPORAN.SEDANG_DITANGANI
                            )?.totalCase ?? 0
                          }
                        />
                        <Panel
                          title="Total Kasus Selesai"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCount.find(
                              (val) => val.id === STATUS_LAPORAN.KASUS_SELESAI
                            )?.totalCase ?? 0
                          }
                        />
                        <Panel
                          title="Total Kasus Dikembalikan"
                          date={endDate ? endDate.toISOString() : new Date().toISOString()}
                          count={
                            laporanCount.find(
                              (val) => val.id === STATUS_LAPORAN.KASUS_DIKEMBALIKAN
                            )?.totalCase ?? 0
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        {userAccount?.kelurahan?.id && (
                          <BarChartPanel
                            title={"Diagram Jumlah Kasus Berdasarkan RW di Kelurahan " + userAccount.kelurahan.nama}
                            date={endDate ? endDate.toISOString() : new Date().toISOString()}
                            selectedKelurahans={userAccount.kelurahan.id}
                            startDate={startDate}
                            endDate={endDate}
                          />
                        )}
                      </div>
                    </>
                  }
                  {
                    userAccount?.role?.id && userAccount?.role?.id === 2 &&
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <TablePanel
                        title="Tabel Penanganan Tiap Satgas"
                        date={endDate ? endDate.toISOString() : new Date().toISOString()}
                        data={rekapitulasi}
                      ></TablePanel>
                    </div>
                  }
                </div>
              </div>

              {/* <div className="lg:w-10/12 w-11/12 p-4 bg-white floating-shadow-md mx-auto mt-4 rounded-lg">
            <table></table>
          </div> */}
            </RekapitulasiLoader>
          </LaporanCountSatgasLoader>
        </LaporanCountLoader>
      </UserLoader>
    </AdminLayout>
  );
};

export default Dashboard;
