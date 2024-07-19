import React, { useEffect, useState } from 'react';
import '../styles/Main.css';
import axiosUrl from '../../AxiosConfig';
import Aside from '../components/Aside';
import { Route, Routes } from 'react-router-dom';
import Profile from '../../src_profile/profile';
const Main = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('user_id');
    setRole(storedRole);
    setId(storedId);
  }, []);

  return (
    <div className="main-container" style={{display:"inline-block"}}>
      <Aside id={id} role={role} />
    </div>
  );
};

export default Main;
