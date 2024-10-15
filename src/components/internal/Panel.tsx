import { formatDate } from "../../helpers/formatDate";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LaporanByKategori } from "../../consts/laporanByKategori";
import { Kelurahan } from "../../consts/kelurahan";
import { LaporanByKategoriLoader } from "../../helpers/fetchHelpers";
import { Select } from "../form/Dropdown";
import { useForm, SubmitHandler } from "react-hook-form";
import useLoader from "../../hooks/useLoader";
import { useAlert } from "../../hooks/useAlert";
import { ALERT_TYPE } from "../../consts/alert";
import Datepicker from "../form/Datepicker";
import { PrimaryButton, SecondaryButton } from "../form/Button";
import { Rekapitulasi } from "../../consts/rekapitulasi";

interface FormFilter {
  kelurahan_id: number;
  startDate: Date;
  endDate: Date;
}

interface PanelProps {
  title: string;
  date: string;
  count?: number;
}

interface PanelBar {
  title: string;
  date: string;
  selectedKelurahans: number | null;
  startDate: Date | null;
  endDate: Date | null;
}

interface DataBarChart {
  data: number[];
  color: string;
  label: string;
}

interface PanelFilter {
  title: string;
  kelurahans: Kelurahan[];
  selectedKelurahans?: number;
  startDate: Date | null;
  endDate: Date | null;
  setSelectedKelurahans: React.Dispatch<React.SetStateAction<number>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

interface TablePanelProps {
  title: string;
  date: string;
  data: Rekapitulasi[];
}

export const TablePanel = (props: TablePanelProps) => {
  const { title, date, data } = props;

  // Menghitung Total untuk setiap kolom
  const totalMenungguValidasi = data.reduce((acc, curr) => acc + curr.menunggu_validasi, 0);
  const totalSedangDitangani = data.reduce((acc, curr) => acc + curr.sedang_ditangani, 0);
  const totalKasusSelesai = data.reduce((acc, curr) => acc + curr.total_selesai, 0);
  const grandTotal = data.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col overflow-hidden h-full">
      <span className="text-primary font-bold text-xl">{title}</span>
      <span className="text-black text-sm">
        {formatDate(date.toString(), false)}
      </span>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Nama Satgas</th>
              <th className="py-2 px-4 border-b text-left">Menunggu Validasi</th>
              <th className="py-2 px-4 border-b text-left">Sedang Ditangani</th>
              <th className="py-2 px-4 border-b text-left">Total Kasus Selesai</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping data untuk setiap Satgas */}
            {data.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } text-left`}
              >
                <td className="py-2 px-4 border-b">{item.nama}</td>
                <td className="py-2 px-4 border-b">{item.menunggu_validasi}</td>
                <td className="py-2 px-4 border-b">{item.sedang_ditangani}</td>
                <td className="py-2 px-4 border-b">{item.total_selesai}</td>
                <td className="py-2 px-4 border-b font-bold">{item.total}</td>
              </tr>
            ))}
            {/* Baris Total */}
            <tr className="font-bold bg-gray-100 text-left">
              <td className="py-2 px-4 border-b">Total</td>
              <td className="py-2 px-4 border-b">{totalMenungguValidasi}</td>
              <td className="py-2 px-4 border-b">{totalSedangDitangani}</td>
              <td className="py-2 px-4 border-b">{totalKasusSelesai}</td>
              <td className="py-2 px-4 border-b">{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Panel = (props: PanelProps) => {
  const { title, date, count } = props;
  return (
    <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col">
      <span className="text-primary font-bold text-xl">{title}</span>
      <span className="text-black text-sm">{formatDate(date, false)}</span>
      <span className="text-3xl text-black font-bold mt-4 md:h-[100px] flex items-center">
        {count ? count : "0"} Kasus
      </span>
    </div>
  );
};

export const FilterPanel = (props: PanelFilter) => {
  const {
    title,
    setSelectedKelurahans,
    kelurahans,
    selectedKelurahans,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = props;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const form = useForm<FormFilter>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [error, setError] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<FormFilter> = async (data: FormFilter) => {
    try {
      if (
        data.startDate >= data.endDate ||
        data.startDate == null ||
        data.endDate == null
      ) {
        if (data.startDate == null && data.endDate == null) {
          setIsLoading(true);
          showLoader();
          setSelectedKelurahans(data.kelurahan_id);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setError(false);
        } else {
          setError(true);
        }
        // addAlert({
        //   type: ALERT_TYPE.ERROR,
        //   title: "Date Salah!",
        //   message: "Start Date Harus Lebih Kecil Dari End Date!",
        // })
      } else {
        setIsLoading(true);
        showLoader();
        setSelectedKelurahans(data.kelurahan_id);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setError(false);
      }
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Detail Kasus Klien Sukses Diedit !",
      //   message: `Detail Kasus Klien untuk laporan ${laporan.nama_klien} berhasil diedit!`,
      // });
      hideLoader();
    } catch {
      errorFetchAlert();
    } finally {
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
    // setTimeout(() => setError(false), 5000);
  };

  const resetFilter = () => {
    setSelectedKelurahans(1);
    setStartDate(null);
    setEndDate(null);
    setError(false);
    reset();
  };

  // const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   setSelectedKelurahans(value);
  // };

  return (
    <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col gap-4 h-full min-h-[420px]">
      <span className="text-primary font-bold text-xl">{title}</span>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 h-full">
          <Select
            name="kelurahan_id"
            control={control}
            placeholder="Pilih Kelurahan"
            label="Kelurahan"
            errors={errors}
            errorLabel="Kelurahan"
            options={kelurahans.map((k) => ({
              label: k.name,
              value: k.id,
            }))}
            defaultValue={selectedKelurahans}
            isRequired
          />
          <Datepicker
            name="startDate"
            control={control}
            defaultValue={startDate}
            placeholder="Masukkan Start Date"
            label="Start Date"
          />
          <Datepicker
            name="endDate"
            control={control}
            defaultValue={endDate}
            placeholder="Masukkan End Date"
            label="End Date"
          />
          <span className="text-red-500 mt-[-15px]">
            {error == true ? "End Date Tidak Valid!" : ""}
          </span>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 h-full flex items-center">
            <SecondaryButton className="py-1" onClick={() => resetFilter()}>
              Reset
            </SecondaryButton>
            <PrimaryButton
              className="py-1"
              isLoading={isLoading}
              isDisabled={isLoading}
              isSubmit
            >
              Filter
            </PrimaryButton>
          </div>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export const BarChartPanel = (props: PanelBar) => {
  const { title, date, selectedKelurahans, startDate, endDate } = props;
  const [serieses, setSerieses] = React.useState<DataBarChart[]>([]);
  const [xlabel, setXlabel] = React.useState<string[]>([]);
  const [laporansByKategori, setLaporanByKategori] = React.useState<
    LaporanByKategori[]
  >([]);
  const [refetch, setRefetch] = React.useState<boolean>(true);

  // React.useEffect(() => {
  //   console.log("selected", selectedKelurahans);
  // }, [selectedKelurahans]);

  React.useEffect(() => {
    const tempSerieses: DataBarChart[] = [];
    const color = ["#c81e4f", "#fcdc58"];
    for (let i = 0; i < laporansByKategori.length; i++) {
      for (let j = 0; j < laporansByKategori[i].count_total.length; j++) {
        if (laporansByKategori[i].count_total.length > xlabel.length) {
          setXlabel((prevXlabel) => [
            ...prevXlabel,
            "RW-" + laporansByKategori[i].count_total[j].rw.toString(),
          ]);
        }

        {
          tempSerieses[i]
            ? tempSerieses[i].data.push(
              laporansByKategori[i].count_total[j].count
            )
            : tempSerieses.push({
              data: [laporansByKategori[i].count_total[j].count],
              color: color[i % 2],
              label: laporansByKategori[i].kategori_nama.toString(),
            });
        }
      }
    }
    setSerieses(tempSerieses);
  }, [laporansByKategori]);

  return (
    <LaporanByKategoriLoader
      data={laporansByKategori}
      setData={setLaporanByKategori}
      id={selectedKelurahans.toString()}
      refetch={refetch}
      setRefetch={setRefetch}
      startDate={startDate}
      endDate={endDate}
    >
      <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col overflow-hidden h-full min-h-[480px]">
        <span className="text-primary font-bold text-xl">{title}</span>
        <span className="text-red-500 text-md mb-1">*Hanya terfilter dengan tanggal</span>
        <span className="text-black text-sm">
          {formatDate(date.toString(), false)}
        </span>
        <div className="overflow-auto mt-4 h-full flex items-center">
          <div className="w-full min-w-[500px]">
            <BarChart
              xAxis={[{ scaleType: "band", data: xlabel }]}
              series={serieses}
              height={300}
            />
          </div>
        </div>
      </div>
    </LaporanByKategoriLoader>
  );
};
