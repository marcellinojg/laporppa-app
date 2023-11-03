import { ReactNode, useEffect, useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ReactSelect, { Options } from 'react-select';

interface DropdownProps {
    name: string
    options: DropdownOptionProps[]
    placeholder: string
    register: UseFormRegister<any>
    errors: FieldErrors<FieldValues>
    label?: string
    errorLabel: string
    isDisabled?: boolean
}

interface SelectProps {
    name: string
    options: Options<any>
    control: Control<any>
    placeholder: string
    label: string
    errors: FieldErrors<FieldValues>
    isDisabled?: boolean
    errorLabel?: string
    isRequired?: boolean
    defaultValue?: string | number
}

interface DropdownOptionProps {
    text: string
    value: string | number
}

export const Dropdown = (props: DropdownProps): ReactNode => {
    const [value, setValue] = useState<string>()
    const { name, options, placeholder, register, errors, label, errorLabel, isDisabled = false } = props


    // Bisa di fix
    useEffect(() => {
        const select = document.getElementById(name) as HTMLSelectElement

        const handleDropdownValueChange = (e: any) => {
            setValue(e.target.value)
        }

        select.addEventListener('change', handleDropdownValueChange)

        return () => select.removeEventListener('change', handleDropdownValueChange)

    }, [])

    // Bisa di fix
    useEffect(() => {
        const select = document.getElementById(name) as HTMLSelectElement
        select.dispatchEvent(new Event('change'))
    }, [value])



    return <div className='flex flex-col gap-1 w-full'>
        {label &&
            <label htmlFor={name}>
                {label ? label : placeholder}
                <span className='text-red-500'> *</span>
            </label>
        }

        <div className='rounded-lg text-black'>
            <select
                defaultValue={""}
                id={name}
                disabled={isDisabled}
                className={` text-black border-2 border-slate-400 bg-white w-full outline-none px-2 py-3 rounded-lg ${value == '' && 'text-gray-400'}`}
                {...register(name, {
                    required: `Pilihan ${errorLabel} harus diisi`,
                })}
            >
                {/* Placeholder Option */}
                <option value="" className='text-gray-400' selected disabled>{placeholder}</option>

                {/* Map Options */}
                {options.map((e, index) => {
                    return <option value={e.value} className='text-black' key={index}>{e.text}</option>
                })}

            </select>
        </div>
        <span className='text-red-500 text-start'>
            {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
        </span>
    </div>

}


export const Select = (props: SelectProps) => {
    const { control, name, placeholder, options, label, isDisabled = false, errorLabel, isRequired = true, defaultValue = '' } = props



    return <Controller
        control={control}
        name={name}
        rules={{
            required: isRequired === true && `${errorLabel} harus diisi !`
        }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => <div className='flex flex-col gap-1 w-full'>
            <label htmlFor={name}>
                {label ? label : placeholder}
                {isRequired === true && <span className='text-red-500'> *</span>}
            </label>
            <ReactSelect
                isDisabled={isDisabled}
                onChange={val => onChange(val.value)}
                value={options.find(c => c.value === value)}
                placeholder={placeholder}
                options={options}
            />
            <span className='text-red-500 text-start'>
                {error?.message}
            </span>
        </div>
        }
    />
}