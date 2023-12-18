
import { ChangeEventHandler, useEffect, useState } from "react"
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import Thumbnail from "../common/Thumbnail"

interface UploaderProps {
  name: string;
  control: Control<any>;
  watch: UseFormWatch<any>;
  placeholder: string;
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  errorLabel: string;
  isRequired?: boolean;
  isMultiple: boolean;
//   defaultValue?: File[] | undefined;
}

const Uploader = (props: UploaderProps) => {
    const { name, placeholder, setValue, errors, isMultiple } = props
    const [pictures, setPictures] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])


    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files
        if (!files) return

        if(isMultiple === false) {
            setFiles([files[0]])
            setPictures([URL.createObjectURL(files[0])])
            return
        }
        for (let i = 0; i < files.length; i++) {
            setFiles(prev => [...prev, files[i]])
            setPictures(prev => [...prev, URL.createObjectURL(files[i])])
        }
    }

    useEffect(() => {
        setValue(name, files)
    }, [files])



    return (
      <>
        <div className="min-h-[250px] w-full border-primary border-2 rounded border-dashed bg-primary bg-opacity-10 relative">
          <input
            type="file"
            className="opacity-0 absolute z-20 w-full h-full"
            multiple={isMultiple}
            title=" "
            id={name}
            onChange={onChange}
            accept="image/*,.pdf"
          />
          {pictures.length === 0 ? (
            <div className="absolute top-0 h-full w-full flex items-center justify-center z-10">
              <div className="flex flex-col text-center">
                <span className="font-bold">
                  Drop Files Here or Click to Upload
                </span>
                <span className="text-sm text-gray-500">{placeholder}</span>
              </div>
            </div>
          ) : (
            <div className="absolute top-0 h-full w-full flex flex-wrap max-w-full overflow-hidden items-center justify-center gap-3">
              {pictures.map((picture, index) => (
                <Thumbnail
                  key={index}
                  imgUrl={picture}
                  isMultiple={isMultiple}
                  onDelete={() => {
                    const index = pictures.findIndex((p) => p === picture);
                    files.splice(index, 1);
                    setValue(name, files);
                    setPictures(pictures.filter((p) => p != picture));
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <span className="text-start text-red-500">
          {errors[name] && <span>{errors[name]!.message?.toString()}</span>}
        </span>
      </>
    );




}

export default Uploader