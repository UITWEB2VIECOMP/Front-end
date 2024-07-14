import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const axiosUrl = axios.create({
        baseURL: 'http://localhost:5000'
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await axiosUrl.post('/api/register', formData)
            console.log('Response:', res)
            setSuccess(res.data.message)
            setErr('')
            history.push('/')
        } catch (err) {
            console.error('Registration error:', err)
            setErr(err.response?.data?.message || 'An error occurred')
            setSuccess('')
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='formlog w-fit h-fit flex items-center justify-center flex-col rounded-xl p-8' onSubmit={handleSubmit}>
                <div className='py-2.5'>
                    <h1>Signup</h1>
                </div>
                {err && <div className="error">{err}</div>}
                {success && <div className="success">{success}</div>}
                <div className='infomation py-2.5 flex flex-row items-center'>
                    <div className='name px-2.5 flex flex-col items-center'>
                        <label htmlFor="firstName" className='w-30 px-2.5'>First name:</label>
                        <input 
                            type="text"
                            name='firstName'
                            placeholder='Firstname' 
                            className='input rounded-md w-40 h-10 px-2.5' 
                            value={formData.firstName}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className='name px-2.5 flex flex-col items-center'>
                        <label htmlFor="lastName" className='w-30 px-2.5'>Last name:</label>
                        <input 
                            type="text"
                            name='lastName'
                            placeholder='Lastname' 
                            className='input rounded-md w-40 h-10 px-2.5' 
                            value={formData.lastName}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>
                <div className="DOB py-2.5 flex flex-row items-center">
                    <label htmlFor="dateOfBirth" className='w-40 px-2.5'>Date of Birth:</label>
                    <input 
                        type="date" 
                        name='dateOfBirth'
                        className='input rounded-md w-48 h-10 px-2.5'
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="email py-2.5 flex flex-row items-center">
                    <label htmlFor="email" className="w-40 px-2.5">Email:</label>
                    <input 
                        type="email"
                        name='email'
                        placeholder="Email" 
                        className='input rounded-md w-48 h-10 px-2.5'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="password py-2.5 flex flex-row items-center">
                    <label htmlFor="password" className="w-40 px-2.5">Password:</label>
                    <input 
                        type="password"
                        name='password'
                        placeholder='Password' 
                        className='input rounded-md w-48 h-10 px-2.5' 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="password py-2.5 flex flex-row items-center">
                    <label htmlFor="confirmPassword" className="w-40 px-2.5">Confirm Password:</label>
                    <input 
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirm Password' 
                        className='input rounded-md w-48 h-10 px-2.5' 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className='py-2.5'>
                    <p>If you already have an account, <Link to={'/'}>Login here</Link></p>
                </div>
                <div>
                    <button type="submit" className="loginBtn" disabled={loading}>
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register