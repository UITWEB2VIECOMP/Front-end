import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import Forgot from './pages/Forgot'
import Resend from './pages/Resend'
import Pass from './pages/Pass'
import Home from './pages/Home'
import Settings from '../src_settings/settings'
import ChangePassword from '../src_settings/changePasssword'
import ProfileSettings from '../src_settings/profileSettings'
import Competition from './pages/Competition'
import Profile from './pages/Profile'
import MyContest from './pages/MyContest'
import ManageContest from './pages/ManageContest'
import Contest from './pages/Contest'
import ContestModify from './pages/ContestModify'
import DoContest from './pages/DoContest'

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
          <Route path='/' element={<Home />}>
              <Route path='/competition' element={<Competition></Competition>}></Route>
              <Route path='/your-contest' element={<MyContest />}></Route>
              <Route path='/manage-contest' element={<ManageContest />} />
              <Route path='/profile' element={<Profile />} /> 
              <Route path='/settings' element={<Settings />} >
                  <Route index element={<ProfileSettings />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  <Route path="password" element={<ChangePassword />} />
              </Route> 
              <Route path='/contest/:contest_id' element={<Contest></Contest>}>
              </Route>
              <Route path="/contest/:contest_id/modify" element={<ContestModify />} />
              <Route path="/contest/:contest_id/do-contest" element={<DoContest />} />
          </Route>
          <Route path='/*' element={<div>Page Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App