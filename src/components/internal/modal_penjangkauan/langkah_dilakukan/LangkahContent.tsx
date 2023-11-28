import { Laporan } from "../../../../consts/laporan"


interface DetailLangkahContent{
    laporan : Laporan
}

const DetailLangkahContent = (props: DetailLangkahContent) => {
    const { laporan } = props
    // console.log(laporan)
  
    return <>
        <span className="font-bold text-lg mb-3">Detail Langkah yang Telah Dilakukan</span>
        <p className="text-sm whitespace-preline">
            {laporan.langkah_telah_dilakukan? laporan.langkah_telah_dilakukan.split('\n').map((line, index) => [
            line,
            <br key={index} />,
        ])
        : '-'}</p>
    </>
}

export default DetailLangkahContent