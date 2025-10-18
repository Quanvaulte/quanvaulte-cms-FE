import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import VerifyEmail from './Pages/VerifyEmail'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/verifyemail" element={<VerifyEmail/>} />
      </Routes>
    </Router>
  )
}

export default App
