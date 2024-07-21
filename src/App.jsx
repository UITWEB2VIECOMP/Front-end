import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import Main from './pages/Main'
import Forgot from './pages/Forgot'
import Resend from './pages/Resend'
import Pass from './pages/Pass'
<<<<<<< Updated upstream

=======
import Home from './pages/Home'
import Profile from '../src_profile/profile'
import Settings from '../src_settings/settings'
import ChangePassword from '../src_settings/changePasssword'
import ProfileSettings from '../src_settings/profileSettings'
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <Route path='/' element={<Main />} />
=======
          <Route path='/' element={<Home />}>
              <Route path='/profile' element={<Profile />} /> 
              <Route path='/settings' element={<Settings />} >
                  <Route index element={<ProfileSettings />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  <Route path="password" element={<ChangePassword />} />
              </Route> 
          </Route>
          <Route path='*' element={<div>Page Not found</div>}></Route>
>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App