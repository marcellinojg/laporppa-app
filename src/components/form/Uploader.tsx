
import { useEffect, useState } from "react"
import { Control, Controller, FieldValue, UseFormWatch } from "react-hook-form"

interface UploaderProps {
    name: string
    control: Control<any>
    watch: UseFormWatch<any>
    placeholder: string

}

const Uploader = (props: UploaderProps) => {
    const { name, control, watch, placeholder } = props

    const [picture, setPicture] = useState<string>('')

    useEffect(() => {
        const subscription = watch((value) => {
            console.log(value)
        })
        return () => subscription.unsubscribe()
    }, [])


    return <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) =>
            <div className="h-[200px] w-full border-primary border-2 rounded border-dashed bg-primary bg-opacity-10 relative">
                <input type="file" multiple className="opacity-0 absolute z-20 w-full h-full" name={name} id={name} onChange={onChange} />
                {!picture ?
                    <div className="absolute top-0 h-full w-full flex items-center justify-center z-10">
                        <div className="flex flex-col text-center">
                            <span className="font-bold">
                                Drop Files here or click to upload
                            </span>
                            <span className="text-sm text-gray-500">{placeholder}</span>
                        </div>
                    </div> :
                    <></>
                }


            </div>
        }
    />

}

export default Uploader