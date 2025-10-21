// import React from "react";
import LogInPage from "./Pages/RegisterationAndLogin/LogInPage";
import SignUpPage from "./Pages/RegisterationAndLogin/SignUpPage";
import VerifyEmail from "./Pages/RegisterationAndLogin/VerifyEmail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
