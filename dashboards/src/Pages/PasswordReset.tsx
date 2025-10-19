import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Carousel from "../Components/GeneralComponents/Carousel";
import InputField from "../Components/GeneralComponents/InputField";
import QuanVaulte from "../Media/GeneralMedia/QuanVaulte.png";
import Button from "../Components/GeneralComponents/Button";

interface passwordReset {
  email: string;
}

interface FormErrors {
  email?: string;
}

function PasswordReset() {
  const [passwordReset, setPasswordReset] = useState<passwordReset>({
    email: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordReset((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!passwordReset.email.includes("@")) {
      newErrors.email = "Please enter a valid email address."
    }


     setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", passwordReset);
      setPasswordReset({ email: ""});
      setErrors({});
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
    
      <Carousel />

      <div className="flex flex-col w-full md:w-1/2 bg-white justify-between items-center px-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 min-h-screen flex flex-col justify-between">
          <section className="flex flex-col w-full mt-10 mb-10 items-center max-w-md">
           
            <img src={QuanVaulte} alt="QuanVaulte logo" className="my-4" />
            <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-xl">
              Forgotten your password
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:text-sm">
              Reset your password and get back to learning
            </p>
          
          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            value={passwordReset.email}
            onChange={handleChange}
            error={errors.email}
          />

          </section>

          <section>
          <Button
            label="Continue"
            type="submit"
            variant="primary"
            className="mt-15 mb-0 w-full sm:text-sm"
          />

          <p className="text-center text-gray-500 text-sm">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 mb-5 hover:underline cursor-pointer">
              Login
            </Link>
          </p>
          </section>

        
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
