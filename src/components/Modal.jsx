import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import axiosUrl from '../../config/AxiosConfig'


const QuestionForm = ({ questions, setQuestions }) => {
  const handleAddQuestion = (type) => {
    const newQuestion = {
      type: type,
      text: '',
      choices: type === 'multiple_choice' ? [
        { text: ''},
        { text: ''},
        { text: ''},
        { text: ''},
      ] : [],
      essay: '',
    };
    setQuestions([...questions, newQuestion]); // Append the new question to the existing questions
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleEssayChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].essay = value;
    setQuestions(newQuestions);
  };


  return (
    <div className="question-form">
      <div className="question-type">
        <label>Q. Type:</label>
        <button onClick={() => handleAddQuestion('multiple_choice')} className="type-btn">Multiple Choice</button>
        <button onClick={() => handleAddQuestion('essay')} className="type-btn">Essay</button>
        <button onClick={() => handleAddQuestion('file')} className="type-btn">File Submit</button>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="question">
          <label>Q{index + 1}: {question.type}</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="input"
          />
          {question.type === 'multiple_choice' && (
            <div className="multiple-choice">
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="choice">
                  <label>Choice {choiceIndex + 1}:</label>
                  <input
                    type="text"
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}
                    className="input choice-input"
                  />
                </div>
              ))}
            </div>
          )}
          <button type="button" onClick={() => handleAddQuestion(question.type)} className="add-question-btn">
            Add Another Question
          </button>
        </div>
      ))}
    </div>
  );
};

const Modal = ({userId, role}) => {
  const [modal, setModal] = useState(false);
  const [contestName, setContestName] = useState()
  const [contestDescription, setContestDescription] = useState()
  const [contestPrize, setContestPrize] = useState()
  const [img, setImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date() ,
      endDate: null,
      key: 'selection'
    }
  ]);
  const [datepicker, setDatePicker] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleDatePicker = () => {
    setDatePicker(!datepicker);
  };

  if(modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const doSubmit = async(payload)=>{
    setLoading(true);
    for (const [key, value] of payload.entries()) {
      console.log(key, value);
    }
    try {
      const res = await axiosUrl.post(`/api/contest/add-contest`,payload,{
        headers:{
          user_id: userId,
          role: role
        }
      })
      setLoading(false);
      window.location.reload()
      console.log(res); 
    } catch (error) {
      console.error('Change error: ', error);
      setErr(error.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  }
  const submitAdd = ()=>{
    let quest = []
    questions.forEach((question)=>{
      if(question.type === "multiple_choice"){
        quest.push({
            description: question.text,
            type: question.type,
            form : {
              qa: question.choices[0].text,
              qb: question.choices[1].text,
              qc: question.choices[2].text,
              qd: question.choices[3].text
            }
          })
      }else{
        quest.push({
          description: question.text,
          type: question.type,
        })
      }
    })
      const formData = new FormData();
      formData.append('file', img);
      formData.append('contest_name', contestName);
      formData.append('contest_description', contestDescription);
      formData.append('prizes_description', contestPrize);
      const startDate = state[0].startDate ? convert(state[0].startDate) : '';
      const endDate = state[0].endDate ? convert(state[0].endDate) : '';
      formData.append('start_date', startDate);
      formData.append('end_date', endDate); 
      formData.append('questions', JSON.stringify(quest));
      console.log(formData);
      doSubmit(formData);
  }

  
  return (
    <>
      <div onClick={toggleModal} className='btn w-44 h-14 flex items-center justify-evenly cursor-pointer rounded-2xl'>
        <FaPlus className='w-5 h-5' />
        <p>Create contest</p>
      </div>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="title-project">
              <h2>Create Contest</h2>
              <button className="close-modal" onClick={toggleModal}>
                <IoMdClose />
              </button>
            </div>
            <form className="form-create" onSubmit={(e) => e.preventDefault()}>
              <div className="upperform">
                <div>
                  <label htmlFor="name">Name: </label>
                  <input onChange={(e) => setContestName(e.target.value)} type="text" id="name" placeholder='Name' />
                </div>
                <div className='datepicker'>
                  <button type="button" onClick={toggleDatePicker}>Select Start Date - End Date</button>
                  {datepicker && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={item => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                    />
                  )}
                </div>
              </div>
              <div className="midform">
                <div>
                  <label htmlFor="description">Contest description: </label>
                  <textarea onChange={(e) => setContestDescription(e.target.value)} name="description" rows="4" cols="100" id="description"></textarea>
                </div>
                <div className='other'>
                  <div>
                    <label htmlFor="prize">Prize: </label>
                    <input onChange={(e) => setContestPrize(e.target.value)} type="text" id="prize" placeholder='Prize' />
                  </div>
                  <div>
                    <label htmlFor="image">Image: </label>
                    <input onChange={(e) => setImage(e.target.files[0])} className='file-input' type="file" accept="image/*"  id="image" />
                  </div>
                </div>
              </div>
              <hr style={{ margin: "10px" }} />
              <QuestionForm questions={questions} setQuestions={setQuestions} />
              <button type="button" className="submit-btn" onClick={submitAdd}>Submit</button>
              {err && <div className="error-message">{err}</div>}
              {loading && <div className="loading-message">Loading...</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
