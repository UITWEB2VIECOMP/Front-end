import React, { useState, useEffect } from 'react';
import '../styles/Home.css'
import axiosUrl from '../../config/AxiosConfig';
import Aside from '../components/Aside';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Settings from '../../src_settings/settings';
import ProfileSettings from '../../src_settings/profileSettings';
import ChangePasssword from '../../src_settings/changePasssword';
import H0me from './Main';
import Competition from './Competition';
import Profile from './Profile';
import MyContest from './MyContest';
import ManageContest from './ManageContest';
import Contest from './Contest';
import ContestModify from './ContestModify';
import DoContest from './DoContest';
import Grade from './Grade';


const Home = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  //Fechuser function
  const fetchUserData = async (token, role) => {
    try {
          const res = await axiosUrl.get('/api/users/get-user', {
              headers: {
                  token: token,
              }
          });

          console.log('API Response:', res);

          if (role === 'student') {
              const { first_name, last_name, avatar, email,dob, created_at, prizes, has_participated } = res.data;
              console.log('Student Data:', { first_name, last_name, avatar, email,dob, created_at, prizes, has_participated });
              setUserInfo({ name: `${first_name} ${last_name}`, avatar, email, dob,created_at, prizes, has_participated });
          } else {
              const { corp_name, avatar, email, address, contact_info, created_at, description, has_hosted } = res.data;
              console.log('Corp Data:', { corp_name, avatar, email, address, contact_info, created_at, description, has_hosted });
              setUserInfo({ name: corp_name, avatar, email, address, contact_info, created_at, description, has_hosted });
          }
          setLoading(false);
      } catch (err) {
          console.error('Verification failed: ', err);
          setLoading(false); 
          if (err.response?.data?.message === "Token has expired") {
            localStorage.removeItem('token');
            navigate('/login');
          }
      }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      navigate('/login');
    } else {
      setRole(role)
      setToken(token);
      fetchUserData(token, role);
    }
  }, [navigate]);
  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    
    <div className="home-container">
      {token ? <Aside userInfo= {userInfo} token={token} role={role}/> : <div>Loading...</div>}
      <div className="home-content">
          <Routes>
            <Route path='/' element={<H0me token={token} userInfo={userInfo} role={role}></H0me>} ></Route>
            <Route path='/profile' element={<Profile  userInfo= {userInfo} role={role}></Profile>}></Route>
            <Route path='/your-contest' element={<MyContest  token={token} role={role} />} />
            <Route path='/manage-contest' element={<ManageContest token={token} role={role}/>} />

            <Route  path='/competition' element={<Competition token={token} role={role} ></Competition>}></Route>
            <Route path='/settings' element={<Settings token={token} role={role}></Settings>}>
            <Route index element={<ProfileSettings token={token} role={role} />} />
              <Route  path="profile" element={<ProfileSettings token={token} role={role}  />} />
              <Route path="password" element={<ChangePasssword token={token} role={role} />} />
            </Route>
            <Route path='/contest/:contest_id' element={<Contest token={token} role={role}></Contest>}>
            </Route>
            <Route  path="/contest/:contest_id/modify" element={<ContestModify token={token} role={role}  />} />
            <Route  path="/contest/:contest_id/do-contest" element={<DoContest token={token} role={role}  />} />
            <Route path='/contest/:contest_id/submission/:contest_participant_id' element={<Grade token={token} role={role} />} />
          </Routes > 
      </div>
    </div>
  );
};

export default Home;
