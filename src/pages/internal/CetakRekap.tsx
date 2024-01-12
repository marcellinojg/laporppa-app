import { useEffect, useState } from "react"
import { Laporan } from "../../consts/laporan"
import AdminLayout from "../layouts/AdminLayout"
import Pill from "../../components/internal/Pill"
import { AllLaporanLoader } from "../../helpers/fetchHelpers"
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { SearchInput } from "../../components/form/Input"
import { useDebounce, useStep } from "usehooks-ts"
import pageNumbersGenerator from "../../helpers/paginationHelpers"
import PaginationData from "../../consts/pagination"
import { STATUS_LAPORAN } from "../../consts/status"
import { PrimaryButton } from "../../components/form/Button"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../consts/routes"
import TableLaporan from '../../components/internal/TableLaporan';
PrimaryButton



const CetakRekap = () => {
    // // const [laporans, setLaporans] = useState<Laporan[]>([])
    // // const [status, setStatus] = useState<number>(0)
    // // const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
    // // const [keyword, setKeyword] = useState<string>("")
    // // const debounceKeyword = useDebounce(keyword, 1000)
    // // const [pageNumbers, setPageNumbers] = useState<number[]>([])
    // // const [page, helpers] = useStep(paginationData && paginationData.maxPage || 1)
    // // const [refetch, setRefetch] = useState<boolean>(true)
    // // const navigate = useNavigate()


    // useEffect(() => {
    //     setPageNumbers(pageNumbersGenerator(paginationData && paginationData.maxPage || 1, page))
    // }, [page, paginationData])
    return <AdminLayout>
        <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md">
            <div className="grid grid-cols-1 gap-5">
                <div>
                    <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary">
                        Rekap Laporan
                    </h1>
                </div>
            <div className="flex items-center gap-3 flex overflow-x-auto w-full overflow-auto">
                <button
                className="flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800"
                >
                    Tahunan
                </button>
                <button
                className="flex items-center justify-center grow gap-2 py-2.5 text-black border-2 px-4 rounded-md hover:border-dotted hover:border-red-800"
                >
                    Bulanan
                </button>
                {/* <PrimaryButton
                className="flex items-center justify-center grow gap-2 py-2.5"
                >
                    Tahunan
                </PrimaryButton>
                <PrimaryButton
                className="flex items-center justify-center grow gap-2 py-2.5"
                >
                    Bulanan
                </PrimaryButton> */}
              </div>
            </div>
        </div>
    </AdminLayout >
}

export default CetakRekap