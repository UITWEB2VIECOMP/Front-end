import React from 'react';
import '../styles/Competition.css';
import Slider from '../components/Slider';

const Competition = () => {
  return (
    <div className='comp-container'>
      <div className='comp-content'>
        <div className="ongoing-comp">
          <h1>Ongoing contest</h1>
          <Slider />
        </div>
        <div className="future-comp">
          <h1>Future contest</h1>
          <Slider />
        </div>
        <div className="past-comp">
          <h1>Past contest</h1>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Competition;
