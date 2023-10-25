import { useState } from "react"
import { Laporan } from "../../consts/laporan"
import AdminLayout from "../layouts/AdminLayout"
import TableLaporan from "../../components/internal/Table"
import Pill from "../../components/internal/Pill"



const Pelaporans = () => {
    const [listLaporan, setListLaporan] = useState<Laporan[]>([])



    return <AdminLayout>
        <div className="md:w-10/12 w-11/12 floating-shadow-md py-12 px-10 mx-auto mt-12 bg-white rounded-md">
            <div className="flex w-full justify-between items-center mb-6">
                <h1 className="font-bold text-xl">Data Pengaduan</h1>
            </div>
            <div className="flex items-center flex-wrap gap-4">
                <h2 className="font-bold mr-10">Keterangan Status</h2>
                <Pill status={1}/>
                <Pill status={2}/>
                <Pill status={3}/>
                <Pill status={4}/>
                <Pill status={6}/>
            </div>
            <TableLaporan
                listLaporan={listLaporan}
            />
        </div>
    </AdminLayout>
}

export default Pelaporans