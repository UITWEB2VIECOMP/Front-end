import React, { useEffect, useState } from 'react';
import '../styles/Main.css';
import axiosUrl from '../../AxiosConfig';
import Aside from '../components/Aside';

const Main = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('id');
    setRole(storedRole);
    setId(storedId);
  }, []);

  return (
    <div className="main-container">
      <Aside id={id} role={role} />
    </div>
  );
};

export default Main;
