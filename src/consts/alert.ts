export interface AlertProps {
    message: string,
    type: string,
    title: string
}

export const ALERT_TYPE = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
}

export interface AlertContextModel {
    addAlert: (props: AlertProps) => void
    clearAlert: () => void
}
