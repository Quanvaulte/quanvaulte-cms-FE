import React, { useState } from "react";
import { AxiosError } from "axios";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Carousel from "../../Components/GeneralComponents/Carousel";
import InputField from "../../Components/GeneralComponents/InputField";
import QuanVaulte from "../../Media/GeneralMedia/QuanVaulte.png";
import Button from "../../Components/GeneralComponents/Button";
import { FcGoogle } from "react-icons/fc";

interface ApiErrorResponse {
  msg?: string;
  message?: string;
}

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const payload = {
      name: name,
      email: email,
      password: password,
      is_admin: false,
    };

    console.log("payload:", payload);

    try {
      setLoading(true);
      setMessage("Creating your QuanVaulte account...");

      const response = await api.post("/auth/register", payload);

      console.log("response", response);

      if (response.status === 201) {
        setMessage("Account created successfully!");
        setTimeout(
          () => navigate(`/verify-email/${response.data.userId}`),
          1500
        );
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(response.data?.msg || "Registration failed. Try again.");
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      console.error("Signup error:", err);

      const errorMsg =
        err.response?.data?.msg ||
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

      <div className="flex w-full md:w-1/2 bg-white justify-center items-center px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
          <div className="flex flex-col items-center">
            <img src={QuanVaulte} alt="QuanVaulte logo" className="my-4 w-32" />
            <h2 className="text-2xl font-bold text-gray-800">
              Create your QuanVaulte account
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Get started with secure learning and vault access.
            </p>
          </div>

          {message && (
            <p
              className={`text-center text-sm ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <InputField
            type="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            label={loading ? "Signing Up..." : "Sign Up"}
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full"
          />

          <div className="flex items-center mt-6">
            <hr className="grow border-t border-dashed border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <hr className="grow border-t border-dashed border-gray-300" />
          </div>

          <Button
            label="Sign up with Google"
            variant="google"
            icon={<FcGoogle />}
            className="w-full"
            onClick={() => console.log("Sign up with Google")}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
