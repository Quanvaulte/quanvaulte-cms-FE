import React from "react";
import { Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
  subtext?: string; 
}

interface CustomRadioInputProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const CustomRadioInput: React.FC<CustomRadioInputProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer transition-colors duration-200 
              ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-100"}`}
          >
            <div className="flex flex-col">
              <span className="text-gray-800 font-medium">
                {option.label}
              </span>
              {option.subtext && (
                <span className="text-gray-500 text-sm mt-1">
                  {option.subtext}
                </span>
              )}
            </div>

            {isSelected && <Check className="text-blue-600 w-5 h-5" />}
          </div>
        );
      })}
    </div>
  );
};

export default CustomRadioInput;

