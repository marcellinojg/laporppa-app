import React from 'react';
import { Control, Controller } from "react-hook-form";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FaCalendar } from "react-icons/fa";

interface DatepickerProps {
  control: Control<any>;
  name: string;
  isRequired?: boolean;
  placeholder: string;
  label: string;
  defaultValue: Date | null;
  type: 'date' | 'month' | 'year';
  limitToToday?: boolean;
}

const Datepicker = (props: DatepickerProps) => {
  const { control, name, isRequired = false, placeholder, label, defaultValue = null, type, limitToToday = false } = props;

  const today = new Date();

  const getDatepickerProps = () => {
    // If limitToToday is true, restrict date selection to today or earlier
    const isValidDate = (currentDate) => limitToToday
      ? currentDate.isSameOrBefore(today, type === 'year' ? 'year' : type === 'month' ? 'month' : 'day')
      : true;

    switch (type) {
      case 'year':
        return {
          viewMode: 'years',
          dateFormat: 'YYYY',
          timeFormat: false,
          inputProps: {
            placeholder
          },
          isValidDate
        };
      case 'month':
        return {
          viewMode: 'months',
          dateFormat: 'MM/YYYY',
          timeFormat: false,
          inputProps: {
            placeholder
          },
          isValidDate
        };
      default:
        return {
          dateFormat: 'DD/MM/YYYY',
          timeFormat: false,
          inputProps: {
            placeholder
          },
          isValidDate
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
              key={value}
              id={name}
              {...getDatepickerProps()}
              onChange={(date) => {
                if (date && (date as any)._isAMomentObject) {
                  onChange((date as any).toDate());
                } else {
                  onChange(null); // Ensure null is passed
                }
              }}
              value={value ? new Date(value) : ''}  // Show blank when value is null
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