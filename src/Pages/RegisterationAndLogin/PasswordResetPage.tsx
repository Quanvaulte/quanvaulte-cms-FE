import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../Components/GeneralComponents/Carousel";
import InputField from "../../Components/GeneralComponents/InputField";
import QuanVaulte from "../../Media/GeneralMedia/QuanVaulte.png";
import Button from "../../Components/GeneralComponents/Button";

interface passwordReset {
  password: string;
}

interface FormErrors {
  password?: string;
  confirm_password?: string;
}

function PasswordResetPage() {
  const [passwordReset, setPasswordReset] = useState<passwordReset>({
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#&<>])[A-Za-z\d@$!%*?&#&<>]{8,}$/;

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!passwordRegex.test(passwordReset.password)) {
      newErrors.password =
        "Password must have at least: 8 characters, 1 UPPERCASE, 1 number, and a special character (%@#$).";
    }

    if (confirmPassword !== passwordReset.password) {
      newErrors.confirm_password = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPasswordReset((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && value !== passwordReset.password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "Passwords do not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirm_password: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", passwordReset);
      setPasswordReset({ password: "" });
      setConfirmPassword("");
      setErrors({});
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
              Reset your password
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:text-sm">
              Reset your password and get back to learning
            </p>

            <InputField
              type="password"
              name="password"
              placeholder="Enter new password"
              value={passwordReset.password}
              onChange={handleChange}
              error={errors.password}
            />

            <InputField
              type="password"
              name="confirm_password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmChange}
              error={errors.confirm_password}
            />
          </section>

          <section>
            <Button
              label="Reset password"
              type="submit"
              variant="primary"
              className="mt-15 mb-0 w-full sm:text-sm"
            />

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 mb-5 hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetPage;
