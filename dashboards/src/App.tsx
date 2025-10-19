import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import VerifyEmail from './Pages/VerifyEmail'
import LogInPage from './Pages/LogInPage'
import ForgotPassword from './Pages/ForgotPassword'
import PasswordResetPage from './Pages/PasswordResetPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/verifyemail" element={<VerifyEmail/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword" element={<PasswordResetPage/>} />
      </Routes>
    </Router>
  )
}

export default App
