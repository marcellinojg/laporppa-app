import { useState } from "react"
import AdminLayout from "../layouts/AdminLayout"
import { useForm } from "react-hook-form"
import { Laporan } from "../../consts/laporan"
import { useLocalStorage } from "usehooks-ts"
import AutosaveFormEffect from "../../helpers/formSaveHelpers"
import { Kelurahan } from "../../consts/kelurahan"
import { Kecamatan } from "../../consts/kecamatan"
import { KecamatanLoader, KelurahanLoader } from "../../helpers/fetchHelpers"
import FormPelaporan from "../../components/internal/FormPelaporan"


const CreatePelaporan = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formState, setFormState] = useLocalStorage<string | null>('form_internal_state', null)
    const form = useForm<Laporan>()
    const { setValue, watch } = form
    const [kecamatans, setKecamatans] = useState<Kecamatan[]>([])
    const [kelurahans, setKelurahans] = useState<Kelurahan[]>([])

    const onSubmit = (data: Laporan) => {
        console.log(data)
        setIsLoading(true)
        setIsLoading(false)
    }

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