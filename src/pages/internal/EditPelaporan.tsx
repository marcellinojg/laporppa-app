import { useState } from "react"
import AdminLayout from "../layouts/AdminLayout"
import { useForm } from "react-hook-form"
import { Laporan, LaporanSatgas } from "../../consts/laporan"
import { Kelurahan } from "../../consts/kelurahan"
import { Kecamatan } from "../../consts/kecamatan"
import { KecamatanLoader, KelurahanLoader, LaporanLoader, KategoriLoader } from '../../helpers/fetchHelpers';
import FormPelaporan from "../../components/internal/FormPelaporan"
import { patchLaporan } from "../../api/laporan"
import { useAlert } from "../../hooks/useAlert"
import useLoader from "../../hooks/useLoader"
import { useNavigate, useParams } from "react-router-dom"
import { NotFoundPage } from "../../components/errors/NotFoundPage"
import { ALERT_TYPE } from "../../consts/alert"
import { ROUTES } from "../../consts/routes"
import { combineDateAndTimePelaporan } from "../../helpers/formatDate"
import { STATUS_LAPORAN } from "../../consts/status"
import { ForbiddenPage } from "../../components/errors/ForbiddenPage"


const EditPelaporan = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<LaporanSatgas>()
    const { reset } = form
    const [kecamatans, setKecamatans] = useState<Kecamatan[]>([])
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [kelurahans, setKelurahans] = useState<Kelurahan[]>([])
    const [refetch, setRefetch] = useState<boolean>(true)
    const { errorFetchAlert, addAlert } = useAlert()
    const { showLoader, hideLoader } = useLoader()
    const { id } = useParams()
    const [laporan, setLaporan] = useState<Laporan | null | undefined>()
    const navigate = useNavigate()



    const onSubmit = async (data: LaporanSatgas) => {
        try {
            setIsLoading(true)
            showLoader()
            await patchLaporan({
                ...data,
                tanggal_jam_pengaduan : combineDateAndTimePelaporan(data.tanggal_pengaduan, data.jam_pengaduan),
            }, laporan?.id!) as Laporan
            localStorage.removeItem('form_internal_state')
            reset()
            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Sukses Diedit !',
                message: `Selamat, laporan dari ${data.nama_pelapor} telah berhasil dirubah !`
            })
            navigate(ROUTES.INTERNAL.PELAPORAN)
        }
        catch {
            errorFetchAlert()
        }
        finally {
            setIsLoading(false)
            hideLoader()
        }

        setTimeout(() => setIsLoading(false), 3000)
    }


    return <AdminLayout>
        <KategoriLoader data={kategoris} setData={setKategoris}>
            <KecamatanLoader data={kecamatans} setData={setKecamatans}>
                <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                    <LaporanLoader id={id} data={laporan} setData={setLaporan} refetch={refetch} setRefetch={setRefetch}>
                        {laporan === null ? <NotFoundPage /> :
                            laporan && (laporan.status.id === STATUS_LAPORAN.SEDANG_DITANGANI ? (
                                <div className="lg:w-1/2 md:w-10/12 w-11/12 bg-white floating-shadow-md rounded-md mx-auto mt-4 px-8 py-10">
                                    <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl ">Edit Laporan <span className="text-primary">{laporan.nama_pelapor}</span></h1>
                                    <FormPelaporan
                                        onSubmit={onSubmit}
                                        isLoading={isLoading}
                                        form={form}
                                        kecamatan={kecamatans}
                                        kelurahan={kelurahans}
                                        kategori={kategoris}
                                        laporanEdit={laporan}
                                    />
                                </div> 
                            ) : <ForbiddenPage/>)
                        }
                    </LaporanLoader>
                </KelurahanLoader>
            </KecamatanLoader>
        </KategoriLoader>
    </AdminLayout>
}

export default EditPelaporan