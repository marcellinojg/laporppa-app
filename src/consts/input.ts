import { Dispatch, SetStateAction } from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"

export interface InputProps {
    register: UseFormRegister<any>
    placeholder: string
    name: string
    isRequired?: boolean
    errors: FieldErrors<any>
    regex?: RegExp
    autoComplete?: string
    obscure?: boolean
    label?: string
    type?: string
    defaultValue?: string
    className?: string
    maxChar? : number
}

export interface SearchInputProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}