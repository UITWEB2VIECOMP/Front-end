import React, { useEffect, useState } from 'react'
import '../styles/MyContest.css'
import axiosUrl from '../../config/AxiosConfig'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const MyContest = ({userId, role}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [myContestData, setMyContestData] = useState()
  const fetchYourContestData = async (id, role) => {
    try {
      console.log(id);
      const devUrl = axios.create({
        baseURL: 'http://localhost:5001',
      });
      const res = await devUrl.get('/api/get-your-contest',{
        headers: {
          user_id: id,
          role: role,
        }
      })
      // const res = await axiosUrl.get(`/api/contest/get-manage-info`, {
      //   headers: {
      //     user_id: id,
      //     role: role,
      //   },
      // });
      setMyContestData(res.data.data);
      console.log('Manage Response:', res);
      setLoading(false);
    } catch (err) {
      console.error('Verification failed: ', err);
      setLoading(false);
      navigate('/error')
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (!role || !userId) {
      navigate('/login');
    } else {
      fetchYourContestData(userId, role);
    }
  }, [role, userId, navigate]);
  // const manageItem = manageData.map((data) => (
  //   <div key={data.contest_id} style={{ marginTop: "10px" }} className="contest-dropdown h-16 flex items-center justify-between px-8 rounded-xl">
  //     <Link to={`/contest/${data.contest_id}`} className="flex-grow">
  //       <h1>{data.contestName}</h1>
  //     </Link>
  //   </div>
  // ));

  return (
    <div className='flex w-full h-full  items-center flex-col mc-container'>
        <div className="title py-3.5">
          <h1>My contest</h1>
        </div>
        <div>
          
        </div>
    </div>
  )
}

export default MyContest