import TabelPelaporan from "../../components/internal/TabelPelaporan"
import { Laporan } from "../../consts/laporan"
import AdminLayout from "../layouts/AdminLayout"

const dummy: Laporan[] = [
    {
        nama_lengkap_pelapor: 'Marcel',
        id_kelurahan_klien: 2,
        no_telp_pelapor: '08123012312'
    },
    {
        nama_lengkap_pelapor: 'Michael',
        id_kelurahan_klien: 3,
        no_telp_pelapor: '0812325232'
    },
    {
        nama_lengkap_pelapor: 'Glenn',
        id_kelurahan_klien: 4,
        no_telp_pelapor: '08112513212'
    },
]

const Pelaporans = () => {
    return <AdminLayout>
        <div className="md:w-3/4 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-slate-200 rounded-sm">
            <div className="flex w-full justify-between items-center mb-6">
                <h1 className="font-bold text-xl">Data Pengaduan</h1>
            </div>
            <TabelPelaporan listLaporan={dummy} />
        </div>
    </AdminLayout>
}

export default Pelaporans