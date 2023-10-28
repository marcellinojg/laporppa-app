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
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    }

    const hideLoader = () => {
        setIsLoaderOpen(false)
        document.getElementsByTagName('body')[0].style.overflowY = 'auto'

    }

    return <LoaderContext.Provider value={{ showLoader, hideLoader }}>
        {isLoaderOpen && <FullPageLoader />}
        {children}
    </LoaderContext.Provider>

}