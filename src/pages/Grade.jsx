import React, { useEffect, useState } from 'react';
import '../styles/Grade.css';
import { useParams } from 'react-router-dom';
import Grade_Modal from '../components/Grade_Modal';

export default function Grade() {
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    const { contest_id } = useParams();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        console.log(answers);
    }, [answers]);
    
    useEffect(() => {
        // Simulating fetched questions for demonstration purposes.
        const fetchedQuestions = [
            { question_id: 1, question_text: 'What is React?', type_name: 'essay' },
            { question_id: 2, question_text: 'Choose the correct options:', type_name: 'multiple choice', option_multiple_choice: JSON.stringify({ qa: 'Option A', qb: 'Option B', qc: 'Option C', qd: 'Option D' }) },
            { question_id: 3, question_text: 'Upload your answer:', type_name: 'image' }
        ];
        
        setQuestions(fetchedQuestions);
        setLoading(false);
    }, []);

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
                                    disabled
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
                            disabled
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
                            disabled
                        />
                    </div>
                )}
                <hr />
            </div>
        );
    });

    return (
        <div className='grade-container'>
            {questionItem}
            <Grade_Modal />
        </div>
    );
}
