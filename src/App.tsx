// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/ParentsDashboard/Dashboard";
import ForgotPassword from "./Pages/RegisterationAndLogin/ForgotPassword";
import LogInPage from "./Pages/RegisterationAndLogin/LogInPage";
import SignUpPage from "./Pages/RegisterationAndLogin/SignUpPage";
import VerifyEmail from "./Pages/RegisterationAndLogin/VerifyEmail";
import OnboardingParent from "./Pages/RegisterationAndLogin/OnboardingParent";
import OnboardingSchool from "./Pages/RegisterationAndLogin/OnboardingSchool";
import PasswordResetPage from "./Pages/RegisterationAndLogin/PasswordResetPage";
import VerifyResetEmail from "./Pages/RegisterationAndLogin/VerifyResetEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/verify-email/:userId" element={<VerifyEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route
          path="/verify-reset-email/:userId"
          element={<VerifyResetEmail />}
        />
        {/* <Route path="/reset-password" element={<ForgotPasswordPage />} /> not working, change to the page that gives new password and confirms it */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboardingparent" element={<OnboardingParent />} />
        <Route path="/onboardingschool" element={<OnboardingSchool />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
