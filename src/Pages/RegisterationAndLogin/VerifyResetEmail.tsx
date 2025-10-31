import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "../../Components/GeneralComponents/Carousel";
import QuanVaulte from "../../Media/GeneralMedia/QuanVaulte.png";
import OTPInput from "../../Components/GeneralComponents/OTPInput";
import Button from "../../Components/GeneralComponents/Button";

const VerifyResetEmail: React.FC = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const { userId } = useParams<{ userId: string }>();

  const handleOtpChange = (newOtp: string[]) => setOtp(newOtp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join("");

    if (token.length < 4) {
      setErrorMsg("Please enter the full verification code.");
      return;
    }

    if (!userId) {
      setErrorMsg("Invalid verification link. Missing user ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post(
        `https://quanvaulte-be.onrender.com/auth/reset-password`,
        { userId }
      );

      if (response.status === 200) {
        setSuccessMsg("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/reset-password"), 1000);
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.response?.status === 400) {
        setErrorMsg("Invalid or expired verification code.");
      } else {
        setErrorMsg("An error occurred while verifying your email.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setTimer(30);
    setOtp(Array(4).fill(""));
    setErrorMsg("");
    setSuccessMsg("");

    if (!userId) {
      setErrorMsg("Missing user ID. Cannot resend code.");
      return;
    }

    try {
      console.log("Resending OTP to user:", userId);
      const response = await axios.post(
        `https://quanvaulte-be.onrender.com/auth/reset-password`,
        { userId }
      );

      if (response.status === 200) {
        setSuccessMsg("A new verification code has been sent to your email.");
        console.log("OTP sent successfully:", response.data.token);
      } else {
        setErrorMsg("Failed to resend verification code.");
      }
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      setErrorMsg("An error occurred while resending the code.");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

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

            <h2 className="text-2xl sm:text-base font-bold text-gray-800">
              Verify your Email Address
            </h2>

            <p className="text-gray-600 text-base sm:text-base text-center">
              Enter the 4-digit code sent to your email to verify your account.
            </p>

            <OTPInput value={otp} onChange={handleOtpChange} />

            {errorMsg && (
              <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-green-600 text-sm mt-2">{successMsg}</p>
            )}

            <p className="text-gray-500 text-base mt-3">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Resend code
                </button>
              ) : (
                <>
                  Resend in <span className="font-semibold">{timer}s</span>
                </>
              )}
            </p>
          </section>

          <section className="flex flex-col items-center space-y-4 mb-6">
            <Button
              label={loading ? "Verifying..." : "Verify Email"}
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            />

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Log in
              </Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetEmail;
