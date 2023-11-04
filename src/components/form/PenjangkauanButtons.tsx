import { FaEdit, FaInfoCircle, FaPencilAlt } from "react-icons/fa"


export const LihatDetailButton = () => {
    return <button className="flex items-center gap-2 bg-lime-500 text-white font-bold rounded hover:bg-lime-600 transition duration-300 px-4 py-1" type="button">
        <FaInfoCircle /> Lihat Detail
    </button>
}

export const InputDetailButton = () => {
    return <button className="flex items-center gap-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300 px-4 py-1" type="button">
        <FaPencilAlt />Input
    </button>
}

export const EditDetailButton = () => {
    return <button className="flex items-center gap-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition duration-300 px-4 py-1" type="button">
        <FaEdit />Edit
    </button>
}