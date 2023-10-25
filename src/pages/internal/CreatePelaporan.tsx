import { useState } from "react"
import { PrimaryButton } from "../../components/form/Button"
import AdminLayout from "../layouts/AdminLayout"
import { useForm } from "react-hook-form"
import { InputText, TextArea } from "../../components/form/Input"
import { Laporan } from "../../consts/laporan"
import { REGEX } from "../../consts/regex"
import { useLocalStorage } from "usehooks-ts"
import AutosaveFormEffect from "../../helpers/formSaveHelpers"
import { Kelurahan } from "../../consts/kelurahan"
import { Kecamatan } from "../../consts/kecamatan"
import { KecamatanLoader, KelurahanLoader } from "../../helpers/fetchHelpers"
import { Dropdown } from "../../components/form/Dropdown"
import Datepicker from "../../components/form/Datepicker"
import * as Fragments from "./fragments/CreatePelaporan"


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
                            <div className="flex flex-col">
                                <Fragments.InputSection>
                                    <Dropdown
                                        name="kategori_id"
                                        register={register}
                                        errors={errors}
                                        errorLabel="Kategori Permasalahan"
                                        placeholder="Pilih kategori"
                                        label="Kategori Permasalahan"
                                        options={[{
                                            text: 'Sosial',
                                            value: 1
                                        }]}
                                    />
                                    <Datepicker

                                    />
                                </Fragments.InputSection>
                                <Fragments.InputSection title="Identitas Pelapor">
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
                                        name="nik_pelapor"
                                        register={register}
                                        placeholder="Masukkan NIK pelapor"
                                        errors={errors}
                                        label="NIK Pelapor"
                                        type="number"
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
                                        name="alamat_pelapor"
                                        register={register}
                                        placeholder="Masukkan alamat domisili pelapor"
                                        errors={errors}
                                        label="Alamat domisili pelapor"
                                    />
                                </Fragments.InputSection>

                                <Fragments.InputSection title="Identitas Klien">
                                    <></>
                                </Fragments.InputSection>

                                <Fragments.InputSection title="Permasalahan">
                                    <TextArea
                                        name="uraian_singkat"
                                        register={register}
                                        errors={errors}
                                        isRequired={false}
                                        label="Uraian Singkat Permasalahan"
                                        placeholder="Ceritakan permasalahan secara singkat"
                                    />
                                </Fragments.InputSection>
                                <Fragments.InputSection title="Dokumentasi Pengaduan">
                                    <></>
                                </Fragments.InputSection>
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