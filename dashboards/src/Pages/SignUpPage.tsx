import React, { useState } from "react"
import Carousel from "../Components/Carousel"
import InputField from "../Components/InputField"
import QuanVaulte from "../Media/GeneralMedia/QuanVaulte.png"

interface FormData {
  name: string
  email: string
  password: string
  confirm_password: string
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
    confirm_password: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required."
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address."
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters."
    }

    if (formData.confirm_password !== formData.password) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      setFormData({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      })
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
            value={formData.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Sign Up
          </button>

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


