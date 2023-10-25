import { FaEdit, FaInfo, FaInfoCircle } from "react-icons/fa"
import { Laporan } from "../../consts/laporan"
import Pill from "./Pill"

interface TableLaporan {
    listLaporan: Laporan[]
}

const TableLaporan = (props: TableLaporan) => {
    const { listLaporan } = props
    return <div className="w-full overflow-auto">
        <table className="w-full mt-8">
            <tr className="border-y-2 border-slate-300">
                <th className="py-4 px-2">No.</th>
                <th className="py-4 px-2">No. Registrasi</th>
                <th className="py-4 px-2">Klien - NIK</th>
                <th className="py-4 px-2">Pelapor - NIK</th>
                <th className="py-4 px-2">Sumber - Tanggal Pengaduan</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2">Aksi</th>
            </tr>
            <tr className="border-b-2 border-slate-300 text-center text-sm">
                <td className="py-4 px-2 border-r-[2px]">1</td>
                <td className="py-4 px-2 border-r-[2px]">00/0000/XXXXXXXXXX/XXX/XXXX</td>
                <td className="py-4 px-2 border-r-[2px] flex flex-col gap-2">
                    <div className="flex flex-col gap-1 text-start">
                        <span>Dino Dodi Dodo</span>
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
                    <Pill status={1} />
                </td>
                <td className="py-4 px-3">
                    <div className="flex flex-col gap-2">
                        <button
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
        </table>
    </div>

}

export default TableLaporan