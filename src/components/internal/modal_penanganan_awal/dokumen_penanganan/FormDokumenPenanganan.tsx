import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { PrimaryButton } from "../../../form/Button";
import { SetStateAction, useState, Dispatch } from "react";
import Uploader from "../../../form/Uploader"

import useLoader from "../../../../hooks/useLoader";
import {
  getLaporan,
  patchPenanganan,
  postPenanganan
} from "../../../../api/laporan";
import { useAlert } from "../../../../hooks/useAlert";
import { ALERT_TYPE } from "../../../../consts/alert";

export interface Penanganan {
  tanggal_penanganan: Date
  jam_penanganan : string
  tanggal_penanganan_awal: string
  hasil: string
  dokumen_pendukung: File
  laporan_id: string
  id?: number
}

const FormDokumenPenanganan = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive} = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const form = useForm<Penanganan>();
  const { errorFetchAlert, addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = form; 

  const onSubmit: SubmitHandler<Penanganan> = async (data: Penanganan) => {
    const formatData: Penanganan = {
      ...data,
      laporan_id: laporan.id,
      id: laporan.penanganan_awal?.id,
      hasil: laporan.penanganan_awal?.hasil,
      tanggal_penanganan_awal: laporan.penanganan_awal?.tanggal_penanganan_awal
    };

    console.log(formatData)
    try {
      setIsLoading(true);
      showLoader();
      if (
        laporan.penanganan_awal?.hasil != null ||
        laporan.penanganan_awal?.tanggal_penanganan_awal != null
      ) {
        (await postPenanganan(formatData)) as Penanganan;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Dokumen Pendukung Sukses Diedit !",
          message: `Data Dokumen Pendukung untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
        });
      } else {
        (await postPenanganan(formatData)) as Penanganan;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Dokumen Pendukung Sukses Dibuat !",
          message: `Data Dokumen Pendukung untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
  };

  return (
    <>
      <span className="font-bold text-lg">
        <span className="text-primary">{capitalize(mode)}</span> Dokumen Pendukung
      </span>

      <div className="flex flex-col gap-2 py-3">
        <form
          className="flex flex-col gap-3 py-3"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
           <Uploader
                        name='dokumen_pendukung'
                        control={control}
                        watch={watch}
                        placeholder='Upload dokumen pendukung'
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        isRequired={true}
                        errorLabel='Dokumen Pendukung'
                    isMultiple={false}
                    />
          <PrimaryButton className="py-2" isSubmit>
            {laporan.penanganan_awal?.dokumen_pendukung != null
              ? "Edit Dokumen Pendukung"
              : "Tambahkan Dokumen Pendukung"}
          </PrimaryButton>
        </form>
      </div>
    </>
  );
};

export default FormDokumenPenanganan;
