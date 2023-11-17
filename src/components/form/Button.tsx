import {  MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { SpinnerOval } from "../common/Loader";

interface ButtonProps {
    isSubmit?: boolean,
    children?: ReactNode,
    isLoading?: boolean | null,
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    isDisabled?: boolean
    spinnerColor?: string
}



export const PrimaryButton = (props: ButtonProps): ReactNode => {
    const { isSubmit, children, isLoading, onClick, className, isDisabled = false } = props
    return <button
        disabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
        className={`bg-primary hover:bg-primaryDarker text-white  w-full rounded-full text-md transition duration-300 font-bold disabled:opacity-50 ${className}`}
        onClick={onClick}
    >
        {isLoading ? <SpinnerOval primaryColor="#FFFFFF" secondaryColor="#606060" height={24} /> : children}
    </button>
}

export const SecondaryButton = (props: ButtonProps) => {
    const { isSubmit, children, isLoading, onClick, className, isDisabled } = props
    return <button
        disabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
        className={`bg-transparent border-2 
        text-black border-primary hover:bg-primary hover:text-white  w-full rounded-full transition duration-300 font-bold disabled:opacity-75 ${className}`}
        onClick={onClick}
    >
        {isLoading ? <SpinnerOval primaryColor="#FFFFFF" secondaryColor="#606060" height={24} /> : children}
    </button>
}


interface LinkProps {
    children: ReactNode,
    to: string,
    className: string,
}

export const PrimaryLink = (props: LinkProps) => {
    const { children, to, className } = props
    return <Link
        to={to}
        className={`text-center text-lg text-white bg-primary py-4 w-full rounded-full text-md  transition duration-300 font-bold ${className}`}
    >
        {children}
    </Link>
}


export const SecondaryLink = (props: LinkProps) => {
    const { children, to } = props
    return <Link
        to={to}
        className="text-center text-lg bg-transparent hover:text-white border-2 text-black border-primary py-4 w-full rounded-full transition duration-300 font-bold"
    >
        {children}
    </Link>
}

