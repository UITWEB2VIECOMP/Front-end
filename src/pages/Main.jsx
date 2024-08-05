import React, { createContext, useEffect, useState } from 'react'
import '../styles/Main.css';
import { IoTrophyOutline } from 'react-icons/io5'
import { AiFillCalculator } from "react-icons/ai"
import { Bs123 } from "react-icons/bs"
import Slider from '../components/Slider';
import axiosUrl from '../../config/AxiosConfig';
import { useNavigate } from 'react-router-dom';
export const Userinfo2 = createContext()
const h0me =({role, userInfo, token}) => {
    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [homeInfo,setHomeInfo]=useState()
    const fetchHomeInfo =  async({token})=>{
        try {
            const res =  await axiosUrl.get("/api/homepage/home-info",{
                headers:{
                    token: token,
                }
            })   
            setHomeInfo(res.data.data);
            console.log('Home Response:', res);
            setLoading(false);
        } catch (error) {
            console.error('Verification failed: ', error);
            setLoading(false);
            if (error.response?.data?.message === "Token has expired") {
                localStorage.removeItem('token');
                navigate('/login');
              }
        }
        
    }
useEffect(() => {
    if (!role || !token) {
        navigate('/login');
    } else {
        fetchHomeInfo({token});
    }
    }, [role, token, navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content px-20 flex flex-col">
        <div className="title py-20 flex items-center flex-col">
            <h1 className='name'>Welcome, <span>{userInfo.name || 'Loading...'}</span>!</h1>
            <p>This is the place to try out your self and build your skill.</p>
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
            <h3>{homeInfo.participated}</h3>
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
            <h3>{homeInfo.prizes}</h3>
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
            <h3 className='flex items-baseline'>{parseFloat( homeInfo.avggrade).toFixed(2)}</h3>
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
            <h3>{homeInfo.hosted}</h3>
            <p>total Hosted</p>
        </div>
        </div>
    </div>)
    }
    <div style={{marginTop:"50px"}}>
        <Userinfo2.Provider value={{role, token}}>
            <div className="ongoing-comp" page="main">
                <h1>ONGOING</h1>
                <Slider target="ongoing" />
                </div>
        </Userinfo2.Provider>
    </div>
    </div>
  )
}

export default h0me