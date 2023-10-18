import { ReactNode, useEffect, useState } from "react"
import { FaCheck, FaExclamationCircle, FaTimes } from "react-icons/fa"
import { ALERT_TYPE, AlertProps } from "../../consts/alert"




export function Alert(props: AlertProps) {
    const { type, title, message } = props
    const [isActive, setIsActive] = useState(false)
    const [borderColor, setBorderColor] = useState<string>("")
    const [iconElement, setIconElement] = useState<ReactNode>(<></>)

    useEffect(() => {
        switch (type) {
            case ALERT_TYPE.ERROR:
                setBorderColor('border-red-500')
                setIconElement(<FaExclamationCircle className="text-red-500 text-3xl" />)
                break

            case ALERT_TYPE.INFO:
                setBorderColor('border-blue-500')
                setIconElement(<FaExclamationCircle className="text-blue-500 text-3xl" />)
                break

            case ALERT_TYPE.SUCCESS:
                setBorderColor('border-green-500')
                setIconElement(<FaCheck className="text-green-500 text-3xl" />)
                break

            case ALERT_TYPE.WARNING:
                setBorderColor('border-yellow-500')
                setIconElement(<FaExclamationCircle className="text-yellow-500   text-3xl" />)
                break

            default:
                console.log('Alert type not found !!')
        }


        setIsActive(true)

        setTimeout(() => {
            setIsActive(false)
        }, 5000);
    }, [])

    return <>
        {isActive && <div className={`bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-[100000000] border-b-4 gap-3 flex flex-col  p-4 min-w-[25vw] w-full  rounded-md transition-all ${borderColor}`}>
            <div className="flex items-center justify-between gap-4 w-full ">
                {iconElement}
                <p className="text-lg break-words font-bold grow">{title}</p>
                <button className="hover:text-gray-500 transition duration-300 " onClick={() => { setIsActive(false) }}>
                    <FaTimes></FaTimes>
                </button>
            </div>
            <p className="break-words text-md lg:max-w-[50vw] max-w-[70vw]">{message}</p>
        </div >}
    </>

}

