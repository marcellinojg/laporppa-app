import { useEffect, useState } from "react"
import { Laporan } from "../../consts/laporan"
import AdminLayout from "../layouts/AdminLayout"
import TableLaporan from "../../components/internal/Table"
import Pill from "../../components/internal/Pill"
import { LaporanLoader } from "../../helpers/fetchHelpers"
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { SearchInput } from "../../components/form/Input"
import { useDebounce, useStep } from "usehooks-ts"
import pageNumbersGenerator from "../../helpers/paginationHelpers"
import PaginationData from "../../consts/pagination"
import { STATUS_LAPORAN } from "../../consts/status"



const Pelaporans = () => {
    const [laporans, setLaporans] = useState<Laporan[]>([])
    const [status, setStatus] = useState<number>(0)
    const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
    const [keyword, setKeyword] = useState<string>("")
    const debounceKeyword = useDebounce(keyword, 1000)
    const [pageNumbers, setPageNumbers] = useState<number[]>([])
    const [page, helpers] = useStep(paginationData && paginationData.maxPage || 1)

    useEffect(() => {
        setPageNumbers(pageNumbersGenerator(paginationData && paginationData.maxPage || 1, page))
    }, [page, paginationData])


    return <AdminLayout>
        <LaporanLoader
            setPage={helpers.setStep}
            data={laporans}
            setData={setLaporans}
            setPaginationData={setPaginationData}
            keyword={debounceKeyword}
            page={page}
            status={status}
        >
            <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md">
                <div className="flex w-full justify-between items-center mb-6">
                    <h1 className="font-bold text-xl">Data Pengaduan</h1>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <h2 className="font-bold mr-10">Keterangan Status</h2>
                    <Pill status={STATUS_LAPORAN.MENUNGGU_VALIDASI} onClick={() => setStatus(STATUS_LAPORAN.MENUNGGU_VALIDASI)} />
                    <Pill status={STATUS_LAPORAN.SEDANG_DITANGANI} onClick={() => setStatus(STATUS_LAPORAN.SEDANG_DITANGANI)} />
                    <Pill status={STATUS_LAPORAN.KASUS_DITOLAK} onClick={() => setStatus(STATUS_LAPORAN.KASUS_DITOLAK)} />
                    <Pill status={STATUS_LAPORAN.KASUS_SELESAI} onClick={() => setStatus(STATUS_LAPORAN.KASUS_SELESAI)} />
                    <Pill status={STATUS_LAPORAN.KASUS_DITERUSKAN} onClick={() => setStatus(STATUS_LAPORAN.KASUS_DITERUSKAN)} />
                </div>
                <div className="flex justify-end mt-8 mb-4">
                    <SearchInput value={keyword} setValue={setKeyword} />
                </div>
                <TableLaporan
                    listLaporan={laporans}
                />
                <div className="flex justify-between items-center mt-4 overflow-auto">
                    <span className="text-sm mr-12">Showing {paginationData?.from} - {paginationData?.to} from {paginationData?.total}</span>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => helpers.setStep(1)}
                            className="bg-primary hover:bg-primaryDarker transition duration-300 text-white p-2.5 rounded-full">
                            <FaArrowLeft />
                        </button>
                        <button
                            onClick={helpers.goToPrevStep}
                            className="bg-primary hover:bg-primaryDarker transition duration-300 text-white p-2.5 rounded-full">
                            <FaChevronLeft />
                        </button>

                        {
                            pageNumbers.map((num, index) => (
                                <button
                                    onClick={() => helpers.setStep(num)}
                                    key={index}
                                    className={`h-10 w-10 flex items-center text-sm justify-center bg-slate-200 ${num == page && 'bg-slate-400 text-white font-bold'} rounded-full`}
                                >
                                    {num}
                                </button>
                            ))
                        }
                        <button
                            onClick={helpers.goToNextStep}
                            className="bg-primary hover:bg-primaryDarker transition duration-300 text-white p-2.5 rounded-full">
                            <FaChevronRight />
                        </button>
                        <button
                            onClick={() => helpers.setStep(paginationData && paginationData.maxPage || 1)}
                            className="bg-primary hover:bg-primaryDarker transition duration-300 text-white p-2.5 rounded-full">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </LaporanLoader>
    </AdminLayout >
}

export default Pelaporans