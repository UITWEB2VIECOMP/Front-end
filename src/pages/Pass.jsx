import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Pass.css';

const Pass = ({ redirectAfterSuccess = true }) => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [new_password, setNewPassword] = useState('');
  const [c_new_password, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosUrl = axios.create({
    baseURL: 'https://api-74ym.onrender.com'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new_password !== c_new_password) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosUrl.post(`/api/auth/${id}/resetpassword/${token}`, {
        new_password: new_password,
        c_new_password: c_new_password 
      });
      setMessage(response.data.message);
      setError('');
      setTimeout(() => {
        setMessage('');
        if (redirectAfterSuccess) {
          navigate('/login');
        }
      }, 3000); // Delay of 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="formlog w-fit h-fit flex items-center flex-col rounded-md p-8">
        <h1 className="py-2.5 text-2xl font-bold">Reset Password</h1>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-row items-center">
          <label htmlFor="newPassword" className="w-24 px-2.5 py-2.5"><p>Password: </p></label>
          <input
            type="password"
            placeholder="Password"
            className="input rounded-md w-48 h-10 px-2.5 py-2.5 my-2.5"
            name="newPassword"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="flex flex-row items-center">
          <label htmlFor="confirmNewPassword" className="w-24 px-2.5 py-2.5"><p>Confirm Password: </p></label>
          <input
            type="password"
            placeholder="Confirm Password..."
            className="input rounded-md w-48 h-10 px-2.5 py-2.5 my-2.5"
            name="confirmNewPassword"
            value={c_new_password}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="py-3" disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default Pass;
