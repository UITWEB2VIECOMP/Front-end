import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../styles/settings.css'
export default function Settings({ token, role }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!role || !token) {
          navigate('/login');
        }
      }, [role, token, navigate]);
    return (
        <div className="settings-container">
            <h1>Account Settings</h1>
            <nav className="settings-nav">
                <Link to="profile">Profile Settings</Link>
                <Link to="password">Change Password</Link>
            </nav>
            <div className="settings-content">
                <Outlet />
            </div>
        </div>
    );
}
