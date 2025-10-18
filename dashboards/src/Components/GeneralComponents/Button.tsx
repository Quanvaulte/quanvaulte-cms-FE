import React from "react"

type ButtonVariant = "primary" | "custom"

interface ButtonProps {
  label: string
  variant?: ButtonVariant
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  
  const baseStyles =
    "px-6 py-2 rounded-xl font-semibold text-base transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 disabled:opacity-60 cursor-pointer"

  const variants: Record<ButtonVariant, string> = {
    primary: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg ",
    custom:"",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  )
}

export default Button
