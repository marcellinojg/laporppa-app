import { ReactNode, useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../consts/routes";
import { ALERT_TYPE } from "../consts/alert";
import { useAlert } from "../hooks/useAlert";


export const RedirectAuth = ({ children }: { children: ReactNode }): ReactNode => {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) navigate(ROUTES.INTERNAL.DASHBOARD);
    }, [isAuthenticated]);

    return <>{children}</>;
};

export const RequireAuth = ({ children }: { children: ReactNode }): ReactNode => {
    const isAuthenticated = useIsAuthenticated();
    const alert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            localStorage.removeItem('accessToken')
            alert.addAlert({
                type: ALERT_TYPE.WARNING,
                title: "Autentikasi Gagal",
                message: "Anda perlu login terlebih dahulu !",
            });
            navigate(ROUTES.EXTERNAL.LANDING);
        }
    }, [isAuthenticated]);

    return <>{isAuthenticated() && children}</>;
};
