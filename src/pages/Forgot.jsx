import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/Forgot.css'

const Forgot = () => {

  const [email, setEmail] = useState('')
  const [mes, setMes] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const axiosUrl = axios.create({
    baseURL: 'https://api-74ym.onrender.com'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axiosUrl.post('/api/auth/forgetpassword', { email })
      setMes(res.data.mes)
      setErr('')
    } catch (err) {
      setErr(err.res.data.mes || 'An error occured')
      setMes('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
        <div className="forgot w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className='formForget w-fit h-fit flex justify-center items-center flex-col rounded-md p-8'>
                <h1 className='py-2.5 text-2xl font-bold'>Forgot pasword?</h1>
                {mes && <p className="text-green-500">{message}</p>}
                {err && <p className="text-red-500">{error}</p>}
                <div className="inputForget">
                  <label htmlFor="email" className='w-24 px-2.5 py-2.5'>Email:</label>
                  <input 
                    type="email" 
                    placeholder='Email here...' 
                    className='input rounded-md w-48 h-10 px-2.5 py-2.5 my-2.5' 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required  
                  />
                </div>
                <button type="submit" className='py-3' disabled={loading}>
                  { loading ? 'Sending...' : 'Send email' }
                </button>
                <p className='py-2.5'>Remember the password? <Link to={'/login'}>Login here</Link></p>
            </form>
        </div>
    </>
  )
}

export default Forgot