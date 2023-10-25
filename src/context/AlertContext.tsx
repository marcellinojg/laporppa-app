import { createContext, ReactNode, useState } from 'react';
import { ALERT_TYPE, AlertProps } from '../consts/alert';
import { Alert } from '../components/common/Alert';
import { AlertContextModel } from '../consts/alert';



export const AlertContext = createContext<AlertContextModel>(
    {
        addAlert: () => { },
        clearAlert: () => { },
        errorFetchAlert: () => { }
    }
)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<ReactNode[]>([])


    const addAlert = (alertProps: AlertProps) => {
        setAlerts(prev => [...prev, (<Alert title={alertProps.title} type={alertProps.type} message={alertProps.message} key={alerts.length} />)])
    }
    const clearAlert = () => {
        setAlerts([])
    }
    const errorFetchAlert = () => {
        addAlert({
            type: ALERT_TYPE.ERROR,
            title: 'Terjadi kesalahan',
            message: 'Terjadi kesalahan saat mengambil data, coba lagi nanti.'
        })
    }

    return <AlertContext.Provider value={{ addAlert, clearAlert, errorFetchAlert }}>
        <div className='fixed bottom-6 lg:right-4 right-[5vw]  flex flex-col gap-2 lg:min-w-[30vw] lg:max-w-[40vw] min-w-[50vw] max-w-[100vw] w-[90vw]  ' >
            {alerts}
        </div>
        {children}
    </AlertContext.Provider>

}