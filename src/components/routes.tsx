import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../consts/routes"
import { RedirectAuth, RequireAuth } from "../helpers/routesHelpers"
import Landing from "../pages/external/Landing"
import Login from "../pages/external/Login"
import Pelaporan from "../pages/external/Pelaporan"
import Dashboard from "../pages/internal/Dashboard"
import Pelaporans from "../pages/internal/Pelaporans"
import CreatePelaporan from "../pages/internal/CreatePelaporan"
import KonfirmasiPelaporan from "../pages/external/KonfirmasiPelaporan"
import { NotFoundPage } from "./errors/NotFoundPage"
import TokenPelaporan from "../pages/external/TokenPelaporan"
import TrackPelaporan from "../pages/external/TrackPelaporan"
import DetailPelaporan from "../pages/internal/DetailPelaporan"
import EditPelaporan from "../pages/internal/EditPelaporan"
import TambahSatgasAdmin from "../pages/internal/TambahAdminSatgas"
import CetakRekap from "../pages/internal/CetakRekap"
import CetakKasusKlien from "../pages/internal/CetakKasusKlien"

const RoutesComponents = () => {
    return <Routes>
        {/* EXTERNAL */}
        <Route element={<RedirectAuth />}>
            <Route
                path={ROUTES.EXTERNAL.LANDING}
                element={<Landing />}
            />
            <Route
                path={ROUTES.EXTERNAL.LOGIN}
                element={<Login />}
            />
            <Route
                path={ROUTES.EXTERNAL.PELAPORAN}
                element={<Pelaporan />}
            />
            <Route
                path={ROUTES.EXTERNAL.KONFIRMASI_PELAPORAN}
                element={<KonfirmasiPelaporan />}
            />
            <Route
                path={ROUTES.EXTERNAL.TOKEN_PELAPORAN}
                element={<TokenPelaporan />}
            />
            <Route
                path={ROUTES.EXTERNAL.TRACK_PELAPORAN}
                element={<TrackPelaporan />}
            />
        </Route>
        {/* EXTERNAL END */}

        {/* INTERNAL */}
        <Route element={<RequireAuth />}>
            <Route
                path={ROUTES.INTERNAL.DASHBOARD}
                element={<Dashboard />}
            />
            <Route
                path={ROUTES.INTERNAL.PELAPORAN}
                element={<Pelaporans />}
            />
            <Route
                path={ROUTES.INTERNAL.CREATE_LAPORAN}
                element={<CreatePelaporan />}
            />
            <Route
                path={ROUTES.INTERNAL.DETAIL_PELAPORAN}
                element={<DetailPelaporan />}
            />
            <Route
                path={ROUTES.INTERNAL.TAMBAH_SATGAS}
                element={<TambahSatgasAdmin />}
            />
            <Route
                path={ROUTES.INTERNAL.CETAK_REKAP}
                element={<CetakRekap />}
            />
            <Route
                path={ROUTES.INTERNAL.CETAK_KASUS_KLIEN}
                element={<CetakKasusKlien />}
            />
            <Route
                path={ROUTES.INTERNAL.EDIT_LAPORAN}
                element={<EditPelaporan />}
            />
        </Route>
        {/* INTERNAL END */}

        <Route
            path={'*'}
            element={<NotFoundPage />}
        />
    </Routes>
}

export default RoutesComponents