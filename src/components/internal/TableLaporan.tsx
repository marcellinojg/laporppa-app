import { Laporan } from "../../consts/laporan"
import Pill from "./Pill"
import { formatDate } from "../../helpers/formatDate"
import { useAuthUser } from "react-auth-kit"
import { User } from "../../consts/user"
import { ROLE } from '../../consts/role';
import { AssignButton, DetailButton, EditButton, KembalikanButton, RujukButton, TerimaButton, TolakButton } from "../form/ActionButton"
import { STATUS_LAPORAN } from "../../consts/status"
import { Dispatch, SetStateAction } from "react"

interface TableLaporan {
    listLaporan: Laporan[]
    setRefetch: Dispatch<SetStateAction<boolean>>
}

const TableLaporan = (props: TableLaporan) => {
    const { listLaporan, setRefetch } = props
    const userData = useAuthUser()() as User
    return <>
        {listLaporan.length == 0 ?
            <div className="w-full flex flex-col items-center justify-center py-12">
                <img src="/images/nodata.png" className="" width={400} alt="No Data illustration" />
                <b className="text-2xl text-center text-primary">Pelaporan tidak ditemukan</b>
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
                                <td className="py-4 px-2 border-r-[2px]">{laporan.id}</td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1 text-start">
                                            <span>{laporan.nama_klien || '-'}</span>
                                            <span className="text-slate-400">{laporan.nik_klien || '-'}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-start">
                                            <span>{laporan.alamat_klien}</span>
                                            <span className="text-slate-400">{laporan.kelurahan.nama}, {laporan.kelurahan.kecamatan?.nama}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <div className="flex flex-col gap-1 text-start">
                                        <span>{laporan.nama_pelapor}</span>
                                        <span className="text-slate-400">{laporan.nik_pelapor || '-'}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <div className="flex flex-col gap-1 text-start">
                                        <span>Masyarakat</span>
                                        <span className="text-slate-400">{formatDate(laporan.tanggal_jam_pengaduan, true)}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 border-r-[2px]">
                                    <Pill status={laporan.status!.id} />
                                </td>
                                <td className="py-4 px-3">
                                    <div className="flex flex-col gap-2">
                                        <DetailButton laporan={laporan} />
                                        {userData.role === ROLE.KELURAHAN &&
                                            laporan.status.id == STATUS_LAPORAN.MENUNGGU_VALIDASI &&
                                            laporan.satgas_pelapor.id == userData.id &&
                                            <>
                                                <AssignButton setRefetch={setRefetch} laporan={laporan} />
                                                <TolakButton setRefetch={setRefetch} laporan={laporan} />
                                            </>
                                        }
                                        {userData.role === ROLE.KELURAHAN &&
                                            laporan.status.id == STATUS_LAPORAN.KASUS_DIKEMBALIKAN &&
                                            laporan.satgas_pelapor.id == userData.id &&
                                            <>
                                                <AssignButton setRefetch={setRefetch} laporan={laporan} />
                                                <RujukButton setRefetch={setRefetch} laporan={laporan} />
                                            </>
                                        }
                                        {userData.role === ROLE.SATGAS && laporan.status.id == STATUS_LAPORAN.SEDANG_DITANGANI &&
                                            <>
                                                <EditButton laporan={laporan} setRefetch={setRefetch} />
                                                <KembalikanButton laporan={laporan} setRefetch={setRefetch} />
                                            </>
                                        }
                                        {userData.role === ROLE.SATGAS && laporan.status.id == STATUS_LAPORAN.MENUNGGU_VALIDASI &&
                                            <>
                                                <TerimaButton setRefetch={setRefetch} laporan={laporan} />
                                                <TolakButton setRefetch={setRefetch} laporan={laporan} />
                                            </>
                                        }
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