import React from 'react'
import '../styles/Main.css';
import { IoTrophyOutline } from 'react-icons/io5'
import { AiFillCalculator } from "react-icons/ai"
import { Bs123 } from "react-icons/bs"

const h0me =({role, userInfo}) => {
  return (
    <div className="home-content px-20 flex flex-col">
        <div className="title py-20 flex items-center flex-col">
            <h1 className='name'>Welcome, <span>{userInfo.name || 'Loading...'}</span>!</h1>
            <p>This is the place to learn data science and build a portfolio.</p>
        </div>
        { role === 'student' ? 
        (<div className="stats w-full flex justify-evenly">
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
    </div>) :
    (<div className="stats w-full flex justify-evenly">
        <div className="stat">
        <div className='stat_title flex items-center mb-4'>
            <IoTrophyOutline className='icon-stat mr-4' />
            <h3>Hosted</h3>
        </div>
        <div className='mark'>
            <div className='prop'></div>
            <h3>0</h3>
            <p>total Hosted</p>
        </div>
        </div>
    </div>)
    }
    </div>
  )
}

export default h0me