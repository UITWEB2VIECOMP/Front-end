import React, { useEffect, useState } from 'react'
import "../styles/Contest.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosUrl from '../../config/AxiosConfig'
import { format } from '`date-fns`';

export default function Contest({ role, userId }) {
    const [err, setErr] = useState('');
    const { contest_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [contest_data, setContest_data] = useState();
    const [isparticipated, setParticipated] = useState();
    const [ishosted, sethosted] = useState();

    const navigate = useNavigate();
    const fetchContest = async (id, role) => {
      try {
            const res = await axiosUrl.get(`/api/contest/get-contest/${contest_id}`, {
                headers: {
                    user_id: userId,
                    role: role
                }
            });
  
            console.log('API Response:', res);
  
            if (role === 'student') {
                const { data, participated} = res.data;
                setParticipated(participated)
                setContest_data(data)
                console.log('Student Data:', { contest_data, isparticipated });

            } else {
                const { data, hosted} = res.data;
                setContest_data(data)
                sethosted(hosted)
                console.log('Corporation Data:', { contest_data });
            }
            setLoading(false);
        } catch (err) {
            console.error('Verification failed: ', err);
            setLoading(false); 
            navigate('/error')
        }
    };
    useEffect(() => {
        fetchContest(userId, role);
      }, []);
      if (loading) {
          return <div>Loading...</div>;
      }
    const deleteContest = async(e)=>{
        try {
            const res = await axiosUrl.post(`/api/contest/delete/${contest_id}` ,{
                headers: {
                    user_id: userId,
                    role: role
                }
            });
            navigate('/')
        } catch (error) {
            console.error('Verification failed: ', err);
            setLoading(false); 
            navigate('/error')
        }
    }
    const joinContest = async (e) => {
        try {
            const res = await axiosUrl.post(
                `/api/contest/join-contest/${contest_id}`,
                {}, 
                {
                    headers: {
                        user_id: userId,
                        role: role
                    }
                }
            );
            window.location.reload();
        } catch (error) {
            console.error('Verification failed: ', error);
            setLoading(false);
            navigate('/error');
        }
    };
  return (
    <div className="contest">
    <header>
        <div className="contest-header">
            <img className="corp-image" src={contest_data.avatar} alt="" />
            <span>
                {contest_data.corp_name}
                .
                {contest_data.contest_name}
                .
                {
                    new Date().toISOString().slice(0, 19).replace('T', ' ') < contest_data.start_date ?(
                        <>UpComing</>
                    ):  new Date().toISOString().slice(0, 19).replace('T', ' ') > contest_data.end_date ?(
                        <>Completed</>
                    ):(
                        <>OnGoing</>
                    )
                }
            </span>
            {role === "student" ? (
                !isparticipated ? (
                    <button onClick={(e) => joinContest(e)} className="join-btn">Join Competition</button>
                ) : (
                    new Date().toISOString().slice(0, 19).replace('T', ' ') < contest_data.start_date ? (
                        <button className="join-btn" disabled>Upcoming</button>
                    ) : new Date().toISOString().slice(0, 19).replace('T', ' ') > contest_data.end_date ? (
                        <button className="join-btn" disabled>Completed</button>
                    ) : (
                        <button className="join-btn">Do Competition</button>
                    )
                )
            ) : (
                ishosted ? (
                    <div className='gr-btn'>
                        <Link to={"modify"} className="join-btn">Modify Competition</Link>
                        <button onClick={(e) => deleteContest(e)} className='delete-btn'>Delete</button>
                    </div>
                ) : (
                    <div></div>
                )
            )}
        </div>
        <div className="contest-header" style={{marginTop:"10px"}}>
            <div className='contest-name'>
                <h1>{contest_data.contest_name}</h1>
            </div>
            <div className='contest-img'>
                <img src={contest_data.contest_image} alt="" />
            </div>
        </div>
    </header>
    <hr />
    <main>
      <section className="overview">
        <h2>Overview</h2>
        <div className="competition-info">
            <div className="description">
                <h3>Description</h3>
                <p>{contest_data.contest_description}</p>
            </div>
            
            <div className="description">
                <div className='CompetitionHost'>
                    <div>
                        <h4>Competition Host</h4>
                        <p>{contest_data.corp_name}</p>
                    </div>
                    <div>
                        <img className="corp-image" src={contest_data.avatar} alt="" />
                    </div>
                </div>
                <div className='CompetitionPrize'>
                    <h4>Prizes & Awards</h4>
                    <p>{contest_data.prizes_description}</p>
                </div>
                <div className='CompetitionDate'>
                    <h4>Start Date - End Date</h4>
                    <p>{format(new  Date(contest_data.start_date), 'yyyy-MM-dd')} - {format(new  Date(contest_data.end_date), 'yyyy-MM-dd')}</p>
                </div>
                <div className='CompetitionParti'>
                    <h4>Participation</h4>
                    <p>{contest_data.total_participants} Participants</p>
                    <p>{contest_data.submitted_participants} Submissions</p>       
                </div>
            </div>
        </div>
      </section>
    </main>
  </div>
  )
}
