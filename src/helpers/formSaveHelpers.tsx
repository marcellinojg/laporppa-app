import { ReactNode, useEffect } from "react"
import { UseFormSetValue, UseFormWatch } from "react-hook-form"

interface AutosaveForm {
    children: ReactNode
    setValue: UseFormSetValue<any>
    watch: UseFormWatch<any>
    formState: string | null
    setFormState: any
}

const AutosaveFormEffect = (props: AutosaveForm) => {
    const { children, watch, setValue, formState, setFormState } = props

    // Load form if available in local storage
    useEffect(() => {
        if (formState) {
            const formStateParsed = Object.entries(JSON.parse(formState))
            formStateParsed.forEach(element => {
                setValue(element[0], element[1])
            });
        }
    }, [])


    // Add form event listener to save forms in local storage
    useEffect(() => {
        const formSubscription = watch((formValues) => {
            const formValuesArr = Object.entries(formValues)
            let isEmpty = true

            formValuesArr.map((e) => {
                if (e[1] != null && e[1] != undefined && e[1] != '') {
                    isEmpty = false
                }
            })

            if (isEmpty) {
                setFormState(null)
            }
            else {
                setFormState(JSON.stringify(formValues))
            }
        }
        )
        return () => formSubscription.unsubscribe()
    }, [watch])

    return <>
        {children}
    </>
}

export default AutosaveFormEffect