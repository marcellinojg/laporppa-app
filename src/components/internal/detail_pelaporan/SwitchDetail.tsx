import { Dispatch, SetStateAction } from "react"

interface SwitchDetailButtonProps {
    label: string,
    page: number,
    currentPage: number,
    setStep: Dispatch<SetStateAction<number>>
}

const SwitchDetailButton = (props: SwitchDetailButtonProps) => {
    const { page, setStep, label, currentPage } = props
    return <button
        className={`min-w-[150px] transition duration-300 ${page === currentPage ? "bg-primary text-white" : 'border-2 border-primary'} rounded-full py-1.5 p-5`}
        onClick={() => setStep(page)}
    >
        {label}
    </button >
}

export default SwitchDetailButton