import { SectionTitle } from "../../../common/Typography"

interface DetailSituasiContentProps {

}

const DetailSituasiContent = (props: DetailSituasiContentProps) => {
    const { } = props
    return <>
        <span className="font-bold text-lg">Detail Data Situasi</span>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>Situasi Keluarga</SectionTitle>
                <p className="text-sm whitespace-preline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero error placeat nostrum doloribus necessitatibus ipsa quos quibusdam fugit earum amet.</p>
            </div>
        </div>
    </>
}

export default DetailSituasiContent