import { useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../consts/routes";
import { ALERT_TYPE } from "../consts/alert";
import { useAlert } from "../hooks/useAlert";



export const RequireAuth = () => {
    const isAuthenticated = useIsAuthenticated();
    const alert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated() === false) {
            alert.addAlert({
                type: ALERT_TYPE.WARNING,
                title: "Autentikasi Gagal",
                message: "Anda perlu login terlebih dahulu !",
            });
            navigate(ROUTES.EXTERNAL.LOGIN)
        }
    }, [isAuthenticated])

    return <Outlet />
}

export const RedirectAuth = () => {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated() === true)
            navigate(ROUTES.INTERNAL.DASHBOARD)
    }, [isAuthenticated])

    return <Outlet />
}

