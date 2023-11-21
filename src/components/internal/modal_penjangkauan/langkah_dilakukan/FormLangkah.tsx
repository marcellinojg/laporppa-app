import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler,  useForm } from "react-hook-form"
import { PrimaryButton, SecondaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import { useState } from "react"
import useLoader from "../../../../hooks/useLoader"
import { getLaporan, patchLaporan } from "../../../../api/laporan"
import { ALERT_TYPE } from "../../../../consts/alert"
import { useAlert } from "../../../../hooks/useAlert"
import { Laporan } from "../../../../consts/laporan"
SecondaryButton


export interface DetailLangkah {
    langkah_telah_dilakukan: string
    laporan: Laporan
}

const FormDetailLangkah = (props: FormModal) => {
    const { mode, laporan, setRefetch, setIsModalActive } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showLoader, hideLoader } = useLoader()
    const { addAlert } = useAlert()
    const [jenisButton, setJenisButton] = useState(1)
    
    const form = useForm<DetailLangkah>();
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = form;


      const onSubmit: SubmitHandler<DetailLangkah> = async (data: DetailLangkah) => {
        console.log(data);
        console.log(jenisButton);

        try {
            showLoader()
            await patchLaporan({
                satgas_pelapor: {
                    id: laporan.satgas_pelapor.id
                },
                status_langkah_telah_dilakukan: jenisButton === 1
                ? 1
                : jenisButton === 2
                    ? 2
                    : null,
                langkah_telah_dilakukan: data.langkah_telah_dilakukan
            }, laporan.id)

            if (jenisButton === 2) {
                addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Publish Berhasil',
                    message: `Proses publish langkah berhasil dilakukan`
                });
            } else if (laporan.status_langkah_telah_dilakukan === 1) {
                addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Edit Berhasil',
                    message: `Proses edit langkah berhasil dilakukan`
                });
            } else if (laporan.status_langkah_telah_dilakukan === 0) {
                addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Input Berhasil',
                    message: `Proses input langkah berhasil dilakukan`
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
                message: `Terjadi kesalahan dalam melakukan proses input langkah`
            })
        }
        finally {
            getLaporan(laporan.id);
            setIsLoading(false);
            hideLoader();
        }
      };

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Langkah yang Telah Dilakukan</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
            {laporan.status_langkah_telah_dilakukan === 0 ? (
                <>
                    <SectionTitle>Langkah yang telah Dilakukan</SectionTitle>
                    <TextArea
                        name="langkah_telah_dilakukan"
                        className="h-60"
                        defaultValue=""
                        register={register}
                        errors={errors}
                        label="Ceritakan langkah yang dilakukan"
                        placeholder="Contoh : Pada tanggal 1 Januari, satgas mendatangi klien."
                    />
                </>
            ) : laporan.status_langkah_telah_dilakukan === 1 ? (
                <>
                    <SectionTitle>Langkah yang telah Dilakukan</SectionTitle>
                    <TextArea
                        name="langkah_telah_dilakukan"
                        className="h-60"
                        defaultValue={laporan.langkah_telah_dilakukan}
                        register={register}
                        errors={errors}
                        label="Ceritakan langkah yang dilakukan"
                        placeholder="Contoh : Pada tanggal 1 Januari, satgas mendatangi klien."
                    />
                </>
            ) : null}

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

export default FormDetailLangkah