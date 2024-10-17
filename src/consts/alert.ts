export type Position = 'top' | 'bottom';

export interface AlertProps {
    message: string;
    type: AlertType;
    title: string;
}

export const ALERT_TYPE = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
} as const;

export type AlertType = typeof ALERT_TYPE[keyof typeof ALERT_TYPE];

export interface AlertContextModel {
    addAlert: (props: AlertProps, position?: Position) => void;
    clearAlert: () => void;
    errorFetchAlert: () => void;
    position: Position;
}