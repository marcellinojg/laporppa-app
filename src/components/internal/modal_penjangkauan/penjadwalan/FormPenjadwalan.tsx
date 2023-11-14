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
  patchPenjadwalan,
  postPenjadwalan,
} from "../../../../api/laporan";
import { useAlert } from "../../../../hooks/useAlert";
import { ALERT_TYPE } from "../../../../consts/alert";

export interface Penjadwalan {
  id?: number;
  tanggal_penjadwalan: Date;
  jam_penjadwalan: string;
  tanggal_jam: string;
  laporan_id: string;
  tempat: string;
  alamat: string;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}

const FormPenjadwalan = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive} = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const form = useForm<Penjadwalan>();
  const { errorFetchAlert, addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;

  const onSubmit: SubmitHandler<Penjadwalan> = async (data: Penjadwalan) => {
    const formatData: Penjadwalan = {
      ...data,
      tanggal_jam: combineDateAndTimePelaporan(
        data.tanggal_penjadwalan,
        data.jam_penjadwalan
      ),
      laporan_id: laporan.id,
      id: laporan.penjadwalan?.id,
    };

    try {
      setIsLoading(true);
      showLoader();
      if (
        laporan.penjadwalan?.alamat != null ||
        laporan.penjadwalan?.alamat != null ||
        laporan.penjadwalan?.tanggal_jam != null
      ) {
        (await patchPenjadwalan(formatData)) as Penjadwalan;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Penjadwalan Sukses Diedit !",
          message: `Penjadwalan untuk laporan ${laporan.nama_klien} berhasil diedit!`,
        });
      } else {
        (await postPenjadwalan(formatData)) as Penjadwalan;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Penjadwalan Sukses Dibuat !",
          message: `Penjadwalan untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Penjadwalan
      </span>

      <div className="flex flex-col gap-2 py-3">
        <form
          className="flex flex-col gap-3 py-3"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <Datepicker
              name="tanggal_penjadwalan"
              control={control}
              defaultValue={
                laporan.penjadwalan?.tanggal_jam
                  ? new Date(laporan.penjadwalan.tanggal_jam)
                  : null
              }
              placeholder="Tanggal Penjadwalan"
              label="Tanggal Penjadwalan"
            />
            <TimePicker
              name="jam_penjadwalan"
              register={register}
              isRequired
              defaultValue={
                laporan.penjadwalan?.tanggal_jam
                  ? `${String(
                      new Date(laporan.penjadwalan?.tanggal_jam).getHours()
                    ).padStart(2, "0")}:${String(
                      new Date(laporan.penjadwalan?.tanggal_jam).getMinutes()
                    ).padStart(2, "0")}`
                  : undefined
              }
              placeholder="Jam Penjadwalan"
              label="Jam Penjadwalan"
              errors={errors}
            />
            <InputText
              register={register}
              errors={errors}
              name="tempat"
              placeholder="Tempat Penjadwalan"
              label="Tempat Penjadwalan"
              defaultValue={laporan.penjadwalan?.tempat}
            />
            <InputText
              register={register}
              errors={errors}
              name="alamat"
              placeholder="Alamat Penjadwalan"
              label="Alamat Penjadwalan"
              defaultValue={laporan.penjadwalan?.alamat}
            />
          </div>
          <PrimaryButton className="py-2" isSubmit>
            {laporan.penjadwalan?.alamat != null ||
            laporan.penjadwalan?.alamat != null ||
            laporan.penjadwalan?.tanggal_jam != null
              ? "Edit Penjadwalan"
              : "Tambahkan Penjadwalan"}
          </PrimaryButton>
        </form>
      </div>
    </>
  );
};

export default FormPenjadwalan;
