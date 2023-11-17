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
import { format } from "date-fns";
import useLoader from "../../../../hooks/useLoader";
import {
  getLaporan,
  patchDetailKasus,
  patchPenjadwalan,
  postDetailKasus,
  postPenjadwalan,
} from "../../../../api/laporan";
import { useAlert } from "../../../../hooks/useAlert";
import { ALERT_TYPE } from "../../../../consts/alert";
import { JenisKasus } from "../../../../consts/jenis_kasus";
import { JenisKasusesLoader, KategoriKasusesLoader, KategoriLoader } from "../../../../helpers/fetchHelpers";
import { Select } from "../../../form/Dropdown";

export interface DetailKasus {
  laporan_id: string;
  id?: number;
  kategori_kasus: Kategori;
  jenis_kasus: JenisKasus;
  lokasi_kasus: string;
  tanggal_jam_kejadian: Date | string;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}

const FormDetailKasus = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [kategoriKasues, setKategoriKasues] = useState<Kategori[]>([]);
  const [jenisKasus, setJenisKasus] = useState<JenisKasus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const form = useForm<DetailKasus>();
  const { errorFetchAlert, addAlert } = useAlert();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;

  const onSubmit: SubmitHandler<DetailKasus> = async (data: DetailKasus) => {
    console.log(data);
    const formatData: DetailKasus = {
      ...data,
      laporan_id: laporan.id,
      tanggal_jam_kejadian: format(new Date(data.tanggal_jam_kejadian), "yyyy-MM-dd HH:mm:ss"),
      id: laporan.detail_kasus?.id
    };

    try {
      setIsLoading(true);
      showLoader();
      if (
        laporan.detail_kasus?.kategori_kasus.nama != null ||
        laporan.detail_kasus?.jenis_kasus.nama != null ||
        laporan.detail_kasus?.lokasi_kasus != null ||
        laporan.detail_kasus?.tanggal_jam_kejadian != null
      ) {
        (await patchDetailKasus(formatData)) as DetailKasus;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Detail Kasus Klien Sukses Diedit !",
          message: `Detail Kasus Klien untuk laporan ${laporan.nama_klien} berhasil diedit!`,
        });
      } else {
        (await postDetailKasus(formatData)) as DetailKasus;
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Detail Kasus Klien Sukses Dibuat !",
          message: `Detail Kasus Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Detail Kasus
        Klien
      </span>
      <JenisKasusesLoader data={jenisKasus} setData={setJenisKasus}>
        <KategoriKasusesLoader data={kategoriKasues} setData={setKategoriKasues}>
          <div className="flex flex-col gap-2 py-3">
            <form
              className="flex flex-col gap-3 py-3"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="border-b-2 flex flex-col gap-3 py-3">
                <Select
                  name="kategori_kasus_id"
                  control={control}
                  placeholder="Pilih Kategori Kasus"
                  label="Kategori Kasus"
                  errors={errors}
                  errorLabel="Kategori Kasus"
                  options={kategoriKasues.map((k) => ({
                    label: k.nama,
                    value: k.id,
                  }))}
                  defaultValue={laporan?.detail_kasus?.kategori_kasus?.id}
                  isRequired={false}
                />
                <Select
                  name="jenis_kasus_id"
                  control={control}
                  placeholder="Pilih Jenis Kasus"
                  label="Jenis Kasus"
                  errors={errors}
                  errorLabel="Jenis Kasus"
                  options={jenisKasus.map((k) => ({
                    label: k.nama,
                    value: k.id,
                  }))}
                  defaultValue={laporan?.detail_kasus?.jenis_kasus?.id}
                  isRequired={false}
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="lokasi_kasus"
                  placeholder="Lokasi Kasus"
                  label="Lokasi Kasus"
                  defaultValue={laporan.detail_kasus?.lokasi_kasus}
                />
                <Datepicker
                  name="tanggal_jam_kejadian"
                  control={control}
                  defaultValue={
                    laporan.detail_kasus?.tanggal_jam_kejadian
                      ? new Date(laporan.detail_kasus.tanggal_jam_kejadian)
                      : null
                  }
                  placeholder="Tanggal Jam Kejadian"
                  label="Tanggal Jam Kejadian"
                />
              </div>
              <PrimaryButton className="py-2" isSubmit>
                {laporan.detail_kasus?.kategori_kasus.nama != null ||
                laporan.detail_kasus?.jenis_kasus.nama != null ||
                laporan.detail_kasus?.lokasi_kasus != null ||
                laporan.detail_kasus?.tanggal_jam_kejadian != null
                  ? "Edit Penjadwalan"
                  : "Tambahkan Penjadwalan"}
              </PrimaryButton>
            </form>
          </div>
        </KategoriKasusesLoader>
      </JenisKasusesLoader>
    </>
  );
};

export default FormDetailKasus;
