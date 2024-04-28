import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Laporan, LaporanSatgas } from "../../consts/laporan"
import { ReactNode, useEffect, useState } from "react"
import { REGEX } from "../../consts/regex"
import { PrimaryButton } from "../form/Button"
import Datepicker from "../form/Datepicker"
import { Select } from "../form/Dropdown"
import { InputText, TextArea } from "../form/Input"
import { Kelurahan } from '../../consts/kelurahan';
import { Kecamatan } from '../../consts/kecamatan';
import Uploader from '../form/Uploader';
import TimePicker from '../form/Timepicker';

interface FormPelaporanProps {
    onSubmit: SubmitHandler<LaporanSatgas>
    isLoading: boolean
    form: UseFormReturn<LaporanSatgas>
    kelurahan: Kelurahan[]
    kecamatan: Kecamatan[]
    kategori: Kategori[]
    laporanEdit?: Laporan
}

interface InputSectionProps {
    title?: string,
    children: ReactNode
}

const FormPelaporan = (props: FormPelaporanProps) => {
    const { onSubmit, isLoading, form, kecamatan, kelurahan, kategori, laporanEdit } = props
    const [selectedKecamatan, setSelectedKecamatan] = useState<number | string>()
    const { register, formState: { errors }, handleSubmit, control, watch, setValue } = form



    useEffect(() => {
        if (laporanEdit)
            setSelectedKecamatan(laporanEdit.kelurahan.id_kecamatan)
        const subscription = watch((value) => {
            setSelectedKecamatan(value.kecamatan_id)
        })
        return () => subscription.unsubscribe()
    }, [])

    return (
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <InputSection>
            <Select
              name="kategori_id"
              control={control}
              placeholder="Pilih kategori"
              label="Kategori Permasalahan"
              errorLabel="Kategori Permasalahan"
              errors={errors}
              defaultValue={laporanEdit?.kategori.id}
              options={kategori
                .filter((k) => k.is_active === true)
                .map((k) => ({
                label: k.name,
                value: k.id,
              }))}
            />
            <Datepicker
              name="tanggal_pengaduan"
              control={control}
              isRequired
              defaultValue={
                laporanEdit ? new Date(laporanEdit?.tanggal_pengaduan) : null
              }
              placeholder="Masukkan tanggal pengaduan"
              label="Tanggal Pengaduan"
            />
            <TimePicker
              name="jam_pengaduan"
              register={register}
              isRequired
              defaultValue={laporanEdit && laporanEdit.jam_pengaduan}
              placeholder="Masukkan jam pengaduan"
              label="Jam Pengaduan"
              errors={errors}
            />
          </InputSection>
          <InputSection title="Identitas Pelapor">
            <InputText
              name="nama_pelapor"
              register={register}
              placeholder="Masukkan nama lengkap pelapor"
              errors={errors}
              label="Nama Lengkap Pelapor"
              regex={REGEX.ALPHABETIC_ONLY}
              isRequired={true}
              defaultValue={laporanEdit?.nama_pelapor}
            />
            <InputText
              name="nik_pelapor"
              register={register}
              placeholder="Masukkan NIK pelapor"
              errors={errors}
              label="NIK Pelapor"
              regex={REGEX.NIK}
              defaultValue={laporanEdit?.nik_pelapor}
            />
            <InputText
              name="no_telp_pelapor"
              register={register}
              placeholder="Masukkan nomor telepon pelapor"
              errors={errors}
              label="No. Telepon/Whatsapp Pelapor"
              // regex={REGEX.PHONE_IDN}
              type="tel"
              isRequired
              defaultValue={laporanEdit?.no_telp_pelapor}
            />
            <InputText
              name="alamat_pelapor"
              register={register}
              placeholder="Masukkan alamat domisili pelapor"
              errors={errors}
              label="Alamat Domisili Pelapor"
              defaultValue={laporanEdit?.alamat_pelapor}
            />
          </InputSection>

          <InputSection title="Identitas Klien">
            <InputText
              name="nama_klien"
              register={register}
              placeholder="Masukkan nama lengkap klien"
              label="Nama Lengkap Klien"
              errors={errors}
              regex={REGEX.ALPHABETIC_ONLY}
              isRequired
              defaultValue={laporanEdit?.nama_klien}
            />
            <InputText
              name="nik_klien"
              register={register}
              placeholder="Masukkan NIK klien"
              label="NIK Klien"
              errors={errors}
              regex={REGEX.NIK}
              defaultValue={laporanEdit?.nik_klien}
            />
            <InputText
              name="no_telp_klien"
              register={register}
              placeholder="Masukkan nomor telepon klien"
              label="No.Telepon/Whatsapp Klien"
              errors={errors}
              defaultValue={laporanEdit?.no_telp_klien}
            />
            <Select
              name="kecamatan_id"
              control={control}
              placeholder="Pilih kecamatan"
              label="Kecamatan Klien"
              errors={errors}
              errorLabel="Kecamatan"
              options={kecamatan
                .filter((k) => k.is_active === true && k.id_kabupaten === 1)
                .map((k) => ({
                label: k.name,
                value: k.id,
              }))}
            />
            <Select
              isDisabled={
                selectedKecamatan
                  ? false
                  : laporanEdit?.kelurahan.id_kecamatan
                  ? false
                  : true
              }
              name="kelurahan_id"
              placeholder="Pilih kelurahan"
              label="Kelurahan Klien"
              control={control}
              errors={errors}
              errorLabel="Kelurahan"
              options={kelurahan
                .filter((k) => k.is_active === true && k.id_kecamatan === selectedKecamatan)
                .map((k) => ({
                  label: k.name,
                  value: k.id,
                }))}
              defaultValue={laporanEdit?.kelurahan.id}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputText
                name="rt"
                register={register}
                errors={errors}
                placeholder="Masukkan RT"
                label="RT"
                isRequired
                type="number"
                regex={REGEX.NUMERIC_RT_RW}
                defaultValue={laporanEdit?.rt}
              />
              <InputText
                name="rw"
                register={register}
                errors={errors}
                placeholder="Masukkan RW"
                label="RW"
                isRequired
                type="number"
                regex={REGEX.NUMERIC_RT_RW}
                defaultValue={laporanEdit?.rw}
              />
            </div>
            <InputText
              name="alamat_klien"
              register={register}
              placeholder="Masukkan alamat domisili klien"
              label="Alamat Domisili Klien"
              errors={errors}
              defaultValue={laporanEdit?.alamat_klien}
            />
          </InputSection>

          <InputSection title="Permasalahan">
            <TextArea
              name="uraian_singkat_masalah"
              register={register}
              errors={errors}
              isRequired={true}
              label="Uraian Singkat Permasalahan"
              placeholder="Ceritakan permasalahan secara singkat (maksimal : 255 karakter)"
              defaultValue={laporanEdit?.uraian_singkat_masalah}
            />
          </InputSection>
          {!laporanEdit && (
            <InputSection title="Dokumentasi Pelaporan">
              <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500">
                        Dapat Lebih Dari 1
              </span>
              <p className="items-center justify-center mt-2 text-sm font-bold leading-none text-red-600">
                Menerima File Foto (jpeg/jpg/png) dan Dokumen(pdf). Maks ukuran file 10MB 
              </p>
              <Uploader
                name="dokumentasi_pengaduan"
                control={control}
                watch={watch}
                placeholder="Upload file dokumentasi pelaporan"
                setValue={setValue}
                register={register}
                errors={errors}
                isRequired={false}
                errorLabel="Dokumentasi Pelaporan"
                isMultiple={true}
              />
            </InputSection>
          )}
        </div>
        {/* Footer */}
        <div className="border-t-2 border-slate-400 pt-5">
          <PrimaryButton
            className="py-3"
            isLoading={isLoading}
            isDisabled={isLoading}
            isSubmit
          >
            {laporanEdit ? "Edit Laporan" : "Buat Laporan"}
          </PrimaryButton>
        </div>
      </form>
    );
}

const InputSection = (props: InputSectionProps) => {
    const { title, children } = props
    return <section className="border-b-[1px] border-slate-400 py-5">
        {title && <h2 className="font-bold mb-3 text-lg text-primary">{title}</h2>}
        <div className="flex flex-col gap-4">
            {children}
        </div>
    </section>
}

export default FormPelaporan