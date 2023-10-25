import { useState } from "react"
import { PrimaryButton } from "../../components/form/Button"
import AdminLayout from "../layouts/AdminLayout"
import { useForm } from "react-hook-form"
import { InputText } from "../../components/form/Input"
import { Laporan } from "../../consts/laporan"
import { REGEX } from "../../consts/regex"
import { useLocalStorage } from "usehooks-ts"
import AutosaveFormEffect from "../../helpers/formSaveHelpers"
import { Kelurahan } from "../../consts/kelurahan"
import { Kecamatan } from "../../consts/kecamatan"
import { KecamatanLoader, KelurahanLoader } from "../../helpers/fetchHelpers"


const CreatePelaporan = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm<Laporan>()
    const [formState, setFormState] = useLocalStorage<string | null>('form_internal_state', null)
    const [kecamatans, setKecamatans] = useState<Kecamatan[]>([])
    const [kelurahans, setKelurahans] = useState<Kelurahan[]>([])

    const onSubmit = (data: Laporan) => {
        setIsLoading(true)
        setIsLoading(false)
    }

    return <AdminLayout>
        <KecamatanLoader data={kecamatans} setData={setKecamatans}>
            <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                <AutosaveFormEffect setValue={setValue} watch={watch} formState={formState} setFormState={setFormState}>
                    <div className="lg:w-1/2 md:w-10/12 w-11/12 bg-white floating-shadow-md rounded-md mx-auto mt-4 px-8 py-10">
                        <h1 className="font-bold border-b-2 border-slate-400 pb-5 text-xl text-primary">Tambah Data Laporan</h1>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-5 flex flex-col gap-4">
                                <section>
                                    <h2 className="font-bold mb-3">Data Kasus</h2>
                                    <div className="flex flex-col gap-4">
                                    </div>
                                </section>
                                <section>
                                    <h2 className="font-bold mb-3">Data Identitas Pelapor</h2>
                                    <div className="flex flex-col gap-4">
                                        <InputText
                                            name="namaPelapor"
                                            register={register}
                                            placeholder="Masukkan nama pelapor"
                                            errors={errors}
                                            label="Nama pelapor"
                                            regex={REGEX.ALPHABETIC_ONLY}
                                            isRequired={true}
                                        />
                                        <InputText
                                            name="no_telp_pelapor"
                                            register={register}
                                            placeholder="Masukkan nomor telepon pelapor"
                                            errors={errors}
                                            label="No. telepon pelapor"
                                            regex={REGEX.PHONE_IDN}
                                            type="tel"
                                            isRequired
                                        />
                                        <InputText
                                            name="nik_pelapor"
                                            register={register}
                                            placeholder="Masukkan NIK pelapor"
                                            errors={errors}
                                            label="NIK Pelapor"
                                            type="number"
                                        />
                                        <InputText
                                            name="alamat_pelapor"
                                            register={register}
                                            placeholder="Masukkan alamat pelapor"
                                            errors={errors}
                                            label="Alamat Pelapor"
                                        />
                                    </div>
                                </section>
                                <section>
                                    <h2 className="font-bold mb-3">Data Identitas Klien</h2>
                                    <div className="flex flex-col gap-4">
                                    </div>
                                </section>
                            </div>
                            {/* Footer */}
                            <div className="border-t-2 border-slate-400 pt-5">
                                <PrimaryButton className="py-3" isLoading={isLoading} isDisabled={isLoading} isSubmit>
                                    Buat Laporan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </AutosaveFormEffect>
            </KelurahanLoader>
        </KecamatanLoader>
    </AdminLayout>
}

export default CreatePelaporan