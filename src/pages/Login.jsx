import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const axiosUrl = axios.create({
        baseURL: 'https://api-74ym.onrender.com'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosUrl.post('/api/auth/login', formData);
            console.log('Response: ', res);
            const { token, message } = res.data;

            localStorage.setItem('token', token);
            setErr('');
            // alert(message);
            setLoggedIn(true); // Set loggedIn state to true after successful login
        } catch (err) {
            console.log('Login error: ', err);
            setErr(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // If loggedIn is true, redirect to '/'
    if (loggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='formlog w-fit h-fit flex items-center justify-center flex-col rounded-xl p-8' onSubmit={handleSubmit}>
                <div className='py-2.5'>
                    <h1 className='text-2xl font-bold'>Login</h1>
                </div>
                {err && <div className="error">{err}</div>}
                <div className="username py-2.5 flex flex-row items-center">
                    <label htmlFor="email" className='w-24 px-2.5'><p>Email:</p></label>
                    <input 
                        type="text" 
                        name='email' 
                        placeholder='Email' 
                        className='input rounded-md w-48 h-10 px-2.5' 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="password py-2.5 flex flex-row items-center">
                    <label htmlFor="password" className="pass w-24 px-2.5"><p>Password:</p></label>
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
                <div className='py-2.5'>
                    <p><Link to='/forgot'>Forgot password?</Link></p>
                </div>
                <div className='py-2.5'>
                    <p>You don't have an account yet? <Link to={'/register'}>Sign up here</Link></p>
                </div>
                <div className="loginBtn py-2.5">
                    <button type="submit" className="loginBtn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                <div className="py-2.5">
                    <p>If you want to organize a competition? <Link to='#'>Click here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
