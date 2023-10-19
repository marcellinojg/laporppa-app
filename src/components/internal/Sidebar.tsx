import { FaChartLine, FaFileAlt, FaPlus, FaTimes } from "react-icons/fa"
import { ROUTES } from "../../consts/routes"
import { Link, useLocation } from "react-router-dom"
import { SidebarItemProps, SidebarProps } from "../../consts/sidebar"



const Sidebar = (props: SidebarProps) => {
    const { sidebarRef, userData, sidebarActive, setSidebarActive } = props

    return <>
        <div ref={sidebarRef}
            className={`fixed h-screen bg-slate-200 floating-shadow-lg left-0 top-0 
            lg:w-[350px] md:w-1/2 w-full
            transition duration-300
            ${!sidebarActive && 'lg:-translate-x-[350px] md:-translate-x-[50vw] -translate-x-full'}
        `}
            style={{ zIndex: '2 !important' }}
        >
            <div className="flex md:justify-center justify-between items-center py-6 px-6 border-b-2 border-slate-400">
                <img src="/images/logo.png" width={96} className="md:w-1/3 w-1/6" alt="" />
                <button className="bg-primary md:hidden flex h-12 w-12 items-center justify-center rounded-full text-white" onClick={() => setSidebarActive(false)}>
                    <FaTimes />
                </button>
            </div>
            {/* Sidebar items */}
            <div className="w-full h-full bg-white flex flex-col">
                <SidebarItem
                    label="Dashboard"
                    Icon={FaChartLine}
                    to={ROUTES.INTERNAL.DASHBOARD}
                />
                <SidebarItem
                    label="Pelaporan"
                    Icon={FaFileAlt}
                    to={ROUTES.INTERNAL.PELAPORAN}
                />
                <SidebarItem
                    label="Buat Pelaporan"
                    Icon={FaPlus}
                    to={ROUTES.INTERNAL.CREATE_LAPORAN}
                />
            </div>
        </div>

    </>
}

const SidebarItem = (props: SidebarItemProps) => {
    const { to, Icon, label } = props
    const location = useLocation()
    return <Link
        to={to}
        className={`p-6 text-black flex gap-3 items-center 
            hover:bg-gray-200 transition duration-300 font-bold
                ${location.pathname == to && 'bg-gray-200'}
            `}>
        <span className="text-2xl">
            <Icon />
        </span>
        <span>{label}</span>
    </Link>
}

const SidebarDropdown = () => {

}


const SidebarDropdownItem = () => {

}



export default Sidebar