import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"

interface DetailKondisi {
    kondisi: string
}

const FormDetailKondisi = (props: FormModal) => {
    const { mode } = props
    const { register, formState: { errors }, handleSubmit } = useForm<DetailKondisi>()

    const onSubmit : SubmitHandler<DetailKondisi> = (data : DetailKondisi ) => {
        console.log(data)
    }

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Kondisi Klien</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Kondisi Klien</SectionTitle>
                <TextArea
                    name="kondisi"
                    className="h-60"
                    defaultValue=""
                    register={register}
                    errors={errors}
                    label="Ceritakan tentang kondisi klien"
                    placeholder="Contoh : Klien sedang mengalami gangguan psikologis"
                />
            </form>
            <PrimaryButton className="py-2" isSubmit>Submit</PrimaryButton>
        </div>
    </>
}

export default FormDetailKondisi