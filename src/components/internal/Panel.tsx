import { formatDate } from "../../helpers/formatDate";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LaporanByKategoriRT } from "../../consts/laporanByKategoriRT";

interface PanelProps {
  title: string;
  date: string;
  count?: number;
}

interface PanelBar {
  title: string;
  date: string;
  laporans: LaporanByKategoriRT[];
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
  const { title, date, laporans } = props;
  const [serieses, setSerieses] = React.useState<DataBarChart[]>([]);
  const [xlabel, setXlabel] = React.useState<string[]>([]);

  React.useEffect(() => {
    // const contoh_data = [
    //   {
    //     kategori_id: "1",
    //     kategori_nama: "Permasalahan Sosial",
    //     count_total: [
    //       {
    //         rt: "1",
    //         count: 7,
    //       },
    //       {
    //         rt: "3",
    //         count: 2,
    //       },
    //     ],
    //   },
    //   {
    //     kategori_id: "2",
    //     kategori_nama: "Kekerasan",
    //     count_total: [
    //       {
    //         rt: "1",
    //         count: 10,
    //       },
    //       {
    //         rt: "3",
    //         count: 5,
    //       },
    //     ],
    //   },
    // ];

    // const tempSerieses: DataBarChart[] = [];
    // console.log(contoh_data);
    // let typeColor = true;
    // let color = "";
    // for (let i = 0; i < contoh_data.length; i++) {
    //   if (contoh_data.length > xlabel.length) {
    //     setXlabel((prevXlabel) => [
    //       ...prevXlabel,
    //       contoh_data[i].kategori_nama,
    //     ]);
    //   }

    //   for (let j = 0; j < contoh_data[i].count_total.length; j++) {
    //     // tempSerieses[j].push(contoh_data[i].count_total[j].count)
    //     if (typeColor == true) {
    //       color = "#c81e4f";
    //       typeColor = false;
    //     } else {
    //       color = "#fcdc58";
    //       typeColor = true;
    //     }

    //     {
    //       tempSerieses[j]
    //         ? tempSerieses[j].data.push(contoh_data[i].count_total[j].count)
    //         : tempSerieses.push({
    //             data: [contoh_data[i].count_total[j].count],
    //             color: color,
    //             label: "RT " + contoh_data[i].count_total[j].rt.toString(),
    //           });
    //     }
    //   }
    // }

    // setSerieses(tempSerieses);
    // console.log(tempSerieses);
    // console.log("label", xlabel);

    const tempSerieses: DataBarChart[] = [];
    console.log(laporans);
    let typeColor = true;
    let color = "yellow";
    for (let i = 0; i < laporans.length; i++) {
      if (laporans.length > xlabel.length) {
        setXlabel((prevXlabel) => [...prevXlabel, laporans[i].kategori_nama]);
      }

      for (let j = 0; j < laporans[i].count_total.length; j++) {
        if (typeColor == true) {
          color = "#c81e4f";
          typeColor = false;
        } else {
          color = "#fcdc58";
          typeColor = true;
        }
        // tempSerieses[j].push(laporans[i].count_total[j].count)
        {
          tempSerieses[j]
            ? tempSerieses[j].data.push(laporans[i].count_total[j].count)
            : tempSerieses.push({
                data: [laporans[i].count_total[j].count],
                color: color,
                label: "RT " + laporans[i].count_total[j].rt.toString(),
              });
        }
      }
    }

    setSerieses(tempSerieses);
    console.log(tempSerieses);
    console.log("label", xlabel);
    // let newDataBarChart = []
    // laporans.forEach(laporan => {
    //   newDataBarChart
    // });
    // // Your logic for updating jumlah based on laporans
    // let newJumlah = [0, 0];

    // for (let i = 0; i < laporans.length; i++) {
    //   if (laporans[i]?.kategori?.id === 1) {
    //     newJumlah = [newJumlah[0] + 1, newJumlah[1]];
    //   } else if (laporans[i]?.kategori?.id === 2) {
    //     newJumlah = [newJumlah[0], newJumlah[1] + 1];
    //   }
    //   console.log(i, laporans[i]?.kategori?.nama, laporans[i]?.kategori?.id);
    // }

    // // Update state only once after the loop
    // setJumlah(newJumlah);
  }, [laporans]); // Ensure this effect runs when laporans changes

  return (
    <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col">
      <span className="text-primary font-bold text-xl">{title}</span>
      <span className="text-black text-sm">
        {formatDate(date.toString(), false)}
      </span>
      <BarChart
        xAxis={[{ scaleType: "band", data: xlabel }]}
        // series={[{ data: [2, 2, 2] }, { data: [4, 2, 2] }]}
        series={serieses}
        height={300}
        sx={{ width: "100%" }}
      />
    </div>
  );
};
