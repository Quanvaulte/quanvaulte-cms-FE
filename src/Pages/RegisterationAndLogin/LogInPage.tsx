import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../api/axiosInstance";
import { FcGoogle } from "react-icons/fc";
import Carousel from "../../Components/GeneralComponents/Carousel";
import InputField from "../../Components/GeneralComponents/InputField";
import QuanVaulte from "../../Media/GeneralMedia/QuanVaulte.png";
import Button from "../../Components/GeneralComponents/Button";

interface LoginData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginResponse {
  token: string;
}

interface ApiErrorResponse {
  msg?: string;
  message?: string;
}

function LogInPage() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required.";
    } else if (!loginData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      email: loginData.email,
      password: loginData.password,
    };

    console.log("payload", payload);

    try {
      setLoading(true);
      setMessage("Signing you in...");

      const response = await api.post<LoginResponse>("/auth/login", payload);
      console.log("response", response);

      if (response.status === 200 && response.data.token) {
        setMessage("Login successful!");
        Cookies.set("auth_token", response.data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Login error:", err);

      const errorMsg =
        err.response?.status === 401
          ? "Invalid email or password."
          : err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message ||
            "Something went wrong. Please try again.";

      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <Carousel />

      <div className="flex flex-col w-full md:w-1/2 bg-white justify-between items-center px-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 min-h-screen flex flex-col justify-between"
        >
          <section className="flex flex-col w-full mt-10 mb-10 items-center max-w-md">
            <img src={QuanVaulte} alt="QuanVaulte logo" className="my-4" />
            <h2 className="lg:text-3xl md:text-3xl sm:text-2xl text-xl font-bold text-gray-800 text-center">
              Login to your QuanVaulte account
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:text-sm">
              Access your learning vault securely.
            </p>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

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

            <p className="self-end text-[#2C43EB] text-center sm:text-sm">
              <Link
                to="/forgotpassword"
                className="text-l font-medium hover:underline"
              >
                Forgotten password?
              </Link>
            </p>
          </section>

          <section>
            <div className="flex items-center mt-9 mb-1.5">
              <hr className="grow border-t border-dashed border-gray-300" />
              <span className="mx-2 text-gray-500 text-base">or</span>
              <hr className="grow border-t border-dashed border-gray-300" />
            </div>

            <Button
              label="Sign in with Google"
              variant="google"
              icon={<FcGoogle />}
              className="w-full sm:text-sm"
              onClick={() => console.log("Sign in with Google")}
            />

            <Button
              label={loading ? "Signing In..." : "Sign In"}
              type="submit"
              variant="primary"
              disabled={loading}
              className="mt-15 mb-0 w-full sm:text-sm"
            />

            <p className="text-center text-gray-500 text-sm">
              Don’t have an account?
              <Link
                to="/register"
                className="text-blue-600 mb-5 hover:underline cursor-pointer"
              >
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
