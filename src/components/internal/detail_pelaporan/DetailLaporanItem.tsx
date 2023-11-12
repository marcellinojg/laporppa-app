
interface DetailLaporanItemProps {
    label: string
    value?: string
}

const DetailLaporanItem = (props : DetailLaporanItemProps) => {
    const {label,value} = props
    return <div className="grid lg:grid-cols-3 grid-cols-1 gap-1">
        <span className="text-slate-400 text-sm">{label}</span>
        <span className="lg:col-span-2 col-span-3 font-bold text-sm break-words">{value ? value : '-'}</span>
    </div>
}

export default DetailLaporanItem