import { ReactNode, useState } from "react"
import { HiEyeSlash, HiEye } from "react-icons/hi2"
import { InputProps } from "../../consts/input"
import { REGEX } from "../../consts/regex"

export const InputText = (props: InputProps): ReactNode => {
    const { register, placeholder, name, isRequired, errors, regex, autoComplete, obscure, label, type = 'text', className } = props
    const [isObscure, setIsObscure] = useState<boolean | undefined>(obscure)

    return <div className='flex flex-col gap-1'>
        {label &&
            <label htmlFor={name}>
                {label ? label : placeholder}
                {isRequired && <span className='text-red-500'> *</span>}
            </label>
        }

        <div className={`${obscure === true && 'relative'}`}>
            <input
                autoComplete={autoComplete}
                id={name}
                className={`rounded-lg py-3 px-4 text-black border-2 border-slate-400 w-full outline-1 ${className}`}
                type={isObscure ? 'password' : type}
                {...register(
                    name,
                    {
                        required: isRequired ? `${label ? label : placeholder} harus diisi` : undefined,
                        pattern: regex ? {
                            value: regex,
                            message: regex == REGEX.PHONE_IDN ? 'Gunakan format contoh: 08123456789' : `${label || placeholder} tidak valid !`
                        } : undefined
                    },
                )}
                placeholder={placeholder}
            />
            {isObscure != undefined &&
                <button type='button' className='absolute top-1/2 transform -translate-y-1/2 right-3' onClick={() => setIsObscure(prev => !prev)}>
                    {isObscure ? <HiEyeSlash /> : <HiEye />}
                </button>
            }

        </div>

        <span className='text-start text-red-500'>
            {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
        </span>
    </div>
}

export const TextArea = (props: InputProps) => {
    const { register, placeholder, name, isRequired, errors, label, className } = props



    return <div className='flex flex-col gap-1'>
        {label &&
            <label htmlFor={name}>
                {label ? label : placeholder}
                {isRequired && <span className='text-red-500'> *</span>}
            </label>
        }
        <div className=''>
            <textarea
                id={name}
                className={`rounded-lg p-2 border-2 border-slate-400 resize-none text-black w-full outline-none ${className}`}
                placeholder={placeholder}
                rows={5}
                defaultValue={""}
                {...register(
                    name,
                    {
                        required: isRequired ? `${label ? label : placeholder} harus diisi` : undefined,
                    },
                )}

            />
        </div>

        <span className='text-start text-red-500'>
            {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
        </span>
    </div>

}
