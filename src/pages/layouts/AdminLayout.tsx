import { ReactNode, useRef, useState } from "react"
import { FaBars, FaSignOutAlt } from "react-icons/fa"
import { useAuthUser, useSignOut } from "react-auth-kit"
import InitialsAvatar from 'react-initials-avatar';
import { User } from "../../consts/user";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { SecondaryButton } from "../../components/form/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../consts/routes";
import { useAlert } from "../../hooks/useAlert";
import { ALERT_TYPE } from "../../consts/alert";
import Sidebar from "../../components/internal/Sidebar";

interface AdminLayoutProps {
    children?: ReactNode
    useTopBarrier?: boolean
}

const AdminLayout = (props: AdminLayoutProps) => {
    const { children, useTopBarrier = true } = props
    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const [sidebarActive, setSidebarActive] = useState<boolean>(false)
    const dropdownRef = useRef(null)
    const sidebarRef = useRef(null)
    useOutsideAlerter(dropdownRef, () => setDropdownActive(false))
    useOutsideAlerter(sidebarRef, () => setSidebarActive(false))
    const signOut = useSignOut()
    const userData = useAuthUser()() as User
    const navigate = useNavigate()
    const alert = useAlert()

    const handleLogout = () => {
        signOut()
        navigate(ROUTES.EXTERNAL.LANDING)
        alert.addAlert({
            type: ALERT_TYPE.INFO,
            title: 'Autentikasi terbarui',
            message: 'Anda berhasil Sign out !'
        })
    }


    return <div className="min-w-screen min-h-screen bg-white">
        <header className="fixed top-0 w-full p-4 lg:px-10 flex justify-between place-items-center bg-slate-200 floating-shadow-md">
            <button onClick={() => setSidebarActive(true)} className="flex lg:gap-4 items-center bg-primary hover:bg-primaryDarker p-4 md:px-10 text-white font-bold rounded-full transition duration-300">
                <FaBars />
                <span className="lg:block hidden">Menu</span>
            </button>
            <div className="relative">
                <button className="bg-primary  text-white font-bold h-12 w-12 rounded-md" onClick={() => setDropdownActive(prev => !prev)}>
                    <InitialsAvatar name={userData.name} />
                </button>
                {/* Dropdown */}
                {dropdownActive &&
                    <div className="bg-white p-4 absolute floating-shadow-md -translate-x-[250px] translate-y-4 w-[300px] rounded-lg" ref={dropdownRef}>
                        <div className="flex flex-col items-start justify-center w-full">
                            <div className="flex items-center justify-start gap-4 border-b-2 border-slate-400 pb-4 w-full">
                                <InitialsAvatar className="bg-primary text-white font-bold h-[50px] w-[50px] rounded-md flex items-center justify-center" name={userData.name} />
                                <div className="flex flex-col">
                                    <span>{userData.name}</span>
                                    <span className="text-slate-500">{userData.role}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-full mt-4">
                                <SecondaryButton
                                    onClick={handleLogout}
                                    className="w-full text-start flex items-center py-2 px-4 gap-5 text-primary hover:text-white"
                                >
                                    <FaSignOutAlt />
                                    <span className="text-[16px]">Sign out</span>
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                }

                <Sidebar userData={userData} sidebarActive={sidebarActive} sidebarRef={sidebarRef} setSidebarActive={setSidebarActive} />
            </div>
        </header>
        {useTopBarrier &&
            <div className="h-24">

            </div>
        }
        {children}
    </div>
}
export default AdminLayout