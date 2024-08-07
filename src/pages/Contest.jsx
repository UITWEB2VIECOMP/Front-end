import React, { useEffect, useState } from 'react'
import "../styles/Contest.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosUrl from '../../config/AxiosConfig'
import { format } from 'date-fns';

export default function Contest({ role, token }) {
    const [err, setErr] = useState('');
    const { contest_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [contest_data, setContest_data] = useState();
    const [isparticipated, setParticipated] = useState();
    const [ishosted, sethosted] = useState();
    const [isSubmitted, setIsSubmitted]= useState();
    const navigate = useNavigate();
    const fetchContest = async (token, role) => {
      try {
            const res = await axiosUrl.get(`/api/contest/get-contest/${contest_id}`, {
                headers: {
                    token: token,
                }
            });
  
            console.log('API Response:', res);
  
            if (role === 'student') {
                const { data, participated, submitted} = res.data;
                setParticipated(participated)
                setContest_data(data)
                setIsSubmitted(submitted === "submitted")
                console.log('Student Data:', { contest_data, isparticipated, submitted });

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
            if (err.response?.data?.message === "Token has expired") {
                localStorage.removeItem('token');
                navigate('/login');
            }else{
                navigate('/error')
            }
        }
    };
    useEffect(() => {
        if(!role || !token){
            navigate('/login');
        }else{
            fetchContest(token, role);
        }
      }, []);
      if (loading) {
          return <div>Loading...</div>;
      }
    const deleteContest = async(e)=>{
        try {
            const res = await axiosUrl.post(`/api/contest/delete/${contest_id}`,{} ,{
                headers:{
                    token: token,
                }
            })   
            navigate('/')
        } catch (error) {
            console.error('Verification failed: ', error);
            setLoading(false); 
            if (error.response?.data?.message === "Token has expired") {
                localStorage.removeItem('token');
                navigate('/login');
            }else{
                navigate('/error')
            }
        }
    }
    const joinContest = async (e) => {
        try {
            const res = await axiosUrl.post(
                `/api/contest/join-contest/${contest_id}`,
                {}, 
                {
                    headers: {
                        token: token,
                    }
                }
            );
            window.location.reload();
        } catch (error) {
            console.error('Verification failed: ', error);
            setLoading(false);
            if (error.response?.data?.message === "Token has expired") {
                localStorage.removeItem('token');
                navigate('/login');
            }else{
                navigate('/error')
            }
        }
    };
    const getDate = ()=>{
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' '); 

        const currentDateObject = new Date(currentDateString + 'Z'); 
        return currentDateObject
    }
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
                    getDate() < new Date(contest_data.start_date) ?(
                        <>UpComing</>
                    ):  getDate() > new Date(contest_data.end_date) ?(
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
                    getDate()  < new Date(contest_data.start_date) ? (
                        <button className="join-btn" disabled>Upcoming</button>
                    ) : getDate()  > new Date(contest_data.end_date) ? (
                        <button className="join-btn" disabled>Completed</button>
                    ) : (
                        isSubmitted?(
                            <button disabled  className="join-btn">Submitted</button>
                        ):(
                            <button onClick={()=>navigate('do-contest')} className="join-btn">Do Competition</button>
                        )
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
                    <p>{format(new  Date(new Date(contest_data.start_date)), 'yyyy-MM-dd')} - {format(new  Date(new Date(contest_data.end_date)), 'yyyy-MM-dd')}</p>
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
