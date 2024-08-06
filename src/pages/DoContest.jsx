import React, { useEffect, useState } from 'react';
import '../styles/DoContest.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import axiosUrl from '../../config/AxiosConfig';

export default function DoContest({ token, role }) {
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const { contest_id } = useParams();
    const [err, setErr] = useState('');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(answers);
    }, [answers]);
    
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axiosUrl.get(`/api/contest/do-contest/${contest_id}`, {
                    headers: {
                        token: token,
                    },
                });
                setQuestions(res.data.data);
                console.log(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Verification failed: ', error);
                setLoading(false);
                if (error.response?.data?.message === "Token has expired") {
                    localStorage.removeItem('token');
                    navigate('/login');
                }else{
                    navigate('/error');
                }
            }
        };
        if (token && role) {
            fetchQuestions();
        }else{
            navigate('/login')
        }
        const initialAnswers = questions.reduce((acc, question) => {
            acc[question.question_id] = {
                type: question.question_type_id === 1 ? "multiple-choice" : question.question_type_id === 2 ? "essay" : "file", 
                value:null
            };
            return acc;
        }, {});
        setAnswers(initialAnswers);
    }, [contest_id, role]);

    if (loading) {
        return <div>Loading...</div>;
      }
    
    const handleEssayChange = (question_id, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question_id]: { type: 'essay', value }
        }));
    };

    const handleMultipleChoiceChange = (question_id, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question_id]: { type: 'multiple-choice', value }
        }));
    };

    const handleFileChange = (question_id, event) => {
        const file = event.target.files[0];
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [question_id]: { type: 'file', value: file }
        }));
    };

    const questionItem = questions.map(data => {
        let options = {};
        if (data.type_name === "multiple choice") {
            options = JSON.parse(data.option_multiple_choice);
        }
        return (
            <div key={data.question_id} className="question-item">
                <label>Question {data.question_id}:</label>
                <p>Question: {data.question_text}</p>
                {data.type_name === "multiple choice" && (
                    <div className='multiple_choice_form'>
                        {['qa', 'qb', 'qc', 'qd'].map(optionKey => (
                            <div key={optionKey}>
                                <input 
                                    type="radio" 
                                    name={`question-${data.question_id}`} 
                                    value={optionKey} 
                                    checked={answers[data.question_id]?.value === optionKey} 
                                    onChange={() => handleMultipleChoiceChange(data.question_id, optionKey)} 
                                />: {options[optionKey]}
                            </div>
                        ))}
                    </div>
                )}
                {data.type_name === "essay" && (
                    <div className="essay-input">
                        <h4>Essay:</h4>
                        <textarea 
                            value={answers[data.question_id]?.value || ""}
                            onChange={(e) => handleEssayChange(data.question_id, e.target.value)}
                            className="textarea"
                        />
                    </div>
                )}
                {data.type_name === "image" && (
                    <div className="file">
                        <input 
                            className='file-input' 
                            type="file" 
                            id={`file-${data.question_id}`} 
                            onChange={(e) => handleFileChange(data.question_id, e)} 
                        />
                    </div>
                )}
                <hr />
            </div>
        );
    });
    const submitContest = async()=>{
        try {
            const formData = new FormData();
            Object.entries(answers).forEach(([key, data]) => {
                if (data.type === "file") {
                    formData.append(key, data.value);
                }
            });
            formData.append("answers", JSON.stringify(answers));
            formData.append("contest_id", contest_id);
            for (let entry of formData.entries()) {
                console.log(entry[0], entry[1]);
            }            
            const res = await axiosUrl.post(`/api/contest/submission`,formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: token,
                },
            });
            console.log(res); 

            setErr('');
        } catch (error) {
            console.error('Change error: ', error);
            setErr(error.response?.data?.message || 'An error occurred');
            if (error.response?.data?.message === "Token has expired") {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }finally {
            setLoading(false);
            navigate(`/contest/${contest_id}`);
        }
    }
    return (
        <div className='do-contest-container'>
            {questionItem}
            <button onClick={submitContest}>SUBMIT</button>
            {err && <div className="error-message">{err}</div>}
            {loading && <div className="loading-message">Loading...</div>}
        </div>
    );
}
