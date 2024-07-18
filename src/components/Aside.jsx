import React, { useState, useEffect } from 'react'
import axiosUrl from '../../AxiosConfig'
// import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { FaUser, FaHome, FaSun, FaMoon, FaChevronRight, FaBook } from 'react-icons/fa'
import { CiLogout, CiTrophy } from 'react-icons/ci'
import { MdOutlineManageHistory } from 'react-icons/md'
import '../styles/Aside.css'

const Aside = ({role, id}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [verifyStatus, setVerifyStatus] = useState({ status: '', mes: '' })
  const bodyEl = document.querySelector('body')

  if (role === null || id === null) {
    return <Navigate to='/login' />
  }

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    bodyEl.classList.toggle('dark')
  }

  // const axiosUrl = axios.create({
  //   baseURL: 'https://api-74ym.onrender.com'
  // })

  useEffect(() => {
    const fetchUserData = async (e) => {
      e.preventDefault()

      try {
        const res = await axiosUrl.get('/api/users/get-users', {
          headers: {
            user_id: id,
            role: role
          }
        })

        if (role === 'student') {
          console.log(res)
          const { firstName, lastName, avatar } = res.data
          setUserInfo({ name: `${firstName} ${lastName}`, avatar })
        } else {
          const { corpName, avatar } = res.data
          setUserInfo({ name: corpName, avatar })
        }
      } catch (err) {
        console.error('Verification failed: ' ,err)
        setVerifyStatus({ status: 'error', mes: 'Invalid link or the link has been expired' })
      }
    }

    fetchUserData()
  }, [role, id])

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src={userInfo.avatar} alt="" />
          </span>
          <div className="text logo-text">
            <span className="name">{setUserInfo.name}</span>
            <span className="profession">{role.toUpperCase()}</span>
          </div>
        </div>
        <FaChevronRight className='toggle' onClick={toggleSideBar}></FaChevronRight>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <Link to='/'>
                <FaHome className="icon" />
                <span className="text nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-link">
                    <Link to='/competition'>
                        <CiTrophy className="icon" />
                        <span className="text nav-text">Competition</span>
                    </Link>
            </li>
            {role=='student' ?(
                <>
                <li className="nav-link">
                    <Link to='/your-contest'>
                        <FaBook className="icon" />
                        <span className="text nav-text">Your Contest</span>
                    </Link>
                </li>
                </>
            ):(
                <>
                <li className="nav-link">
                    <Link to='/manage-contest'>
                        <MdOutlineManageHistory className="icon" />
                        <span className="text nav-text">Manage Contest</span>
                    </Link>
                </li>
                </>
            )
            }
            <li className="nav-link">
                <Link to='/profile'>
                    <FaUser className="icon" />
                    <span className="text nav-text">Profile</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to='/settings'>
                    <CiSettings className="icon" />
                    <span className="text nav-text">Settings</span>
                </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <a href="#">
              <CiLogout className='icon'></CiLogout>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode" onClick={toggleDarkMode}>
            <div className="sun-moon">
              {isDarkMode ? <FaSun className='icon'></FaSun> : <FaMoon className='icon'></FaMoon>}
            </div>
            <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  )
}

export default Aside