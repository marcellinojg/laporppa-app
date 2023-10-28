import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Laporan } from "../../consts/laporan"
import { ReactNode, useEffect, useState } from "react"
import { REGEX } from "../../consts/regex"
import { PrimaryButton } from "../form/Button"
import Datepicker from "../form/Datepicker"
import { Select } from "../form/Dropdown"
import { InputText, TextArea } from "../form/Input"
import { Kelurahan } from '../../consts/kelurahan';
import { Kecamatan } from '../../consts/kecamatan';
import Uploader from '../form/Uploader';

interface FormPelaporanProps {
    onSubmit: SubmitHandler<Laporan>
    isLoading: boolean
    form: UseFormReturn<Laporan>
    kelurahan: Kelurahan[]
    kecamatan: Kecamatan[]
}

interface InputSectionProps {
    title?: string,
    children: ReactNode
}

const FormPelaporan = (props: FormPelaporanProps) => {
    const { onSubmit, isLoading, form, kecamatan, kelurahan } = props
    const [selectedKecamatan, setSelectedKecamatan] = useState<number | string>()
    const { register, formState: { errors }, handleSubmit, control, watch, setValue } = form

    useEffect(() => {
        const subscription = watch((value) => {
            setSelectedKecamatan(value.kecamatan_id)
        })
        return () => subscription.unsubscribe()
    }, [])

    return <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
            <InputSection>
                <Select
                    name='kategori_id'
                    control={control}
                    placeholder='Pilih kategori'
                    label='Kategori Permasalahan'
                    errorLabel='Kategori Permasalahan'
                    errors={errors}
                    options={[{ value: 1, label: 'Sosial' }, { value: 2, label: 'Kekerasan' }, { value: 3, label: 'Pelecehan Seksual' }]}
                />
                <Datepicker
                    name='tanggal_pengaduan'
                    control={control}
                    isRequired
                    placeholder='Masukkan tanggal & jam pengaduan'
                    label='Tanggal & Jam Pengaduan'
                />
            </InputSection>
            <InputSection title="Identitas Pelapor">
                <InputText
                    name="nama_pelapor"
                    register={register}
                    placeholder="Masukkan nama lengkap pelapor"
                    errors={errors}
                    label="Nama Lengkap Pelapor"
                    regex={REGEX.ALPHABETIC_ONLY}
                    isRequired={true}
                />
                <InputText
                    name="nik_pelapor"
                    register={register}
                    placeholder="Masukkan NIK pelapor"
                    errors={errors}
                    label="NIK Pelapor"
                    regex={REGEX.NIK}
                />
                <InputText
                    name="no_telp_pelapor"
                    register={register}
                    placeholder="Masukkan nomor telepon pelapor"
                    errors={errors}
                    label="No. Telepon/Whatsapp Pelapor"
                    regex={REGEX.PHONE_IDN}
                    type="tel"
                    isRequired
                />
                <InputText
                    name="alamat_pelapor"
                    register={register}
                    placeholder="Masukkan alamat domisili pelapor"
                    errors={errors}
                    label="Alamat Domisili Pelapor"
                />
            </InputSection>

            <InputSection title="Identitas Klien">
                <InputText
                    name='nama_klien'
                    register={register}
                    placeholder='Masukkan nama lengkap klien'
                    label='Nama Lengkap Klien'
                    errors={errors}
                    regex={REGEX.ALPHABETIC_ONLY}
                    isRequired
                />
                <InputText
                    name='nik_klien'
                    register={register}
                    placeholder='Masukkan NIK klien'
                    label='NIK Klien'
                    errors={errors}
                    regex={REGEX.NIK}
                />
                <InputText
                    name='no_telp_klien'
                    register={register}
                    placeholder='Masukkan nomor telepon klien'
                    label='No.Telepon/Whatsapp Klien'
                    errors={errors}
                />
                <Select
                    name='kecamatan_id'
                    control={control}
                    placeholder='Pilih kecamatan'
                    label='Kecamatan Klien'
                    errors={errors}
                    errorLabel='Kecamatan'
                    options={kecamatan.map((k) => ({
                        label: k.nama,
                        value: k.id
                    }))}
                />
                <Select
                    isDisabled={selectedKecamatan ? false : true}
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
                <InputText
                    name='alamat_klien'
                    register={register}
                    placeholder='Masukkan alamat domisili klien'
                    label='Alamat Domisili Klien'
                    errors={errors}
                />
            </InputSection>

            <InputSection title="Permasalahan">
                <TextArea
                    name="uraian_singkat"
                    register={register}
                    errors={errors}
                    isRequired={false}
                    label="Uraian Singkat Permasalahan"
                    placeholder="Ceritakan permasalahan secara singkat"
                />
            </InputSection>
            <InputSection title="Dokumentasi Pelaporan">
                <Uploader
                    name='dokumentasi_pengaduan'
                    control={control}
                    watch={watch}
                    placeholder='Upload file dokumentasi pelaporan'
                    setValue={setValue}
                    register={register}
                    errors={errors}
                    isRequired={true}
                    errorLabel='Dokumentasi Pelaporan'
                />
            </InputSection>
        </div>
        {/* Footer */}
        <div className="border-t-2 border-slate-400 pt-5">
            <PrimaryButton className="py-3" isLoading={isLoading} isDisabled={isLoading} isSubmit>
                Buat Laporan
            </PrimaryButton>
        </div>
    </form>
}

const InputSection = (props: InputSectionProps) => {
    const { title, children } = props
    return <section className="border-b-[1px] border-slate-400 py-5">
        {title && <h2 className="font-bold mb-3 text-lg text-primary">{title}</h2>}
        <div className="flex flex-col gap-4">
            {children}
        </div>
    </section>
}

export default FormPelaporan