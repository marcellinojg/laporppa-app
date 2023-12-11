import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea, InputText } from "../../../form/Input"
import { SubmitHandler,  useForm } from "react-hook-form"
import { PrimaryButton, SecondaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import { useState } from "react"
import useLoader from "../../../../hooks/useLoader"
import { getLaporan, patchLaporan, postLangkah } from "../../../../api/laporan"
import { ALERT_TYPE } from "../../../../consts/alert"
import { useAlert } from "../../../../hooks/useAlert"
import { Laporan } from "../../../../consts/laporan"
import { LangkahDP3A } from "../../../../consts/langkahDP3A"
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import Datepicker from "../../../form/Datepicker";
import TimePicker from "../../../form/Timepicker";
import { combineDateAndTimePelaporan } from "../../../../helpers/formatDate";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"
DetailLaporanItem



export interface LangkahDP3A {
  langkah: string
  laporan_id?: string
  tanggal_langkah: Date
  jam_langkah : string
  tanggal_pelayanan: Date
  pelayanan_yang_diberikan: string
  deskripsi: String
  id?: number
}

const FormDetailLangkahOPD = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const [langkahs, setLangkahs] = useState<LangkahDP3A[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<LangkahDP3A>();
  // console.log(laporan)
  const publishLangkah = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_langkah_telah_dilakukan: 2
      };
     
      setIsLoading(true);
      showLoader();
      (await patchLaporan(formatDataStatus, laporan.id))
      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "Langkah Berhasil Dibuat !",
        message: `Langkah DP3KAPPKB Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
      setIsLoading(true);
      showLoader();
      await delLangkah(id);
      setRefetch!(true);
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      // hideLoader();
      // const updatedKeluargas = keluargas.filter(
      //   (keluarga) => keluarga.id !== id
      // );
      // setKeluargas(updatedKeluargas);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const onSubmit: SubmitHandler<LangkahDP3A> = async (
    data: LangkahDP3A
  ) => {
    const formatData: LangkahDP3A = {
      ...data,
      tanggal_pelayanan: combineDateAndTimePelaporan(
        data.tanggal_langkah,
        data.jam_langkah
      ),
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
    };

    console.log(formatData)

    const formatDataStatus = {
      // ...laporan,
      status_langkah_telah_dilakukan: 1,
      // jenis_kelamin: laporan.jenis_kelamin.toUpperCase()
    };

    try {
      setIsLoading(true);
      showLoader();
      (await postLangkah(formatData)) as LangkahDP3A;
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
        <span className="text-primary">{capitalize(mode)}</span> Detail Langkah yang Telah Dilakukan DP3APPKB
      </span>
        <div className="flex flex-col gap-2 py-3">
          <form
            className="border-b-2 flex flex-col gap-3 py-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SectionTitle>Detail Langkah yang Telah Dilakukan DP3APPKB</SectionTitle>
            <Datepicker
              name="tanggal_langkah"
              control={control}
              isRequired
              defaultValue={
                laporan.langkah_telah_dilakukan?.tanggal_pelayanan
                  ? new Date(laporan.langkah_telah_dilakukan?.tanggal_pelayanan)
                  : null
              }
              placeholder="Tanggal Langkah Dilakukan DP3APPKB"
              label="Tanggal Langkah Dilakukan DP3APPKB"
            />
            <TimePicker
              name="jam_langkah"
              register={register}
              isRequired
              defaultValue={
                laporan.penanganan_awal?.tanggal_penanganan_awal
                  ? `${String(
                      new Date(laporan.langkah_telah_dilakukan?.tanggal_pelayanan).getHours()
                    ).padStart(2, "0")}:${String(
                      new Date(laporan.langkah_telah_dilakukan?.tanggal_pelayanan).getMinutes()
                    ).padStart(2, "0")}`
                  : undefined
              }
              placeholder="Jam Langkah Dilakukan DP3APPKB"
              label="Jam Langkah Dilakukan DP3APPKB"
              errors={errors}
            />
            <InputText
              register={register}
              errors={errors}
              name="pelayanan_yang_diberikan"
              placeholder="Masukkan langkah kebutuhan yang dilakukan"
              label="Kebutuhan"
              isRequired
            />
             <TextArea
                    name="deskripsi"
                    register={register}
                    errors={errors}
                    isRequired={true}
                    label="Deskripsi Pelayanan Yang Diberikan"
                    placeholder="Ceritakan pelayanan yang telah diberikan"
              />
           
            <PrimaryButton className="py-2" isSubmit>
              Tambah Langkah DP3AAPKB
            </PrimaryButton>
          </form>
        
            <div className="border-b-2 flex flex-col gap-3 py-3">
              {langkahs.length > 0 ? (
                langkahs.map((langkah, index) => (
                  <div
                    key={index}
                    className="shadow-md p-5 rounded gap-2 flex flex-col"
                  >
                    <SectionTitle>{`Langkah ${index + 1}`}</SectionTitle>
                    <DetailLaporanItem
                      label="Tanggal Langkah Dilakukan"
                      value={
                        langkah.tanggal_pelayanan
                          ? langkah.tanggal_pelayanan
                          : "-"
                      }
                    />
                    <DetailLaporanItem
                      label="Layanan Kebutuhan yang Diberikan"
                      value={
                        langkah.pelayanan_yang_diberikan ? langkah.pelayanan_yang_diberikan : "-"
                      }
                    />
                    <DetailLaporanItem
                      label="Deskripsi Layanan yang Diberikan"
                      value={
                        langkah.deskripsi ? langkah.deskripsi.toString() : "-"
                      }
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
                    src="/images/nodata.png"
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
          <PrimaryButton className="py-2" onClick={() => publishLangkah()}>
            Publish Langkah OPD
          </PrimaryButton>
        </div>
    </>
  );
};

export default FormDetailLangkahOPD