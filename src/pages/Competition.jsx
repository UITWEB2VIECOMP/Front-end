import React, { createContext } from 'react';
import '../styles/Competition.css';
import Slider from '../components/Slider';

export const Userinfo = createContext();

const Competition = ({ role, userId }) => {
  return (
    <Userinfo.Provider value={{ role, userId }}>
      <div className="comp-container">
        <div className="comp-content">
          {role === "student" ?(
            <div className="past-comp">
            <h1>PARTICIPATING</h1>
            <Slider target="participating" page="compe"/>
          </div>
          ):(
            <div></div>
          )}
          <div className="ongoing-comp">
            <h1>ONGOING</h1>
            <Slider target="ongoing" page="compe" />
          </div>
          <div className="future-comp">
            <h1>UPCOMING</h1>
            <Slider target="upcoming" page="compe" />
          </div>
        </div>
      </div>
    </Userinfo.Provider>
  );
};

export default Competition;
