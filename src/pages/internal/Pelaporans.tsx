import { useState } from "react"
import { Laporan } from "../../consts/laporan"
import AdminLayout from "../layouts/AdminLayout"
import TableLaporan from "../../components/internal/Table"
import Pill from "../../components/internal/Pill"
import { LaporanLoader } from "../../helpers/fetchHelpers"
import { filterLaporanByStatus } from "../../helpers/filterLaporan"
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { SearchInput } from "../../components/form/Input"
import { useStep } from "usehooks-ts"



const Pelaporans = () => {
    const [laporans, setLaporans] = useState<Laporan[]>([])
    const [status, setStatus] = useState<number>(0)
    const [maxPage, setMaxPage] = useState<number>(0)
    const [keyword, setKeyword] = useState<string>("")
    const [page, helpers] = useStep(10)


    return <AdminLayout>
        <LaporanLoader data={laporans} setData={setLaporans} setMaxPage={setMaxPage}>
            <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md">
                <div className="flex w-full justify-between items-center mb-6">
                    <h1 className="font-bold text-xl">Data Pengaduan</h1>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <h2 className="font-bold mr-10">Keterangan Status</h2>
                    <Pill status={1} onClick={() => setStatus(1)} />
                    <Pill status={2} onClick={() => setStatus(2)} />
                    <Pill status={3} onClick={() => setStatus(3)} />
                    <Pill status={4} onClick={() => setStatus(4)} />
                    <Pill status={6} onClick={() => setStatus(6)} />
                </div>
                <div className="flex justify-end mt-8 mb-4">
                    <SearchInput value={keyword} setValue={setKeyword} />
                </div>
                <TableLaporan
                    listLaporan={filterLaporanByStatus(laporans, status)}
                />
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">Showing 10 from {laporans.length}</span>
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
                            [...Array(5)].map((_v, index) => (
                                <button
                                    key={index + page}
                                    className={`h-10 w-10 flex items-center text-sm justify-center bg-slate-200 ${index == 1 && 'bg-slate-400 text-white font-bold'} rounded-full`}
                                >
                                    {index + page}
                                </button>
                            ))
                        }
                        <button
                            onClick={helpers.goToNextStep}
                            className="bg-primary hover:bg-primaryDarker transition duration-300 text-white p-2.5 rounded-full">
                            <FaChevronRight />
                        </button>
                        <button
                            onClick={() => helpers.setStep(maxPage)}
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