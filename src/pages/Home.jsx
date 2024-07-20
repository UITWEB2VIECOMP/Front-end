import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Aside from '../components/Aside';

const Home = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('user_id');
    setRole(storedRole);
    setId(storedId);
  }, []);

  return (
    <div className="home-container">
      {role && id ? <Aside id={id} role={role} /> : <div>Loading...</div>}
      <div className="home-content">
        <h1>Hello world</h1>
      </div>
    </div>
  );
};

export default Home;
