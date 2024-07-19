import React, { useEffect, useState } from 'react';
import '../styles/Main.css';
import Aside from '../components/Aside';
// import Profile from './Profile';

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
    <div className="main-container" style={{ display: "inline-block" }}>
      {role && id ? <Aside id={id} role={role} /> : <div>Loading...</div>}
    </div>
  );
};

export default Main;
