import { FaEdit, FaInfoCircle } from "react-icons/fa"
import { Laporan } from "../../consts/laporan"
import Pill from "./Pill"
import { useNavigate } from "react-router-dom"
import { DYNAMIC_ROUTES } from "../../consts/routes"

interface TableLaporan {
    listLaporan: Laporan[]
}

const TableLaporan = (props: TableLaporan) => {
    const { listLaporan } = props
    const navigate = useNavigate()
    return <>
        {listLaporan.length == 0 ?
            <div className="w-full flex flex-col items-center justify-center py-12">
                <img src="/images/nodata.png" className="" width={400} alt="No Data illustration" />
                <b className="text-2xl text-center">Pelaporan tidak ditemukan</b>
            </div>
            :
            <div className="w-full overflow-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-y-2 border-slate-300">
                            <th className="py-4 px-2">No. Registrasi</th>
                            <th className="py-4 px-2">Klien - NIK</th>
                            <th className="py-4 px-2">Pelapor - NIK</th>
                            <th className="py-4 px-2">Sumber - Tanggal Pengaduan</th>
                            <th className="py-4 px-2">Status</th>
                            <th className="py-4 px-2">Aksi</th>
                        </tr>
                    </thead>
                    {listLaporan.map((laporan) =>
                        <tbody key={laporan.id}>
                            <tr className="border-b-2 border-slate-300 text-center text-sm">
                                <td className="py-4 px-2 border-r-[2px]">00/0000/XXXXXXXXXX/XXX/XXXX</td>
                                <td className="py-4 px-2 border-r-[2px] flex flex-col gap-2">
                                    <div className="flex flex-col gap-1 text-start">
                                        <span>Bobi Bobo Biba</span>
                                        <span className="text-slate-400">XXXXXXXXXXXXXX</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-start">
                                        <span>Rumah Hermit 2A/4</span>
                                        <span className="text-slate-400">Langit, Planet</span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <div className="flex flex-col gap-1 text-start">
                                        <span>Rini Rina Rana</span>
                                        <span className="text-slate-400">XXXXXXXXXXXXXX</span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <div className="flex flex-col gap-1 text-start">
                                        <span>Masyarakat</span>
                                        <span className="text-slate-400">1 Januari 1970 00:00:00</span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <Pill status={laporan.status!.id} />
                                </td>
                                <td className="py-4 px-3">
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => navigate(DYNAMIC_ROUTES.INTERNAL.DETAIL_PELAPORAN(laporan.id!))}
                                            className="text-white bg-blue-400 hover:bg-blue-500 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full w-full">
                                            <FaInfoCircle />
                                            Detail
                                        </button>
                                        <button
                                            className="text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full w-full">
                                            <FaEdit />
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        }
    </>



}

export default TableLaporan