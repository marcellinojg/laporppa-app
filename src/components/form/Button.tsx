import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerOval } from "../common/Loader";
import { FaEdit, FaInfoCircle, FaTrash, FaUser } from "react-icons/fa";
import { DYNAMIC_ROUTES } from "../../consts/routes";
import { Laporan } from "../../consts/laporan";
import { AssignModal, ConfirmationModal } from "../common/Modal";
import useLoader from "../../hooks/useLoader";
import { useAlert } from "../../hooks/useAlert";
import { patchLaporan } from "../../api/laporan";
import { STATUS_LAPORAN } from "../../consts/status";
import { ALERT_TYPE } from "../../consts/alert";

interface ButtonProps {
    isSubmit?: boolean,
    children?: ReactNode,
    isLoading?: boolean | null,
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    isDisabled?: boolean
    spinnerColor?: string
}

interface ActionButtonLaporanProps {
    laporan: Laporan
    setRefetch?: Dispatch<SetStateAction<boolean>>
}


export const PrimaryButton = (props: ButtonProps): ReactNode => {
    const { isSubmit, children, isLoading, onClick, className, isDisabled = false } = props
    return <button
        disabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
        className={`bg-primary hover:bg-primaryDarker text-white  w-full rounded-full text-md transition duration-300 font-bold disabled:opacity-50 ${className}`}
        onClick={onClick}
    >
        {isLoading ? <SpinnerOval primaryColor="#FFFFFF" secondaryColor="#606060" height={24} /> : children}
    </button>
}

export const SecondaryButton = (props: ButtonProps) => {
    const { isSubmit, children, isLoading, onClick, className, isDisabled } = props
    return <button
        disabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
        className={`bg-transparent border-2 
        text-black border-primary hover:bg-primary  w-full rounded-full transition duration-300 font-bold disabled:opacity-75 ${className}`}
        onClick={onClick}
    >
        {isLoading ? <SpinnerOval primaryColor="#FFFFFF" secondaryColor="#606060" height={24} /> : children}
    </button>
}


interface LinkProps {
    children: ReactNode,
    to: string,
    className: string,
}

export const PrimaryLink = (props: LinkProps) => {
    const { children, to, className } = props
    return <Link
        to={to}
        className={`text-center text-lg text-white bg-primary py-4 w-full rounded-full text-md  transition duration-300 font-bold ${className}`}
    >
        {children}
    </Link>
}


export const SecondaryLink = (props: LinkProps) => {
    const { children, to } = props
    return <Link
        to={to}
        className="text-center text-lg bg-transparent hover:text-white border-2 text-black border-primary py-4 w-full rounded-full transition duration-300 font-bold"
    >
        {children}
    </Link>
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
        try {
            showLoader()
            await patchLaporan({
                status: {
                    id: STATUS_LAPORAN.SEDANG_DITANGANI
                },
                satgas_pelapor: {
                    id: selectedSatgasId
                }
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Ditolak',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil ditolak !`
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
            type="button"
            onClick={() => setIsModalActive(true)}
            className="text-white bg-green-500 hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full lg:w-auto w-full">
            <FaUser />
            Terima
        </button>
        {isModalActive &&
            <AssignModal
                title="Terima Pelaporan"
                description={laporan.nama_pelapor}
                onSuccess={handleAssign}
                onClose={() => setIsModalActive(false)}
                successButtonText="Terima"
                setSelectedSatgasId={setSelectedSatgasId}
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
            await patchLaporan({
                status: {
                    id: STATUS_LAPORAN.KASUS_DITOLAK
                },
                satgas_pelapor: {
                    id: null
                }
            }, laporan.id)

            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Ditolak',
                message: `Laporan dari ${laporan.nama_pelapor} berhasil ditolak !`
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