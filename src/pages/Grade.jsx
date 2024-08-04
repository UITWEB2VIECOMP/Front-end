import React, { useEffect, useState } from 'react';
import '../styles/Grade.css';
import { useNavigate, useParams } from 'react-router-dom';
import Grade_Modal from '../components/Grade_Modal';
import axiosUrl from '../../config/AxiosConfig';

export default function Grade({userId, role}) {
    const navigate = useNavigate()
    const [answers, setAnswers] = useState([]);
    const { contest_id, contest_participant_id } = useParams();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        console.log(answers);
    }, [answers]);
    
    useEffect(() => {
        const fetchSubmitted = async (id, role) => {
            try {
              const res = await axiosUrl.get(`/api/contest/get-submitted/${contest_id}/${contest_participant_id}`, {
                headers: {
                  user_id: id,
                  role: role,
                },
              });
              setAnswers(res.data.data);
            } catch (err) {
              console.error('Verification failed: ', err);
              navigate('/error');
            } finally {
              setLoading(false); 
            }
          };
        if (userId && role) {
            fetchSubmitted(userId, role)
        }else{
            navigate('/login')
          }
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const FileDownload = ({ filePath, fileName }) => {
        return (
            <a href={filePath} download={fileName}>
                Download
            </a>
        );
    };
    const answersItem = answers.map(data => {
        let options = {};
        if (data.question_type_id === 1) {
            options = JSON.parse(data.option_multiple_choice);
        }
        return (
            <div key={data.question_id} className="question-item">
                <label>Question {data.question_id}:</label>
                <p>Question: {data.question_text}</p>
                {data.question_type_id === 1 && (
                    <div className='multiple_choice_form'>
                        {['qa', 'qb', 'qc', 'qd'].map(optionKey => (
                            <div key={optionKey}>   
                                <input 
                                    type="radio" 
                                    name={`question-${data.question_id}`} 
                                    value={optionKey} 
                                    checked={data.multiple_choice_answer === optionKey} 
                                    disabled
                                />: {options[optionKey]}
                            </div>
                        ))}
                    </div>
                )}
                {data.question_type_id === 2 && (
                    <div className="essay-input">
                        <h4>Essay:</h4>
                        <textarea 
                            value={data.submission_text || ""}
                            className="textarea"
                            disabled
                        />
                    </div>
                )}
                {data.question_type_id === 3 && (
                    <a href={data.file_path} className="download-link">
                        Download
                    </a>
                )}
                <hr />
            </div>
        );
    });

    return (
        <div className='grade-container'>
            {answersItem}
            <Grade_Modal userId={userId} role={role} contest_id={contest_id} contest_participant_id={contest_participant_id} />
        </div>
    );
}
