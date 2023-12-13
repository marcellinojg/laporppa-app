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
import { Laporan } from "../../../../consts/laporan";

interface Situasi {
  situasi_keluarga:string,
}

const FormSituasiKeluarga = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const form = useForm<Situasi>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [jenisButton, setJenisButton] = useState(1);

  const onSubmit: SubmitHandler<Situasi> = async (data: Situasi) => {
    // console.log(jenisButton);
    const formatData: Situasi = {
      ...data,
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
      status_situasi_keluarga: jenisButton,
    };

    try {
      setIsLoading(true);
      showLoader();
      if (jenisButton == 2) {
        (await patchLaporan(formatData, laporan.id)) as Situasi;
        // await postKondisiStatus(formatData, "kondisi_klien", jenisButton);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Situasi Keluarga Berhasil Dipublish !",
          message: `Data Situasi Keluarga untuk laporan ${laporan.nama_klien} berhasil Dipublish!`,
        });
      } else if (jenisButton == 1 && laporan.situasi_keluarga != null){
        (await patchLaporan(formatData, laporan.id)) as Situasi;
        // await postKondisiStatus(formatData, "kondisi_klien", jenisButton);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Situasi Keluarga Berhasil Diedit !",
          message: `Data Situasi Keluarga untuk laporan ${laporan.nama_klien} berhasil Diedit!`,
        });

      }
        else {
        (await patchLaporan(formatData, laporan.id)) as Situasi;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Data Situasi Keluarga Sukses Dibuat !",
          message: `Data Situasi Keluarga untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Detail Situasi Keluarga
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
                laporan.situasi_keluarga ? laporan.situasi_keluarga: ""
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
