import { useEffect, useState } from "react"
import AdminLayout from "../layouts/AdminLayout"
import { useForm } from "react-hook-form"
import { Laporan, LaporanSatgas } from "../../consts/laporan"
import { useLocalStorage } from "usehooks-ts"
import AutosaveFormEffect from "../../helpers/formSaveHelpers"
import { Kelurahan } from "../../consts/kelurahan"
import { Kecamatan } from "../../consts/kecamatan"
import { KecamatanLoader, KelurahanLoader } from "../../helpers/fetchHelpers"
import FormPelaporan from "../../components/internal/FormPelaporan"
import { postLaporan } from "../../api/laporan"
import { useAlert } from "../../hooks/useAlert"
import useLoader from "../../hooks/useLoader"
import { formatDatePelaporan } from "../../helpers/formatDate"
import { ALERT_TYPE } from "../../consts/alert"
import { useNavigate } from "react-router-dom"

const CreatePelaporan = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formState, setFormState] = useLocalStorage<string | null>('form_internal_state', null)
    const form = useForm<LaporanSatgas>()
    const { setValue, watch, clearErrors, reset, setError } = form
    const [kecamatans, setKecamatans] = useState<Kecamatan[]>([])
    const [kelurahans, setKelurahans] = useState<Kelurahan[]>([])
    const { errorFetchAlert, addAlert } = useAlert()
    const { showLoader, hideLoader } = useLoader()
    const navigate = useNavigate()
    const onSubmit = async (data: LaporanSatgas) => {
        if (!data.dokumentasi_pengaduan || data.dokumentasi_pengaduan.length == 0) {
            setError('dokumentasi_pengaduan', { type: 'required', message: 'Dokumentasi Pelaporan harus diisi !' })
            return
        }

        const arrData = Object.entries(data)
        const formData = new FormData()
        arrData.forEach((data) => {
            if (data[0].includes('dokumentasi')) {
                const arrFiles = data[1] as File[]
                console.log(arrFiles)
                arrFiles.forEach((file) => formData.append(`${data[0]}`, file))
            }
            else
                formData.append(data[0], data[1])
        })

        try {
            setIsLoading(true)
            showLoader()
            await postLaporan(
                {
                    ...data,
                    tanggal_jam_pengaduan: formatDatePelaporan(new Date(data.tanggal_jam_pengaduan)),
                    sumber_pengaduan_id: 2
                }
            ) as Laporan
            localStorage.removeItem('form_internal_state')
            reset()
            addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: 'Laporan Sukses Dibuat !',
                message: `Selamat, laporan dari ${data.nama_pelapor} telah berhasil disimpan !`
            })
            hideLoader()
            setTimeout(() => {
                navigate(0)
            }, 1500)
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

    useEffect(() => {
        const subscription = watch((value) => {
            if (value.dokumentasi_pengaduan && value.dokumentasi_pengaduan?.length != 0)
                clearErrors('dokumentasi_pengaduan')
        })
        return () => subscription.unsubscribe()
    }, [])

    return <AdminLayout>
        <KecamatanLoader data={kecamatans} setData={setKecamatans}>
            <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                <AutosaveFormEffect setValue={setValue} watch={watch} formState={formState} setFormState={setFormState}>
                    <div className="lg:w-1/2 md:w-10/12 w-11/12 bg-white floating-shadow-md rounded-md mx-auto mt-4 px-8 py-10">
                        <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary">Tambah Data Laporan</h1>
                        <FormPelaporan
                            onSubmit={onSubmit}
                            isLoading={isLoading}
                            form={form}
                            kecamatan={kecamatans}
                            kelurahan={kelurahans}
                        />
                    </div>
                </AutosaveFormEffect>
            </KelurahanLoader>
        </KecamatanLoader>
    </AdminLayout>
}

export default CreatePelaporan