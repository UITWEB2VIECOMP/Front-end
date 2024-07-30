import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosUrl from '../../config/AxiosConfig'

const VerifyEmail = () => {

    const { id, token } = useParams()
    const [verifyStatus, setverifyStatus] = useState('')

    useEffect(() => {
        // const { id, token } = match.params
        axiosUrl.get(`/api/auth/${id}/verify/${token}`)
            .then(res => {
                const { status, mes } = res.data
                setverifyStatus({ status: 'success', mes: 'email verified successfully' })
                console.log({ status, mes })
            })
            .catch(err => {
                console.error('Verification failed: ', err)
                setverifyStatus({ status: 'error', mes: 'Invalid link or link has been expired' })
            })
    }, [id, token])

  return (
    <div>
        <h2>Email vrification Status</h2>
        {verifyStatus.status === 'success' ? (
            <p><Link to={'/login'}>Login here</Link></p>
        ) : (
            <p><Link to={'/resend'}>Resend verification</Link> here</p>
        )}
    </div>
  )
}

export default VerifyEmail