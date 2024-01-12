import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Laporan, LaporanSatgas } from "../../consts/laporan"
import { ReactNode, useEffect, useState } from "react"
import { REGEX } from "../../consts/regex"
import { PrimaryButton } from "../form/Button"
import Datepicker from "../form/Datepicker"
import { Select } from "../form/Dropdown"
import { InputText, TextArea } from "../form/Input"
TextArea

const FormRekap = () => {

    return (
        <div className="mt-8">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 w-full"
            />
          </div>
        </div>
  
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Tipe Permasalahan</label>
          <select
            value={selectedTipePermasalahan}
            onChange={(e) => setSelectedTipePermasalahan(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">Select Tipe Permasalahan</option>
            {/* Add your options here */}
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
  
        <div className="mt-4">
          <button
            
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            Download
          </button>
        </div>
      </div>
    )

export default FormPelaporan