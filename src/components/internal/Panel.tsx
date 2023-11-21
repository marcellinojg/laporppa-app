import { formatDate } from "../../helpers/formatDate"
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Laporan } from "../../consts/laporan";

interface PanelProps {
    title: string
    date: string
    count?: number
}

interface PanelBar {
    title: string
  date: string
  laporans: Laporan[]
}


export const Panel = (props: PanelProps) => {
    const { title, date, count } = props
    return <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col">
        <span className="text-primary font-bold text-xl">{title}</span>
        <span className="text-black text-sm">{formatDate(date, false)}</span>
        <span className="text-3xl text-black font-bold mt-4 md:h-[100px] flex items-center">{count ? count : '0'} Kasus</span>
    </div>
}

export const BarChartPanel = (props: PanelBar) => {
  const { title, date, laporans } = props;
  const [jumlah, setJumlah] = React.useState([0, 0]);

  React.useEffect(() => {
    // Your logic for updating jumlah based on laporans
    let newJumlah = [0, 0];

    for (let i = 0; i <= laporans.length; i++) {
      if (laporans[i]?.kategori?.id === 1) {
        newJumlah = [newJumlah[0] + 1, newJumlah[1]];
      } else if (laporans[i]?.kategori?.id === 2) {
        newJumlah = [newJumlah[0], newJumlah[1] + 1];
      }
    }

    // Update state only once after the loop
    setJumlah(newJumlah);
  }, [laporans]); // Ensure this effect runs when laporans changes

  return (
    <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col">
      <span className="text-primary font-bold text-xl">{title}</span>
      <span className="text-black text-sm">
        {formatDate(date.toString(), false)}
      </span>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["Permasalahan Sosial", "Kekerasan"] }]}
        series={[{ data: jumlah, color: "#c81e4f" }]}
        height={300}
        sx={{ width: "100%", color: "primary" }}
        // or using css prop
        // css={{ width: '100%' }}
      />
    </div>
  );
}
