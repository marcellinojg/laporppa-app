import { MutableRefObject, SetStateAction, useEffect } from "react"
import { User } from "../../consts/user"
import { FaChartLine, FaDatabase, FaFile, FaFileAlt, FaTimes } from "react-icons/fa"
import { ROUTES } from "../../consts/routes"
import { Link } from "react-router-dom"

interface SidebarProps {
    sidebarRef: MutableRefObject<any>
    sidebarActive: boolean
    setSidebarActive: React.Dispatch<SetStateAction<boolean>>
    userData: User
}

const Sidebar = (props: SidebarProps) => {
    const { sidebarRef, userData, sidebarActive, setSidebarActive } = props



    return <>
        <div ref={sidebarRef}
            className={`fixed h-screen bg-slate-200 floating-shadow-lg left-0 top-0 
            lg:w-[350px] md:w-1/2 w-full
            transition duration-300
            ${!sidebarActive && 'lg:-translate-x-[350px] md:-translate-x-[50vw] -translate-x-full'}
        `}>
            <div className="flex md:justify-center justify-between items-center py-6 px-6 border-b-2 border-slate-400">
                <img src="/images/logo.png" width={96} className="md:w-1/3 w-1/6" alt="" />
                <button className="bg-primary md:hidden flex h-12 w-12 items-center justify-center rounded-full text-white" onClick={() => setSidebarActive(false)}>
                    <FaTimes />
                </button>
            </div>
            {/* Sidebar items */}
            <div className="w-full h-full bg-slate-300 flex flex-col">
                <Link to={ROUTES.INTERNAL.DASHBOARD} className="p-6 text-black flex gap-3 items-center hover:bg-gray-200 transition duration-300 font-bold">
                    <span className="text-2xl">
                        <FaChartLine />
                    </span>
                    <span>Dashboard</span>
                </Link>
                <Link to={ROUTES.INTERNAL.PELAPORAN} className="p-6 text-black flex gap-3 items-center hover:bg-gray-200 transition duration-300 font-bold">
                    <span className="text-2xl">
                        <FaFileAlt />
                    </span>
                    <span>Laporan</span>
                </Link>
            </div>
        </div>

    </>
}

export default Sidebar