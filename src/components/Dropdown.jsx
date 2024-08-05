import React, { useEffect, useState } from 'react';
import { MdArrowDropDownCircle } from 'react-icons/md';
import '../styles/Dropdown.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../config/AxiosConfig';
import { format } from 'date-fns';
import axios from 'axios';
const Dropdown = ({token, role}) => {
  const [show, setShow] = useState({});
  const [manageData, setManageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()


  const toggleDropdown = (id) => {
    setShow((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  const fetchManageData = async (token, role) => {
    try {
      console.log(id);
      const res = await axiosUrl.get(`/api/contest/get-manage-info`, {
        headers: {
          token: token,
        },
      });
      setManageData(res.data.data);
      console.log('Manage Response:', res);
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
    if (!role || !token) {
      navigate('/login');
    } else {
      fetchManageData(token);
    }
  }, [role, token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const manageItem = manageData.map((data) => (
    <div key={data.contest_id} style={{ marginTop: "10px" }} className="contest-dropdown rounded-xl">
      <div className='flex h-16 items-center justify-between px-8 rounded-xl contest'>
        <Link to={`/contest/${data.contest_id}`} style={{textDecoration:"none"}} className="flex-grow">
          <h1>{data.contestName}</h1>
        </Link>
        <div className='flex flex-row items-center gap-x-3'>
          <MdArrowDropDownCircle
            className={`w-8 h-8 cursor-pointer transition-transform duration-300 ${show[data.contest_id] ? 'rotate-180' : ''}`}
            onClick={() => toggleDropdown(data.contest_id)}
          />
        </div>
      </div>
      {show[data.contest_id] && (
        data.submitted_participant.length > 0 ? (
          data.submitted_participant.map((participant) => (
            <Link style={{textDecoration:"none", color:"#333"}} to={`/contest/${data.contest_id}/submission/${participant.contest_participant_id}`} key={participant.contest_participant_id}>
              <div className='dropdown-content h-16 flex items-center rounded-xl justify-between px-8'>
                <h1>Submitted</h1>
                <p>{format(new Date(participant.latest_submission_date), 'MMM dd, yyyy')}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>No submission</div>
        )
      )}
    </div>
  ));

  return (
    <div>
      {manageItem}
    </div>
  );
};

export default Dropdown;
