import React from "react"

interface InputFieldProps {
  type: string
  placeholder?: string
  pattern?: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-2 focus:outline-none transition-all duration-300
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }
          ${className}`}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm font-medium mt-1">{error}</p>}
    </div>
  )
}

export default InputField

