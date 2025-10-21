import React from "react";

interface DropdownInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  error?: string; 
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  name,
  value,
  onChange,
  options,
  placeholder = "-- Select account type --",
  error,
}) => {
  const isPlaceholderSelected = value === "";

  return (
    <div className="w-full">
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-2 focus:outline-none 
          focus:ring-2 focus:ring-blue-500 transition-all duration-300 pr-10 cursor-pointer bg-white
          ${isPlaceholderSelected ? "text-gray-500" : "text-black-700"}
          ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DropdownInput;
