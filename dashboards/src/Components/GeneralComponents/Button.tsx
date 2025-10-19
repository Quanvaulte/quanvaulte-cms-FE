import React from "react"

type ButtonVariant = "primary" | "custom" | "google"

interface ButtonProps {
  label: string
  variant?: ButtonVariant
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
  icon,
}) => {
  
  const baseStyles =
    "flex items-center justify-center gap-2 px-3 md:px-6 py-1.5 md:py-2 text-sm sm:text-base md:text-lg  rounded-xl font-semibold text-base transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 disabled:opacity-60 cursor-pointer"

  const variants: Record<ButtonVariant, string> = {
    primary: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg ",
    google: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:ring-gray-400",
    custom:"",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {label}
    </button>
  )
}

export default Button



