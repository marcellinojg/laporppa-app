export const ROUTES = {
    INTERNAL: {
        DASHBOARD: '/internal/dashboard',
        PELAPORAN: '/internal/pelaporan',
        DETAIL_PELAPORAN: '/internal/pelaporan/:id',
    },
    EXTERNAL: {
        LANDING: "/",
        LOGIN: "/login",
        PELAPORAN: "/pelaporan"
    },
}


export const DYNAMIC_ROUTES = {
    INTERNAL: {
        DETAIL_PELAPORAN: (id: string) => `/internal/pelaporan/:${id}`
    },
    EXTERNAL: {

    },
}