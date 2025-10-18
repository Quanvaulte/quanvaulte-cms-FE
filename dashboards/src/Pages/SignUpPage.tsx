import React, { useState } from "react"
import Carousel from "../Components/GeneralComponents/Carousel"
import InputField from "../Components/GeneralComponents/InputField"
import QuanVaulte from "../Media/GeneralMedia/QuanVaulte.png"
import Button from "../Components/GeneralComponents/Button"

interface FormData {
  name: string
  email: string
  password: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirm_password?: string
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",  
  })

  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required."
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must have 8 characters, one uppercase, one number, and one special character."
    }

    if (confirmPassword !== formData.password) {
      newErrors.confirm_password = "Passwords do not match."
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" })) 
  }

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)

    if (value && value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "Passwords do not match.",
      }))
    } else {
      setErrors((prev) => ({ ...prev, confirm_password: "" }))
    }
  }

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      setFormData({ name: "", email: "", password: "" })
      setConfirmPassword("")
      setErrors({})
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <Carousel />
      <div className="flex w-full md:w-1/2 bg-white justify-center items-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            
          <div className="flex flex-col w-full items-center max-w-md">
            <img src={QuanVaulte} alt="QuanVaulte logo" className="my-4" />
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Create an E-Learn account
            </h2>
            <p className="text-gray-600 text-center">
              Join thousands of students learning future tech skills.
            </p>
          </div>

          <InputField
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            error={errors.confirm_password}
          />

          <Button
            label="Sign Up"
            type="submit"
            variant="primary"
            className="mt-14 mb-0"
          />

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage


