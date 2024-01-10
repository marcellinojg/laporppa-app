import { SectionTitle } from "../../../common/Typography";
import capitalize from "../../../../helpers/capitalize";
import { TextArea } from "../../../form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { PrimaryButton } from "../../../form/Button";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import { useState } from "react";
import useLoader from "../../../../hooks/useLoader";
import {
  deleteRAKK,
  getLaporan,
  patchLaporan,
  postRAKK,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import { useAlert } from "../../../../hooks/useAlert";
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";
import { RAKK } from "../../../../consts/rakk";
import { Select } from "../../../form/Dropdown";
import { RAKKLoader } from "../../../../helpers/fetchHelpers";
import { format } from "date-fns";
DetailLaporanItem;

const FormRencanaAnalisKebutuhan = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const [langkahs, setLangkahs] = useState<RAKK[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<RAKK>();
  // console.log(laporan)

  const publishLangkah = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_rakk: 2,
        updated_at_rakk: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_rakk: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await patchLaporan(formatDataStatus, laporan.id);
      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Rencana Analis Berhasil Dibuat !",
        message: `Rencana Analis untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      });
      hideLoader();
      setIsModalActive(false);
      setRefetch!(true);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const delLangkah = async (id: number) => {
    try {
      const formatDataStatus = {
        updated_at_rakk: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_rakk: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await deleteRAKK(id);
      await patchLaporan(formatDataStatus, laporan.id);
      setRefetch!(true);
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      const updatedLangkahs = langkahs.filter((langkah) => langkah.id !== id);
      setLangkahs(updatedLangkahs);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const onSubmit: SubmitHandler<RAKK> = async (data: RAKK) => {
    const formatData: RAKK = {
      ...data,
      laporan_id: laporan.id,
    };

    // console.log(formatData);

    const formatDataStatus = {
      status_rakk: 1,
      updated_at_rakk: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updated_by_rakk: laporan.satgas_pelapor.id,
    };

    try {
      setIsLoading(true);
      showLoader();
      (await postRAKK(formatData)) as RAKK;
      await patchLaporan(formatDataStatus, laporan.id);
      reset();
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      setRefetch!(true);
      setLangkahs((prevLangkah) => [...prevLangkah, formatData]);

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
        <span className="text-primary">{capitalize(mode)}</span> Detail Rencana
        Analis Kebutuhan Klien Oleh Kelurahan
      </span>
      <div className="flex flex-col gap-2 py-3">
        <form
          className="border-b-2 flex flex-col gap-3 py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SectionTitle>
            Detail Rencana Analis Kebutuhan Klien Oleh
          </SectionTitle>
          <Select
            name="kebutuhan"
            control={control}
            placeholder="Pilih Jenis Kebutuhan"
            label="Kebutuhan"
            errors={errors}
            errorLabel="Kebutuhan"
            options={[
              { label: "Pendidikan", value: "Pendidikan" },
              { label: "Kesehatan", value: "Kesehatan" },
              { label: "Ekonomi", value: "Ekonomi" },
              { label: "Hukum", value: "Hukum" },
            ]}
            isRequired
          />
          <TextArea
            name="deskripsi"
            register={register}
            errors={errors}
            isRequired={true}
            label="Deskripsi"
            placeholder="Deskripsikan pelayanan yang dilakukan"
          />
          <PrimaryButton className="py-2" isSubmit>
            Tambah Rencana Analis
          </PrimaryButton>
        </form>
        <RAKKLoader
          data={langkahs}
          setData={setLangkahs}
          key={langkahs.length}
          id={laporan.id}
        >
          <div className="border-b-2 flex flex-col gap-3 py-3">
            {langkahs.length > 0 ? (
              langkahs.map((langkah, index) => (
                <div
                  key={index}
                  className="shadow-md p-5 rounded gap-2 flex flex-col"
                >
                  <SectionTitle>{`Pelayanan ${index + 1}`}</SectionTitle>
                  <DetailLaporanItem
                    label="Kebutuhan"
                    value={langkah.kebutuhan ? langkah.kebutuhan : "-"}
                  />
                  <DetailLaporanItem
                    label="Deskripsi"
                    value={langkah.deskripsi ? langkah.deskripsi : "-"}
                  />
                  <div className="flex flex-row-reverse items-end gap-3">
                    <DeleteButton
                      onClick={() => delLangkah(langkah.id)}
                    ></DeleteButton>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-2 pt-0">
                <img
                  src="./images/nodata.png"
                  className=""
                  width={300}
                  alt="No Data illustration"
                />
                <b className="text-xl text-center text-primary">
                  Rencana Analis Belum Ditambahkan
                </b>
              </div>
            )}
          </div>
        </RAKKLoader>
        <PrimaryButton className="py-2" onClick={() => publishLangkah()}>
          Publish Rencana Analis
        </PrimaryButton>
      </div>
    </>
  );
};

export default FormRencanaAnalisKebutuhan;
