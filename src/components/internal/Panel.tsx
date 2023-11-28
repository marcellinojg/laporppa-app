import { formatDate } from "../../helpers/formatDate";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LaporanByKategori } from "../../consts/laporanByKategori";
import { Kelurahan } from "../../consts/kelurahan";
import { LaporanByKategoriLoader } from "../../helpers/fetchHelpers";

interface PanelProps {
  title: string;
  date: string;
  count?: number;
}

interface PanelBar {
  title: string;
  date: string;
  kelurahans: Kelurahan[];
}

interface DataBarChart {
  data: number[];
  color: string;
  label: string;
}

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

export const BarChartPanel = (props: PanelBar) => {
  const { title, date, kelurahans} = props;
  const [serieses, setSerieses] = React.useState<DataBarChart[]>([]);
  const [xlabel, setXlabel] = React.useState<string[]>([]);
  const [selectedKelurahans, setSelectedKelurahans] = React.useState<number>(1);
  const [laporansByKategori, setLaporanByKategori] = React.useState<LaporanByKategori[]>([])
  const [refetch, setRefetch] = React.useState<boolean>(true);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedKelurahans(value);
  };

  // React.useEffect(() => {
  //   console.log("selected", selectedKelurahans);
  // }, [selectedKelurahans]);

  React.useEffect(() => {
    // const tempSerieses: DataBarChart[] = [];
    // // console.log(laporansByKategori);
    // let typeColor = true;
    // let color = "yellow";
    // for (let i = 0; i < laporansByKategori.length; i++) {
    //   if (laporansByKategori.length > xlabel.length) {
    //     setXlabel((prevXlabel) => [...prevXlabel, laporansByKategori[i].kategori_nama]);
    //   }

    //   for (let j = 0; j < laporansByKategori[i].count_total.length; j++) {
    //     if (typeColor == true) {
    //       color = "#c81e4f";
    //       typeColor = false;
    //     } else {
    //       color = "#fcdc58";
    //       typeColor = true;
    //     }
    //     // tempSerieses[j].push(laporansByKategori[i].count_total[j].count)
    //     {
    //       tempSerieses[j]
    //         ? tempSerieses[j].data.push(laporansByKategori[i].count_total[j].count)
    //         : tempSerieses.push({
    //             data: [laporansByKategori[i].count_total[j].count],
    //             color: color,
    //             label: "RW " + laporansByKategori[i].count_total[j].rw?.toString(),
    //           });
    //     }
    //   }
    // }
    // setSerieses(tempSerieses);
    // console.log(tempSerieses)

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

            // if (typeColor == true) {
            //   color = "#c81e4f";
            // } else {
            //   color = "#fcdc58";
            // }
            // tempSerieses[j].push(laporansByKategori[i].count_total[j].count)
            {
              tempSerieses[i]
                ? tempSerieses[i].data.push(
                  laporansByKategori[i].count_total[j].count
                )
                : tempSerieses.push({
                  data: [laporansByKategori[i].count_total[j].count],
                  color: color[i%2],
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
    >
      <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col overflow-hidden">
        <span className="text-primary font-bold text-xl">{title}</span>
        <span className="text-black text-sm">
          {formatDate(date.toString(), false)}
        </span>
        <div className="flex items-center justify-center md:justify-end my-6">
          <select
            onChange={selectChange}
            className="w-full px-5 py-1 rounded-full border-2 bg-primary text-white text-sm border-primary font-bold focus:border-primary hover:border-primary font-bold duration-300 md:w-auto"
            style={{ maxWidth: "160px" }}
          >
            {kelurahans.map((val) => (
              <option value={val.id} key={val.id}>
                {val.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-auto">
          <div style={{ minWidth: "500px" }}>
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
