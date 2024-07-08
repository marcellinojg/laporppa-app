import { FaHome, FaUserNurse } from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";
import { useAuthUser } from "react-auth-kit";
import { User, UserAccount } from "../../consts/user";
import { Panel, BarChartPanel, FilterPanel } from "../../components/internal/Panel";
import { KelurahanLoader, LaporanByKategoriLoader, LaporanByKategoriRTLoader, LaporanCountLoader, LaporanLoader, LaporansLoader, UserLoader } from "../../helpers/fetchHelpers";
import { useEffect, useState } from "react";
import { Laporan, LaporanCount } from "../../consts/laporan";
import { STATUS_LAPORAN } from "../../consts/status";
import { useParams } from "react-router-dom";
import { LaporanByKategori, LaporanByKategoriRT } from "../../consts/laporanByKategori";
import { Kelurahan } from "../../consts/kelurahan";
import Select from "react-select";

interface DropdownOptionProps {
  text: string;
  value: string | number;
}


const Dashboard = () => {
  const userData = useAuthUser()() as User;
  const [userAccount, setUserAccount] = useState<UserAccount>();
  const [laporanCount, setLaporanCount] = useState<LaporanCount[]>([]);
  const [kelurahans, setKelurahans] = useState<Kelurahan[]>([]);

  // chart variabel
  const [selectedKelurahans, setSelectedKelurahans] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <AdminLayout>
      <UserLoader data={userAccount} setData={setUserAccount} id={userData.id}>
        <LaporanCountLoader data={laporanCount} setData={setLaporanCount}>
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
          <div className="lg:w-10/12 w-11/12 p-8 bg-white floating-shadow-md mx-auto mt-6 rounded-lg">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              <Panel
                title="Total Kasus Masuk"
                date={new Date().toISOString()}
                count={
                  laporanCount.find(
                    (val) => val.id === STATUS_LAPORAN.SEMUA_KASUS
                  )?.totalCase
                }
              />
              <Panel
                title="Total Kasus Menunggu Validasi"
                date={new Date().toISOString()}
                count={
                  laporanCount.find(
                    (val) => val.id === STATUS_LAPORAN.MENUNGGU_VALIDASI
                  )?.totalCase
                }
              />
              <Panel
                title="Total Kasus Selesai"
                date={new Date().toISOString()}
                count={
                  laporanCount.find(
                    (val) => val.id === STATUS_LAPORAN.KASUS_SELESAI
                  )?.totalCase
                }
              />
              <Panel
                title="Total Kasus Diteruskan ke DP3A"
                date={new Date().toISOString()}
                count={
                  laporanCount.find(
                    (val) => val.id === STATUS_LAPORAN.KASUS_DITERUSKAN
                  )?.totalCase
                }
              />
              <Panel
                title="Total Kasus Ditangani"
                date={new Date().toISOString()}
                count={
                  laporanCount.find(
                    (val) => val.id === STATUS_LAPORAN.SEDANG_DITANGANI
                  )?.totalCase
                }
              />
              <Panel
                title="Total Kasus Dikembalikan"
                date={new Date().toISOString()}
                count={
                  laporanCount.find(
                    (val) => val.id === STATUS_LAPORAN.KASUS_DIKEMBALIKAN
                  )?.totalCase
                }
              />
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4">
              <div>
                <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                  <FilterPanel
                    title="Filter Diagram"
                    kelurahans={kelurahans}
                    selectedKelurahans={selectedKelurahans}
                    setSelectedKelurahans={setSelectedKelurahans}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </KelurahanLoader>
              </div>
              <div className="lg:col-span-2">
                <BarChartPanel
                  title="Diagram Jumlah Kasus Berdasarkan Kelurahan"
                  date={new Date().toISOString()}
                  selectedKelurahans={selectedKelurahans}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </div>
        </LaporanCountLoader>
      </UserLoader>
    </AdminLayout>
  );
};

export default Dashboard;
