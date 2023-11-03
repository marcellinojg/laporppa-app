import { MouseEventHandler } from "react"
import { STATUS_LAPORAN } from "../../consts/status"

interface PillProps {
    status: number
    onClick?: MouseEventHandler
}

const Pill = (props: PillProps) => {
    const { status, onClick } = props
    let textClassName;
    let label;
    let wrapperClassName;
    switch (status) {
        case STATUS_LAPORAN.MENUNGGU_VALIDASI:
            textClassName = 'text-kategoriVerifikasiDarker'
            wrapperClassName = 'bg-kategoriVerifikasi'
            label = 'Menunggu Verifikasi'
            break
        case STATUS_LAPORAN.SEDANG_DITANGANI:
            textClassName = 'text-kategoriDitanganiDarker'
            wrapperClassName = 'bg-kategoriDitangani'
            label = 'Sedang Ditangani'
            break
        case STATUS_LAPORAN.KASUS_DIKEMBALIKAN:
            textClassName = 'text-kategoriDikembalikanDarker'
            wrapperClassName = 'bg-kategoriDikembalikan'
            label = 'Kasus Dikembalikan'
            break
        case STATUS_LAPORAN.KASUS_SELESAI:
            textClassName = 'text-kategoriSelesaiDarker'
            wrapperClassName = 'bg-kategoriSelesai'
            label = 'Kasus Selesai'
            break
        case STATUS_LAPORAN.KASUS_DIKEMBALIKAN:
            break
        case STATUS_LAPORAN.KASUS_DITERUSKAN:
            textClassName = 'text-kategoriRujukDarker'
            wrapperClassName = 'bg-kategoriRujuk'
            label = 'Kasus Dirujuk'
            break
    }

    return <button type="button" onClick={onClick} className={`min-w-[120px] p-2 px-3 text-center text-xs rounded-full ${wrapperClassName}`}>
        <span className={`font-bold ${textClassName}`}>
            {label}
        </span>
    </button>
}

export default Pill