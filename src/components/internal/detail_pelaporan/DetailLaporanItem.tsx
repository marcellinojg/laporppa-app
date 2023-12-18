import {FaFilePdf} from "react-icons/fa"

interface DetailLaporanItemProps {
    label: string
    value?: string | string[]
    badge?: string
}

const DetailLaporanItem = (props : DetailLaporanItemProps) => {
    const {label,value,badge} = props
    // const check = (value: string | undefined) => {
    //     if value?.substring(0,5) === "https":

    //   };
    //   console.log(isWebsiteUrl(value))
    
        return (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-1">
            <span className="text-slate-400 text-sm">{label}</span>
            <div className="overflow-x-visible max-w-10/12 flex">
              {Array.isArray(value) ? (
                value.map((url, index) => (
                  <img key={index} src={url} className="w-4/6 mr-2 ml-2" />
                ))
              ) : value && (value.endsWith('.jpg') || value.endsWith('.png')) ? (
                <img
                  src={value}
                  alt="Image"
                  className="h-3/6 w-auto mr-2 ml-2"
                />
              ) : value && (value.endsWith('.pdf')) ? (
                <div className="flex items-center">
                <FaFilePdf />
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words"
                >
                  {value ? value : "-"}
                </a>
              </div>
              ) : (
                <span className="lg:col-span-2 col-span-3 font-bold text-sm break-words">
                  {value ? value : "-"}
                </span>
              )}
              {badge && (
                <span className="mx-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded">
                  {badge}
                </span>
              )}
            </div>
          </div>
        );
      };


export default DetailLaporanItem