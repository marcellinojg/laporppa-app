import { MouseEventHandler } from "react"
import { FaTimes } from "react-icons/fa"

interface ThumbnailProps {
    imgUrl: string
    onDelete: MouseEventHandler
    isMultiple: boolean
}

const Thumbnail = (props: ThumbnailProps) => {
    const { imgUrl, onDelete, isMultiple } = props
    return <div className="relative group">
        <button type="button" onClick={onDelete} className="group-hover:block hidden absolute bg-primary text-white rounded-full top-0 right-0 z-40 p-1"><FaTimes /></button>
        {isMultiple === true ?
            <img className="w-24 h-24 object-cover relative z-30 rounded-lg" src={imgUrl}></img> :
            <img className="w-48 h-48 object-cover relative z-30 rounded-lg" src={imgUrl}></img>
        }
    </div>
}

export default Thumbnail