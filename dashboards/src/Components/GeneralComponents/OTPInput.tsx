import React, { useRef } from "react";

interface OTPInputProps {
  length?: number; 
  value: string[];
  onChange: (value: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, ""); // allow only digits
    if (!val) return;

    const newValue = [...value];
    newValue[index] = val.slice(-1); // only last digit kept
    onChange(newValue);

    // move to next input if available
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newValue = [...value];
        newValue[index] = "";
        onChange(newValue);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-3 mt-6">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="w-12 h-12 text-center text-2xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      ))}
    </div>
  );
};

export default OTPInput;

