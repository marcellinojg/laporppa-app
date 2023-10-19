import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../consts/routes"
import { RedirectAuth, RequireAuth } from "../helpers/routesHelpers"
import Landing from "../pages/external/Landing"
import Login from "../pages/external/Login"
import Pelaporan from "../pages/external/Pelaporan"
import Dashboard from "../pages/internal/Dashboard"
import Pelaporans from "../pages/internal/Pelaporans"
import CreatePelaporan from "../pages/internal/CreatePelaporan"

const RoutesComponents = () => {
    return <Routes>
        {/* EXTERNAL */}
        <Route
            path={ROUTES.EXTERNAL.LANDING}
            element={
                <RedirectAuth>
                    <Landing />
                </RedirectAuth>
            }
        />
        <Route
            path={ROUTES.EXTERNAL.LOGIN}
            element={
                <RedirectAuth>
                    <Login />
                </RedirectAuth>
            }
        />
        <Route
            path={ROUTES.EXTERNAL.PELAPORAN}
            element={
                <RedirectAuth>
                    <Pelaporan />
                </RedirectAuth>
            }
        />
        {/* EXTERNAL END */}

        {/* INTERNAL */}
        <Route
            path={ROUTES.INTERNAL.DASHBOARD}
            element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            }
        />
        <Route
            path={ROUTES.INTERNAL.PELAPORAN}
            element={
                <RequireAuth>
                    <Pelaporans />
                </RequireAuth>
            }
        />
        <Route
            path={ROUTES.INTERNAL.CREATE_LAPORAN}
            element={
                <RequireAuth>
                    <CreatePelaporan />
                </RequireAuth>
            }
        />
        {/* INTERNAL END */}
    </Routes>
}

export default RoutesComponents