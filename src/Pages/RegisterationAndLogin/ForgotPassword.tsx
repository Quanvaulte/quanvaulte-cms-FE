import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../../Components/GeneralComponents/Carousel";
import InputField from "../../Components/GeneralComponents/InputField";
import QuanVaulte from "../../Media/GeneralMedia/QuanVaulte.png";
import Button from "../../Components/GeneralComponents/Button";

interface ForgotPasswordData {
  email: string;
}

interface ApiResponse {
  message: string;
}

interface FormErrors {
  email?: string;
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState<ForgotPasswordData>({
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotPassword((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!forgotPassword.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post<ApiResponse>(
        "https://quanvaulte-be.onrender.com/api/v2/auth/forgot-password",
        { email: forgotPassword.email }
      );

      console.log("📩 Forgot Password API Response:", response.data);

      if (response.status || response.status === 201) {
        setMessage(response.data.message || "Password reset link sent!");
        setMessageType("success");
        setTimeout(
          () => navigate(`/verify-reset-email/${response.data}`),
          1500
        );

        setForgotPassword({ email: "" });
      } else {
        setMessage("Request unsuccessful. Try again.");
      }

      // if and else statement to navigate to the verify email page
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      console.error("Error calling forgot password endpoint:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setMessage(errorMessage);
      setMessageType("error");
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
              value={forgotPassword.email}
              onChange={handleChange}
              error={errors.email}
            />

            {message && (
              <p
                className={`mt-4 text-sm text-center ${
                  messageType === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </section>

          <section>
            <Button
              label={loading ? "Sending..." : "Continue"}
              type="submit"
              variant="primary"
              className="mt-15 mb-0 w-full sm:text-sm"
              disabled={loading}
            />

            <p className="text-center text-gray-500 text-sm">
              Remember your password?{" "}
              <Link
                to="/"
                className="text-blue-600 mb-5 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
