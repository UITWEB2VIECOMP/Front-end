import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaSun, FaMoon, FaBars, FaBook } from 'react-icons/fa';
import { CiLogout, CiTrophy, CiSettings } from 'react-icons/ci';
import { MdOutlineManageHistory } from 'react-icons/md';
import axiosUrl from '../../config/AxiosConfig';
import '../styles/Aside.css';

const Aside = ({ userInfo, role }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const bodyEl = document.querySelector('body');
    const navigate = useNavigate();

    const toggleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        bodyEl.classList.toggle('dark');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
            <header className='flex flex-col'>
                <div className="flex justify-start items-center my-3 mx-3">
                    <FaBars className='toggle' onClick={toggleSideBar}></FaBars>
                </div>
                <div className="image-text py-2">
                    <span className="image">
                        <img src={userInfo.avatar} alt="User Avatar" />
                    </span>
                    <div className="text logo-text">    
                        <span className="name">{userInfo.name || 'Loading...'}</span>
                        <span className="profession">{role.toUpperCase()}</span>
                    </div>
                </div>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">
                        <li className="nav-link">
                            <Link to='/'>
                                <FaHome className="icon flex items-center" />
                                <span className="text nav-text">Home</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/competition'>
                                <CiTrophy className="icon flex items-center" />
                                <span className="text nav-text">Competition</span>
                            </Link>
                        </li>
                        {role === 'student' ? (
                            <li className="nav-link">
                                <Link to='/your-contest'>
                                    <FaBook className="icon flex items-center" />
                                    <span className="text nav-text">Your Contest</span>
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-link">
                                <Link to='/manage-contest'>
                                    <MdOutlineManageHistory className="icon flex items-center" />
                                    <span className="text nav-text">Manage Contest</span>
                                </Link>
                            </li>
                        )}
                        <li className="nav-link">
                            <Link to='/profile'>
                                <FaUser className="icon flex items-center" />
                                <span className="text nav-text">Profile</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to='/settings'>
                                <CiSettings className="icon flex items-center" />
                                <span className="text nav-text">Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="bottom-content cursor-pointer">
                    <li className="nav-link" onClick={handleLogout}>
                        <CiLogout className='icon flex items-center' />
                        <span className="text nav-text">Logout</span>
                    </li>
                    <li className="mode" onClick={toggleDarkMode}>
                        <div className="sun-moon">
                            {isDarkMode ? <FaSun className='icon' /> : <FaMoon className='icon' />}
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

export default Aside;
