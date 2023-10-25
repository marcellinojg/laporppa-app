import { ReactNode, useEffect, useState, useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import { FaCheck } from "react-icons/fa"

interface CheckboxProps {
    name: string
    label: string
    isRequired?: boolean
    form: UseFormReturn
    wrapperClass?: string
}

export const Checkbox = (props: CheckboxProps): ReactNode => {
    const { name, label, isRequired, form, wrapperClass } = props
    const { register, formState: { errors } } = form
    const [value, setValue] = useState<boolean | undefined>(false)

    return (
        <div className={`flex flex-col gap-1 ${wrapperClass}`}>
            <input
                id={name}
                type="checkbox"
                className="w-16 h-16 hidden"
                {...register(name, {
                    required: (value === false && isRequired) && "Perlu dicentang !",
                })}
                onChange={(e) => setValue(e.target.checked)}
            />
            <label htmlFor={name} className="flex items-center gap-4">
                <div
                    className={`w-8 h-8 px-4 border-[#c81e4f] border-[2px] rounded-md relative ${value ? "bg-primary" : "bg-white"
                        } transition duration-300`}
                >
                    <span className="text-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ">
                        <FaCheck />
                    </span>
                </div>
                <div className="text-[13px]">{label}</div>
            </label>
            <span className="text-red-500">
                {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
            </span>
        </div>
    );
}
