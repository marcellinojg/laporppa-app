import { useForm, SubmitHandler } from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { SectionTitle } from "../../../common/Typography";
import { PrimaryButton, SecondaryButton } from "../../../form/Button";
import Pendidikan from "../../../../consts/pendidikan";
import { InputText } from "../../../form/Input";
import { Kota } from "../../../../consts/kota";
import { Kecamatan } from "../../../../consts/kecamatan";
import { useEffect, useState } from "react";
import { Kelurahan } from "../../../../consts/kelurahan";
import { Agama } from "../../../../consts/agama";
import { Pekerjaan } from "../../../../consts/pekerjaan";
import { StatusPerkawinan } from "../../../../consts/status_perkawinan";
import { BPJS } from "../../../../consts/BPJS";
import {
  AgamaLoader,
  BPJSLoader,
  KecamatanLoader,
  KelurahanLoader,
  KotaLoader,
  PekerjaanLoader,
  PendidikanLoader,
  StatusPekawinanLoader,
} from "../../../../helpers/fetchHelpers";
import { Select } from "../../../form/Dropdown";
import Datepicker from "../../../form/Datepicker";
import useLoader from "../../../../hooks/useLoader";
import AutosaveFormEffect from "../../../../helpers/formSaveHelpers";
import { useLocalStorage } from "usehooks-ts";
import { REGEX } from "../../../../consts/regex";
import {
  getLaporan,
  patchDetailKlien,
  patchLaporan,
  postDetailKlien,
  postDetailKlienStatus,
} from "../../../../api/laporan";
import { SatgasPelapor } from "../../../../consts/satgas";
import { ALERT_TYPE } from "../../../../consts/alert";
import { useAlert } from "../../../../hooks/useAlert";
import { format } from "date-fns";

export interface DetailKlien {
  id?: number;
  laporan_id: string;
  kota: Kota;
  satgas: SatgasPelapor;
  nama_klien: string;
  nik_klien: string;
  alamat_klien: string;
  warga_surabaya: number;
  kecamatan: Kecamatan;
  jenis_kelamin: string;
  no_kk: number;
  no_wa: number;
  alamat_kk: string;
  kecamatan_kk: Kecamatan;
  kelurahan_kk: Kelurahan;
  kota_lahir: Kota;
  tanggal_lahir: Date | string;
  agama: Agama;
  usia: number;
  kategori_klien: string;
  jenis_klien: string;
  pekerjaan: Pekerjaan;
  penghasilan_bulanan: number;
  status_perkawinan: StatusPerkawinan;
  bpjs: BPJS;
  pendidikan_kelas: string;
  pendidikan_instansi: string;
  pendidikan_jurusan: string;
  pendidikan_thn_lulus: number;
}

const FormDetailKlien = (props: FormModal) => {
  const { mode, laporan, setRefetch, setIsModalActive } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showLoader, hideLoader } = useLoader();
  const { errorFetchAlert, addAlert } = useAlert();
  const form = useForm<DetailKlien>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const [kotas, setKotas] = useState<Kota[]>([]);
  const [pendidikans, setPendidikans] = useState<Pendidikan[]>([])
  const [kecamatans, setKecamatans] = useState<Kecamatan[]>([]);
  const [kategoris, setKategoris] = useState<Kategori[]>([]);
  const [kelurahans, setKelurahans] = useState<Kelurahan[]>([]);
  const [agamas, setAgamas] = useState<Agama[]>([]);
  const [pekerjaans, setPekerjaans] = useState<Pekerjaan[]>([]);
  const [statusPerkawinans, setStatusPerkawinans] = useState<
    StatusPerkawinan[]
  >([]);
  const [bpjses, setBpjses] = useState<BPJS[]>([]);
  const [formState, setFormState] = useLocalStorage<string | null>(
    "form_internal_state",
    null
  );
  const [jenisButton, setJenisButton] = useState(1)
  const [isKelurahanDisabled, setIsKelurahanDisabled] = useState(true);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(null);


  useEffect(() => {
    const kecamatanId = form.watch("kecamatan_kk_id");
    setSelectedKecamatan(kecamatanId || null);
    setIsKelurahanDisabled(!kecamatanId);
  }, [form.watch("kecamatan_kk_id")]);



  const onSubmit: SubmitHandler<DetailKlien> = async (data: DetailKlien) => {
    // console.log(jenisButton)
    const formatData: DetailKlien = {
      ...data,
      laporan_id: laporan.id,
      satgas_id: laporan.satgas_pelapor.id,
      tanggal_lahir: format(new Date(data.tanggal_lahir), "yyyy-MM-dd"),
      id: laporan.detail_klien?.id
    };

    const formatDataStatus = {
      status_detail_klien: jenisButton,
      pendidikan_id: data.pendidikan_id,
      updated_at_detail_klien: format(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      ),
      updated_by_detail_klien: laporan.satgas_pelapor.id,
    }

    try {
      setIsLoading(true);
      showLoader();
      if (laporan.detail_klien?.id != null) {
        (await patchDetailKlien(formatData)) as DetailKlien;
        // await postDetailKlienStatus(formatData, "detail_klien", jenisButton);
        await patchLaporan(formatDataStatus, laporan.id);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Detail Klien Berhasil Diedit !",
          message: `Detail Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
        });
      } else {
        (await postDetailKlien(formatData)) as DetailKlien;
        // await postDetailKlienStatus(formatData, "detail_klien", jenisButton);
        await patchLaporan(formatDataStatus, laporan.id);
        reset();
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: "Detail Klien Sukses Dibuat !",
          message: `Detail Klien untuk laporan ${laporan.nama_klien} berhasil dibuat!`,
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
        <span className="text-primary">{capitalize(mode)}</span> Detail Klien
      </span>
      <BPJSLoader data={bpjses} setData={setBpjses}>
        <StatusPekawinanLoader
          data={statusPerkawinans}
          setData={setStatusPerkawinans}
        >
          <PendidikanLoader data={pendidikans} setData={setPendidikans}>
            <PekerjaanLoader data={pekerjaans} setData={setPekerjaans}>
              <AgamaLoader data={agamas} setData={setAgamas}>
                <KotaLoader data={kotas} setData={setKotas}>
                  <KelurahanLoader data={kelurahans} setData={setKelurahans}>
                    <KecamatanLoader data={kecamatans} setData={setKecamatans}>
                      {/* <AutosaveFormEffect
                      setValue={setValue}
                      watch={watch}
                      formState={formState}
                      setFormState={setFormState}
                    > */}
                      <div className="flex flex-col gap-2 py-3">
                        <form
                          className="flex flex-col gap-3 py-3"
                          action=""
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="border-b-2 flex flex-col gap-3 py-3">
                            <SectionTitle>Identitas Klien</SectionTitle>
                            <InputText
                              register={register}
                              errors={errors}
                              name="nama_klien"
                              placeholder="Nama Lengkap"
                              label="Nama Lengkap"
                              defaultValue={laporan.nama_klien}
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              name="nik_klien"
                              placeholder="NIK Klien"
                              label="NIK Klien"
                              defaultValue={laporan.nik_klien}
                              isRequired
                              regex={REGEX.NIK}
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              name="alamat_klien"
                              placeholder="Alamat Domisili Klien"
                              label="Alamat Domisili Klien"
                              defaultValue={laporan.alamat_klien}
                              isRequired
                            />
                            <Select
                              name="kecamatan_id"
                              control={control}
                              placeholder="Pilih Kecamatan"
                              label="Kecamatan Klien"
                              errors={errors}
                              errorLabel="Kecamatan Domisili"
                              options={kecamatans
                                .filter((k) => k.is_active === true && k.id_kabupaten === 1)
                                .map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                              defaultValue={
                                laporan?.detail_klien?.kecamatan?.id
                              }
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={laporan.detail_klien?.no_kk?.toString()}
                              name="no_kk"
                              placeholder="No Kartu Keluarga"
                              label="Nomor Kartu Keluarga"
                              isRequired
                              regex={REGEX.NIK}
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={laporan.detail_klien?.alamat_kk}
                              name="alamat_kk"
                              placeholder="Alamat Sesuai Kartu Keluarga"
                              label="Alamat Sesuai Kartu Keluarga"
                              isRequired
                            />
                            <Select
                              name="kecamatan_kk_id"
                              control={control}
                              placeholder="Pilih Kecamatan"
                              label="Kecamatan KK"
                              errors={errors}
                              errorLabel="Kecamatan KK"
                              options={kecamatans
                                .filter((k) => k.is_active === true && k.id_kabupaten === 1)
                                .map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                              defaultValue={
                                laporan?.detail_klien?.kecamatan_kk?.id
                              }
                              isRequired
                            />
                            <Select
                              name="kelurahan_kk_id"
                              control={control}
                              placeholder="Pilih Kelurahan"
                              label="Kelurahan KK"
                              errors={errors}
                              errorLabel="Kelurahan KK"
                              options={kelurahans
                                .filter((k) => k.is_active === true && k.id_kecamatan === selectedKecamatan)
                                .map((k) => ({
                                  label: k.name,
                                  value: k.id,
                                }))}
                              defaultValue={
                                laporan?.detail_klien?.kelurahan_kk?.id
                              }
                              isRequired
                              isDisabled={isKelurahanDisabled}
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={laporan.detail_klien?.no_wa?.toString()}
                              name="no_wa"
                              placeholder="Nomor Telepon / WhatsApp"
                              label="No. Telp / WhatsApp"
                              isRequired
                              regex={REGEX.PHONE_IDN}
                            />
                            <Select
                              name="kota_lahir_id"
                              control={control}
                              placeholder="Pilih Kota"
                              label="Kota Lahir"
                              errors={errors}
                              defaultValue={laporan.detail_klien?.kota?.id}
                              errorLabel="Kota Lahir"
                              // options={[{ label: "Surabaya", value: 1 }]}
                              options={kotas.map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                              isRequired
                            />
                            <Datepicker
                              name="tanggal_lahir"
                              control={control}
                              isRequired
                              placeholder="Tanggal Lahir"
                              label="Tanggal Lahir"
                              defaultValue={
                                laporan.detail_klien?.tanggal_lahir
                                  ? new Date(laporan.detail_klien.tanggal_lahir)
                                  : null
                              }
                            />
                            {/* <InputText
                            register={register}
                            errors={errors}
                            defaultValue={laporan.detail_klien?.usia?.toString()}
                            name="usia"
                            placeholder="Usia"
                            label="Usia"
                            isRequired
                          /> */}
                            <Select
                              name="kategori_klien"
                              control={control}
                              placeholder="Pilih kategori Klien"
                              label="Kategori Klien"
                              errors={errors}
                              errorLabel="Kategori Klien"
                              defaultValue={
                                laporan.detail_klien?.kategori_klien
                              }
                              options={[
                                { label: "Anak", value: "anak" },
                                { label: "Dewasa", value: "dewasa" },
                              ]}
                              //   options={kotas.map((k) => ({
                              //     label: k.nama,
                              //     value: k.id,
                              //   }))}
                              isRequired
                            />

                            <Select
                              name="jenis_klien"
                              control={control}
                              placeholder="Pilih Jenis Klien"
                              label="Jenis Klien"
                              errors={errors}
                              errorLabel="Jenis Klien"
                              defaultValue={laporan.detail_klien?.jenis_klien}
                              options={[
                                { label: "Umum", value: "umum" },
                                { label: "Disabilitas", value: "disabilitas" },
                              ]}
                              //   options={kotas.map((k) => ({
                              //     label: k.nama,
                              //     value: k.id,
                              //   }))}
                              isRequired
                            />
                            <Select
                              name="jenis_kelamin"
                              control={control}
                              placeholder="Pilih Jenis Kelamin"
                              label="Jenis Kelamin"
                              errors={errors}
                              errorLabel="Jenis Kelamin"
                              defaultValue={laporan.jenis_kelamin}
                              options={[
                                { label: "Laki-laki", value: "L" },
                                { label: "Perempuan", value: "P" },
                              ]}
                              //   options={kotas.map((k) => ({
                              //     label: k.nama,
                              //     value: k.id,
                              //   }))}
                              isRequired
                            />
                            <Select
                              name="agama_id"
                              control={control}
                              placeholder="Pilih Agama"
                              label="Agama"
                              errors={errors}
                              defaultValue={laporan.detail_klien?.agama.id}
                              errorLabel="Agama"
                              options={agamas.map((k) => ({
                                label: k.nama,
                                value: k.id,
                              }))}
                              isRequired
                            />
                            <Select
                              name="pekerjaan_id"
                              control={control}
                              placeholder="Pilih Pekerjaan"
                              label="Pekerjaan"
                              errors={errors}
                              defaultValue={laporan.detail_klien?.pekerjaan?.id}
                              errorLabel="Pekerjaan"
                              // options={[{ label: "Pekerjaan 1", value: 1 }]}
                              options={pekerjaans
                                .filter((k) => k.is_active === true)
                                .map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={laporan.detail_klien?.penghasilan_bulanan?.toString()}
                              name="penghasilan_bulanan"
                              placeholder="Penghasilan/Bulan"
                              label="Penghasilan/Bulan"
                              type="number"
                              isRequired
                            />
                            <Select
                              name="status_perkawinan_id"
                              control={control}
                              placeholder="Pilih Status Perkawinan"
                              label="Status Perkawinan"
                              errors={errors}
                              errorLabel="Status Perkawinan"
                              defaultValue={
                                laporan.detail_klien?.status_perkawinan?.id
                              }
                              // options={[{ label: "Cerai Hidup", value: 3 }]}
                              options={statusPerkawinans.map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                              isRequired
                            />
                            <Select
                              name="bpjs_id"
                              control={control}
                              placeholder="Pilih Kepemilikan BPJS"
                              label="Kepemilikan BPJS"
                              errors={errors}
                              errorLabel="Kepemilikan BPJS"
                              defaultValue={laporan.detail_klien?.bpjs?.id}
                              // options={[{ label: "Mandiri", value: 3 }]}
                              options={bpjses.map((k) => ({
                                label: k.nama,
                                value: k.id,
                              }))}
                              isRequired
                            />
                          </div>

                          <div className="border-b-2 flex flex-col gap-3 py-3">
                            <SectionTitle>Pendidikan Klien</SectionTitle>
                            <Select
                              name="pendidikan_id"
                              control={control}
                              placeholder="Pilih Pendidikan"
                              label="Pendidikan"
                              errors={errors}
                              defaultValue={laporan.pendidikan?.id}
                              errorLabel="Pendidikan"
                              options={pendidikans
                                .filter((k) => k.is_active === true)
                                .map((k) => ({
                                label: k.name,
                                value: k.id,
                              }))}
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={
                                laporan.detail_klien?.pendidikan_kelas
                              }
                              name="pendidikan_kelas"
                              placeholder="Pendidikan Kelas"
                              label="Pendidikan Kelas"
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={
                                laporan.detail_klien?.pendidikan_instansi
                              }
                              name="pendidikan_instansi"
                              placeholder="Pendidikan Instansi"
                              label="Pendidikan Instansi"
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={
                                laporan.detail_klien?.pendidikan_jurusan
                              }
                              name="pendidikan_jurusan"
                              placeholder="Pendidikan Jurusan"
                              label="Pendidikan Jurusan"
                              isRequired
                            />
                            <InputText
                              register={register}
                              errors={errors}
                              defaultValue={laporan.detail_klien?.pendidikan_thn_lulus?.toString()}
                              name="pendidikan_thn_lulus"
                              placeholder="Tahun Lulus"
                              label="Tahun Lulus"
                              type="number"
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
                      {/* </AutosaveFormEffect> */}
                    </KecamatanLoader>
                  </KelurahanLoader>
                </KotaLoader>
              </AgamaLoader>
            </PekerjaanLoader>
          </PendidikanLoader>
        </StatusPekawinanLoader>
      </BPJSLoader>
    </>
  );
};

export default FormDetailKlien;
