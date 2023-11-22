import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { PrimaryButton, SecondaryButton } from "../../../form/Button";
import { InputText } from "../../../form/Input";
import { useState } from "react";
import useLoader from "../../../../hooks/useLoader";
import { useLocalStorage } from "usehooks-ts";
import {
  getLaporan,
  patchLaporan,
  patchPelaku,
  postPelaku,
  postPelakuStatus,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import { useAlert } from "../../../../hooks/useAlert";
import { Pelaku } from "../../../../consts/pelaku";
import { SectionTitle } from "../../../common/Typography";

const FormPelaku = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const form = useForm<Pelaku>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [formState, setFormState] = useLocalStorage<string | null>(
    "form_internal_state",
    null
  );
  const [jenisButton, setJenisButton] = useState(1)

  const onSubmit: SubmitHandler<Pelaku> = async (data: Pelaku) => {
    console.log(jenisButton)
    const formatData: Pelaku = {
      ...data,
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
      id: Number(laporan.pelaku?.id),
    };

    const formatDataStatus = {
      status_pelaku: jenisButton
    }

    try {
      setIsLoading(true);
      showLoader();
      if (laporan.pelaku?.id != null) {
        (await patchPelaku(formatData)) as Pelaku;
        // await postPelakuStatus(formatData, "pelaku", jenisButton);
        await patchLaporan(formatDataStatus, laporan.id);

        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Pelaku Berhasil Diedit !",
          message: `Pelaku untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
        });
      } else {
        (await postPelaku(formatData)) as Pelaku;
        await patchLaporan(formatDataStatus, laporan.id);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Pelaku Sukses Dibuat !",
          message: `Pelaku untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Pelaku
      </span>
      {/* <AutosaveFormEffect
                      setValue={setValue}
                      watch={watch}
                      formState={formState}
                      setFormState={setFormState}
                    > */}
      <div className="flex flex-col gap-2 py-3">
        <form
          className="flex flex-col gap-3 py-3"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Identitas Pelaku</SectionTitle>
            <InputText
              register={register}
              errors={errors}
              defaultValue={laporan.pelaku?.nama_lengkap}
              name="nama_lengkap"
              placeholder="Nama Lengkap Pelaku"
              label="Nama Lengkap Pelaku"
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              defaultValue={laporan.pelaku?.hubungan}
              name="hubungan"
              placeholder="Hubungan Dengan Korban"
              label="Hubungan Dengan Korban"
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              defaultValue={laporan.pelaku?.usia.toString()}
              name="usia"
              placeholder="Usia Pelaku"
              label="Usia Pelaku"
              isRequired
              type="number"
            />
          </div>
          <SecondaryButton
            className="py-2"
            isSubmit
            onClick={() => setJenisButton(1)}
          >
            {"Simpan Sebagai Draft"}
          </SecondaryButton>
          <PrimaryButton
            className="py-2"
            isSubmit
            onClick={() => setJenisButton(2)}
          >
            {"Publish Laporan"}
          </PrimaryButton>
        </form>
      </div>
      {/* </AutosaveFormEffect> */}
    </>
  );
};

export default FormPelaku;
