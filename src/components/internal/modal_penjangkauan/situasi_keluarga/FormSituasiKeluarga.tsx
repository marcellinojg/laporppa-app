import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { PrimaryButton, SecondaryButton } from "../../../form/Button";
import { useState } from "react";
import useLoader from "../../../../hooks/useLoader";
import { useLocalStorage } from "usehooks-ts";
import {
  getLaporan,
  patchKondisiKlien,
  patchLaporan,
  postKondisiKlien,
  postKondisiStatus,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import { useAlert } from "../../../../hooks/useAlert";
import { SectionTitle } from "../../../common/Typography";
import { KondisiKlien } from "../../../../consts/kondisi_klien";
import { TextArea } from "../../../form/Input";

const FormSituasiKeluarga = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const form = useForm<KondisiKlien>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [jenisButton, setJenisButton] = useState(1);

  const onSubmit: SubmitHandler<KondisiKlien> = async (data: KondisiKlien) => {
    // console.log(jenisButton);
    const formatData: KondisiKlien = {
      ...data,
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
      id: Number(laporan.kondisi_klien?.id),
    };

    const formatDataKondisi = {
      status_kondisi_klien: jenisButton,
    };

    try {
      setIsLoading(true);
      showLoader();
      if (laporan.kondisi_klien?.id != null) {
        (await patchKondisiKlien(formatData)) as KondisiKlien;
        // await postKondisiStatus(formatData, "kondisi_klien", jenisButton);
        await patchLaporan(formatDataKondisi, laporan.id);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Kondisi Klien Berhasil Diedit !",
          message: `Kondisi Klien untuk laporan ${laporan.nama_klien} berhasil diedit!`,
        });
      } else {
        (await postKondisiKlien(formatData)) as KondisiKlien;
        // await postKondisiStatus(formatData, "kondisi_klien", jenisButton);
        await patchLaporan(formatDataKondisi, laporan.id);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Kondisi Klien Sukses Dibuat !",
          message: `Kondisi Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Detail Kronologi Kejadian
      </span>
      <div className="flex flex-col gap-2 py-3">
        <form
          className="flex flex-col gap-3 py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b-2 flex flex-col gap-3 py-3">
            <SectionTitle>Detail Situasi Keluarga</SectionTitle>
            <TextArea
              name="situasi_keluarga"
              className="h-60"
              defaultValue={
                laporan.kondisi_klien?.fisik ? laporan.kondisi_klien.fisik : ""
              }
              register={register}
              errors={errors}
              label="Situasi Keluarga"
              placeholder="Deskripsikan kondisi situasi keluarga pada saat kejadian dan saat ini"
              isRequired
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
    </>
  );
};

export default FormSituasiKeluarga;
