import { createContext, ReactNode, useState } from 'react';
import { ALERT_TYPE, AlertProps, AlertContextModel, Position } from '../consts/alert';
import { Alert } from '../components/common/Alert';

export const AlertContext = createContext<AlertContextModel>({
    addAlert: () => { },
    clearAlert: () => { },
    errorFetchAlert: () => { },
    position: 'bottom'
});

interface AlertProviderProps {
    children: ReactNode;
    initialPosition?: Position;
}

export const AlertProvider = ({ children, initialPosition = 'bottom' }: AlertProviderProps) => {
    const [alerts, setAlerts] = useState<ReactNode[]>([]);
    const [position, setPosition] = useState<Position>(initialPosition);

    const addAlert = (alertProps: AlertProps, alertPosition?: Position) => {
        if (alertPosition && alertPosition !== position) {
            setPosition(alertPosition);
        }
        setAlerts(prev => [...prev, (
            <Alert 
                title={alertProps.title} 
                type={alertProps.type} 
                message={alertProps.message} 
                key={alerts.length}
            />
        )]);
    };

    const clearAlert = () => {
        setAlerts([]);
    };

    const errorFetchAlert = () => {
        addAlert({
            type: ALERT_TYPE.ERROR,
            title: 'Terjadi kesalahan',
            message: 'Terjadi kesalahan saat mengambil data, coba lagi nanti.'
        });
    };

    const positionClass = position === 'top' ? 'top-28' : 'bottom-6';

    return (
        <AlertContext.Provider value={{ addAlert, clearAlert, errorFetchAlert, position }}>
            <div className={`fixed ${positionClass} lg:right-4 right-[5vw] flex flex-col gap-2 lg:min-w-[30vw] lg:max-w-[40vw] min-w-[50vw] max-w-[100vw] w-[90vw]`}>
                {alerts}
            </div>
            {children}
        </AlertContext.Provider>
    );
};