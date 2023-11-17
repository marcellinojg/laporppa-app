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
  postKeluarga,
  postKeluargaKlienStatus,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import useLoader from "../../../../hooks/useLoader";
import { useAlert } from "../../../../hooks/useAlert";
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import { KeluargaLoader } from "../../../../helpers/fetchHelpers";

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

  const publishKeluarga = () => {
    postKeluargaKlienStatus(laporan.id, "keluarga-klien", 2)
    setIsModalActive(false);
  }

  const delKeluarga = async (id: number) => {
    try {
      setIsLoading(true);
      showLoader();
      (await deleteKeluarga(id));
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

    try {
      setIsLoading(true);
      showLoader();
      (await postKeluarga(formatData)) as KeluargaKlien;
      postKeluargaKlienStatus(laporan.id, "keluarga-klien", 1)
      reset();
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      setRefetch!(true);
      setKeluargas((prevKeluarga) => [...prevKeluarga, formatData])

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
            options={[{ label: "Ayah Kandung", value: 1 }]}
            // options={kotas.map((k) => ({
            //   label: k.nama,
            //   value: k.id,
            // }))}
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
            {keluargas &&
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
                    value={keluarga.nama_lengkap ? keluarga.nama_lengkap : "-"}
                  />
                  <DetailLaporanItem
                    label="No. Telepon/Whatsapp"
                    value={keluarga.no_telp ? keluarga.no_telp.toString() : "-"}
                  />
                  <div className="flex flex-row-reverse items-end gap-3">
                    <DeleteButton
                      onClick={() => delKeluarga(keluarga.id)}
                    ></DeleteButton>
                  </div>
                </div>
              ))}
          </div>
        </KeluargaLoader>
        <PrimaryButton className="py-2" onClick={() => publishKeluarga()}>
          Publish Keluarga Klien
        </PrimaryButton>
      </div>
    </>
  );
};

export default FormKeluargaKlien;
