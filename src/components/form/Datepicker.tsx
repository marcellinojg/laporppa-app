import React from 'react';
import { Control, Controller } from "react-hook-form";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FaCalendar } from "react-icons/fa";
import { formatDate } from "../../helpers/formatDate";

interface DatepickerProps {
  control: Control<any>;
  name: string;
  isRequired?: boolean;
  placeholder: string;
  label: string;
  defaultValue: Date | null;
  type: 'date' | 'month' | 'year';
}

const Datepicker = (props: DatepickerProps) => {
  const { control, name, isRequired = false, placeholder, label, defaultValue = null, type } = props;

  const getDatepickerProps = () => {
    switch (type) {
      case 'year':
        return {
          viewMode: 'years',
          dateFormat: 'YYYY',
          timeFormat: false,
          inputProps: {
            placeholder
          }
        };
      case 'month':
        return {
          viewMode: 'months',
          dateFormat: 'MM/YYYY',
          timeFormat: false,
          inputProps: {
            placeholder
          }
        };
      default:
        return {
          dateFormat: 'DD/MM/YYYY',
          timeFormat: false,
          inputProps: {
            placeholder
          }
        };
    }
  };

  return (
    <Controller
      name={name}
      rules={{
        required: isRequired && "Tanggal harus diisi !",
      }}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={name}>{label}</label>
          <div className="relative flex gap-2 items-center border-[1px] border-inputBorder hover:border-inputBorderHover transition duration-300 rounded px-4 z-auto">
            <FaCalendar />
            <Datetime
              id={name}
              {...getDatepickerProps()}
              onChange={date => onChange(date.toDate())}
              value={value ? new Date(value) : ''}
              closeOnSelect={true}
              locale={'id'}
              inputProps={{ className: "w-full h-full outline-none p-3 rounded-lg", placeholder }}
            />
          </div>
          <span className="text-red-500">
            {error?.message}
          </span>
        </div>
      )}
    />
  );
};

export default Datepicker;
