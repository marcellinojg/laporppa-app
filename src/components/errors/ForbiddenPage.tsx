import { Link } from "react-router-dom"

export const ForbiddenPage = () => {
    return <div className="min-w-screen min-h-screen flex items-center justify-center bg-login">
        <div className="bg-white px-[3vw] py-4 rounded-lg text-center pb-16 floating-shadow-md">
            <img src="http://172.18.2.98/newpetra/images/errors/403.png" className="h-[50vh]" alt="" />
            <h2 className="mb-12 font-bold text-xl text-primary ">Halaman Tidak Diizinkan</h2>
            <Link to="/" className="bg-primary hover:bg-primaryDarker transition duration-300 p-4 px-10 rounded-md text-white font-bold">
                Kembali ke Halaman Utama
            </Link>
        </div>
    </div>
}