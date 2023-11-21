import { formatDate } from "../../helpers/formatDate"
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface PanelProps {
    title: string
    date: string
    count?: number
}

interface PanelBar {
    title: string
    date: string
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
    const { title, date } = props;
    return (
      <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col">
        <span className="text-primary font-bold text-xl">{title}</span>
        <span className="text-black text-sm">{formatDate(date.toString(), false)}</span>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[{ data: [10, 5, 24], color: "#c81e4f" }]}
          height={300}
          sx={{ width: "100%", color: "primary" }}
          // or using css prop
          // css={{ width: '100%' }}
        />
      </div>
    );
    
}
