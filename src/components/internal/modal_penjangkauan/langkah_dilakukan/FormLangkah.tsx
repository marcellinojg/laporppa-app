import { SectionTitle } from "../../../common/Typography";
import capitalize from "../../../../helpers/capitalize";
import { TextArea, InputText } from "../../../form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { PrimaryButton } from "../../../form/Button";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import { useState } from "react";
import useLoader from "../../../../hooks/useLoader";
import {
  deleteLangkahBadanDaerah,
  getLaporan,
  patchLaporan,
  postLangkahBadanDaerah,
} from "../../../../api/laporan";
import { ALERT_TYPE } from "../../../../consts/alert";
import { useAlert } from "../../../../hooks/useAlert";
import { LangkahBadanDaerah } from "../../../../consts/langkahBadanDaerah";
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import Datepicker from "../../../form/Datepicker";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem";
import { format } from "date-fns";
import { LangkahBadanDaerahLoader } from "../../../../helpers/fetchHelpers";
import { formatDateIndonesia } from "../../../../helpers/formatDate";
import Uploader from "../../../form/Uploader";


const FormDetailLangkah = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const [langkahs, setLangkahs] = useState<LangkahBadanDaerah[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue
  } = useForm<LangkahBadanDaerah>();
  // console.log(laporan)

  const publishLangkah = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_langkah_telah_dilakukan: 2,
        updated_at_langkah_telah_dilakukan: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_langkah_telah_dilakukan: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await patchLaporan(formatDataStatus, laporan.id);
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
      const formatDataStatus = {
        updated_at_langkah_telah_dilakukan: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_langkah_telah_dilakukan: laporan.satgas_pelapor.id,
      };

      setIsLoading(true);
      showLoader();
      await deleteLangkahBadanDaerah(id);
      await patchLaporan(formatDataStatus, laporan.id);
      setRefetch!(true);
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      const updatedKeluargas = langkahs.filter((langkah) => langkah.id !== id);
      setLangkahs(updatedKeluargas);
    } catch {
      errorFetchAlert();
    } finally {
      getLaporan(laporan.id);
      setIsLoading(false);
      hideLoader();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };

  const onSubmit: SubmitHandler<LangkahBadanDaerah> = async (data: LangkahBadanDaerah) => {
    const formatData: LangkahBadanDaerah = {
      ...data,
      laporan_id: laporan.id,
      tanggal_pelayanan: format(
        new Date(data.tanggal_pelayanan),
        "yyyy-MM-dd HH:mm:ss"
      ),
    };

    // console.log(formatData);

    const formatDataStatus = {
      status_langkah_telah_dilakukan: 1,
      updated_at_langkah_telah_dilakukan: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updated_by_langkah_telah_dilakukan: laporan.satgas_pelapor.id,
    };

    try {
      setIsLoading(true);
      showLoader();
      (await postLangkahBadanDaerah(formatData)) as LangkahBadanDaerah;
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
        <span className="text-primary">{capitalize(mode)}</span> Detail Langkah
        yang Telah Dilakukan Kelurahan
      </span>
      <div className="flex flex-col gap-2 py-3">
        <form
          className="border-b-2 flex flex-col gap-3 py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SectionTitle>Detail Langkah yang Telah Dilakukan Kelurahan</SectionTitle>
          <Datepicker
            name="tanggal_pelayanan"
            control={control}
            isRequired
            defaultValue={null}
            placeholder="Tanggal Pelayanan Kelurahan"
            label="Tanggal Pelayanan Kelurahan"
          />
          <InputText
            register={register}
            errors={errors}
            name="pelayanan_yang_diberikan"
            placeholder="Masukkan langkah yang dilakukan"
            label="Pelayanan yang Diberikan"
            isRequired
          />
          <TextArea
            name="deskripsi"
            register={register}
            errors={errors}
            isRequired={true}
            label="Deskripsi Pelayanan yang Diberikan"
            placeholder="Ceritakan pelayanan yang telah diberikan"
          />
          <Uploader
              name='dokumen'
              control={control}
              watch={watch}
              placeholder='Upload dokumen langkah dari kelurahan'
              setValue={setValue}
              register={register}
              errors={errors}
              isRequired={false}
              errorLabel='Dokumen Langkah'
              isMultiple={false}
          />
          <PrimaryButton className="py-2" isSubmit>
            Tambah Langkah Kelurahan
          </PrimaryButton>
        </form>
        <LangkahBadanDaerahLoader
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
                  <SectionTitle>{`Langkah ${index + 1}`}</SectionTitle>
                  <DetailLaporanItem
                    label="Tanggal Langkah Dilakukan"
                    value={
                      langkah.tanggal_pelayanan
                        ? formatDateIndonesia(langkah.tanggal_pelayanan)
                        : "-"
                    }
                  />
                  <DetailLaporanItem
                    label="Pelayanan yang Diberikan"
                    value={
                      langkah.pelayanan_yang_diberikan
                        ? langkah.pelayanan_yang_diberikan
                        : "-"
                    }
                  />
                  <DetailLaporanItem
                    label="Deskripsi Pelayanan"
                    value={
                      langkah.deskripsi
                        ? langkah.deskripsi.toString()
                        : "-"
                    }
                  />
                  <DetailLaporanItem
                    label="Dokumentasi Pelayanan"
                    value={langkah.dokumentasi ? langkah.dokumentasi : '-'}
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
                  Langkah Kelurahan Belum Ditambahkan
                </b>
              </div>
            )}
          </div>
        </LangkahBadanDaerahLoader>
        <PrimaryButton className="py-2" onClick={() => publishLangkah()}>
          Publish Langkah Kelurahan
        </PrimaryButton>
      </div>
    </>
  );
};

export default FormDetailLangkah;
