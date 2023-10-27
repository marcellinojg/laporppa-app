import { SubmitHandler, useForm } from "react-hook-form"
import { InputText, TextArea } from "../../components/form/Input"
import { Laporan } from "../../consts/laporan"
import { Select } from "../../components/form/Dropdown"
import { REGEX } from "../../consts/regex"
import { PrimaryButton } from "../../components/form/Button"
import AutosaveFormEffect from "../../helpers/formSaveHelpers"
import { useLocalStorage } from "usehooks-ts"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../consts/routes"
import { useEffect, useState } from "react"
import { Kelurahan } from "../../consts/kelurahan"
import { Kecamatan } from "../../consts/kecamatan"
import { KecamatanLoader, KelurahanLoader } from "../../helpers/fetchHelpers"

const Pelaporan = () => {
    const { register, formState: { errors }, setValue, watch, handleSubmit, control, getValues } = useForm<Laporan>()
    const [formState, setFormState] = useLocalStorage<string | null>('form_laporan', null)
    const [kelurahan, setKelurahan] = useState<Kelurahan[]>([])
    const [kecamatan, setKecamatan] = useState<Kecamatan[]>([])
    const [selectedKecamatan, setSelectedKecamatan] = useState<number | string>()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Laporan> = (data: Laporan) => {
        navigate(ROUTES.EXTERNAL.KONFIRMASI_PELAPORAN, {
            state: data
        })
    }

    useEffect(() => {
        setSelectedKecamatan(getValues('kecamatan_id'))
        const subscription = watch((value) => {
            setSelectedKecamatan(value.kecamatan_id)
        })
        return () => subscription.unsubscribe()
    }, [])



    return <AutosaveFormEffect watch={watch} setValue={setValue} formState={formState} setFormState={setFormState}>
        <KelurahanLoader data={kelurahan} setData={setKelurahan}>
            <KecamatanLoader data={kecamatan} setData={setKecamatan}>
                <div className="min-w-screen min-h-screen bg-login flex flex-col items-center justify-center pb-[5vh]">
                    <header className="mx-auto flex gap-8 mt-36 ">
                        <img src="/images/logo-pemkot-new.png" className="w-20 object-contain" alt="Logo Pemkot Surabaya" />
                        <img src="/images/logo-without-text.png" className="w-28 object-contain" alt="Logo SIAPPPAK" />
                    </header>
                    <div className="lg:w-[300px] md:w-6/12 w-9/12 text-center">
                        <PrimaryButton className="py-2 text-sm mt-6 mb-3">
                            Panduan Pengisian dan FAQ
                        </PrimaryButton>
                    </div>
                    <form className="bg-white floating-shadow-md rounded-sm py-8 md:px-12 px-6 lg:w-[600px] md:w-3/4 w-11/12 mt-6" onSubmit={handleSubmit(onSubmit)}>
                        <b className="text-lg">Detail Laporan</b>
                        <div className="flex flex-col gap-2 pt-3 pb-6 mb-6 border-b-[1px] border-slate-300">
                            <Select
                                name="kategori_id"
                                placeholder="Pilih kategori"
                                label="Kategori Permasalahan"
                                control={control}
                                errors={errors}
                                errorLabel="Kategori Permasalahan"
                                options={[{
                                    label: 'Sosial',
                                    value: 1
                                }]}
                            />
                            <Select
                                name="kecamatan_id"
                                placeholder="Pilih kecamatan"
                                label="Kecamatan Klien"
                                control={control}
                                errors={errors}
                                errorLabel="Kecamatan"
                                options={kecamatan.map((k) => ({
                                    label: k.nama,
                                    value: k.id
                                }))}
                            />
                            <Select
                                isDisabled={selectedKecamatan == ""}
                                name="kelurahan_id"
                                placeholder="Pilih kelurahan"
                                label="Kelurahan Klien"
                                control={control}
                                errors={errors}
                                errorLabel="Kelurahan"
                                options={kelurahan.filter(k => k.kecamatan.id == selectedKecamatan).map((k) => ({
                                    label: k.nama,
                                    value: k.id
                                }))}
                            />
                            <TextArea
                                name="uraian_singkat"
                                register={register}
                                errors={errors}
                                isRequired={false}
                                label="Uraian Singkat Permasalahan"
                                placeholder="Ceritakan permasalahan secara singkat"
                            />
                        </div>

                        <b className="text-lg">Data Pelapor</b>
                        <div className="flex flex-col gap-2 pt-3 pb-6 border-b-[1px] border-slate-300">
                            <InputText
                                name="nama_pelapor"
                                register={register}
                                errors={errors}
                                placeholder="Masukkan nama lengkap"
                                label="Nama Lengkap Pelapor"
                                isRequired
                                regex={REGEX.ALPHABETIC_ONLY}
                            />
                            <InputText
                                name="no_telp_pelapor"
                                register={register}
                                errors={errors}
                                regex={REGEX.PHONE_IDN}
                                placeholder="Masukkan nomor telepon"
                                label="Nomor Telepon Pelapor"
                                isRequired
                            />
                        </div>
                        <PrimaryButton
                            className="py-3 mt-8"
                            isSubmit
                        >
                            Lanjut
                        </PrimaryButton>
                    </form>
                </div>
            </KecamatanLoader>
        </KelurahanLoader>
    </AutosaveFormEffect>
}



export default Pelaporan