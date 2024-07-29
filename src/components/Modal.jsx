import React, { useState } from 'react';
import '../styles/Modal.css';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

const QuestionForm = ({ questions, setQuestions }) => {
  const handleAddQuestion = (type) => {
    const newQuestion = {
      type: type,
      text: '',
      choices: type === 'multiple_choice' ? [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ] : [],
      essay: '',
      file: null,
      image: null,
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

  const handleCorrectAnswerChange = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices = newQuestions[questionIndex].choices.map((choice, index) => ({
      ...choice,
      isCorrect: index === choiceIndex,
    }));
    setQuestions(newQuestions);
  };

  const handleEssayChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].essay = value;
    setQuestions(newQuestions);
  };

  const handleFileChange = (index, file) => {
    const newQuestions = [...questions];
    newQuestions[index].file = file;
    setQuestions(newQuestions);
  };

  const handleImageChange = (index, image) => {
    const newQuestions = [...questions];
    newQuestions[index].image = image;
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
          <label>Q{index + 1}:</label>
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
                  <input
                    type="checkbox"
                    checked={choice.isCorrect}
                    onChange={() => handleCorrectAnswerChange(index, choiceIndex)}
                    className="checkbox"
                  />
                </div>
              ))}
            </div>
          )}
          {question.type === 'essay' && (
            <div className="essay-input">
              <label>Essay:</label>
              <textarea
                value={question.essay}
                onChange={(e) => handleEssayChange(index, e.target.value)}
                className="textarea"
              />
              <label>Image (optional):</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                className="file-input"
              />
            </div>
          )}
          {question.type === 'file' && (
            <div className="file-upload">
              <label>Upload File:</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="file-input"
              />
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

const Modal = () => {
  const [modal, setModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
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
                  <input type="text" id="name" placeholder='Name' />
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
                  <textarea name="description" rows="4" cols="100" id="description"></textarea>
                </div>
                <div className='other'>
                  <div>
                    <label htmlFor="prize">Prize: </label>
                    <input type="text" id="prize" placeholder='Prize' />
                  </div>
                  <div>
                    <label htmlFor="image">Image: </label>
                    <input className='file-input' type="file" id="image" />
                  </div>
                </div>
              </div>
              <hr style={{ margin: "10px" }} />
              <QuestionForm questions={questions} setQuestions={setQuestions} />
              <button type="button" className="submit-btn" onClick={() => console.log({ questions })}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
