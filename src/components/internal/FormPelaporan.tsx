import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Laporan } from "../../consts/laporan"
import { ReactNode } from "react"
import { REGEX } from "../../consts/regex"
import { PrimaryButton } from "../form/Button"
import Datepicker from "../form/Datepicker"
import { Dropdown } from "../form/Dropdown"
import { InputText, TextArea } from "../form/Input"

interface FormPelaporanProps {
    onSubmit: SubmitHandler<Laporan>
    isLoading: boolean
    form: UseFormReturn<Laporan>
}

interface InputSectionProps {
    title?: string,
    children: ReactNode
}

const FormPelaporan = (props: FormPelaporanProps) => {
    const { onSubmit, isLoading, form } = props
    const { register, formState: { errors }, handleSubmit, control } = form


    return <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
            <InputSection>
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
                    type="number"
                />
                <InputText
                    name="no_telp_pelapor"
                    register={register}
                    placeholder="Masukkan nomor telepon pelapor"
                    errors={errors}
                    label="No. Telepon Pelapor"
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
                <></>
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
            <InputSection title="Dokumentasi Pengaduan">
                <></>
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