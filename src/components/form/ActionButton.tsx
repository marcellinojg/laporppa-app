import { Dispatch, SetStateAction, useState } from "react"
import { FaEdit, FaInfoCircle, FaUser, FaTrash, FaPaperPlane, FaCheck, FaPrint } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { patchLaporan, deleteLaporan, getLaporanCetak } from "../../api/laporan"
import { ALERT_TYPE } from "../../consts/alert"
import { ROLE } from "../../consts/role"
import { DYNAMIC_ROUTES } from "../../consts/routes"
import { SatgasPelapor } from "../../consts/satgas"
import { STATUS_LAPORAN } from "../../consts/status"
import { SatgasPelaporLoader } from "../../helpers/fetchHelpers"
import { useAlert } from "../../hooks/useAlert"
import useLoader from "../../hooks/useLoader"
import { AssignModal, ConfirmationModal } from "../common/Modal"
import { Laporan } from "../../consts/laporan"
import generate from "../../helpers/generatePDF"


interface ActionButtonLaporanProps {
    laporan: Laporan
    setRefetch?: Dispatch<SetStateAction<boolean>>
}


export const EditButton = (props: ActionButtonLaporanProps) => {
    const { laporan } = props
    const navigate = useNavigate()

    return <button
        type="button"
        onClick={() => navigate(DYNAMIC_ROUTES.INTERNAL.EDIT_LAPORAN(laporan.id))}
        className="text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
        <FaEdit />
        Edit
    </button>
}


export const DetailButton = (props: ActionButtonLaporanProps) => {
    const { laporan } = props
    const navigate = useNavigate()
    return <button
        onClick={() => navigate(DYNAMIC_ROUTES.INTERNAL.DETAIL_PELAPORAN(laporan.id))}
        className="text-white bg-blue-400 hover:bg-blue-500 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
        <FaInfoCircle />
        Detail
    </button>
}

export const AssignButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const [selectedSatgasId, setSelectedSatgasId] = useState<string>('')
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

    const handleAssign = async () => {
        if (!selectedSatgasId) {
            addAlert({
                type: ALERT_TYPE.WARNING,
                title: 'Data Tidak Lengkap',
                message: 'Mohon pilih satgas untuk menangani kasus ini'
            })
            return
        }

        try {
            showLoader()
            await patchLaporan({
                satgas_pelapor: {
                    id: selectedSatgasId
                },
                status: laporan.status.id === STATUS_LAPORAN.KASUS_DIKEMBALIKAN ? {
                    id: STATUS_LAPORAN.SEDANG_DITANGANI
                } : null
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Ditugaskan',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil ditugaskan kepada satgas !`
            })
            setRefetch!(true)
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Ditugaskan',
                message: `Laporan dari ${laporan.nama_pelapor} gagal ditugaskan kepada satgas !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }

    return <>
        <button
            type="button"
            onClick={() => setIsModalActive(true)}
            className="text-white bg-green-500 hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaUser />
            Tugaskan
        </button>
        {isModalActive &&
            <AssignModal
                title="Tugaskan Pelaporan"
                description={laporan.nama_pelapor}
                onSuccess={handleAssign}
                onClose={() => setIsModalActive(false)}
                successButtonText="Tugaskan"
                setSelectedSatgasId={setSelectedSatgasId}
                laporan={laporan}
            />
        }
    </>
}

export const TerimaButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

    const handleTerima = async () => {
        try {
            showLoader()
            await patchLaporan({
                status: {
                    id: STATUS_LAPORAN.SEDANG_DITANGANI
                },
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Berhasil Diterima',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil diterima !`
            })
            setRefetch!(true)
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Diterima',
                message: `Laporan dari ${laporan.nama_pelapor} gagal diterima !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }

    return <>
        <button
            type="button"
            onClick={() => setIsModalActive(true)}
            className="text-white bg-green-500 hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaUser />
            Terima
        </button>
        {isModalActive &&
            <ConfirmationModal
                title="Terima Pelaporan"
                description={`Apakan anda yakin akan menerima dan menangani laporan ${laporan.nama_pelapor}`}
                onSuccess={handleTerima}
                onClose={() => setIsModalActive(false)}
                successButtonText="Terima"
            />
        }
    </>
}


export const TolakButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

    const handleTolak = async () => {
        try {
            showLoader()
            await deleteLaporan(laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Ditolak',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil ditolak dan dihapus !`
            })
            setRefetch!(true)
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Ditolak',
                message: `Laporan dari ${laporan.nama_pelapor} gagal ditolak !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }
    return <>
        <button
            onClick={() => setIsModalActive(true)}
            className="text-white bg-red-500 hover:bg-red-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaTrash />
            Tolak
        </button>
        {isModalActive &&
            <ConfirmationModal
                title="Tolak Pelaporan"
                description={`Apakah anda yakin akan menolak laporan dari ${laporan.nama_pelapor}`}
                onSuccess={handleTolak}
                onClose={() => setIsModalActive(false)}
                successButtonText="Tolak"
            />
        }

    </>
}

export const RujukButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

    const handleRujuk = async () => {
        try {
            showLoader()
            await patchLaporan({
                status: {
                    id: STATUS_LAPORAN.KASUS_DITERUSKAN
                },
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Berhasil Dirujuk',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil diteruskan ke DP3A !`
            })
            setRefetch!(true)
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Dirujuk',
                message: `Laporan dari ${laporan.nama_pelapor} gagal diteruskan ke DP3A !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }

    return <>
        <button
            type="button"
            onClick={() => setIsModalActive(true)}
            className="text-white bg-red-400 hover:bg-red-500 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaPaperPlane />
            Rujuk
        </button>
        {isModalActive &&
            <ConfirmationModal
                title="Rujuk Pelaporan"
                description={`Apakan anda yakin akan meneruskan laporan ${laporan.nama_pelapor} ke DP3A ?`}
                onSuccess={handleRujuk}
                onClose={() => setIsModalActive(false)}
                successButtonText="Rujuk"
            />
        }
    </>
}


export const KembalikanButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const [satgasPelapor, setSatgasPelapor] = useState<SatgasPelapor[]>([])

    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

    const handleKembalikan = async () => {
        try {
            showLoader()
            await patchLaporan({
                status: {
                    id: STATUS_LAPORAN.KASUS_DIKEMBALIKAN
                },
                satgas_pelapor: {
                    id: satgasPelapor.find((satgas) => satgas.role.nama === ROLE.KELURAHAN && satgas.kelurahan.id === laporan.kelurahan.id)!.id
                },
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Berhasil Dikembalikan',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil dikembalikan ke Kelurahan !`
            })
            setRefetch!(true)
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Dikembalikan',
                message: `Laporan dari ${laporan.nama_pelapor} gagal dikembalikan ke Kelurahan !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }

    return <>
        <SatgasPelaporLoader data={satgasPelapor} setData={setSatgasPelapor}>
            <button
                type="button"
                onClick={() => setIsModalActive(true)}
                className="text-white bg-orange-500 hover:bg-orange-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
                <FaPaperPlane />
                Kembalikan
            </button>
            {isModalActive &&
                <ConfirmationModal
                    title="Kembalikan Pelaporan"
                    description={`Apakan anda yakin akan mengembalikan laporan ${laporan.nama_pelapor} ke Kelurahan ?`}
                    onSuccess={handleKembalikan}
                    onClose={() => setIsModalActive(false)}
                    successButtonText="Kembalikan"
                />
            }
        </SatgasPelaporLoader>

    </>
}


export const SelesaikanButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

    const handleSelesaikan = async () => {
        try {
            showLoader()
            await patchLaporan({
                status: {
                    id: STATUS_LAPORAN.KASUS_SELESAI
                },
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Berhasil Diselesaikan',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil diselesaikan !`
            })
            setRefetch!(true)
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Diselesaikan',
                message: `Laporan dari ${laporan.nama_pelapor} gagal diselesaikan !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }

    return <>
        <button
            type="button"
            onClick={() => setIsModalActive(true)}
            className="text-white bg-lime-500 hover:bg-lime-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaCheck />
            Selesaikan
        </button>
        {isModalActive &&
            <ConfirmationModal
                title="Selesaikan Pelaporan"
                description={`Apakan anda yakin akan menyelesaikan laporan ${laporan.nama_pelapor} ?`}
                onSuccess={handleSelesaikan}
                onClose={() => setIsModalActive(false)}
                successButtonText="Selesaikan"
            />
        }
    </>
}

export const PrintButton = (props: ActionButtonLaporanProps) => {
    const { laporan, setRefetch } = props
    const [isModalActive, setIsModalActive] = useState<boolean>()
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()

   

    const handlePrint = async () => {
        try {
            showLoader()
            const data = await getLaporanCetak(laporan.id)

            await generate(data)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Berhasil Dicetak',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil Dicetak !`
            })
            setRefetch!(true)
        }
        catch (e){
            console.log(e)
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Laporan Gagal Dicetak',
                message: `Laporan dari ${laporan.nama_pelapor} gagal Dicetak !`
            })
        }
        finally {
            setIsModalActive(false)
            hideLoader()
        }
    }

    return <>
        <button
            type="button"
            onClick={() => setIsModalActive(true)}
            className="text-white bg-blue-400 hover:bg-blue-500 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaPrint />
            Cetak
        </button>
        {isModalActive &&
            <ConfirmationModal
                title="Cetak Pelaporan"
                description={`Apakan anda yakin akan mencetak laporan ${laporan.nama_pelapor} ?`}
                onSuccess={handlePrint}
                onClose={() => setIsModalActive(false)}
                successButtonText="Cetak"
            />
        }
    </>
}