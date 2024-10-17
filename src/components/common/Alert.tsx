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

export function Notifications(props: AlertProps) {
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
        }, 1000000);
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

// export function TopRightAlert( {
//     const [isOpen, setIsOpen] = useState(false);
//     const [alerts, setAlerts] = useState<AlertProps[]>([]);
  
//     useEffect(() => {
//       // Generate alerts based on pending cases
//       const newAlerts = pendingCases.map((caseItem) => ({
//         type: ALERT_TYPE.WARNING,
//         title: `Pending Case: ${caseItem.title}`,
//         message: `Status: ${caseItem.status}`,
//       }));
//       setAlerts(newAlerts);
//     }, [pendingCases]);
  
//     return (
//       <div className="fixed top-4 right-4 z-[100000000]">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="bg-white p-2 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-gray-100 focus:outline-none"
//         >
//           <FaBell className="text-gray-600 text-xl" />
//           {unsolvedCases > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {unsolvedCases}
//             </span>
//           )}
//         </button>
//         {isOpen && (
//           <div className="mt-2 w-64 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
//             <div className="p-2 border-b border-gray-200">
//               <h3 className="font-bold text-lg">Notifications</h3>
//             </div>
//             <div className="max-h-80 overflow-y-auto">
//               {alerts.length > 0 ? (
//                 alerts.map((alert, index) => (
//                   <AlertItem key={index} {...alert} />
//                 ))
//               ) : (
//                 <p className="p-4 text-gray-500">No pending cases</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
