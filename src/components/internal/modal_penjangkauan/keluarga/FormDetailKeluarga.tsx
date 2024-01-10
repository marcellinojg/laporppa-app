import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { SectionTitle } from "../../../common/Typography";
import { PrimaryButton, SecondaryButton } from "../../../form/Button";
import { InputText } from "../../../form/Input";
import { REGEX } from "../../../../consts/regex";
import { useState } from "react";
import { KeluargaKlien } from "../../../../consts/keluarga_klien";
import { Select } from "../../../form/Dropdown";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";
import {
  deleteKeluarga,
  getLaporan,
  patchLaporan,
  postKeluarga,
  postKeluargaKlienStatus,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import useLoader from "../../../../hooks/useLoader";
import { useAlert } from "../../../../hooks/useAlert";
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import {
  HubunganKeluargaLoader,
  KeluargaLoader,
} from "../../../../helpers/fetchHelpers";
import { HubunganKeluarga } from "../../../../consts/hubungan_keluarga";
import { Laporan } from "../../../../consts/laporan";
import { format } from "date-fns";

const FormKeluargaKlien = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<KeluargaKlien>();
  const [keluargas, setKeluargas] = useState<KeluargaKlien[]>([]);
  const [hubunganKeluarga, setHubunganKeluarga] = useState<HubunganKeluarga[]>(
    []
  );

  const publishKeluarga = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_keluarga: 2,
        updated_at_keluarga: format(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      ),
      updated_by_keluarga: laporan.satgas_pelapor.id,

      };
      setIsLoading(true);
      showLoader();
      (await patchLaporan(formatDataStatus, laporan.id))
      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Keluarga Klien Berhasil Dibuat !",
        message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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

  const delKeluarga = async (id: number) => {
    try {
      const formatDataStatus = {
        updated_at_keluarga: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_keluarga: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await deleteKeluarga(id);
      await patchLaporan(formatDataStatus, laporan.id);
      setRefetch!(true);
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      const updatedKeluargas = keluargas.filter(
        (keluarga) => keluarga.id !== id
      );
      setKeluargas(updatedKeluargas);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const onSubmit: SubmitHandler<KeluargaKlien> = async (
    data: KeluargaKlien
  ) => {
    const formatData: KeluargaKlien = {
      ...data,
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
    };

    const formatDataStatus = {
      // ...laporan,
      status_keluarga: 1,
      updated_at_keluarga: format(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      ),
      updated_by_keluarga: laporan.satgas_pelapor.id,

    };

    try {
      setIsLoading(true);
      showLoader();
      (await postKeluarga(formatData)) as KeluargaKlien;
      await patchLaporan(formatDataStatus, laporan.id);
      reset();
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      setRefetch!(true);
      setKeluargas((prevKeluarga) => [...prevKeluarga, formatData]);

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
        <span className="text-primary">{capitalize(mode)}</span> Detail Keluarga
      </span>
      <HubunganKeluargaLoader
        data={hubunganKeluarga}
        setData={setHubunganKeluarga}
      >
        <div className="flex flex-col gap-2 py-3">
          <form
            className="border-b-2 flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SectionTitle>Detail Keluarga</SectionTitle>
            <Select
              name="hubungan_id"
              control={control}
              placeholder="Hubungan Dengan Klien"
              label="Hubungan Dengan Klien"
              errors={errors}
              errorLabel="Hubungan"
              // options={[{ label: "Ayah Kandung", value: 1 }]}
              options={hubunganKeluarga.map((k) => ({
                label: k.hubungan,
                value: k.id,
              }))}
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              name="nama_lengkap"
              placeholder="Masukkan nama lengkap"
              label="Nama Lengkap"
              isRequired
            />
            <InputText
              register={register}
              errors={errors}
              name="no_telp"
              regex={REGEX.PHONE_IDN}
              placeholder="08xxxxxxxxx"
              label="No. Telepon/Whatsapp"
              isRequired
            />
            <PrimaryButton className="py-2" isSubmit>
              Tambah Keluarga
            </PrimaryButton>
          </form>
          <KeluargaLoader
            key={keluargas.length}
            setData={setKeluargas}
            data={keluargas}
            id={laporan.id}
          >
            <div className="border-b-2 flex flex-col gap-3 py-3">
              {keluargas.length > 0 ? (
                keluargas.map((keluarga, index) => (
                  <div
                    key={index}
                    className="shadow-md p-5 rounded gap-2 flex flex-col"
                  >
                    <SectionTitle>{`Keluarga ${index + 1}`}</SectionTitle>
                    <DetailLaporanItem
                      label="Hubungan dengan Klien"
                      value={
                        keluarga.hubungan?.hubungan
                          ? keluarga.hubungan.hubungan
                          : "-"
                      }
                    />
                    <DetailLaporanItem
                      label="Nama Lengkap"
                      value={
                        keluarga.nama_lengkap ? keluarga.nama_lengkap : "-"
                      }
                    />
                    <DetailLaporanItem
                      label="No. Telepon/Whatsapp"
                      value={
                        keluarga.no_telp ? keluarga.no_telp.toString() : "-"
                      }
                    />
                    <div className="flex flex-row-reverse items-end gap-3">
                      <DeleteButton
                        onClick={() => delKeluarga(keluarga.id)}
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
                    Keluarga Belum Ditambahkan
                  </b>
                </div>
              )}
            </div>
          </KeluargaLoader>
          <PrimaryButton className="py-2" onClick={() => publishKeluarga()}>
            Publish Keluarga Klien
          </PrimaryButton>
        </div>
      </HubunganKeluargaLoader>
    </>
  );
};

export default FormKeluargaKlien;
