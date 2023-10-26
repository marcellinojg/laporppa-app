import { useLocation, useNavigate } from "react-router-dom"
import { ForbiddenPage } from "../../components/errors/ForbiddenPage"
import { PrimaryButton } from "../../components/form/Button"
import { ROUTES } from "../../consts/routes"


const TokenPelaporan = () => {
    const { state }: { state: string } = useLocation()
    const navigate = useNavigate()
    return <>
        {state ?
            <div className="min-w-screen min-h-screen bg-login flex flex-col items-center justify-center pb-[5vh]">
                <header className="mx-auto flex gap-8 mt-36 ">
                    <img src="/images/logo-pemkot-new.png" className="w-20 object-contain" alt="Logo Pemkot Surabaya" />
                    <img src="/images/logo-without-text.png" className="w-28 object-contain" alt="Logo SIAPPPAK" />
                </header>
                <div className="bg-white floating-shadow-md rounded-sm py-8 md:px-12 px-6 lg:w-[600px] md:w-1/2 w-11/12 mt-6">
                    <div className="border-2 p-6 flex flex-col items-center rounded-md">
                        <span className="text-md">Token Anda</span>
                        <b className="text-3xl mt-3">{state}</b>
                    </div>
                    <div className="text-primary text-center font-bold mt-6">
                        Token dapat digunakan untuk melacak status laporan di halaman Status Laporan. Harap simpan baik-baik!
                    </div>
                    <PrimaryButton className="mt-4 py-3" onClick={() => navigate(ROUTES.EXTERNAL.LANDING)}>
                        Kembali ke halaman utama
                    </PrimaryButton>
                </div>
            </div>
            :
            <ForbiddenPage />
        }
    </>
}

export default TokenPelaporan