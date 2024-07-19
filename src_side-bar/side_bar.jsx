import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './side_bar.css'; 
import {FaUser,FaHome, FaSun, FaMoon, FaChevronRight, FaBook } from 'react-icons/fa';
import {CiLogout, CiTrophy } from 'react-icons/ci';
import { MdOutlineManageHistory } from "react-icons/md";


const Sidebar = ({role, name, avatar}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const body = document.querySelector('body');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    body.classList.toggle("dark");
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src={avatar} alt="" />
          </span>
          <div className="text logo-text">
            <span className="name">{name}</span>
            <span className="profession">{role.toUpperCase()}</span>
          </div>
        </div>
        <FaChevronRight className='toggle' onClick={toggleSidebar}></FaChevronRight>
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
  );
};

export default function App({ role, id }) {
    const [userInfo, setUserInfo] = useState({});
    const [verifyStatus, setVerifyStatus] = useState({ status: '', mes: '' });
  
    const axiosUrl = axios.create({
      baseURL: 'https://api-74ym.onrender.com'
    });
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const res = await axiosUrl.get('/api/users/get-user', {
            headers: {
              user_id: id,
              role: role
            }
          });
  
          if (role === 'student') {
            console.log(res);
            const { first_name, last_name, avatar } = res.data;
            setUserInfo({ name: `${first_name} ${last_name}`, avatar });
          } else {
            const { corp_name, avatar } = res.data;
            setUserInfo({ name: corp_name, avatar });
          }
        } catch (err) {
          console.error('Verification failed: ', err);
          setVerifyStatus({ status: 'error', mes: 'Invalid link or link has been expired' });
        }
      };
  
      fetchUserData();
    }, [id, role]); 
    return (
      <Sidebar name={userInfo.name} role={role} avatar={userInfo.avatar} />
    );
  }