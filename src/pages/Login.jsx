import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const axiosUrl = axios.create({
        baseURL: 'http://localhost:5000'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosUrl.post('/api/login', formData);
            console.log('Response: ', res);
            const { token, message } = res.data;

            localStorage.setItem('token', token);
            setErr('');
            alert(message);
            history.push('/Main'); // Redirect to the main page after successful login
        } catch (err) {
            console.log('Login error: ', err);
            setErr(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='formlog w-fit h-fit flex items-center justify-center flex-col rounded-xl p-8' onSubmit={handleSubmit}>
                <div className='py-2.5'>
                    <h1>Login</h1>
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
                    <p><Link to='#'>Forgot password?</Link></p>
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
