import { SectionTitle } from "../../../common/Typography";
import capitalize from "../../../../helpers/capitalize";
import { InputText, TextArea } from "../../../form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { PrimaryButton } from "../../../form/Button";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import { useState } from "react";
import useLoader from "../../../../hooks/useLoader";
import {
  deleteRAKK,
  deleteRRKK,
  getLaporan,
  patchLaporan,
  postRAKK,
  postRRKK,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import { useAlert } from "../../../../hooks/useAlert";
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";
import { Select } from "../../../form/Dropdown";
import { OPDLoader, RRKKLoader } from "../../../../helpers/fetchHelpers";
import { RRKK } from "../../../../consts/rrkk";
import { format } from "date-fns";
import { Opd } from "../../../../consts/opd";
DetailLaporanItem;

const FormRencanaRujukan = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const [langkahs, setLangkahs] = useState<RRKK[]>([]);
  const [opdes, setOpdes] = useState<Opd[]>([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<RRKK>();
  // console.log(laporan)

  const publishLangkah = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_rrkk: 2,
        updated_at_rrkk: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_rrkk: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await patchLaporan(formatDataStatus, laporan.id);
      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Rencana Rujukan Berhasil Dibuat !",
        message: `Rencana Rujukan untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        updated_at_rrkk: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_rrkk: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await deleteRRKK(id);
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

  const onSubmit: SubmitHandler<RRKK> = async (data: RRKK) => {
    const formatData: RRKK = {
      ...data,
      laporan_id: laporan.id,
      // opd: "Surabaya"
    };

    // console.log(formatData);

    const formatDataStatus = {
      status_rrkk: 1,
      updated_at_rrkk: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updated_by_rrkk: laporan.satgas_pelapor.id,
    };

    try {
      setIsLoading(true);
      showLoader();
      (await postRRKK(formatData)) as RRKK;
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
      <OPDLoader
        data={opdes}
        setData={setOpdes}
      >
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
            {/* <InputText
            register={register}
            errors={errors}
            name="opd"
            placeholder="OPD"
            label="OPD"
            defaultValue={"Surabaya"}
            isRequired
            isDisabled
          /> */}
            <Select
              name="opd"
              control={control}
              placeholder="Pilih OPD"
              label="OPD"
              errors={errors}
              errorLabel="OPD"
              options={opdes.map((k) => ({
                label: k.name,
                value: k.name,
              }))}
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              name="layanan_yang_diberikan"
              placeholder="Layanan yang Diberikan"
              label="Layanan yang Diberikan"
              isRequired
            />
            <PrimaryButton className="py-2" isSubmit>
              Tambah Rencana Rujukan
            </PrimaryButton>
          </form>
          <RRKKLoader
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
                      label="OPD"
                      value={langkah.opd ? langkah.opd : "-"}
                    />
                    <DetailLaporanItem
                      label="Layanan yang Diberikan"
                      value={langkah.layanan_yang_diberikan ? langkah.layanan_yang_diberikan : "-"}
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
                    Rencana Rujukan Belum Ditambahkan
                  </b>
                </div>
              )}
            </div>
          </RRKKLoader>
          <PrimaryButton className="py-2" onClick={() => publishLangkah()}>
            Publish Rencana Rujukan
          </PrimaryButton>
        </div>
      </OPDLoader>
    </>
  );
};

export default FormRencanaRujukan;
