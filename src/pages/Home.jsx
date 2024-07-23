import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Aside from '../components/Aside';
import { IoTrophyOutline } from 'react-icons/io5'
import { AiFillCalculator } from "react-icons/ai"
import { Bs123 } from "react-icons/bs"

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
      <div className="home-content px-20 flex flex-col">
          <div className="title py-20 flex items-center flex-col">
              <h1 className='name'>Welcome, Anh Duc!</h1>
              <p>Kaggle is the place to learn data science and build a portfolio.</p>
          </div>
          <div className="stats w-full flex justify-evenly">
            <div className="stat">
              <div className='stat_title flex items-center mb-4'>
                <AiFillCalculator className='icon-stat mr-4' />
                <h3>Competitions</h3>
              </div>
              <div className='mark'>
                <div className='prop'></div>
                <h3>0</h3>
                <p>total joined</p>
              </div>
            </div>
            <div className="stat">
              <div className='stat_title flex items-center mb-4'>
                <IoTrophyOutline className='icon-stat mr-4' />
                <h3>Prize</h3>
              </div>
              <div className='mark'>
                <div className='prop'></div>
                <h3>0</h3>
                <p>total prize</p>
              </div>
            </div>
            <div className="stat">
              <div className='stat_title flex items-center mb-4'>
                <Bs123 className='icon-stat mr-4' />
                <h3>Average Grade</h3>
              </div>
              <div className='mark'>
                <div className='prop'></div>
                <h3 className='flex items-baseline'>0</h3>
                <p className='flex items-baseline pt-1'>average score</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
