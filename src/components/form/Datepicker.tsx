import { Control, Controller } from "react-hook-form"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { formatDate } from "../../helpers/formatDate";


interface DatepickerProps {
    control: Control<any>
    name: string
    isRequired?: boolean
    placeholder: string
    label: string
    defaultValue: Date | null
}

const Datepicker = (props: DatepickerProps) => {
    const { control, name, isRequired = false, placeholder, label, defaultValue = null } = props
    return <Controller
        name={name}
        rules={{
            required: isRequired === true && "Tanggal harus diisi !"
        }}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) =>
            <div className="flex flex-col gap-1">
                <label htmlFor={name}>{label}</label>
                <div className="flex gap-2 items-center border-[1px] border-inputBorder hover:border-inputBorderHover transition duration-300 rounded px-4">
                    <FaCalendar />
                    <DatePicker
                        id={name}
                        wrapperClassName="w-full h-full outline-none"
                        className="w-full h-full outline-none p-3 rounded-lg"
                        placeholderText={placeholder}
                        onChange={onChange}
                        startDate={new Date()}
                        value={formatDate(value, true)}
                        maxDate={new Date()}
                        maxTime={new Date()}
                        showTimeInput={true}
                        showFullMonthYearPicker={true}
                        locale={'id'}
                    />
                </div>

                <span className="text-red-500">
                    {error?.message}
                </span>
            </div>
        }
    />
}

export default Datepicker