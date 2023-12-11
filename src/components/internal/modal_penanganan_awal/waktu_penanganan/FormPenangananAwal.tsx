import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { PrimaryButton } from "../../../form/Button";
import { InputText } from "../../../form/Input";
import Datepicker from "../../../form/Datepicker";
// import useLoader from "../../../../hooks/useLoader";
import TimePicker from "../../../form/Timepicker";
import { combineDateAndTimePelaporan } from "../../../../helpers/formatDate";
import { SetStateAction, useState, Dispatch } from "react";

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

const FormPenangananAwal = (props: FormModal) => {
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
  } = form; 

  const onSubmit: SubmitHandler<Penanganan> = async (data: Penanganan) => {
    const formatData: Penanganan = {
      ...data,
      tanggal_penanganan_awal: combineDateAndTimePelaporan(
        data.tanggal_penanganan,
        data.jam_penanganan
      ),
      laporan_id: laporan.id,
      id: laporan.penanganan_awal?.id,
    };

    console.log(formatData)
    try {
      setIsLoading(true);
      showLoader();
      if (
        laporan.penanganan_awal?.hasil != null ||
        laporan.penanganan_awal?.tanggal_penanganan_awal != null
      ) {
        (await patchPenanganan(formatData)) as Penanganan;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Penanganan Awal Sukses Diedit !",
          message: `Data Penanganan Awal untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
        });
      } else {
        (await postPenanganan(formatData)) as Penanganan;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Penanganan Awal Sukses Dibuat !",
          message: `Data Penanganan Awal untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Penanganan Awal
      </span>

      <div className="flex flex-col gap-2 py-3">
        <form
          className="flex flex-col gap-3 py-3"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <Datepicker
              name="tanggal_penanganan"
              control={control}
              isRequired
              defaultValue={
                laporan.penanganan_awal?.tanggal_penanganan_awal
                  ? new Date(laporan.penanganan_awal.tanggal_penanganan_awal)
                  : null
              }
              placeholder="Tanggal Penanganan awal"
              label="Tanggal Penanganan Awal"
            />
            <TimePicker
              name="jam_penanganan"
              register={register}
              isRequired
              defaultValue={
                laporan.penanganan_awal?.tanggal_penanganan_awal
                  ? `${String(
                      new Date(laporan.penanganan_awal?.tanggal_penanganan_awal).getHours()
                    ).padStart(2, "0")}:${String(
                      new Date(laporan.penanganan_awal?.tanggal_penanganan_awal).getMinutes()
                    ).padStart(2, "0")}`
                  : undefined
              }
              placeholder="Jam Penanganan Awal"
              label="Jam Penanganan Awal"
              errors={errors}
            />
            <InputText
              register={register}
              errors={errors}
              name="hasil"
              placeholder="Hasil Penanganan Awal"
              label="Hasil Penanganan Awal"
              defaultValue={laporan.penanganan_awal?.hasil}
              isRequired
            />
          </div>
          <PrimaryButton className="py-2" isSubmit>
            {laporan.penanganan_awal?.tanggal_penanganan_awal != null ||
            laporan.penanganan_awal?.hasil != null 
              ? "Edit Penanganan Awal"
              : "Tambahkan Penanganan Awal"}
          </PrimaryButton>
        </form>
      </div>
    </>
  );
};

export default FormPenangananAwal;
