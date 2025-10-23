import React, { useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // Allow only alphanumeric characters (A-Z, a-z, 0-9)
    const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    if (!val) return;

    const newValue = [...value];
    newValue[index] = val.slice(-1).toUpperCase(); // Keep last character, uppercase for consistency
    onChange(newValue);

    // Move to next input automatically
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newValue = [...value];
        newValue[index] = "";
        onChange(newValue);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, length)
      .toUpperCase();

    if (!pasted) return;

    const newValue = pasted
      .split("")
      .concat(Array(length - pasted.length).fill(""));
    onChange(newValue);

    // Focus last filled input
    inputRefs.current[Math.min(pasted.length, length) - 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-3 mt-6">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="text"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="w-12 h-12 text-center text-2xl font-semibold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
        />
      ))}
    </div>
  );
};

export default OTPInput;
