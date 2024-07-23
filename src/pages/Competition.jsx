import React, { useState, useEffect } from 'react';
import '../styles/Competition.css';
import Aside from '../components/Aside';
import Slider from '../components/Slider';

const Competition = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);


  return (
    <div className='comp-container'>
      <div className='comp-content'>
        <div className="comp">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Competition;
