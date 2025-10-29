import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "../../Components/GeneralComponents/Carousel";
import InputField from "../../Components/GeneralComponents/InputField";
import Button from "../../Components/GeneralComponents/Button";
import QuanVaulte from "../../Media/GeneralMedia/QuanVaulte.png";

interface FormErrors {
  email?: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Validate the email format
  const validateEmail = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    try {
      setLoading(true);
      setMessage("Sending password reset link...");

      // 🔹 Send request to backend
      const response = await axios.post(
        "http://localhost:5000/api/v2/auth/forgot-password",
        { email }
      );

      // Example backend response:
      // { message: "Token sent", token: "abc123" }
      console.log("Reset token (for testing):", response.data.token);

      setMessage(
        " A password reset link has been sent to your email. Please check your inbox."
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Password reset error:", err.response?.data);

        const errorMsg =
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Unable to send reset link. Please try again.";

        setMessage(`${errorMsg}`);
      } else {
        console.error("Unexpected error:", err);
        setMessage("An unexpected error occurred. Please try again.");
      }
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
          className="w-full max-w-md space-y-6 min-h-screen flex flex-col justify-between">
          {/* HEADER */}
          <section className="flex flex-col w-full mt-10 mb-10 items-center max-w-md">
            <img src={QuanVaulte} alt="QuanVaulte logo" className="my-4" />
            <h2 className="lg:text-3xl md:text-3xl sm:text-2xl text-xl font-bold text-gray-800 text-center">
              Reset Your Password
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:text-sm">
              Enter your registered email address to receive a reset link.
            </p>

            {/* MESSAGE */}
            {message && (
              <p
                className={`text-center text-sm ${
                  message.startsWith("✅") ? "text-green-600" : "text-red-500"
                }`}>
                {message}
              </p>
            )}

            {/* EMAIL FIELD */}
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
              error={errors.email}
            />
          </section>

        
          <section className="flex flex-col items-center space-y-4 mb-6">
            <Button
              label={loading ? "Sending..." : "Send Reset Link"}
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full"
            />

            <p className="text-center text-gray-500 text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline cursor-pointer">
                Log in
              </Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
