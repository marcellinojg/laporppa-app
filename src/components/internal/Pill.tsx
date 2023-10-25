import { MouseEventHandler } from "react"

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
        case 1:
            textClassName = 'text-kategoriVerifikasiDarker'
            wrapperClassName = 'bg-kategoriVerifikasi'
            label = 'Menunggu Verifikasi'
            break
        case 2:
            textClassName = 'text-kategoriDitanganiDarker'
            wrapperClassName = 'bg-kategoriDitangani'
            label = 'Sedang Ditangani'
            break
        case 3:
            textClassName = 'text-kategoriDitolakDarker'
            wrapperClassName = 'bg-kategoriDitolak'
            label = 'Kasus Ditolak'
            break
        case 4:
            textClassName = 'text-kategoriSelesaiDarker'
            wrapperClassName = 'bg-kategoriSelesai'
            label = 'Kasus Selesai'
            break
        case 5:
            break
        case 6:
            textClassName = 'text-kategoriRujukDarker'
            wrapperClassName = 'bg-kategoriRujuk'
            label = 'Kasus Dirujuk'
    }

    return <button type="button" onClick={onClick} className={`min-w-[120px] p-2 px-3 text-center text-xs rounded-full ${wrapperClassName}`}>
        <span className={`font-bold ${textClassName}`}>
            {label}
        </span>
    </button>
}

export default Pill