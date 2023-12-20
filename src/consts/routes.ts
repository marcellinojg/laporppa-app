export const ROUTES = {
    INTERNAL: {
        DASHBOARD: '/internal/dashboard',
        PELAPORAN: '/internal/laporan',
        DETAIL_PELAPORAN: '/internal/laporan/:id',
        CREATE_LAPORAN: "/internal/laporan/create",
        EDIT_LAPORAN: "/internal/laporan/:id/edit",
        CEK_PELAPORAN: "/internal/tambah-admin-satgas"
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
    DETAIL_PELAPORAN: (id: string) => `/internal/laporan/${id}`,
    EDIT_LAPORAN: (id: string) => `/internal/laporan/${id}/edit`,
  },
  EXTERNAL: {},
};