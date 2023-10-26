import { createContext, ReactNode, useState } from 'react';
import { FullPageLoader } from '../components/common/Loader';
import { LoaderContextModel } from '../consts/loader';

export const LoaderContext = createContext<LoaderContextModel>({
    showLoader: () => { },
    hideLoader: () => { }
})

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoaderOpen, setIsLoaderOpen] = useState<boolean>(false)

    const showLoader = () => {
        setIsLoaderOpen(true)
    }

    const hideLoader = () => {
        setIsLoaderOpen(false)
    }

    return <LoaderContext.Provider value={{ showLoader, hideLoader }}>
        {isLoaderOpen && <FullPageLoader />}
        {children}
    </LoaderContext.Provider>

}