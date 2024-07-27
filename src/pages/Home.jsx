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

const Home = () => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  //Fechuser function
  const fetchUserData = async (id, role) => {
    try {
          const res = await axiosUrl.get('/api/users/get-user', {
              headers: {
                  user_id: id,
                  role: role
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
      }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('user_id');
    if (!storedRole || !storedId) {
      navigate('/login');
    } else {
      setRole(storedRole);
      setId(storedId);

    fetchUserData(storedId, storedRole);
    }
  }, [navigate]);
  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      {role && id ? <Aside userInfo= {userInfo} role={role} /> : <div>Loading...</div>}
      <div className="home-content">
          <Routes>
            <Route path='/' element={<H0me userId={id} userInfo={userInfo} role={role}></H0me>} ></Route>
            <Route path='/profile' element={<Profile  userInfo= {userInfo}role={role}></Profile>}></Route>
            <Route  path='/competition' element={<Competition></Competition>}></Route>
            <Route path='/your-contest' element={<MyContest />} />
            <Route path='/manage-contest' element={<ManageContest />} />
            <Route path='/settings' element={<Settings  userId={id} role={role}></Settings>}>
            <Route index element={<ProfileSettings userId={id} role={role} />} />
            <Route  path="profile" element={<ProfileSettings userId={id} role={role}  />} />
            <Route path="password" element={<ChangePasssword userId={id} role={role} />} />
            </Route>
          </Routes>
      </div>
    </div>
  );
};

export default Home;
