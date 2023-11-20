import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton, SecondaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import Uploader from "../../../form/Uploader"
import { useState } from "react"

interface DokumenPendukung {
    foto_klien: File[]
    foto_tempat_tinggal: File[]
    foto_pendampingan_awal: File[]
    foto_pendampingan_lanjutan: File[]
    foto_pendampingan_monitoring: File[]
    foto_kk: File[]
    dokumen_pendukung: File[]
}

const FormDetailDokumen = (props: FormModal) => {
    const { mode } = props
    const { register, formState: { errors }, handleSubmit, control, watch, setValue } = useForm<DokumenPendukung>()
    const [jenisButton, setJenisButton] = useState(1)

    const onSubmit: SubmitHandler<DokumenPendukung> = (data: DokumenPendukung) => {
        console.log(data)
        console.log(jenisButton)
    }

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Dokumen Pendukung</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Dokumen Pendukung</SectionTitle>
               <div className="text-base mb-1 font-bold">Foto Klien</div>
                <Uploader
                        name='foto_klien'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto klien'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Klien'
                        isMultiple={false}
                    />
                 <div className="text-base mb-1 font-bold">Foto Tempat Tinggal</div>
                <Uploader
                        name='foto_tempat_tinggal'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto tempat tinggal'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Tempat Tinggal'
                        isMultiple={true}
                    />
                     <div className="text-base mb-1 font-bold">Foto Pendampingan Awal</div>
                <Uploader
                        name='foto_pendampingan_awal'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto pendampingan awal'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Pendampingan Awal'
                        isMultiple={true}
                    />
                     <div className="text-base mb-1 font-bold">Foto Pendampingan Lanjutan</div>
                <Uploader
                        name='foto_pendampingan_lanjutan'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto pendampingan lanjutan'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Pendampingan Lanjutan'
                        isMultiple={true}
                    />
                     <div className="text-base mb-1 font-bold">Foto Pendampingan Monitoring</div>
                <Uploader
                        name='foto_pendampingan_monitoring'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto pendampingan monitoring'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Pendampingan Monitoring'
                        isMultiple={true}
                    />
                    <div className="text-base mb-1 font-bold">Foto KK</div>
                <Uploader
                        name='foto_kk'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto KK'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto KK'
                        isMultiple={false}
                    />
                    <div className="text-base mb-1 font-bold">Dokumen Pendukung</div>
                <Uploader
                        name='dokumen_pendukung'
                        control={control}
                        watch={watch}
                        placeholder='Upload dokumen pendukung'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto KK'
                        isMultiple={true}
                    />
               
               <SecondaryButton className="py-2" isSubmit onClick={() => setJenisButton(1)}>
                          {"Simpan Sebagai Draft"}
                        </SecondaryButton>
                        <PrimaryButton className="py-2" isSubmit onClick={() => setJenisButton(2)}>
                          {"Publish Laporan"}
                        </PrimaryButton>
            </form>
        </div>
    </>
}

export default FormDetailDokumen