import React, { useState, useRef, useEffect } from 'react'
import "../styles/Register.css"
import { Link } from 'react-router-dom'
import { FaCircleCheck, FaRegCircleCheck  } from 'react-icons/fa6'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState()
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [confirmPwd, setConfirmPwd] = useState('')
    const [validConfirm, setvalidConfirm] = useState(false)
    const [confirmFocus, setconfirmFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => (
        emailRef.current.focus()
    ), [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(email)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(pwd)
        const match = pwd === confirmPwd
        setvalidConfirm(match)
    }, [pwd, confirmPwd])
    
    useEffect(() => {
        setErrMsg('')
    }, [email, pwd, confirmPwd])

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <p ref={errRef} aria-live='assertive' className={errMsg ? 'errmsg' : 'offscreen'}></p>
            <form className='formlog w-fit h-fit flex items-center justify-center flex-col rounded-xl p-8'>
                <div className='py-2.5'>
                    <h1>Signup</h1>
                </div>
                <div className='infomation py-2.5 flex flex-row items-center'>
                    <div className='name px-2.5 flex flex-col items-center'>
                        <label htmlFor="" className='w-30 px-2.5'>First name:</label>
                        <input type="text" placeholder='Firstname' className='input rounded-md w-40 h-10 px-2.5' required />
                    </div>
                    <div className='name px-2.5 flex flex-col items-center'>
                        <label htmlFor="" className='w-30 px-2.5'>Last name:</label>
                        <input type="text" placeholder='Lastname' className='input rounded-md w-40 h-10 px-2.5' required />
                    </div>
                </div>
                <div className="DOB py-2.5 flex flex-row items-center">
                    <label htmlFor="" className='w-40 px-2.5'>Date of Birth:</label>
                    <input type="date" className='input rounded-md w-40 h-10 px-2.5' required />
                </div>
                <div className="email py-2.5 flex flex-row items-center">
                    <label htmlFor="" className="w-40 px-2.5">
                        Email:
                        <span></span>
                    </label>
                    <input 
                        type="email" 
                        id='email'
                        ref={useRef}
                        placeholder="Email" 
                        className='input rounded-md w-40 h-10 px-2.5'
                        required
                        autoComplete='off'
                        onChange={(e) => {e.target.value}}
                        onFocus={() => setEmailFocus(true)}
                        onblur={() => setEmailFocus(false)}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby='uidnote'
                    />
                    <p id='uidnote' className={emailFocus && email && !validEmail ? 'instrucstions' : 'offscreen'}>
                        abcde
                    </p>
                </div>
                <div className="password py-2.5 flex flex-row items-center">
                    <label htmlFor="" className="w-40 px-2.5">Password:</label>
                    <input type="password" placeholder='Password' className='input rounded-md w-40 h-10 px-2.5' id='pass' required />
                </div>
                <div className="password py-2.5 flex flex-row items-center">
                    <label htmlFor="" className="w-40 px-2.5">Confirm Password:</label>
                    <input type="password" placeholder='Password' className='input rounded-md w-40 h-10 px-2.5' id='confirmPass' required />
                </div>
                <div className='py-2.5'>
                    <p>If you had an account <Link to={'/'}>Login here</Link></p>
                </div>
                <div>
                    <button type="submit" className="loginBtn" id='btn'>Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Register