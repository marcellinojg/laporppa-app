import { FieldErrors, UseFormRegister } from "react-hook-form"


interface TimePickerProps {
    register: UseFormRegister<any>
    name: string
    isRequired?: boolean
    placeholder: string
    label: string
    errors: FieldErrors<any>
    defaultValue?: string | number
}

const TimePicker = (props: TimePickerProps) => {
    const { register, name, isRequired = false, placeholder, label, defaultValue, errors } = props
    return <div className="flex flex-col gap-1">
        <label htmlFor={name}>{label}</label>
        <div className="flex gap-2 items-center border-[1px] border-inputBorder hover:border-inputBorderHover transition duration-300 rounded px-4">
            <input
                {...register(name, {
                    required: isRequired ? `${label ? label : placeholder} harus diisi` : undefined,
                })}
                type="time"
                className="w-full h-full outline-none py-2"
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </div>

        <span className='text-start text-red-500'>
            {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
        </span>
    </div>

}

export default TimePicker