import { useLocation, useNavigate } from "react-router-dom"
import { Laporan } from '../../consts/laporan';
import { ForbiddenPage } from "../../components/errors/ForbiddenPage";
import { PrimaryButton, SecondaryButton } from "../../components/form/Button";
import { KelurahanLoader, KecamatanLoader, KategoriLoader } from "../../helpers/fetchHelpers";
import { useState } from "react";
import { Kecamatan } from "../../consts/kecamatan";
import { Kelurahan } from "../../consts/kelurahan";
import { Checkbox } from "../../components/form/Checkbox";
import { useForm } from "react-hook-form";
import { ConfirmationModal } from "../../components/common/Modal";
import useLoader from "../../hooks/useLoader";
import { ROUTES } from "../../consts/routes";
import { postLaporanPublic } from "../../api/laporan";
import { useAlert } from "../../hooks/useAlert";


const KonfirmasiPelaporan = () => {
  const { state } = useLocation()
  const [kelurahan, setKelurahan] = useState<Kelurahan[]>([])
  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([])
  const [kategoris, setKategoris] = useState<Kategori[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const { showLoader, hideLoader } = useLoader()
  const { errorFetchAlert } = useAlert()
  const form = useForm()
  const navigate = useNavigate()

  const handleLaporkan = () => {
    setShowModal(true)
  }

  const onSubmit = async () => {
    setShowModal(false)
    showLoader()
    try {
      const laporan = await postLaporanPublic(state) as Laporan
      navigate(ROUTES.EXTERNAL.TOKEN_PELAPORAN, { state: laporan.token })
      localStorage.removeItem('form_laporan')
    }
    catch {
      errorFetchAlert()
    }
    finally {
      hideLoader()
    }

  }


  return (
    <>
      {state ? (
        <KategoriLoader data={kategoris} setData={setKategoris}>
          <KelurahanLoader data={kelurahan} setData={setKelurahan}>
            <KecamatanLoader data={kecamatan} setData={setKecamatan}>
              <div className="min-w-screen min-h-screen bg-login flex flex-col items-center justify-center pb-[5vh]">
                <header className="mx-auto flex gap-8 mt-36 ">
                  <img
                    src="http://172.18.2.98/newpetra/images/logo-pemkot-new.png"
                    className="w-20 object-contain"
                    alt="Logo Pemkot Surabaya"
                  />
                  <img
                    src="http://172.18.2.98/newpetra/images/logo-without-text.png"
                    className="w-28 object-contain"
                    alt="Logo SIAPPPAK"
                  />
                </header>
                <form
                  onSubmit={form.handleSubmit(handleLaporkan)}
                  className="bg-white floating-shadow-md rounded-sm py-8 md:px-12 px-6 lg:w-[600px] md:w-1/2 w-11/12 mt-6"
                >
                  <b className="text-lg">Detail Laporan</b>
                  <div className="flex flex-col gap-2.5 pt-3 pb-6 mb-6 border-b-[1px] border-slate-300">
                    <div className="flex flex-col gap-1">
                      <b>Kategori Permasalahan</b>
                      <span>
                        {
                          kategoris.find((k) => k.id === state.kategori_id)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <b>Kecamatan Domisili Klien</b>
                      <span>
                        {
                          kecamatan.find((k) => k.id === state.kecamatan_id)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <b>Kelurahan Domisili Klien</b>
                      <span>
                        {
                          kelurahan.find((k) => k.id == state.kelurahan_id)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <b>RT</b>
                          <br />
                          <span>{state.rt}</span>
                        </div>
                        <div>
                          <b>RW</b>
                          <br />
                          <span>{state.rw}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <b>Uraian Singkat Permasalahan</b>
                      <p className="text-justify text-sm break-words">
                        {state.uraian_singkat_masalah
                          ? state.uraian_singkat_masalah
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <b className="text-lg">Data Pelapor</b>
                  <div className="flex flex-col gap-2.5 pt-3 pb-6 border-b-[1px] border-slate-300">
                    <div className="flex flex-col gap-1">
                      <b>Nama Lengkap Pelapor</b>
                      <span>{state.nama_pelapor}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <b>Nomor Telepon Pelapor</b>
                      <span>{state.no_telp_pelapor}</span>
                    </div>
                  </div>
                  <Checkbox
                    wrapperClass="mt-8 mb-4"
                    name="agreement"
                    form={form}
                    label="Saya menulis kasus yang saya laporkan dengan sebenar-benarnya, tanpa belebih-lebihkan atau mengurang-ngurangkan"
                    isRequired={true}
                  />
                  <PrimaryButton className="py-3 " isSubmit>
                    Laporkan
                  </PrimaryButton>
                  <SecondaryButton
                    className="py-3 mt-3 hover:text-white"
                    onClick={() => navigate(-1)}
                  >
                    Kembali
                  </SecondaryButton>
                </form>
              </div>
            </KecamatanLoader>
          </KelurahanLoader>
        </KategoriLoader>
      ) : (
        <ForbiddenPage />
      )}
      {showModal === true && (
        <ConfirmationModal
          onClose={() => setShowModal(false)}
          onSuccess={onSubmit}
          title="Apakah anda yakin ?"
          description="Laporan yang dikirim tidak dapat ditarik kembali."
          successButtonText="Kirim"
        />
      )}
    </>
  );

}

export default KonfirmasiPelaporan