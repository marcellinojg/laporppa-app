import { useState } from "react"
import TabelPelaporan from "../../components/internal/TabelPelaporan"
import { Laporan } from "../../consts/laporan"
import AdminLayout from "../layouts/AdminLayout"



const Pelaporans = () => {
    const [listLaporan, setListLaporan] = useState<Laporan>()
    

    return <AdminLayout>
        <div className="md:w-3/4 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-slate-200 rounded-sm">
            <div className="flex w-full justify-between items-center mb-6">
                <h1 className="font-bold text-xl">Data Pengaduan</h1>
            </div>
            <TabelPelaporan listLaporan={[]} />
        </div>
    </AdminLayout>
}

export default Pelaporans