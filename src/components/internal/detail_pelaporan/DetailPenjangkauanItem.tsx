import { FaDiceOne } from "react-icons/fa"
import { Laporan } from "../../../consts/laporan"
import { useAuthUser } from "react-auth-kit"
import { User } from "../../../consts/user"
import { ROLE } from "../../../consts/role"
import { EditDetailButton, InputDetailButton, LihatDetailButton } from "../../form/PenjangkauanButtons"


interface DetailPenjangkauanItemProps {
    title: string
    updated_at: string
    last_edit_by?: string
    help_text: string
    is_done: boolean
    laporan: Laporan
}

const DetailPenjangkauanItem = (props: DetailPenjangkauanItemProps) => {
    const { title, updated_at, last_edit_by, help_text, is_done, laporan } = props
    const userData = useAuthUser()() as User
    return <div className="flex items-stretch gap-3">
        <div className="flex flex-col">
            <div className="bg-primary text-lg rounded-full p-2 text-white flex flex-col">
                <FaDiceOne />

            </div>
            <div className="bg-slate-200 w-0.5 mx-auto grow">

            </div>
        </div>

        <div className="flex flex-col pb-5 w-full">
            <div className="flex items-center gap-3">
                <span className="font-bold mt-0.5 text-lg">{title}</span>
                {is_done === true ?
                    <div className="bg-lime-500 text-white font-bold text-sm py-1 px-3 rounded">
                        Selesai
                    </div> :
                    <div className="bg-red-500 text-white font-bold text-sm py-1 px-3 rounded">
                        Belum Diinput
                    </div>
                }
            </div>
            {last_edit_by ?
                <span className="text-sm text-slate-500 mt-2">Diperbarui: {updated_at} oleh <b className="text-black">{last_edit_by}</b></span> :
                <span className="text-sm text-slate-500 mt-2">Data belum ditambahkan oleh <b className="text-black">Satgas</b></span>

            }
            <div className="flex p-3 rounded border-2 border-slate-200 border-dashed mt-2.5 justify-between items-center">
                <p className="text-sm">{help_text}</p>
                {is_done === true && userData.role === ROLE.KELURAHAN &&
                    <div className="flex items-center gap-3">
                        <LihatDetailButton />
                    </div>
                }
                {is_done === false && userData.role === ROLE.SATGAS && laporan.satgas_pelapor.id === userData.id &&
                    <div className="flex items-center gap-3">
                        <InputDetailButton />
                    </div>
                }
                {is_done === true && userData.role === ROLE.SATGAS && laporan.satgas_pelapor.id === userData.id &&
                    <div className="flex items-center gap-3">
                        <EditDetailButton />
                        <LihatDetailButton />
                    </div>
                }
            </div>
        </div>
    </div>
}

export default DetailPenjangkauanItem