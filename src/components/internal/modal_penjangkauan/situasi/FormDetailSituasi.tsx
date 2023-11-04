import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"

interface FormDetailSituasiProps {
    mode: 'read' | 'edit' | 'input'
}

interface DetailSituasi {
    situasi_keluarga: string
}

const FormDetailSituasi = (props: FormDetailSituasiProps) => {
    const { mode } = props
    const { register, formState: { errors }, handleSubmit } = useForm<DetailSituasi>()

    const onSubmit : SubmitHandler<DetailSituasi> = (data : DetailSituasi ) => {
        console.log(data)
    }

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Situasi Klien</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="border-b-2 flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Situasi Keluarga</SectionTitle>
                <TextArea
                    name="situasi_keluarga"
                    className="h-60"
                    defaultValue=""
                    register={register}
                    errors={errors}
                    label="Ceritakan tentang situasi keluarga"
                    placeholder="Contoh : Situasi keluarga sedang tidak saling berbicara"
                />
            </form>
            <PrimaryButton className="py-2" isSubmit>Submit</PrimaryButton>
        </div>
    </>
}

export default FormDetailSituasi