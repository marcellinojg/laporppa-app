import { SectionTitle } from "../../../common/Typography"

interface DetailKronologiContentProps {

}

const DetailKronologiContent = (props: DetailKronologiContentProps) => {
    const { } = props
    return <>
        <span className="font-bold text-lg">Detail Kronologi Kejadian</span>
        <div className="flex flex-col gap-2 py-3">
            <div className="border-b-2 flex flex-col gap-3 py-3">
                <SectionTitle>Kronologi Kejadian</SectionTitle>
                <p className="text-sm whitespace-preline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero error placeat nostrum doloribus necessitatibus ipsa quos quibusdam fugit earum amet.</p>
            </div>
        </div>
    </>
}

export default DetailKronologiContent