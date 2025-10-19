import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Carousel from "../Components/GeneralComponents/Carousel";
import InputField from "../Components/GeneralComponents/InputField";
import QuanVaulte from "../Media/GeneralMedia/QuanVaulte.png";
import Button from "../Components/GeneralComponents/Button";

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function LogInPage() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

    const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#&<>])[A-Za-z\d@$!%*?&#&<>]{8,}$/


  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!loginData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(loginData.password)) {
      newErrors.password =
        "Password must have at least: 8 characters, 1 UPPERCASE, 1 number, and a special character (%@#$)."
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };


  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Form submitted:", loginData);

    setLoginData({ email: "", password: "" });
    setErrors({});
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
    
      <Carousel />

      <div className="flex flex-col w-full md:w-1/2 bg-white justify-between items-center px-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 min-h-screen flex flex-col justify-between">
          <section className="flex flex-col w-full mt-10 mb-10 items-center max-w-md">
           
            <img src={QuanVaulte} alt="QuanVaulte logo" className="my-4" />
            <h2 className="lg:text-3xl md:text-3xl sm:text-2xl text-xl font-bold text-gray-800 text-center">
              Login to your Quantive account
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:text-sm">
              Join thousands of students learning future tech skills.
            </p>
          
          
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              error={errors.email}
            />
            

          
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              error={errors.password}
            />
            
          <p className="self-end text-[#2C43EB] text-center sm:text-sm"><Link to="/forgotpassword" className='text-l font-medium hover:underline'>Forgotten password?</Link> </p>
          </section>

          <section>
            
          <div className="flex items-center mt-9 mb-1.5">
            <hr className="flex-grow border-t border-dashed border-gray-300" />
            <span className="mx-2 text-gray-500 text-base">or</span>
            <hr className="flex-grow border-t border-dashed border-gray-300" />
          </div>

          <Button
            label="Sign in with Google"
            variant="google"
            icon={<FcGoogle />}
            className="w-full sm:text-sm"
            onClick={() => console.log("Sign in with Google")}
          />

          <Button
            label="Sign in"
            type="submit"
            variant="primary"
            className="mt-15 mb-0 w-full sm:text-sm"
          />

          <p className="text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link to="/" className="text-blue-600 mb-5 hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
          </section>

        
        </form>
      </div>
    </div>
  );
}

export default LogInPage;
