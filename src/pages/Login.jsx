import React, {useState} from 'react'
import "../styles/Login.css"

const Login = () => {
    const [login, setLogin] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login) {
            // console.log()
        } else {

        }
    }

    return (
        <div className='loginPage'>
            <form>
                {login ?
                    (<>
                    <h1>Login</h1>
                    <div className="username">
                        <label htmlFor="">Username:</label>
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className="password">
                        <label htmlFor="" className="pass">Password:</label>
                        <input type="password" placeholder='Password' />
                    </div>
                    <a href="">Forgot password?</a>
                    <p>You don't have an account yet? <button type='button' onClick={() => setLogin(false)}>Sign up here</button></p>
                    <button type="submit" className="loginBtn">Login</button>
                    <p>If you want to organize a copetition? <button type="button">Click here</button></p>
                    </>)
                :
                    (<>
                    <h1>Signup</h1>
                    <div className="username">
                        <label htmlFor="">Username:</label>
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className="email">
                        <label htmlFor="" className="email">Email:</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="password">
                        <label htmlFor="" className="pass">Password:</label>
                        <input type="password" placeholder='Password' />
                    </div>
                    <div className="password">
                        <label htmlFor="" className="pass">Confirm Password:</label>
                        <input type="password" placeholder='Password' />
                    </div>
                    <p>If you had an account <button type='button' onClick={() => setLogin(true)}>Login here</button></p>
                    <button type="submit" className="loginBtn">Signup</button>
                    </>)
                }
            </form>
        </div>
    )
}

export default Login