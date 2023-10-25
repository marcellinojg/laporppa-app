export const ROUTES = {
    INTERNAL: {
        DASHBOARD: '/internal/dashboard',
        PELAPORAN: '/internal/pelaporan',
        DETAIL_PELAPORAN: '/internal/pelaporan/:id',
        CREATE_LAPORAN: "/internal/pelaporan/create",
        EDIT_LAPORAN: "/internal/pelaporan/:id/edit"
    },
    EXTERNAL: {
        LANDING: "/",
        LOGIN: "/login",
        PELAPORAN: "/pelaporan",
        KONFIRMASI_PELAPORAN: '/konfirmasi-pelaporan',
        TRACK_PELAPORAN: '/track-pelaporan',
        TOKEN_PELAPORAN: '/token-pelaporan'
    },
}


export const DYNAMIC_ROUTES = {
    INTERNAL: {
        DETAIL_PELAPORAN: (id: string) => `/internal/pelaporan/${id}`,
        EDIT_LAPORAN: (id: string) => `/internal/pelaporan/${id}/edit`
    },
    EXTERNAL: {

    },
}