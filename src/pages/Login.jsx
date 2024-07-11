import React, { useState, useRef, useEffect } from 'react'
import "../styles/Login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='formlog w-fit h-fit flex items-center justify-center flex-col rounded-xl p-8'>
                <div className='py-2.5'>
                        <h1>Login</h1>
                </div>
                <div className="username py-2.5 flex flex-row items-center">
                    <label htmlFor="" className='w-24 px-2.5'><p>Email:</p></label>
                    <input type="text" placeholder='Email' className='input rounded-md w-40 h-10 px-2.5' required />
                </div>
                <div className="password py-2.5 flex flex-row items-center">
                <label htmlFor="" className="pass w-24 px-2.5"><p>Password:</p></label>
                <input type="password" placeholder='Password' className='input rounded-md w-40 h-10 px-2.5' required />
                </div>
                <div className='py-2.5'>
                    <a href="#">Forgot password?</a>
                </div>
                <div className='py-2.5'>
                    <p>You don't have an account yet? <Link to={'/Register'}>Sign up here</Link></p>
                </div>
                <div className="loginBtn py-2.5">
                        <button type="submit" className="loginBtn">Login</button>
                </div>
                <div className="py-2.5">
                    <p className=''>If you want to organize a copetition? <button type="button">Click here</button></p>
                </div>
            </form>
        </div>
    )
}

export default Login