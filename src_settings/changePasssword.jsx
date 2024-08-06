import React, { useState } from 'react';
import './settings.css';
import { useNavigate } from 'react-router-dom';
import axiosUrl from '../config/AxiosConfig';

export default function ChangePassword({token, role}) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handlePasswordSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const payload = {
                old_password: oldPassword
                ,new_password: newPassword,
                c_new_password: confirmPassword
            }
            const headers = {
                token: token,
            };
    
            const res = await axiosUrl.post(`/api/users/change-password`, payload, { headers });
    
            console.log(res); 
    
            setErr('');
        } catch (err) {
            console.error('Change error: ', err);
            setErr(err.response?.data?.message || 'An error occurred');
            if (err.response?.data?.message === "Token has expired") {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/login');
        }
    };

    return (
        <div className="section">
            <h2>Change Password</h2>
            <div className="setting-group">
                <label htmlFor="old-password">Old Password:</label>
                <input
                    type="password"
                    id="old-password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="setting-group">
                <label htmlFor="new-password">New Password:</label>
                <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="setting-group">
                <label htmlFor="confirm-password">Confirm New Password:</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button className="setting-btn" onClick={handlePasswordSubmit}>Change Password</button>
            {err && <div className="error-message">{err}</div>}
            {loading && <div className="loading-message">Loading...</div>}
        </div>
    );
}
