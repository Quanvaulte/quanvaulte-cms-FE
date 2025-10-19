import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc"
import Carousel from "../Components/GeneralComponents/Carousel"
import InputField from "../Components/GeneralComponents/InputField"
import QuanVaulte from "../Media/GeneralMedia/QuanVaulte.png"
import Button from "../Components/GeneralComponents/Button"
import DropdownInput from "../Components/GeneralComponents/DropdownInput"


interface FormData {
  name: string
  email: string
  accountType: string
  password: string
}

interface FormErrors {
  name?: string
  email?: string
  accountType?: string
  password?: string
  confirm_password?: string
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    accountType: "",
    password: "",  
  })

  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#&<>])[A-Za-z\d@$!%*?&#&<>]{8,}$/

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required."
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!formData.accountType) {
      newErrors.accountType = "Please select an account type."
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
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
      setFormData({ name: "", email: "", accountType:"", password: "" })
      setConfirmPassword("")
      setErrors({})
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">

      <Carousel/>

      <div className="flex w-full md:w-1/2 bg-white justify-center items-center px-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            
          <div className="flex flex-col w-full mt-10 mb-10 items-center max-w-md">
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

          <DropdownInput
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            options={["Create account as a learner", "Create account for your children", "Create account as a school"]}
            error={errors.accountType}
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

          <div className="flex items-center mt-9 mb-1.5">
            <hr className="flex-grow border-t border-dashed border-gray-300" />
                <span className="mx-2 text-gray-500 text-base">or</span>
            <hr className="flex-grow border-t border-dashed border-gray-300" />
          </div>

          <Button
            label="Sign up with Google"
            variant="google"
            icon={<FcGoogle />}
            className="w-full"
            onClick={() => console.log("Sign up with Google")}
          />

          <Button
            label="Create account"
            type="submit"
            variant="primary"
            className="mt-15 mb-0"
          />

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline cursor-pointer">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage


