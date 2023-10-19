import { MutableRefObject, SetStateAction } from "react"
import { UserLogin } from "./user"
import { IconType } from "react-icons"

export interface SidebarProps {
    sidebarRef: MutableRefObject<any>
    sidebarActive: boolean
    setSidebarActive: React.Dispatch<SetStateAction<boolean>>
    userData: UserLogin
}

export interface SidebarItemProps {
    to: string
    label: string
    Icon: IconType
}

export interface SidebarDropdownProps {

}


export interface SidebarDropdownItemProps {

}