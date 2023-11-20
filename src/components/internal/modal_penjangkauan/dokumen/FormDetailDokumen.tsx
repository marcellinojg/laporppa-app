import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton, SecondaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import Uploader from "../../../form/Uploader"
import { useState } from "react"
import useLoader from "../../../../hooks/useLoader"
import { useAlert } from "../../../../hooks/useAlert";
import { ALERT_TYPE } from "../../../../consts/alert";
import {
    getLaporan, patchDokumenPendukung, patchLaporan,
  } from "../../../../api/laporan";
import { DokumenPendukung } from "../../../../consts/dokumen_pendukung";

const FormDetailDokumen = (props: FormModal) => {
    const { mode, laporan, setIsModalActive, setRefetch } = props;
    const { register, formState: { errors }, handleSubmit, control, watch, setValue, reset } = useForm<DokumenPendukung>()
    const [jenisButton, setJenisButton] = useState(1)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoader, hideLoader } = useLoader();
    const { errorFetchAlert, addAlert } = useAlert();

    const onSubmit: SubmitHandler<DokumenPendukung> = async (data: DokumenPendukung) => {
        // console.log(data)
        console.log(jenisButton)
        const formatData: DokumenPendukung = {
            laporan_id: laporan.id,
            dokumen_pendukung: { // emang merah tapi jalan kok hehe
                foto_klien: data.foto_klien,
                foto_tempat_tinggal: data.foto_tempat_tinggal,
                foto_pendampingan_awal: data.foto_pendampingan_awal,
                foto_pendampingan_lanjutan: data.foto_pendampingan_lanjutan,
                foto_pendampingan_monitoring: data.foto_pendampingan_monitoring,
                foto_kk: data.foto_kk,
                dokumen_pendukung: data.dokumen_pendukung 
            }
          };
        console.log(formatData);
        try {
            setIsLoading(true);
            showLoader();
            if (laporan.dokumen_pendukung?.id != null) {
                console.log('masuk ke if 1');
              (await patchDokumenPendukung(formatData, laporan.dokumen_pendukung.id)) as DokumenPendukung;
              await patchLaporan({
                status_langkah_telah_dilakukan: jenisButton === 1
                ? 1
                : jenisButton === 2
                    ? 2
                    : null,
              }, laporan.id);
              reset();
              addAlert({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Dokumen Pendukung Berhasil Diedit !",
                  message: `Dokumen Pendukung untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
              });
            } else {
                console.log('masuk ke if 2');
              (await postDokumenPendukung(formatData)) as DokumenPendukung;
              await patchLaporan({
                status_langkah_telah_dilakukan: jenisButton === 1
                ? 1
                : jenisButton === 2
                    ? 2
                    : null,
              }, laporan.id);
              reset();
              addAlert({
                type: ALERT_TYPE.SUCCESS,
                title: "DOkumen Pendukung Sukses Dibuat !",
                message: `DOkumen Pendukung untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
              });


            }
      
            hideLoader();
            setRefetch!(true);
            setIsModalActive(false);
      
            // setTimeout(() => {
            //   navigate(0);
            // }, 3000);
        } catch {
            errorFetchAlert();
        } finally {
            getLaporan(laporan.id);
            setIsLoading(false);
            hideLoader();
        }
    
        setTimeout(() => setIsLoading(false), 3000);
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