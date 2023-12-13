import { ReactNode, useState } from "react"
import { HiEyeSlash, HiEye } from "react-icons/hi2"
import { InputProps, SearchInputProps } from "../../consts/input"
import { REGEX } from "../../consts/regex"
import { FaSearch } from "react-icons/fa"

export const InputText = (props: InputProps): ReactNode => {
    const { register, placeholder, name, isRequired, errors, regex, autoComplete, obscure, label, type = 'text', className, defaultValue = '', isDisabled} = props
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
                defaultValue={defaultValue}
                className={`rounded p-2 text-black outline-blue-500 border-[1px] border-inputBorder hover:border-inputBorderHover transition duration-300 w-full outline-1 ${className}`}
                type={isObscure ? 'password' : type}
                {...register(
                    name,
                    {   disabled: isDisabled? true : false,
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
    const { register, placeholder, name, isRequired, errors, label, className, defaultValue ='', maxChar = 255, errorLabel = label } = props

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
                className={`rounded p-2 border-[1px] border-inputBorder hover:border-inputBorderHover transition duration-300 resize-none text-black w-full outline-none ${className}`}
                placeholder={placeholder}
                rows={5}
                defaultValue={defaultValue}
                {...register(
                    name,
                    {
                        required: isRequired ? `${label ? errorLabel : placeholder} harus diisi` : undefined,
                        maxLength: {
                            value: maxChar,
                            message: `Panjang maksimal ${maxChar} karakter`
                        }
                    },
                )}

            />
        </div>

        <span className='text-start text-red-500'>
            {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
        </span>
    </div>

}


export const SearchInput = (props: SearchInputProps) => {
    const { value, setValue } = props
    return <div className="border-[1px] border-slate-300 flex items-center gap-3 p-2.5 rounded-lg">
        <label htmlFor="search" className="text-slate-500">
            <FaSearch />
        </label>
        <input type="text"
            id='search'
            className=" outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
        />
    </div>
}