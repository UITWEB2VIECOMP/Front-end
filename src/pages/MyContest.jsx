import React, { useEffect, useState } from 'react';
import '../styles/MyContest.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosUrl from '../../config/AxiosConfig';

const MyContest = ({ userId, role }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myContestData, setMyContestData] = useState(); 
  const fetchYourContestData = async (id, role) => {
    try {
      const res = await axiosUrl.get(`/api/contest/get-your-contest`, {
        headers: {
          user_id: id,
          role: role,
        },
      });
      setMyContestData(res.data.data);
    } catch (err) {
      console.error('Verification failed: ', err);
      // navigate('/error');
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {

    if (userId && role) {
      fetchYourContestData(userId, role);
    }else{
      navigate('/login')
    }
  }, [navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }
  const getDate = ()=>{
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' '); 

    const currentDateObject = new Date(currentDateString + 'Z'); 
    return currentDateObject
  }
  const myContestItem = myContestData.map((data) => (
    <div key={data.contest_id} style={{ marginTop: "10px" }} className="my-contest-dropdown h-16 flex items-center justify-between px-8 rounded-xl">
      <Link to={`/contest/${data.contest_id}`} className="flex-grow">
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h1>{data.contest_name}</h1>
          <div style={{ fontSize: "17px", fontWeight: "500" }}>
              {data.submission_status === "submitted" ? (
                  data.grade !== null ? (
                      <div style={{ color: "green" }}>{data.grade} POINTS</div>
                  ) : (
                      <div style={{ color: "red" }}>NOT GRADE</div>
                  )
              ) : (
                  new Date() < new Date(data.start_date) ? (
                      <div style={{ color: "red" }} >UPCOMING</div>
                  ) : new Date() > new Date(data.end_date) ? (
                      <div style={{ color: "red" }}>COMPLETED</div>
                  ) : (
                      <div style={{ color: "yellow" }}>NOT SUBMITTED</div>
                  )
              )}
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className='flex w-full h-full  items-center flex-col mc-container'>
        <div className="title py-3.5">
          <h1>My contest</h1>
        </div>
        <div>
          {myContestItem}
        </div>
    </div>
  )
}

export default MyContest