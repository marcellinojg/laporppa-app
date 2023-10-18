import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

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
    className?: string
}