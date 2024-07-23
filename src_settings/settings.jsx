import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './settings.css';

export default function Settings({ userId, role }) {
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
