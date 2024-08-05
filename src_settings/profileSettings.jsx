import React, { useEffect, useState } from 'react';
import './settings.css';
import axiosUrl from '../config/AxiosConfig';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettings({ role, token }) {
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [name, setName] = useState(role === 'student' ? { first_name: '', last_name: '' } : { corp_name: '' });
    const [DOB, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [contact_info, setContact] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        return ()=>{avatar&&URL.revokeObjectURL(avatarPreview)}
    },[avatarPreview])

    const handleSubmit = async (e, target) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            let payload;
            if (target === 'avatar') {
                const formData = new FormData();
                formData.append('file', avatar); 
                payload = formData;
                const headers = {
                    token: token,
                    ...(target === 'avatar' && { 'Content-Type': 'multipart/form-data' })
                };
                const res = await axiosUrl.post(`/api/users/change-${target}`, payload, { headers });

            } else {
                payload = target === 'name'
                    ? (role === 'student' ? { name }[target] : { name}[target] )
                    : target === 'DOB' ? { DOB }
                    : target === 'address' ? { address }
                    : target === 'description' ? { description }
                    : { contact_info };
            }
            const headers = {
                token: token,
                ...(target === 'avatar' && { 'Content-Type': 'multipart/form-data' })
            };
    
            const res = await axiosUrl.post(`/api/users/change-${target}`, payload, { headers });
    
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
            navigate("/");
        }
    };
    

    return (
        <div className="section">
            <h2>Profile Settings</h2>
            
            <div className="setting-group">
                <label htmlFor="avatar" className="avatar-label">Change Avatar:</label>
                <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => {setAvatarPreview(URL.createObjectURL(e.target.files[0]))
                                    setAvatar(e.target.files[0])
                    }}
                    className="file-input"
                    required
                />
                {avatar && <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />}
                <button className="setting-btn" onClick={(e) => handleSubmit(e, 'avatar')}>Change Avatar</button>
            </div>

            {role == 'student' ? (
                <div>
                    <div className="setting-group">
                        <label htmlFor="first-name">First Name:</label>
                        <input
                            type="text"
                            id="first-name"
                            value={name.first_name}
                            onChange={(e) => setName(prev => ({ ...prev, first_name: e.target.value }))}
                            required
                        />
                        <label htmlFor="last-name">Last Name:</label>
                        <input
                            type="text"
                            id="last-name"
                            value={name.last_name}
                            onChange={(e) => setName(prev => ({ ...prev, last_name: e.target.value }))}
                            required
                        />
                    </div>
                    <button className="setting-btn" onClick={(e) => handleSubmit(e, 'name')}>Change Name</button>

                    <div className="setting-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            value={DOB}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <button className="setting-btn" onClick={(e) => handleSubmit(e, 'DOB')}>Change DOB</button>
                </div>
            ) : (
                <div>
                    <div className="setting-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name.corp_name}
                            onChange={(e) => setName({ corp_name: e.target.value })}
                            required
                        />
                    </div>
                    <button className="setting-btn" onClick={(e) => handleSubmit(e, 'name')}>Change Name</button>

                    <div className="setting-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button  className="setting-btn" onClick={(e) => handleSubmit(e, 'description')}>Change Description</button>

                    <div className="setting-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button className="setting-btn" onClick={(e) => handleSubmit(e, 'address')}>Change Address</button>

                    <div className="setting-group">
                        <label htmlFor="contact">Contact Info:</label>
                        <input
                            type="text"
                            id="contact"
                            value={contact_info}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <button className="setting-btn" onClick={(e) => handleSubmit(e, 'contact')}>Change Contact</button>
                </div>
            )}

            {err && <div className="error-message">{err}</div>}
            {loading && <div className="loading-message">Loading...</div>}
        </div>
    );
}
