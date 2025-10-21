import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  type: string;
  placeholder?: string;
  name?: string; // 👈 made optional
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name = "", // 👈 default to empty string
  value,
  onChange,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // 👇 safely check for password field
  const isPasswordField =
    name?.toLowerCase() === "password" ||
    placeholder?.toLowerCase()?.includes("password");

  return (
    <div className="w-full relative mb-4">
      <input
        type={isPasswordField && showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-2 pr-10
          focus:outline-none focus:ring-2 transition-all duration-300
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-500"
          } ${className}`}
      />

      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
