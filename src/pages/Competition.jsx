import React, { useState, useEffect } from 'react';
import '../styles/Competition.css';
import Aside from '../components/Aside';
import Slider from '../components/Slider';

const Competition = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('user_id');
    setRole(storedRole);
    setId(storedId);
  }, []);

  return (
    <div className='comp-container'>
      {role && id ? <Aside role={role} id={id} /> : <div>Loading...</div>}
      <div className='comp-content'>
        <div className="comp">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Competition;
