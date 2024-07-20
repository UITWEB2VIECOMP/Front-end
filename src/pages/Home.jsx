import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Aside from '../components/Aside';
// import Profile from './Profile';

const Home = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('user_id');
    // const storedName = localStorage.getItem('name')
    setRole(storedRole);
    setId(storedId);
  }, []);

  return (
    <div className='home-page'>
      <div className="aside-bar" style={{ display: "inline-block" }}>
        {role && id ? <Aside id={id} role={role} /> : <div>Loading...</div>}
      </div>
      <div className="home-content">
        
      </div>
    </div>
  );
};

export default Home;
