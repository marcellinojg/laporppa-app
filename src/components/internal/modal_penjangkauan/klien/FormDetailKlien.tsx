import { useForm, SubmitHandler} from "react-hook-form";
import { FormModal } from "../../../../consts/modal_penjangkauan";
import capitalize from "../../../../helpers/capitalize";
import { SectionTitle } from "../../../common/Typography";
import { PrimaryButton } from "../../../form/Button";
import Pendidikan from "../../../../consts/pendidikan";
import { InputText } from "../../../form/Input";
import { Kota } from "../../../../consts/kota";
import { Kecamatan } from "../../../../consts/kecamatan";
import { useState } from "react";
import { Kelurahan } from "../../../../consts/kelurahan";
import { Agama } from "../../../../consts/agama";
import { Pekerjaan } from "../../../../consts/pekerjaan";
import { StatusPerkawinan } from "../../../../consts/status_perkawinan";
import { BPJS } from "../../../../consts/BPJS";
import {
  KecamatanLoader,
  KelurahanLoader,
} from "../../../../helpers/fetchHelpers";
import { Select } from "../../../form/Dropdown";
import Datepicker from "../../../form/Datepicker";
import useLoader from "../../../../hooks/useLoader";
import AutosaveFormEffect from "../../../../helpers/formSaveHelpers";
import { useLocalStorage } from "usehooks-ts";

export interface DetailKlien {
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
  tanggal_lahir: Date;
  agama: Agama;
  usia: number;
  kategori_klien: string;
  jenis_klien: string;
  pekerjaan: number;
  penghasilan_bulanan: number;
  status_perkawinan: number;
  bpjs: BPJS;
  pendidikan_kelas: string;
  pendidikan_instansi: string;
  pendidikan_jurusan: string;
  pendidikan_thn_lulus: number;
}

const FormDetailKlien = (props: FormModal) => {
  const { mode, laporan } = props;
  const form = useForm<DetailKlien>();
  const { showLoader, hideLoader } = useLoader();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
  } = form;
  const [kotas, setKotas] = useState<Kota[]>([]);
  const [kecamatans, setKecamatans] = useState<Kecamatan[]>([]);
  const [kategoris, setKategoris] = useState<Kategori[]>([]);
  const [kelurahans, setKelurahans] = useState<Kelurahan[]>([]);
  const [agamas, setAgamas] = useState<Agama[]>([]);
  const [pekerjaans, setPekerjaans] = useState<Pekerjaan[]>([]);
  const [statusPerkawinans, setStatusPerkawinans] = useState<StatusPerkawinan[]>([]);
  const [bpjses, setBpjses] = useState<BPJS[]>([]);
  const [formState, setFormState] = useLocalStorage<string | null>('form_internal_state', null)

  const onSubmit : SubmitHandler<DetailKlien> = async (data: DetailKlien) => {
    console.log(data);
  };
  
  return (
    <>
      <span className="font-bold text-lg">
        <span className="text-primary">{capitalize(mode)}</span> Detail Klien
      </span>
      <KelurahanLoader data={kelurahans} setData={setKelurahans}>
        <KecamatanLoader data={kecamatans} setData={setKecamatans}>
          <AutosaveFormEffect setValue={setValue} watch={watch} formState={formState} setFormState={setFormState}>
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
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="nik_klien"
                  placeholder="NIK Klien"
                  label="NIK Klien"
                  defaultValue={laporan.nik_klien}
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="alamat_klien"
                  placeholder="Alamat Domisili Klien"
                  label="Alamat Domisili Klien"
                  defaultValue={laporan.alamat_klien}
                />
                <Select
                  name="kecamatan"
                  control={control}
                  placeholder="Pilih Kecamatan"
                  label="Kecamatan Klien"
                  errors={errors}
                  errorLabel="Kecamatan Domisili"
                  options={kecamatans.map((k) => ({
                    label: k.nama,
                    value: k.id,
                  }))}
                  defaultValue={laporan?.detail_klien?.kecamatan?.id}
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="no_kk"
                  placeholder="No Kartu Keluarga"
                  label="Nomor Kartu Keluarga"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="alamat_kk"
                  placeholder="Alamat Sesuai Kartu Keluarga"
                  label="Alamat Sesuai Kartu Keluarga"
                />
                <Select
                  name="kelurahan_kk"
                  control={control}
                  placeholder="Pilih Kelurahan"
                  label="kelurahan KK"
                  errors={errors}
                  errorLabel="Kelurahan KK"
                  options={kelurahans.map((k) => ({
                    label: k.nama,
                    value: k.id,
                  }))}
                  defaultValue={laporan?.detail_klien?.kelurahan_kk?.id}
                />
                <Select
                  name="kecamatan_kk"
                  control={control}
                  placeholder="Pilih Kecamatan"
                  label="Kecamatan KK"
                  errors={errors}
                  errorLabel="Kecamatan KK"
                  options={kecamatans.map((k) => ({
                    label: k.nama,
                    value: k.id,
                  }))}
                  defaultValue={laporan?.detail_klien?.kecamatan_kk?.id}
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="no_wa"
                  placeholder="Nomor Telepon / WhatsApp"
                  label="No. Telp / WhatsApp"
                />
                <Select
                  name="kota_lahir"
                  control={control}
                  placeholder="Pilih Kota"
                  label="Kota Lahir"
                  errors={errors}
                  errorLabel="Kota Lahir"
                  options={[{ label: "Surabaya", value: 1 }]}
                  //   options={kotas.map((k) => ({
                  //     label: k.nama,
                  //     value: k.id,
                  //   }))}
                />
                <Datepicker
                  name="tanggal_lahir"
                  control={control}
                  isRequired
                  defaultValue={null}
                  placeholder="Tanggal Lahir"
                  label="Tanggal Lahir"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="usia"
                  placeholder="Usia"
                  label="Usia"
                  type="number"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="kategori_klien"
                  placeholder="Kategori Klien"
                  label="Kategori Klien"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="jenis_klien"
                  placeholder="Jenis Klien"
                  label="Jenis Klien"
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
                />
                <Select
                  name="agama"
                  control={control}
                  placeholder="Pilih Agama"
                  label="Agama"
                  errors={errors}
                  errorLabel="Agama"
                  options={[{ label: "Kristen", value: "2" }]}
                  //   options={kotas.map((k) => ({
                  //     label: k.nama,
                  //     value: k.id,
                  //   }))}
                />
                <Select
                  name="pekerjaan"
                  control={control}
                  placeholder="Pilih Pekerjaan"
                  label="Pekerjaan"
                  errors={errors}
                  errorLabel="Pekerjaan"
                  options={[{ label: "Pekerjaan 1", value: 1 }]}
                  //   options={kotas.map((k) => ({
                  //     label: k.nama,
                  //     value: k.id,
                  //   }))}
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="penghasilan_bulanan"
                  placeholder="Penghasilan/Bulan"
                  label="Penghasilan/Bulan"
                  type="number"
                />
                <Select
                  name="status_perkawinan"
                  control={control}
                  placeholder="Pilih Status Perkawinan"
                  label="Status Perkawinan"
                  errors={errors}
                  errorLabel="Status Perkawinan"
                  defaultValue={laporan.jenis_kelamin}
                  options={[{ label: "Cerai Hidup", value: 3 }]}
                  //   options={kotas.map((k) => ({
                  //     label: k.nama,
                  //     value: k.id,
                  //   }))}
                />
                <Select
                  name="bpjs"
                  control={control}
                  placeholder="Pilih Kepemilikan BPJS"
                  label="Kepemilikan BPJS"
                  errors={errors}
                  errorLabel="Kepemilikan BPJS"
                  defaultValue={laporan.jenis_kelamin}
                  options={[{ label: "Mandiri", value: 3 }]}
                  //   options={kotas.map((k) => ({
                  //     label: k.nama,
                  //     value: k.id,
                  //   }))}
                />
              </div>

              <div className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>Pendidikan Klien</SectionTitle>
                <InputText
                  register={register}
                  errors={errors}
                  name="pendidikan_kelas"
                  placeholder="Pendidikan Kelas"
                  label="Pendidikan Kelas"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="pendidikan_instansi"
                  placeholder="Pendidikan Instansi"
                  label="Pendidikan Instansi"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="pendidikan_jurusan"
                  placeholder="Pendidikan Jurusan"
                  label="Pendidikan Jurusan"
                />
                <InputText
                  register={register}
                  errors={errors}
                  name="pendidikan_tahun_lulus"
                  placeholder="Tahun Lulus"
                  label="Tahun Lulus"
                  type="number"
                />
              </div>
              <PrimaryButton className="py-2" isSubmit>
                Submit
              </PrimaryButton>
            </form>
            </div>
            </AutosaveFormEffect>
        </KecamatanLoader>
      </KelurahanLoader>
    </>
  );
};

export default FormDetailKlien;
