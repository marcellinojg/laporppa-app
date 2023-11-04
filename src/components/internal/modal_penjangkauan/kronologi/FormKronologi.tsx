import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"

interface FormDetailKronologiProps {
    mode: 'read' | 'edit' | 'input'
}

interface DetailKronologi {
    kronologi: string
}

const FormDetailKronologi = (props: FormDetailKronologiProps) => {
    const { mode } = props
    const { register, formState: { errors }, handleSubmit } = useForm<DetailKronologi>()

    const onSubmit : SubmitHandler<DetailKronologi> = (data : DetailKronologi ) => {
        console.log(data)
    }

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Kronologi Kejadian</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Kronologi Keluarga</SectionTitle>
                <TextArea
                    name="kronologi"
                    className="h-60"
                    defaultValue=""
                    register={register}
                    errors={errors}
                    label="Ceritakan tentang kronologi kejadian"
                    placeholder="Contoh : Pada tanggal 1 Januari, Klien dianiaya"
                />
            </form>
            <PrimaryButton className="py-2" isSubmit>Submit</PrimaryButton>
        </div>
    </>
}

export default FormDetailKronologi