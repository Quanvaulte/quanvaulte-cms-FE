import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Carousel from '../Components/GeneralComponents/Carousel';
import QuanVaulte from "../Media/GeneralMedia/QuanVaulte.png";
import OTPInput from "../Components/GeneralComponents/OTPInput";
import Button from "../Components/GeneralComponents/Button"



const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [timer, setTimer]= useState(30);
  const [canResend, setCanResend]= useState(false);

  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    const enteredCode = otp.join("");
    console.log("Entered OTP:", enteredCode);
  };

  const handleResend =()=>{
    if (!canResend) return;
    console.log("Resend link clicked"); //Sharzy you'll change this to an actual API call 
    setTimer(30);
    setCanResend(false);

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
        <Carousel/>
        
        <div className="flex flex-col w-full md:w-1/2 bg-white justify-between items-center px-20">
            <form onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6 min-h-screen flex flex-col justify-between" >

            <section className="flex flex-col w-full mt-10 mb-10 items-center max-w-md">
            <img
                src={QuanVaulte}
                alt="QuanVaulte logo"
                className="my-4"
            />

        <h2 className="text-3xl font-bold text-gray-800 text-center">
            Verify your Email Address
        </h2>
        <p className="text-gray-600 text-center sm:text-base">
            Check your mail inbox to verify and start learning.
        </p>

        <OTPInput value={otp} onChange={handleOtpChange} />
        <p className='text-gray-500 text-base '><Link to="" className='text-gray-500 text-base hover:underline'>Resend</Link> {""}in</p>
        </section>

    
        <section className="flex flex-col items-center space-y-4 mt-10">
        <Button
            label="Verify Email"
            type="submit"
            variant="primary"
            className="w-full"
        />
        <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
            Log in
            </span>
        </p>
        </section>
  </form>
</div>


    </div>
  )
}

export default VerifyEmail