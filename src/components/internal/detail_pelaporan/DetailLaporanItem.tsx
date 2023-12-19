interface DetailLaporanItemProps {
    label: string
    value?: string | string[]
    badge?: string
}

const DetailLaporanItem = (props : DetailLaporanItemProps) => {
    const {label,value,badge} = props
    const re = /(?:\.([^.]+))?$/;
        return (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-1">
            <span className="text-slate-400 text-sm">{label}</span>
            <div className="overflow-x-visible max-w-10/12 flex">
            {(Array.isArray(value) ? value : [value]).map((url, index) => (
              <>
                {url && (url.endsWith('.jpg') || url.endsWith('.png')) ? (
                  <img key={index} src={url} className="w-200 mr-2 ml-2" alt={`Image ${index + 1}`} />
                ) : (url&& url.endsWith('.pdf')) ? (
                  <div key={index} className="flex items-center p-1.5 rounded-md mr-2 bg-blue-500 text-white">
                    <a href={url}>
                      Dokumen {label}.{re.exec(value)[1]}
                    </a>
                  </div>
                ) : (
                  <span key={index} className="lg:col-span-2 col-span-3 font-bold text-sm break-words">
                    {url ? url : "-"}
                  </span>
                )}
              </>
            ))}
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