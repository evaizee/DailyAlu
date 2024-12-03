import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DateTimeInputProps {
  selected: Date;
  onChange: (date: Date | null) => void;
  label?: string;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  selected,
  onChange,
  label
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <DatePicker
        selected={selected}
        onChange={(date) => onChange(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        className="input-field w-full"
        placeholderText="Select date and time"
      />
    </div>
  );
};