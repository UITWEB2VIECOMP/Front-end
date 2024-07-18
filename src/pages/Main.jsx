import React, { useEffect, useState } from 'react'
import '../styles/Main.css'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
import axiosUrl from '../../AxiosConfig'
// import Header from '../components/Header'
import Aside from '../components/Aside'

const Main = () => {

  

  // const navigate = useNavigate()

  // useEffect(() => {
  //   const token  = localStorage.getItem('token')
  //   if (!token) {
  //     navigate('/login')
  //   }
  // }, [navigate])

  // const handleLogout = async (e) => {
  //   const token = localStorage.getItem('token')
  //   try {
  //     await axiosUrl.post('/api/auth/logout', {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     localStorage.removeItem('token')
  //     navigate('/login')
  //   } catch (err) {
  //       console.error('Login failed: ', err)
  //   }
  // }

  return (
    <>
      {/* <div>Hello World</div>
      <Link to ='/login'><button onClick={handleLogout}>Logout</button></Link> */}
      {/* <Header /> */}
      <Aside id={localStorage.getItem('user_id')} role={localStorage.getItem('role')} />
    </>
  )
}

export default Main