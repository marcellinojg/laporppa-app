import formatDate from "../../helpers/formatDate"

interface PanelProps {
    title: string
    date: string
    count: number
}


const Panel = (props: PanelProps) => {
    const { title, date, count } = props
    return <div className="bg-white border-b-4 border-primary p-6 floating-shadow-md rounded flex flex-col">
        <span className="text-primary font-bold text-xl">{title}</span>
        <span className="text-black text-sm">{formatDate(date, false)}</span>
        <span className="text-3xl text-black font-bold mt-4 md:h-[100px] flex items-center">{count ? count : '-'} Kasus</span>
    </div>
}

export default Panel