import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Main' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App