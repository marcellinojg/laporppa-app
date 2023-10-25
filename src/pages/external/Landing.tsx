import { PrimaryLink } from "../../components/form/Button"
import { ROUTES } from "../../consts/routes"


const Landing = () => {
    return <div className="min-w-screen min-h-screen bg-login flex items-center justify-center">
        <div className="flex justify-center items-center w-10/12 gap-36">
            <div className="flex flex-col gap-6 self-start">
                <div className="flex gap-8 items-center">
                    <img src="/images/logo-pemkot-new.png" className="w-16" alt="Logo Pemkot Surabaya" />
                    <img src="/images/logo-without-text.png" className="w-24" alt="Logo SIAPPPAK" />
                </div>
                <h1 className="font-bold md:text-4xl text-2xl">PUSAT PELAPORAN KESEJAHTERAAN MASYARAKAT</h1>
                <p className="text-lg">Website ini diperuntukkan untuk pelaporan adanya masalah dalam masyarakat seperti kekerasan rumah tangga, penganiayaan, dan lain-lain.</p>
                <PrimaryLink to={ROUTES.EXTERNAL.PELAPORAN}  className="floating-shadow-md hover:bg-white hover:text-primary transition duration-300">LAPOR KASUS</PrimaryLink>
            </div>
            <img src="/images/homeImage.png" width={200} className="w-5/12 md:block hidden" alt="Ilustrasi gambar home" />
        </div>
    </div>
}

export default Landing