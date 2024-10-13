import { useState } from "react"
import { PrimaryButton } from "../../components/form/Button"
import { FieldValues, useForm } from "react-hook-form"
import { LaporanToken } from "../../consts/laporan"
import { getLaporanByToken } from "../../api/laporan"
import useLoader from "../../hooks/useLoader"
import { useAlert } from "../../hooks/useAlert"
import { ALERT_TYPE } from "../../consts/alert"
import getInitials from "../../helpers/getInitials"


const TrackPelaporan = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { showLoader, hideLoader } = useLoader()
  const { errorFetchAlert, addAlert } = useAlert()
  const [laporan, setLaporan] = useState<LaporanToken>()


  const onSubmit = (data: FieldValues) => {
    showLoader()
    getLaporanByToken(data.token.toUpperCase())
      .then((laporan) => {
        setLaporan(laporan)
        reset()
        addAlert({
          type: ALERT_TYPE.SUCCESS,
          title: 'Token Valid',
          message: 'Laporan sukses ditemukan !'
        })
      })
      .catch((error) => {
        if (error.response.data.code == 404) {
          addAlert({
            type: ALERT_TYPE.ERROR,
            title: 'Token Tidak Valid',
            message: 'Laporan gagal ditemukan !'
          })
          reset()
        }

        else
          errorFetchAlert()
      })
      .finally(() => {
        hideLoader()
      })
  }



  return (
    <div className="min-w-screen min-h-screen bg-login flex flex-col items-center justify-center pb-[5vh]">
      <header className="mx-auto flex gap-8 mt-36">
        <img
          src="/images/logo-pemkot-new.png"
          className="w-20 object-contain"
          alt="Logo Pemkot Surabaya"
        />
        <img
          src="/images/logo-without-text.png"
          className="w-28 object-contain"
          alt="Logo SIAPPPAK"
        />
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center bg-white floating-shadow-md rounded-sm py-8 md:px-12 px-6 lg:w-[600px] md:w-1/2 w-11/12 mt-6 text-center"
      >
        <b className="text-2xl text-primary">Masukkan Token Anda</b>
        <input
          {...register("token", {
            required: "Masukkan token terlebih dahulu",
          })}
          className="w-10/12 outline-none border-2 rounded-md p-3 text-3xl font-bold text-center mt-6 uppercase"
          type="text"
          maxLength={8}
        />
        <span className="text-start text-red-500 mt-2">
          {errors["token"]?.message?.toString()}
        </span>
        {laporan && (
          <div className="border-t-[1px] w-10/12 border-slate-200 mt-4 flex flex-col">
            <b className="text-primary text-xl mt-4">Status Laporan</b>
            <div className="border-2 border-md py-6 px-4 mt-2 flex flex-col items-start gap-3">
              <div className="flex flex-col gap-1 items-start">
                <b className="text-lg">Inisial Pelapor</b>
                <span>{getInitials(laporan.nama_pelapor!)}</span>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <b className="text-lg">Status Laporan</b>
                <span>{laporan.status.nama}</span>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <b className="text-lg">Kategori Kasus</b>
                <span>{laporan.kategori.nama}</span>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <b className="text-lg">Dilaporkan pada</b>
                <span>{laporan.created_at}</span>
              </div>
            </div>
          </div>
        )}

        <div className="w-10/12 mx-auto">
          <PrimaryButton className="py-2.5 mt-4" isSubmit>
            Track Laporan
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default TrackPelaporan