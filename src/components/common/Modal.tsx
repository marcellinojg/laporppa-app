import { Dispatch, MouseEventHandler, SetStateAction } from "react"
import { PrimaryButton, SecondaryButton } from "../form/Button"
import { FaPaperPlane, FaPlane, FaTimesCircle } from "react-icons/fa"

interface ModalProps {
    onClose: MouseEventHandler
    onSuccess: MouseEventHandler
    title?: string
    description?: string
}

export const ConfirmationModal = (props: ModalProps) => {
    const { onClose, onSuccess, title, description } = props
    return <>
        <div className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 z-20 flex items-center justify-center">
            <div className="flex flex-col bg-white floating-shadow-lg lg:px-10 px-4 py-8 lg:w-[600px] md:w-1/2 w-11/12 rounded-md">
                <span className="font-bold text-lg">{title}</span>
                <p className="mt-3">{description}</p>
                <div className="w-full flex gap-4 mt-7">
                    <SecondaryButton
                        className="flex items-center justify-center grow gap-2 py-2.5 hover:text-white"
                        onClick={onClose}
                    >
                        <FaTimesCircle />
                        Batal
                    </SecondaryButton>
                    <PrimaryButton
                        className="flex items-center justify-center grow gap-2 py-2.5"
                        onClick={onSuccess}
                    >
                        <FaPaperPlane />
                        Kirim
                    </PrimaryButton>
                </div>
            </div>

        </div>
    </>
}