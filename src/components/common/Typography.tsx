import { ReactNode } from 'react'

export const SectionTitle = ({ children }: { children: ReactNode }) => {
    return <h3 className='font-bold text-primary text-lg'>{children}</h3>

}