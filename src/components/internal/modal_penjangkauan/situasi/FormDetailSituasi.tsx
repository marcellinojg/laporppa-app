import { SectionTitle } from "../../../common/Typography"
import capitalize from "../../../../helpers/capitalize"
import { TextArea } from "../../../form/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import { PrimaryButton } from "../../../form/Button"
import { FormModal } from "../../../../consts/modal_penjangkauan"

interface DetailSituasi {
    situasi_keluarga: string
}

const FormDetailSituasi = (props: FormModal) => {
    const { mode, setIsModalActive } = props
    const { register, formState: { errors }, handleSubmit } = useForm<DetailSituasi>()

    const onSubmit: SubmitHandler<DetailSituasi> = (data: DetailSituasi) => {
        alert(data.situasi_keluarga)
        setIsModalActive(false)
    }

    return <>
        <span className="font-bold text-lg"><span className="text-primary">{capitalize(mode)}</span> Situasi Klien</span>
        <div className="flex flex-col gap-2 py-3">
            <form className="flex flex-col gap-3 py-3" onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle>Situasi Keluarga</SectionTitle>
                <TextArea
                    name="situasi_keluarga"
                    className="h-60"
                    defaultValue=""
                    register={register}
                    errors={errors}
                    isRequired={true}
                    label="Ceritakan tentang situasi keluarga"
                    errorLabel="Situasi Keluarga"
                    placeholder="Contoh : Situasi keluarga sedang tidak saling berbicara"
                />
                <PrimaryButton className="py-2" isSubmit={true}>Submit</PrimaryButton>
            </form>
        </div>
    </>
}

export default FormDetailSituasi