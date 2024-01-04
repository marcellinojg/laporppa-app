import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton, SecondaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import Uploader from "../../../form/Uploader"
import { useState } from "react"
import useLoader from "../../../../hooks/useLoader"
import { useAlert } from "../../../../hooks/useAlert";
import { ALERT_TYPE } from "../../../../consts/alert";
import {
    getLaporan, patchDokumenPendukung, patchLaporan,postDokumenPendukung
  } from "../../../../api/laporan";
import { Laporan } from "../../../../consts/laporan"
import { format } from "date-fns"

interface DokumenPendukung {
    laporan: Laporan,
    id?:number,
    laporan_id: string,
        foto_klien: File[],
        foto_tempat_tinggal: File[],
        foto_pendampingan_awal: File[],
        foto_pendampingan_lanjutan: File[],
        foto_pendampingan_monitoring: File[],
        foto_kk: File[],
        dokumen_pendukung: File[]
}

const FormDetailDokumen = (props: FormModal) => {
    const { mode, laporan, setIsModalActive, setRefetch } = props;
    const { register, formState: { errors }, handleSubmit, control, watch, setValue, reset } = useForm<DokumenPendukung>()
    const [jenisButton, setJenisButton] = useState(1)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert, addAlert } = useAlert();

    

    const onSubmit: SubmitHandler<DokumenPendukung> = async (data: DokumenPendukung) => {
        const formatData: DokumenPendukung = {
            dokumen_pendukung : {
                foto_klien: data.foto_klien,
                foto_tempat_tinggal: data.foto_tempat_tinggal,
                foto_pendampingan_awal: data.foto_pendampingan_awal,
                foto_pendampingan_lanjutan: data.foto_pendampingan_lanjutan,
                foto_pendampingan_monitoring: data.foto_pendampingan_monitoring,
                foto_kk: data.foto_kk,
                dokumen_pendukung: data.dokumen_pendukung 
            },
            laporan_id: laporan.id,
            satgas_id: laporan.satgas_pelapor.id,
          };
        // console.log(formatData);

        const formatDataStatus = {
            status_dokumen_pendukung: jenisButton === 1
            ? 1
            : jenisButton === 2
                ? 2
                    : null,
            updated_at_dokumen_pendukung: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            updated_by_dokumen_pendukung: laporan.satgas_pelapor.id,

          };

        try {
            showLoader()
          
            await postDokumenPendukung(formatData)
            await patchLaporan(formatDataStatus, laporan.id)

            
            if (jenisButton=== 2) {
                addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Publish Berhasil',
                    message: `Proses publish dokumen pendukung berhasil dilakukan`
                });
            } else if (laporan.status_dokumen_pendukung === 1) {
                addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Edit Berhasil',
                    message: `Proses edit dokumen pendukung berhasil dilakukan`
                });
            } else if (laporan.status_dokumen_pendukung === 0) {
                addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Input Berhasil',
                    message: `Proses input dokumen pendukung berhasil dilakukan`
                });
            } 
            hideLoader();
            setRefetch!(true);
            setIsModalActive(false);
        }
        catch {
            addAlert({
                type: ALERT_TYPE.ERROR,
                title: 'Input Gagal',
                message: `Terjadi kesalahan dalam melakukan proses input dokumen pendukung`
            })
        }
        finally {
            getLaporan(laporan.id);
            setIsLoading(false);
            hideLoader();
        }
      };



    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Dokumen Pendukung</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Dokumen Pendukung</SectionTitle>
               <div className="text-base mb-1 font-bold">Foto Klien
               <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
                 </span>
                 <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                    Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                 </p></div>
                <Uploader
                        name='foto_klien'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto klien (dapat lebih dari satu)'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Klien'
                        isMultiple={true}
                    />
                 <div className="text-base mb-1 font-bold">Foto Tempat Tinggal
                 <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
                 </span>
                 <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                    Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                 </p></div>
                <Uploader
                        name='foto_tempat_tinggal'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto tempat tinggal (dapat lebih dari satu)'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Tempat Tinggal'
                        isMultiple={true}
                    />
                     <div className="text-base mb-1 font-bold">Foto Pendampingan Awal
                     <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
                    </span>
                    <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                        Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                    </p></div>
                <Uploader
                        name='foto_pendampingan_awal'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto pendampingan awal (dapat lebih dari satu)'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Pendampingan Awal'
                        isMultiple={true}
                    />
                     <div className="text-base mb-1 font-bold">Foto Pendampingan Lanjutan
                     <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
                    </span>
                    <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                        Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                    </p></div>
                <Uploader
                        name='foto_pendampingan_lanjutan'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto pendampingan lanjutan (dapat lebih dari satu)'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Pendampingan Lanjutan'
                        isMultiple={true}
                    />
                     <div className="text-base mb-1 font-bold">Foto Pendampingan Monitoring
                     <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
                    </span>
                    <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                        Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                    </p></div>
                <Uploader
                        name='foto_pendampingan_monitoring'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto pendampingan monitoring (dapat lebih dari satu)'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto Pendampingan Monitoring'
                        isMultiple={true}
                    />
                    <div className="text-base mb-1 font-bold">Foto KK  
                    <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                            Dapat Lebih Dari 1
                    </span>
                    <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                        Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                    </p></div>
                <Uploader
                        name='foto_kk'
                        control={control}
                        watch={watch}
                        placeholder='Upload foto KK (dapat lebih dari satu)'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={false}
                        errorLabel='Foto KK'
                        isMultiple={true}
                    />
                    <div className="text-base mb-1 font-bold">Dokumen Pendukung
                    <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
                    </span>
                    <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                        Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
                    </p></div>
                <Uploader
                        name='dokumen_pendukung'
                        control={control}
                        watch={watch}
                        placeholder='Upload dokumen pendukung (dapat lebih dari satu)'
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