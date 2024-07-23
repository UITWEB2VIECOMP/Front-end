import React, { useState, useEffect } from 'react'
import { format } from '`date-fns`';
import './profile.css';
import { Link } from 'react-router-dom';
export default function Profile({userInfo, role}) {
  const [time, setTime] = useState('');
  useEffect(() => {
    setTime(format(new Date(), 'hh:mm:ss a'));
    const intervalId = setInterval(() => {
      setTime(format(new Date(), 'hh:mm:ss a'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); 
  return (
    <div >
      <div className="profile-container">
        <div className="profile-header">
          <img src={userInfo.avatar} alt="Profile Picture"/>
          <div style={{}}>
              <div style={{ marginBottom: "40px" }}>
                  <h1>{userInfo.name}</h1>
                  <span>{role.toUpperCase()}</span >
              </div>
              <div className="info-section">
                  <p><span>Email address:</span> {userInfo.email}</p>
                  <p><span>Current time:</span>  {time}</p>
                  {role == "student" ?(
                      <p><span>Has Participated:</span> {userInfo.has_participated}</p>
                  ):
                      (<p><span>Has Hosted:</span>{userInfo.has_hosted} </p>)
                  }
              </div>
          </div>
        </div>
        {role == "corporation" ?  
        (<div className="profile-info">
            <div className="info-section">
                <h2>About Us</h2>
                <p>{userInfo.description.length ? (userInfo.description):("Not have")  }</p>
            </div>
          </div>):
          (
            <></>
          )
        }
        <div className="profile-info">
            <div className="info-section">
                <h2>Additional Info</h2>
                {
                  role == 'student' ?(
                  <div>
                    <p>First Name: {userInfo.name.split(" ")[0]}</p>
                    <p>Last Name: {userInfo.name.split(" ")[1]}</p>
                    <p>DOB: {format(new  Date(userInfo.dob), 'MMMM dd, yyyy')}</p>
                  </div>
                ):(
                  <div>
                    <p>Corporation's Name:  {userInfo.name}</p>
                    <p>Corporation Address: {userInfo.address}</p>
                    <p>Contact Information: {userInfo.contact_info}</p>
                  </div>
                )
                }
                <p>Start date: {format(new  Date(userInfo.created_at), 'MMMM dd, yyyy')}</p>
            </div>
        </div>
        <div className="profile-actions">
            <Link to="/settings">Edit Profile</Link>
        </div>
        {role == "student" ?  
        (<div className="profile-info">
            <div className="info-section">
                <h2>Prize</h2>
                {userInfo.prizes.length  === 0 ? (<p>Not Have</p>):
                (
                  <ul>
                    {prizes.map((prize)=>{
                      <li>{prize.contest} :{prize.award}</li>
                    })}
                  </ul>
                )
                }
            </div>
          </div>):
          (
            <></>
          )
        }
        
    </div>
    </div>
  )
}
