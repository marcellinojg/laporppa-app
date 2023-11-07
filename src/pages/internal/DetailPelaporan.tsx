import { useParams } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import { useState } from "react"
import { Laporan } from "../../consts/laporan"
import { NotFoundPage } from "../../components/errors/NotFoundPage"
import { LaporanLoader } from "../../helpers/fetchHelpers"
import { useStep } from "usehooks-ts"
import SectionPelaporan from "../../components/internal/detail_pelaporan/SectionPelaporan"
import SectionPenjangkauan from "../../components/internal/detail_pelaporan/SectionPenjangkauan"
import SwitchDetailButton from "../../components/internal/detail_pelaporan/SwitchDetail"
import { STATUS_LAPORAN } from "../../consts/status"


const DetailPelaporan = () => {
    const { id } = useParams()
    const [laporan, setLaporan] = useState<Laporan | null | undefined>()
    const [page, helpers] = useStep(2)
    const [refetch, setRefetch] = useState<boolean>(true)
    console.log(laporan)
    return <AdminLayout>
        <LaporanLoader data={laporan} setData={setLaporan} refetch={refetch} setRefetch={setRefetch} id={id}>
            {laporan === null ? <NotFoundPage /> :
                laporan &&
                <>
                    <div className="lg:w-10/12 w-11/12 mx-auto mt-12 mb-6 flex justify-between lg:items-center lg:flex-row flex-col gap-3">
                        <h1 className="font-bold text-2xl text-primary">Detail Pelaporan</h1>

                        <div className="flex flex-wrap items-center gap-4">
                            <SwitchDetailButton page={1} currentPage={page} label="Pelaporan" setStep={helpers.setStep} />
                            {laporan.status.id !== STATUS_LAPORAN.MENUNGGU_VALIDASI &&
                                <SwitchDetailButton page={2} currentPage={page} label="Penjangkauan" setStep={helpers.setStep} />
                            }
                        </div>
                    </div>
                    <div className="lg:w-10/12 w-11/12 p-6 bg-white floating-shadow-md mx-auto  rounded-lg">
                        {page === 1 && <SectionPelaporan laporan={laporan} setRefetch={setRefetch} />}
                        {page === 2 && <SectionPenjangkauan laporan={laporan} setRefetch={setRefetch} />}
                    </div>
                </>

            }
        </LaporanLoader>
    </AdminLayout>
}

export default DetailPelaporan