import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"

interface DetailHarapan {
    harapan: string
}

const FormDetailHarapan = (props: FormModal) => {
    const { mode } = props
    const { register, formState: { errors }, handleSubmit } = useForm<DetailHarapan>()

    const onSubmit: SubmitHandler<DetailHarapan> = (data: DetailHarapan) => {
        console.log(data)
    }

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Harapan Klien dan Keluarga</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Harapan Keluarga</SectionTitle>
                <TextArea
                    name="harapan"
                    className="h-60"
                    defaultValue=""
                    register={register}
                    errors={errors}
                    label="Ceritakan tentang harapan klien dan keluarga"
                    placeholder="Contoh : Klien dan keluarga berharap bahwa pelaku ditindak pidana"
                />
            </form>
            <PrimaryButton className="py-2" isSubmit>Submit</PrimaryButton>
        </div>
    </>
}

export default FormDetailHarapan