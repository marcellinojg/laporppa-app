
interface DetailLaporanItemProps {
    label: string
    value?: string
}

const DetailLaporanItem = (props : DetailLaporanItemProps) => {
    const {label,value} = props
    return <div className="grid grid-cols-3">
        <span className="text-slate-400 text-sm">{label}</span>
        <span className="col-span-2 font-bold break-words">{value ? value : '-'}</span>
    </div>
}

export default DetailLaporanItem