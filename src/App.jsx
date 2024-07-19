import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import Main from './pages/Main'
import Forgot from './pages/Forgot'
import Resend from './pages/Resend'
import Pass from './pages/Pass'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/register' element={<Register />} />
          <Route path='/auth/:id/verify/:token' element={<VerifyEmail />} />
          <Route path='/resend' element={<Resend />} />
          <Route path='/auth/:id/resetpassword/:token' element={<Pass />} />
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App