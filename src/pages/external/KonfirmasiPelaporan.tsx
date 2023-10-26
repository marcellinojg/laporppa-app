import { useLocation, useNavigate } from "react-router-dom"
import { Laporan } from '../../consts/laporan';
import { ForbiddenPage } from "../../components/errors/ForbiddenPage";
import { PrimaryButton, SecondaryButton } from "../../components/form/Button";
import { KelurahanLoader, KecamatanLoader } from "../../helpers/fetchHelpers";
import { useState } from "react";
import { Kecamatan } from "../../consts/kecamatan";
import { Kelurahan } from "../../consts/kelurahan";
import { Checkbox } from "../../components/form/Checkbox";
import { useForm } from "react-hook-form";
import { ConfirmationModal } from "../../components/common/Modal";
import useLoader from "../../hooks/useLoader";
import { ROUTES } from "../../consts/routes";


const KonfirmasiPelaporan = () => {
    const { state }: { state: Laporan } = useLocation()
    const [kelurahan, setKelurahan] = useState<Kelurahan[]>([])
    const [kecamatan, setKecamatan] = useState<Kecamatan[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { showLoader, hideLoader } = useLoader()
    const form = useForm()
    const navigate = useNavigate()

    const handleLaporkan = () => {
        setShowModal(true)
    }

    const onSubmit = () => {
        setShowModal(false)
        showLoader()
        // Call Api Here
        navigate(ROUTES.EXTERNAL.TOKEN_PELAPORAN, { state : 'ABCDEFG'})
        hideLoader()
        localStorage.removeItem('form_laporan')
    }


    return <>
        {state ?
            <KelurahanLoader data={kelurahan} setData={setKelurahan}>
                <KecamatanLoader data={kecamatan} setData={setKecamatan}>
                    <div className="min-w-screen min-h-screen bg-login flex flex-col items-center justify-center pb-[5vh]">
                        <header className="mx-auto flex gap-8 mt-36 ">
                            <img src="/images/logo-pemkot-new.png" className="w-20 object-contain" alt="Logo Pemkot Surabaya" />
                            <img src="/images/logo-without-text.png" className="w-28 object-contain" alt="Logo SIAPPPAK" />
                        </header>
                        <form onSubmit={form.handleSubmit(handleLaporkan)} className="bg-white floating-shadow-md rounded-sm py-8 md:px-12 px-6 lg:w-[600px] md:w-1/2 w-11/12 mt-6">
                            <b className="text-lg">Detail Laporan</b>
                            <div className="flex flex-col gap-2.5 pt-3 pb-6 mb-6 border-b-[1px] border-slate-300">
                                <div className="flex flex-col gap-1">
                                    <b>Kategori Permasalahan</b>
                                    <span>{state.kategori_id}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <b>Kecamatan Domisili Klien</b>
                                    <span>{state.kecamatan_id}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <b>Kelurahan Domisili Klien</b>
                                    <span>{kelurahan.find((k) => k.id == state.kelurahan_id)?.nama}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <b>Uraian Singkat Permasalahan</b>
                                    <p className="text-justify text-sm">
                                        {state.uraian_singkat ? state.uraian_singkat : '-'}
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
                            <PrimaryButton
                                className="py-3 "
                                isSubmit
                            >
                                Laporkan
                            </PrimaryButton>
                            <SecondaryButton className="py-3 mt-3 hover:text-white" onClick={() => navigate(-1)}>
                                Kembali
                            </SecondaryButton>
                        </form>
                    </div>
                </KecamatanLoader>
            </KelurahanLoader>
            :
            <ForbiddenPage />
        }
        {showModal === true &&
            <ConfirmationModal
                onClose={() => setShowModal(false)}
                onSuccess={onSubmit}
                title="Apakah anda yakin ?"
                description="Laporan yang dikirim tidak dapat ditarik kembali."
            />
        }
    </>

}

export default KonfirmasiPelaporan