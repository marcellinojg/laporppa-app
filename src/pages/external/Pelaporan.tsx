import { SubmitHandler, useForm } from "react-hook-form"
import { InputText, TextArea } from "../../components/form/Input"
import { LaporanWarga } from "../../consts/laporan"
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
import { KategoriLoader, KecamatanLoader, KelurahanLoader } from "../../helpers/fetchHelpers"
import { formatDatePelaporan } from "../../helpers/formatDate"

const Pelaporan = () => {
    const { register, formState: { errors }, setValue, watch, handleSubmit, control, getValues } = useForm<LaporanWarga>()
    const [formState, setFormState] = useLocalStorage<string | null>('form_laporan', null)
    const [kelurahan, setKelurahan] = useState<Kelurahan[]>([])
    const [kecamatan, setKecamatan] = useState<Kecamatan[]>([])
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [selectedKecamatan, setSelectedKecamatan] = useState<number | string>()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LaporanWarga> = (data: LaporanWarga) => {
        navigate(ROUTES.EXTERNAL.KONFIRMASI_PELAPORAN, {
            state: {
                ...data,
                sumber_pengaduan_id: 1,
                tanggal_jam_pengaduan: formatDatePelaporan(new Date())
            } as LaporanWarga
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
        <KategoriLoader data={kategoris} setData={setKategoris}>
            <KelurahanLoader data={kelurahan} setData={setKelurahan}>
                <KecamatanLoader data={kecamatan} setData={setKecamatan}>
                    <div className="min-w-screen min-h-screen bg-login flex flex-col items-center justify-center pb-[5vh]">
                        <header className="mx-auto flex gap-8 mt-36 ">
                            <img src="/images/logo-pemkot-new.png" className="w-20 object-contain" alt="Logo Pemkot Surabaya" />
                            <img src="/images/logo-without-text.png" className="w-28 object-contain" alt="Logo SIAPPPAK" />
                        </header>
                        <form className="bg-white floating-shadow-md rounded-sm py-8 md:px-12 px-6 lg:w-[600px] md:w-3/4 w-11/12 mt-6" onSubmit={handleSubmit(onSubmit)}>
                            <b className="text-lg">Detail Laporan</b>
                            <div className="flex flex-col gap-2 pt-3 pb-6 mb-6 border-b-[1px] border-slate-300">
                                <Select
                                    name="kategori_id"
                                    placeholder="Pilih Kategori"
                                    label="Kategori Permasalahan"
                                    control={control}
                                    errors={errors}
                                    errorLabel="Kategori Permasalahan"
                                    options={kategoris.map((k) => ({
                                        label: k.nama,
                                        value: k.id
                                    }))}
                                />
                                <Select
                                    name="kecamatan_id"
                                    placeholder="Pilih Kecamatan"
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
                                    placeholder="Pilih Kelurahan"
                                    label="Kelurahan Klien"
                                    control={control}
                                    errors={errors}
                                    errorLabel="Kelurahan"
                                    options={kelurahan.filter(k => k.kecamatan?.id == selectedKecamatan).map((k) => ({
                                        label: k.nama,
                                        value: k.id
                                    }))}
                                />
                                <TextArea
                                    name="uraian_singkat_masalah"
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
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
                                    placeholder="Masukkan Nama Lengkap"
                                    label="Nama Lengkap Pelapor"
                                    isRequired
                                    regex={REGEX.ALPHABETIC_ONLY}
                                />
                                <InputText
                                    name="no_telp_pelapor"
                                    register={register}
                                    errors={errors}
                                    regex={REGEX.PHONE_IDN}
                                    placeholder="Masukkan Nomor Telepon"
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
        </KategoriLoader>

    </AutosaveFormEffect>
}



export default Pelaporan