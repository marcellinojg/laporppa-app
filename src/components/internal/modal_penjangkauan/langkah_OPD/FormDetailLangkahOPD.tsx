import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea, InputText } from "../../../form/Input"
import { SubmitHandler,  useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"
import { useState } from "react"
import useLoader from "../../../../hooks/useLoader"
import { deleteLangkahOPD, getLaporan, patchLaporan, postLangkahOPD } from "../../../../api/laporan"
import { ALERT_TYPE } from "../../../../consts/alert"
import { useAlert } from "../../../../hooks/useAlert"
import { DeleteButton } from "../../../form/PenjangkauanButtons";
import Datepicker from "../../../form/Datepicker";
import { formatDateIndonesia } from "../../../../helpers/formatDate";
import DetailLaporanItem from "../../detail_pelaporan/DetailLaporanItem"
import { LangkahOPD } from "../../../../consts/langkahOPD"
import { format } from "date-fns";
import { LangkahOPDLoader } from "../../../../helpers/fetchHelpers"
import Uploader from "../../../form/Uploader"

const FormDetailLangkahOPD = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const [langkahs, setLangkahs] = useState<LangkahOPD[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue
  } = useForm<LangkahOPD>();
  // console.log(laporan)

  const publishLangkah = async () => {
    try {
      const formatDataStatus = {
        // ...laporan,
        status_lintas_opd: 2,
        updated_at_lintas_opd: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_lintas_opd: laporan.satgas_pelapor.id,
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
      const formatDataStatus = {
        updated_at_lintas_opd: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updated_by_lintas_opd: laporan.satgas_pelapor.id,
      };
     
      setIsLoading(true);
      showLoader();
      await deleteLangkahOPD(id);
      await patchLaporan(formatDataStatus, laporan.id);
      setRefetch!(true);
      // addAlert({
      //   type: ALERT_TYPE.SUCCESS,
      //   title: "Keluarga Klien Berhasil Ditambahkan !",
      //   message: `Keluarga Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
      // });

      hideLoader();
      const updatedLangkahs = langkahs.filter(
        (langkah) => langkah.id !== id
      );
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

  const onSubmit: SubmitHandler<LangkahOPD> = async (
    data: LangkahOPD
  ) => {
    const formatData: LangkahOPD = {
      ...data,
      laporan_id: laporan.id,
      tanggal_pelayanan: format(
        new Date(data.tanggal_pelayanan),
        "yyyy-MM-dd HH:mm:ss"
      )
    };

    console.log(formatData)

    const formatDataStatus = {
      status_lintas_opd: 1,
      updated_at_lintas_opd: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      updated_by_lintas_opd: laporan.satgas_pelapor.id,
    };

    try {
      setIsLoading(true);
      showLoader();
      (await postLangkahOPD(formatData)) as LangkahOPD;
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
      setRefetch!(true);
      hideLoader();
      reset();
    }

    setTimeout(() => setIsLoading(false), 3000);
  };
  return (
    <>
      <span className="font-bold text-lg">
        <span className="text-primary">{capitalize(mode)}</span> Detail Langkah
        yang Telah Dilakukan OPD
      </span>
      <div className="flex flex-col gap-2 py-3">
        <form
          className="border-b-2 flex flex-col gap-3 py-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SectionTitle>Detail Langkah yang Telah Dilakukan OPD</SectionTitle>
          <Datepicker
            name="tanggal_pelayanan"
            control={control}
            isRequired
            defaultValue={null}
            placeholder="Tanggal Pelayanan OPD"
            label="Tanggal Pelayanan OPD"
          />
          <InputText
            register={register}
            errors={errors}
            name="instansi"
            placeholder="Instansi"
            label="Instansi"
            isRequired
          />
          <InputText
            register={register}
            errors={errors}
            name="pelayanan_diberikan"
            placeholder="Masukkan langkah yang dilakukan"
            label="Pelayanan yang Diberikan"
            isRequired
          />
          <TextArea
            name="deskripsi_pelayanan"
            register={register}
            errors={errors}
            isRequired={true}
            label="Deskripsi Pelayanan yang Diberikan"
            placeholder="Ceritakan pelayanan yang telah diberikan"
          />
           <div className="text-base">Dokumentasi Pelayanan
            <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                Hanya Menerima 1
            </span>
            <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                Menerima File Foto (jpeg/jpg/png). Maks ukuran file 10MB 
            </p></div>
          <Uploader
              name='dokumentasi'
              control={control}
              watch={watch}
              placeholder='Upload dokumen langkah OPD'
              setValue={setValue}
              register={register}
              errors={errors}
              isRequired={false}
              errorLabel='Dokumen Langkah'
              isMultiple={false}
          />
          <PrimaryButton className="py-2" isSubmit>
            Tambah Langkah OPD
          </PrimaryButton>
        </form>
        <LangkahOPDLoader data={langkahs} setData={setLangkahs} key={langkahs.length} id={laporan.id}>
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
                    label="Instansi"
                    value={langkah.instansi ? langkah.instansi : "-"}
                  />
                  <DetailLaporanItem
                    label="Pelayanan yang Diberikan"
                    value={
                      langkah.pelayanan_diberikan
                        ? langkah.pelayanan_diberikan
                        : "-"
                    }
                  />
                  <DetailLaporanItem
                    label="Deskripsi Pelayanan"
                    value={
                      langkah.deskripsi_pelayanan
                        ? langkah.deskripsi_pelayanan.toString()
                        : "-"
                    }
                  />
                 
                 <div className="border-b-2 flex flex-col gap-3 py-3">
                 <span className="text-slate-400 text-sm">Dokumentasi Pengaduan</span>
            <div className="flex flex-wrap items-center gap-4">
              {langkah.dokumentasi &&
                langkah.dokumentasi.map((url, index) => (
                  <img
                    src={url}
                    width={200}
                    alt={`dokumentasi pengaduan ${index + 1}`}
                    key={index}
                  />
                ))}
            </div>
          </div>
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
                  Langkah OPD Belum Ditambahkan
                </b>
              </div>
            )}
          </div>
        </LangkahOPDLoader>
        <PrimaryButton className="py-2" onClick={() => publishLangkah()}>
          Publish Langkah OPD
        </PrimaryButton>
      </div>
    </>
  );
};

export default FormDetailLangkahOPD